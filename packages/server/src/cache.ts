import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

// Get the current working directory
const currentDir = process.cwd();

// Define the cache directory relative to the current directory
const cacheDir = path.join(currentDir, "dist", "cache");

// Ensure cache directory exists
async function initializeCache() {
  try {
    await fs.mkdir(cacheDir, { recursive: true });
  } catch (error) {
    console.error(`Error creating cache directory: ${error.message}`);
  }
}

// Call this function to initialize the cache directory
await initializeCache();

const normalizeQuery = (query: string): string => {
  return query
    .replace(/\s+/g, " ") // Replace multiple whitespace characters with a single space
    .trim(); // Remove leading and trailing whitespace
};

const getCacheKey = (query: string): string => {
  const normalizedQuery = normalizeQuery(query);
  const hash = crypto.createHash("md5").update(normalizedQuery).digest("hex");
  return path.join(cacheDir, hash + ".json");
};

export const readCache = async (query: string): Promise<any | null> => {
  const cacheKey = getCacheKey(query);
  try {
    const data = await fs.readFile(cacheKey, "utf-8");
    const lastModified = await fs.stat(cacheKey).then(stat => stat.mtime);
    const now = new Date();
    if (now.getTime() - lastModified.getTime() > TTL) {
      await fs.unlink(cacheKey);
      return null;
    }
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
};

export const writeCache = async (query: string, result: any): Promise<void> => {
  const cacheKey = getCacheKey(query);
  if (result.errors || result.error || result.data?.__schema) {
    return;
  }
  await fs.writeFile(cacheKey, JSON.stringify(result), "utf-8");
};

const TTL = 1000 * 60 * 60 * 24; // Cache for 24 hours
