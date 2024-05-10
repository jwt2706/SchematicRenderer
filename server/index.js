const express = require("express");
const uploadRoute = require("./routes/upload");

const app = express();

app.use("/upload", uploadRoute);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
