import { defineConfig } from "vite";
import fs from "node:fs";
import path, { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        "clipboard-event": resolve(
          __dirname,
          "pages/clipboard-event/index.html"
        ),
        "navigator-clipboard": resolve(
          __dirname,
          "pages/navigator-clipboard/index.html"
        ),
        "img-stretch": resolve(__dirname, "pages/img-stretch/index.html"),
        "svg-rect-position": resolve(
          __dirname,
          "pages/svg-rect-position/index.html"
        ),
      },
    },
    outDir: "./dist",
  },
  server: {
    https: {
      cert: fs.readFileSync(path.join(__dirname, "keys/cert.crt")),
      key: fs.readFileSync(path.join(__dirname, "keys/cert.key")),
    },
  },
});
