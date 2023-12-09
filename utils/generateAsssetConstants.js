const fs = require('fs');
const path = require('path');

const inputDirectory = 'src/assets/products/';
const outputFileName = 'ResourceList.js';

function generateConstants() {
  const files = fs.readdirSync(inputDirectory);

  const constants = files.map(file => {
    const key = `ResourceList.PRD_${file.toUpperCase().replace(/\..+$/, '')}`;
    const value = `./${inputDirectory}${file}`;
    return `${key} = \`${value}\`;`;
  });

  const outputFilePath = path.join(__dirname, outputFileName);
  const outputContent = `const ResourceList = {\n  ${constants.join('\n  ')}\n};\n\nmodule.exports = ResourceList;\n`;

  fs.writeFileSync(outputFilePath, outputContent, 'utf-8');
  console.log(`Constants generated successfully and saved to ${outputFilePath}`);
}

generateConstants();
