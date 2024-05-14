export default {
  root: "frontend",
  build: {
    outDir: "../dist",
    rollupOptions: {
      external: ["multer", "prismarine-nbt"],
    },
  },
};
