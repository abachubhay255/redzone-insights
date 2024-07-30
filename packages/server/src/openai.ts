import OpenAI, { toFile } from "openai";
import "dotenv/config";
import { Buffer } from "buffer";
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

async function createTempJsonBuffer(obj: any): Promise<Buffer> {
  const jsonString = JSON.stringify(obj);
  return Buffer.from(jsonString);
}

export async function uploadFiles(objects: any[], filenames: string[]) {
  let err = "";
  try {
    const vectorStore = await getVectorStore();
    const storageFiles = await openai.files.list();
    const filesToUpdate = new Set<string>(filenames);
    const oneDayAgo = Math.floor(Date.now() / 1000) - ONE_DAY_SECONDS;

    // if the file is less than 1 day old it doesn't need to be updated, if older than 1 day delete it from the vector store
    for (const file of storageFiles.data) {
      if (file.created_at < oneDayAgo) {
        console.log("Deleting old file: ", file.filename, file.id);
        await openai.files.del(file.id);
      } else {
        filesToUpdate.delete(file.filename);
      }
    }

    console.log("Files to update: ", filesToUpdate);

    if (filesToUpdate.size === 0) {
      console.log("All files are up to date");
      return "success";
    }

    // Create in-memory buffers for each object asynchronously
    const buffers = await Promise.all(
      objects.map((obj, i) => {
        if (!filesToUpdate.has(filenames[i])) {
          return null;
        }
        return createTempJsonBuffer(obj);
      })
    );

    const filesToUpload = buffers
      .filter((buf): buf is Buffer => buf !== null)
      .map((buf, i) => ({
        filename: filenames[i],
        buffer: buf
      }));

    // Upload files to OpenAI Vector Store with progress tracking
    await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {
      files: await Promise.all(filesToUpload.map(async f => await toFile(f.buffer, f.filename))),
      fileIds: []
    });
  } catch (error) {
    console.log(error);
    err = error.message || error.toString();
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
