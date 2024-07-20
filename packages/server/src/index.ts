import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import cors from "cors";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import { resolvers } from "./graphql/resolvers/resolvers.js";
import { getAssistant } from "./openai.js";
import { readCache, writeCache } from "./cache.js";

export const assistant = await getAssistant();

const schema = await loadSchema("./**/types/*.graphql", {
  loaders: [new GraphQLFileLoader()]
});

const app = express();
app.use(cors());

// Serve the GraphiQL IDE.
app.get("/playground", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.use(express.json());

app.use("/graphql", async (req, res, next) => {
  // Proceed with graphql-http handler
  const graphqlHandler = createHandler({
    schema: schema,
    rootValue: resolvers
  });

  if (!req.body) {
    return graphqlHandler(req, res, next);
  }
  const { query } = req.body;

  // Try reading from cache
  const cachedResponse = await readCache(query);
  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  // Capture the original end method
  const originalEnd = res.end;

  res.end = async function (this: any, ...props: [any, any, any]) {
    // Write to cache
    await writeCache(query, JSON.parse(props[0]));
    // Call the original end method
    originalEnd.call(this, ...props);
    return res;
  } as any;

  graphqlHandler(req, res, next);
});

// Start the server at port
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

console.log("Running a GraphiQL API server at http://localhost:4000/playground");
