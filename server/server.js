require('dotenv').config();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const express = require('express');
const run = require('./api_service/gcs');
const analyze = require('./api_service/languageAPI');
const app = express();
app.use(cors());
const port = process.env.port;
app.use(express.json());
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   });
//   const upload = multer({ storage: storage });
app.get('/api/',(req,res)=>{
    res.send({'message':'Hello, Dunlin AI Server!'});
})
app.post('/api/analyze',async(req,res)=>{
    const {prompt} = req.body;
let summary = await run(prompt);
console.log("summary to be sent",summary);
return res.json({"summary":summary});
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
