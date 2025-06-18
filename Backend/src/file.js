const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require('path');

const FileRouter = express.Router();
FileRouter.use("/upload", express.static("upload"));


const uploadDir = './upload';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, Date.now()+extension);
  }
});

const upload = multer({ storage });

FileRouter.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ message: "No file uploaded" });
  }

  console.log("File uploaded:", req.file.filename);
  const downloadURL = `http://localhost:3000/upload/${req.file.filename}`
  res.send({
    message:"File uploaded sucessufuly now you can download 🙂",
    downloadURL,
  })

});



module.exports = FileRouter;

