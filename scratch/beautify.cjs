const fs = require('fs');

// We can format the raw js with basic indentation to read the JSX calls easily
function beautify(code) {
  return code
    .replace(/;/g, ';\n')
    .replace(/\{/g, '{\n')
    .replace(/\}/g, '\n}\n')
    .replace(/,children:/g, ',\nchildren:')
    .replace(/jsx\(/g, '\njsx(')
    .replace(/jsxs\(/g, '\njsxs(');
}

fs.writeFileSync('scratch/location_pretty.js', beautify(fs.readFileSync('scratch/location_raw.js', 'utf8')));
fs.writeFileSync('scratch/setup_pretty.js', beautify(fs.readFileSync('scratch/setup_raw.js', 'utf8')));
fs.writeFileSync('scratch/modernization_pretty.js', beautify(fs.readFileSync('scratch/modernization_raw.js', 'utf8')));

console.log('Pretty files written to scratch/');
