const multer = require("multer");
const upload = multer({ dest: "/tmp/uploads/" });

module.exports = (req, res) => {
  upload.single("file")(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // req.file is the 'file' file
    // req.body will hold the text fields, if there were any
    console.log(req.file);

    // TODO: analyze file here

    // Send a response back to the client
    res.json({ message: "File received" });
  });
};
