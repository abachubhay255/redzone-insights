import OpenAI from "openai";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

async function createFileObject(obj: any): Promise<fs.ReadStream> {
  // Convert the object to a JSON string
  const jsonString = JSON.stringify(obj, null, 2); // Pretty print with 2-space indentation

  // Get the current module's file URL
  const __filename = fileURLToPath(import.meta.url);

  // Get the directory name of the current module
  const __dirname = path.dirname(__filename);

  const serverDir = path.resolve(__dirname, "..");

  // Define the path for the temporary file
  const filePath = path.join(serverDir, `${obj[0].playerId}.json`);

  console.log("File path:", filePath);

  // Return a Promise that resolves with the read stream
  return new Promise((resolve, reject) => {
    // Write the JSON string to a file
    fs.writeFile(filePath, jsonString, err => {
      if (err) {
        reject(new Error("Error writing file: " + err.message));
        return;
      }

      console.log("File successfully written!");

      // Create a readable stream
      const readStream = fs.createReadStream(filePath);

      // Resolve the Promise with the read stream
      resolve(readStream);

      // Clean up by deleting the file after reading
      readStream.on("close", () => {
        fs.unlink(filePath, err => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("Temporary file deleted.");
          }
        });
      });

      // Handle errors on the read stream
      readStream.on("error", err => {
        reject(new Error("Error creating read stream: " + err.message));
      });
    });
  });
}

export async function uploadFiles(objects: any[], fileIds: string[]) {
  const fileStreams = await Promise.all(objects.map(createFileObject));
  console.log("File streams:", fileStreams);
  const vectorStore = await getVectorStore();
  await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, { files: fileStreams, fileIds: fileIds });
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
