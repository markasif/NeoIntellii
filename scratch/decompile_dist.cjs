const fs = require('fs');

const bundles = {
  location: 'dist/assets/LocationStrategy-Bb9Kx4pu.js',
  setup: 'dist/assets/SetupLaunch-C8LsLSVd.js',
  modernization: 'dist/assets/ModernizationTransformation-Cj_f5hCl.js'
};

for (const [key, filePath] of Object.entries(bundles)) {
  const content = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(`scratch/${key}_raw.js`, content);
  
  // Extract all string literals longer than 3 chars
  const strRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g;
  let match;
  const strings = [];
  while ((match = strRegex.exec(content)) !== null) {
    const s = match[1] || match[2];
    if (s && s.length > 3 && !s.startsWith('./') && !s.includes('http') && !s.startsWith('M') && !s.includes('calc(')) {
      strings.push(s);
    }
  }
  fs.writeFileSync(`scratch/${key}_strings.json`, JSON.stringify(strings, null, 2));
  console.log(`Saved ${key}: ${strings.length} strings`);
}
