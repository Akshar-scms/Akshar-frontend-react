import { defineConfig } from "vite";
import postcss from "./postcss.config.js";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig({
  define: {
    "process.env": process.env,
  },
  css: {
    postcss,
  },
  plugins: [
    react(),
    {
      name: "suppress-warnings",
      configResolved(config) {
        const originalWarn = config.logger.warn;
        config.logger.warn = (msg, options) => {
          if (
            msg.includes(
              "Assets in public cannot be imported from JavaScript"
            ) ||
            msg.includes(
              "files in the public directory are served at the root path"
            )
          ) {
            return;
          }
          originalWarn(msg, options);
        };
      },
    },
  ],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    https: {
      key: fs.readFileSync("./localhost.key"),
      cert: fs.readFileSync("./localhost.crt"),
    },
    host: "0.0.0.0",
  },
});
