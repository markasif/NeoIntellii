const fs = require('fs');

function analyzeBundle(name, filename) {
  const code = fs.readFileSync('scratch/' + filename, 'utf8');
  console.log('====================================================');
  console.log('ANALYZING:', name);
  console.log('====================================================');

  // Let's find arrays of objects or strings in the bundle
  // Regex for variable assignments: const xx = [...]
  // In minified code, arrays often look like: const x=[...], y=[...]
  const matches = code.match(/const\s+([a-zA-Z0-9_$]+)\s*=\s*(\[[^\]]+\])/g);
  if (matches) {
    console.log(`Found ${matches.length} simple array declarations`);
    matches.forEach(m => {
      if (m.length < 500) console.log('  ', m);
    });
  }

  // Find Section titles, eyebrow, etc.
  // In React JSX minified: jsx("section", { ... }) or jsx(Section, { ... }) or jsx(p, { title: "..." })
  const sectionProps = [];
  const secRegex = /(?:eyebrow|title|lead|heading|caption)\s*:\s*"([^"]+)"/g;
  let sMatch;
  while ((sMatch = secRegex.exec(code)) !== null) {
    sectionProps.push(sMatch[0]);
  }
  console.log('Section props found:', sectionProps);
}

analyzeBundle('Location Strategy', 'location_raw.js');
analyzeBundle('Setup & Launch', 'setup_raw.js');
analyzeBundle('Modernization & Transformation', 'modernization_raw.js');
