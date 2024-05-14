export default {
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      external: ["multer", "prismarine-nbt"],
    },
  },
};
