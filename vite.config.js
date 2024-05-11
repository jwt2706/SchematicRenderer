export default {
  root: "frontend",
  build: {
    outDir: "../public",
    rollupOptions: {
      external: ["multer", "prismarine-nbt"],
    },
  },
};
