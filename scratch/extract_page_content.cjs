const fs = require('fs');

function extractPageContent(inputFile, outputFile) {
  const code = fs.readFileSync(inputFile, 'utf8');
  fs.writeFileSync(outputFile, code);
}

extractPageContent('scratch/location_pretty.js', 'scratch/location_pretty.txt');
extractPageContent('scratch/setup_pretty.js', 'scratch/setup_pretty.txt');
extractPageContent('scratch/modernization_pretty.js', 'scratch/modernization_pretty.txt');

console.log('Saved pretty text files for inspection');
