
require('dotenv').config();
const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const analyze = require('./languageAPI');
const genAI = new GoogleGenerativeAI(process.env.google_api);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// Access your API key as an environment variable (see "Set up your API key" above)
async function run(prompt) {
  try{
   const result = await model.generateContent(prompt);
   const summary = result.response.text();
   fs.writeFile('output.txt', summary, function (err) {
    if (err) return console.log(err);
  });
  return summary;
}
catch(err) {
  console.log(err);
}
}
module.exports = run;