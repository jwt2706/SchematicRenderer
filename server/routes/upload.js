const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/", upload.single("file"), (req, res) => {
  // req.file is the 'file' file
  // req.body will hold the text fields, if there were any
  console.log(req.file);

  // TODO: analyze the file here

  // send a response to the client
  res.json({ message: "File received" });
  // TODO: send the result back
});

module.exports = router;
