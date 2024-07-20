require('dotenv').config();
const cors = require('cors');
const express = require('express');
const run = require('./api_service/gcs');
const app = express();
app.use(cors());
const port = process.env.port;

app.get('/api/',(req,res)=>{
    res.send({'message':'Hello, Dunlin AI Server!'});
})
app.post('/api/analyze',(req,res)=>{
    const {prompt,fileContent} = req.body;
   const response = run(prompt,fileContent);
   console.log(response);

})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
