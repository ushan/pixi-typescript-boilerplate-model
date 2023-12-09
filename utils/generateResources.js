const fs = require('fs');
const path = require('path');

const inputDirectory = 'src/assets/products/';
const outputFileName = 'ResourceList.js';

function generateConstants() {
  const files = fs.readdirSync(inputDirectory);

  const constants = files.reduce((acc, file) => {
    const key = `ITEM_${file.toUpperCase().replace(/\..+$/, '')}`;
    const value = `./${inputDirectory}${file}`;
    acc[key] = value;
    return acc;
  }, {});

  const outputFilePath = path.join(__dirname, outputFileName);
  const outputContent = `module.exports = ${JSON.stringify(constants, null, 2)};\n`;

  fs.writeFileSync(outputFilePath, outputContent, 'utf-8');
  console.log(`Constants generated successfully and saved to ${outputFilePath}`);
}

generateConstants();
