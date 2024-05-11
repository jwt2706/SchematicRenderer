const multer = require("multer");
const upload = multer({ dest: "/tmp/uploads/" });
const nbt = require("prismarine-nbt");
const fs = require("fs");

module.exports = (req, res) => {
  upload.single("file")(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // req.file is the 'file' file
    // req.body will hold the text fields, if there were any
    console.log(req.file);

    // Parse schematic file here
    fs.readFile(req.file.path, function (error, data) {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      nbt.parse(data, function (error, data) {
        if (error) {
          return res.status(500).json({ error: error.message });
        }

        console.log(data.value); // This will log the parsed NBT data

        // Send a response back to the client
        res.json({ message: "File received", data: data.value });
      });
    });
  });
};
