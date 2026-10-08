const fs = require('fs');

const files = fs.readdirSync('dist/assets').filter(f => 
  f.startsWith('LocationStrategy') || 
  f.startsWith('SetupLaunch') || 
  f.startsWith('ModernizationTransformation') ||
  f.startsWith('StrategyBusinessCase')
);

console.log('Matching files in dist/assets:', files);

for (const f of files) {
  console.log('\n========================================');
  console.log('FILE:', f);
  const content = fs.readFileSync('dist/assets/' + f, 'utf8');
  console.log('Length:', content.length);
  // Extract text nodes and strings
  const stringRegex = /"([^"\\]{15,})"|'([^'\\]{15,})'/g;
  let match;
  const found = new Set();
  while ((match = stringRegex.exec(content)) !== null) {
    const str = match[1] || match[2];
    if (!str.includes('xmlns') && !str.includes('path') && !str.includes('class') && !str.includes('width') && !str.includes('http://www.w3.org')) {
      found.add(str);
    }
  }
  console.log('Found strings count:', found.size);
  Array.from(found).slice(0, 20).forEach(s => console.log('  -', s));
}
