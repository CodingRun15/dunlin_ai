
require('dotenv').config();
const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const analyze = require('./languageAPI');
const genAI = new GoogleGenerativeAI(process.env.google_api);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// Access your API key as an environment variable (see "Set up your API key" above)
async function run(prompt,fileContent) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const [result] = await analyze([prompt,fileContent]);
   fs.writeFile('output.txt', JSON.stringify(result), function (err) {
    if (err) return console.log(err);
    console.log('File saved!');

  });
}
module.exports = run;