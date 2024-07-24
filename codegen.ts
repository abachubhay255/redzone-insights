import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "packages/server/src/graphql/types/**/*.graphql",
  documents: "packages/server/src/graphql/types/*.graphql",
  generates: {
    "packages/client/src/graphql/types-and-documents.tsx": { plugins: ["typescript", "typescript-operations", "typed-document-node"] },
    "packages/server/src/graphql/resolvers-types.ts": { plugins: ["typescript", "typescript-resolvers"] }
  },
  emitLegacyCommonJSImports: false
};

export default config;
