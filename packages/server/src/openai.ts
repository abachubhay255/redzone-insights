import OpenAI from "openai";
import "dotenv/config";
import fs from "fs";
import fsProm from "fs/promises";

import { assistant } from "./index.js";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function getAssistant() {
  const assistant = await openai.beta.assistants.retrieve("asst_Si3zNH8pxrzDsMaHPYAwiDKg");
  return assistant;
}

export async function getVectorStore() {
  const vectorStore = await openai.beta.vectorStores.retrieve("vs_J02BPNVHJezo4SbcnOvHUfxv");
  return vectorStore;
}

async function createTempJsonFile(obj: any, filename: string): Promise<string> {
  await fsProm.writeFile(filename, JSON.stringify(obj));
  return filename;
}

export async function uploadFiles(objects: any[], filenames: string[]) {
  const filePaths: string[] = []; // Array to store temporary file paths
  let err = "";
  try {
    const vectorStore = await getVectorStore();

    const storageFiles = await openai.files.list();

    const filesToUpdate = new Set<string>(filenames);

    // if the file is less than 1 day old it doesn't need to be updated, if older than 1 day delete it from the vector store
    for (const file of storageFiles.data) {
      // check if file is older than 1 day
      const oneDayAgo = Math.floor(Date.now() / 1000) - ONE_DAY_SECONDS;
      if (file.created_at < oneDayAgo) {
        console.log("Deleting old file: ", file.filename, file.id);
        await openai.files.del(file.id);
      }
      // file is already up to date
      else {
        filesToUpdate.delete(file.filename);
      }
    }

    console.log("Files to update: ", filesToUpdate);

    if (filesToUpdate.size === 0) {
      console.log("All files are up to date");
      return "success";
    }

    // Create temporary JSON files for each object asynchronously
    for (let i = 0; i < objects.length; i++) {
      if (!filesToUpdate.has(filenames[i])) {
        continue;
      }
      const tempFilePath = await createTempJsonFile(objects[i], filenames[i]);
      filePaths.push(tempFilePath);
    }

    // Create read streams for the temporary files
    const fileStreams = filePaths.map(path => fs.createReadStream(path));

    // Upload files to OpenAI Vector Store with progress tracking
    await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, { files: fileStreams, fileIds: [] });

    // Handle the upload response as needed (e.g., process errors)
  } catch (error) {
    console.log(error);
    err = error;
    // Handle errors appropriately (e.g., clean up temporary files)
  } finally {
    // Delete temporary files regardless of success or failure
    for (const filePath of filePaths) {
      fs.unlink(filePath, () => {});
    }
  }

  return err || "success";
}

export async function sendMessage(content: string) {
  const thread = await openai.beta.threads.create();
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: content
  });
  const stream = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    stream: true
  });
  for await (const event of stream) {
    if (event.event === "thread.message.completed") {
      const content = event.data.content[0];
      if (content?.type === "text") {
        return content?.text.value;
      }
    }
  }
}

const ONE_DAY_SECONDS = 60 * 60 * 24;
