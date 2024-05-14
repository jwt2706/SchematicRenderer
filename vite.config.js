import { defineConfig } from "vite";
import copy from "vite-plugin-copy";

export default defineConfig({
  root: "frontend",
  build: {
    outDir: "../dist",
    rollupOptions: {
      external: ["multer", "prismarine-nbt"],
    },
  },
  plugins: [
    copy({
      targets: [{ src: "frontend/textures/*", dest: "dist/textures" }],
    }),
  ],
});
