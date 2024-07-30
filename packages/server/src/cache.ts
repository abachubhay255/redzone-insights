import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import crypto from "crypto";
import "dotenv/config";

const AZURE_STORAGE_CONNECTION_STRING = process.env.STORAGE_CONNECTION_STRING || "";
const containerName = "redzone-cache";

// Initialize BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient: ContainerClient = blobServiceClient.getContainerClient(containerName);

// Ensure the container exists
const initializeCache = async () => {
  try {
    const exists = await containerClient.exists();
    if (!exists) {
      await containerClient.create();
    }
  } catch (error) {
    console.error(`Error initializing cache container: ${error.message}`);
  }
};

// Call this function to initialize the cache container
await initializeCache();

const normalizeQuery = (query: string): string => {
  return query
    .replace(/\s+/g, " ") // Replace multiple whitespace characters with a single space
    .trim(); // Remove leading and trailing whitespace
};

const getCacheKey = (query: string): string => {
  const normalizedQuery = normalizeQuery(query);
  const hash = crypto.createHash("md5").update(normalizedQuery).digest("hex");
  return `${hash}.json`;
};

const TTL = 1000 * 60 * 60; // Cache for 1 hour

export const readCache = async (query: string, ttl?: number): Promise<any | null> => {
  const cacheKey = getCacheKey(query);
  const blockBlobClient = containerClient.getBlockBlobClient(cacheKey);

  try {
    const properties = await blockBlobClient.getProperties();
    const lastModified = properties.lastModified;
    const now = new Date();

    if (lastModified && now.getTime() - lastModified.getTime() > (ttl ?? TTL)) {
      await blockBlobClient.delete();
      return null;
    }

    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    if (!downloadBlockBlobResponse.readableStreamBody) {
      return null;
    }
    const downloaded = (await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)).toString();
    return JSON.parse(downloaded);
  } catch (err) {
    if (err.statusCode === 404) {
      return null;
    }
    console.error(`Error reading from cache: ${err.message}`);
    return null;
  }
};

export const writeCache = async (query: string, result: any): Promise<void> => {
  const cacheKey = getCacheKey(query);
  const blockBlobClient = containerClient.getBlockBlobClient(cacheKey);

  if (result.errors || result.error || result.data?.__schema) {
    return;
  }

  const jsonData = JSON.stringify(result);

  try {
    await blockBlobClient.upload(jsonData, jsonData.length, { blobHTTPHeaders: { blobContentType: "application/json" } });
  } catch (error) {
    console.error(`Error writing to cache: ${error.message}`);
  }
};

// Utility function to convert a readable stream to a buffer
const streamToBuffer = async (readableStream: NodeJS.ReadableStream): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on("data", data => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks as any));
    });
    readableStream.on("error", reject);
  });
};
