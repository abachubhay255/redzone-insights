import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [...react(), tsconfigPaths()] as PluginOption[],
  define: {
    "process.env": process?.env ?? {}
  },
  server: {
    host: "localhost",
    port: parseInt(process?.env?.VITE_PORT ?? "3000"),
    proxy: {
      "/api": "http://localhost:4000/graphql"
    },
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: "build",
    manifest: true
  }
}));
