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
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage: storage });
  const allFiles = fs.readdirSync('./uploads');
 let pdfs =  allFiles.filter(file=>path.extname(file).toLowerCase()==='.html');
app.get('/api/',(req,res)=>{
    res.send({'message':'Hello, Dunlin AI Server!'});
})
app.post('/api/analyze',upload.single('file'),async(req,res,next)=>{
    const {prompt} = req.body;
    // const filePath = path.join(__dirname, 'uploads', req.file.originalname);
        const databuffer =  fs.readFileSync('./uploads/result.html');
    const text = await pdf(databuffer).then(data=> {
        return data.text
})
fs.writeFileSync('text-output.txt',text,(err)=>{
    if(err) throw err;
    console.log('text-output.txt created');
})
console.log(text);
 
    // const response = await run({prompt, fileContent});
    // const result = await analyze(fileContent);
    // console.log(typeof fileContent);
    // res.send({response, result});

})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
