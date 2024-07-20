import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const __dirname = import.meta.dirname;

const cacheDir = path.resolve(__dirname, "cache");

// Ensure cache directory exists
fs.mkdir(cacheDir, { recursive: true });

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
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
};

export const writeCache = async (query: string, result: any): Promise<void> => {
  const cacheKey = getCacheKey(query);
  if (!result.data || result.data.__schema) {
    return;
  }
  await fs.writeFile(cacheKey, JSON.stringify(result), "utf-8");
};
