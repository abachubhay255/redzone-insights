import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import cors from "cors";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import { resolvers } from "./graphql/resolvers/resolvers.js";
import { getAssistant } from "./openai.js";

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

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: resolvers
  })
);

// Start the server at port
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

console.log("Running a GraphiQL API server at http://localhost:4000/playground");
