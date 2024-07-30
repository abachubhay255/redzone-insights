import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import cors from "cors";
import express, { RequestHandler, Response } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import { resolvers } from "./graphql/resolvers/resolvers.js";
import { getAssistant } from "./openai.js";
import { readCache, writeCache } from "./cache.js";
import { readFile } from "fs/promises";
import mimeTypes from "mime-types";
import parseUrl from "parseurl";
import { rateLimit } from "express-rate-limit";

export const assistant = await getAssistant();

const schema = await loadSchema("./**/types/*.graphql", {
  loaders: [new GraphQLFileLoader()]
});

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());

if (process.env.PLAYGROUND === "true") {
  // Serve the GraphiQL IDE.
  app.get("/playground", (_req, res) => {
    res.type("html");
    res.end(ruruHTML({ endpoint: "/graphql" }));
  });

  console.log(`Running a GraphiQL API server at http://localhost:${port}/playground`);
}

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7",
  legacyHeaders: false
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use("/graphql", async (req, res, next) => {
  // Proceed with graphql-http handler
  const graphqlHandler = createHandler({
    schema: schema,
    rootValue: resolvers
  });

  if (req.headers["no-server-cache"] === "true") {
    return graphqlHandler(req, res, next);
  }

  if (!req.body) {
    return graphqlHandler(req, res, next);
  }

  const { query, variables } = req.body;

  const cacheKey = query + (variables ? JSON.stringify(variables) : "");

  // Try reading from cache
  const cachedResponse = await readCache(cacheKey);
  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  // Capture the original end method
  const originalEnd = res.end;

  res.end = async function (this: any, ...props: [any, any, any]) {
    // Write to cache
    await writeCache(cacheKey, JSON.parse(props[0]));
    // Call the original end method
    originalEnd.call(this, ...props);
    return res;
  } as any;

  graphqlHandler(req, res, next);
});

app.use("/assets", serveAssets("client"));
app.use(serveIndex("client"));

// Start the server at port
app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);

function serveIndex(root: string): RequestHandler {
  return async (req, res) => {
    const url = new URL(root + "/index.html", import.meta.url);

    try {
      const contents = await readFile(url);
      setContentType(res, url);
      res.set("Cache-Control", "max-age:300, private");
      res.writeHead(200);
      res.end(contents);
    } catch (e) {
      console.log("serveIndex", "error", e);
      res.writeHead(404);
      res.end();
    }
  };
}

function serveAssets(root: string, assetsPrefix = "assets"): RequestHandler {
  return async (req, res) => {
    const path = parseUrl(req)?.pathname;
    const url = new URL(root + "/" + assetsPrefix + path, import.meta.url);

    try {
      const contents = await readFile(url);
      setContentType(res, url);
      res.set("Cache-Control", "max-age:31536000, immutable");
      res.writeHead(200);
      res.end(contents);
    } catch (e) {
      console.log("serveAssets", "error", e);
      res.writeHead(404);
      res.end();
    }
  };
}

function setContentType(res: Response, url: URL) {
  const type = mimeTypes.lookup(url.href);
  if (!type) {
    return;
  }
  const contentType = mimeTypes.contentType(type);
  if (!contentType) {
    return;
  }
  res.setHeader("Content-Type", contentType);
}
