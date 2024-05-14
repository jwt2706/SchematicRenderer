import copy from "vite-plugin-copy";

export default {
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
};
