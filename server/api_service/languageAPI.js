require('dotenv').config();
const path = require('path');
async function analyze(query) {
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');
   const credentialsPath = path.join(__dirname,process.env.GOOGLE_APPLICATION_CREDENTIALS);
    // Instantiates a client
    const file = require(credentialsPath);
    const client = new language.LanguageServiceClient({credentials:file})
  
    // The text to analyze
  
    const document = {
      content: query,
      type: 'PLAIN_TEXT',
    };
    const classificationModelOptions = {
      v2Model: {
        contentCategoriesVersion: 'V2',
      },
    };
    // Detects the sentiment of the text
    const [result] = await client.analyzeEntities({document: document});
    const entities = result.entities;
    const [classify] = await client.classifyText({document, classificationModelOptions})
    return { entities:entities,classes:classify.categories};
  }
  module.exports = analyze;