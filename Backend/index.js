const express = require('express');
const app = express();
const cors = require('cors');
const FileRouter = require('./src/file.js');

app.use(express.json());
app.use(cors());
app.use("/",FileRouter);

app.listen(3000,(req,res)=>{
    console.log("server is running");
})