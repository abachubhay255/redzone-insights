import OpenAI from "openai";
import "dotenv/config";

import { assistant } from "./index.js";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function createAssistant() {
  const assistant = await openai.beta.assistants.retrieve("asst_Si3zNH8pxrzDsMaHPYAwiDKg");
  return assistant;
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
