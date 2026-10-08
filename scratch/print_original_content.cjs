const fs = require('fs');

function inspectCode(name, file) {
  const code = fs.readFileSync(file, 'utf8');
  console.log(`\n################################################################`);
  console.log(`### ORIGINAL CONTENT OF: ${name} ###`);
  console.log(`################################################################\n`);
  
  // Find all sections:
  // sections are usually marked by: jsx("section", { id: "...", ... })
  // Let's find each section id and its content
  const sectionSplits = code.split(/id:\s*"([^"]+)"/);
  console.log(`Total section blocks: ${(sectionSplits.length - 1) / 2}`);
  
  for (let i = 1; i < sectionSplits.length; i += 2) {
    const secId = sectionSplits[i];
    const secContent = sectionSplits[i + 1].slice(0, 3000); // sample
    console.log(`\n------------------------------------------------`);
    console.log(`SECTION ID: #${secId}`);
    
    // Extract headers: h2, h3, p, etc.
    const headings = secContent.match(/children:\s*(?:"([^"]+)"|\["([^"]+)")/g) || [];
    // Also look for title:, lead:, etc.
    const props = secContent.match(/(?:title|eyebrow|lead|caption|note):\s*"([^"]+)"/g) || [];
    
    if (props.length) console.log('  PROPS:', props);
    // Find text strings inside this section
    const strings = secContent.match(/"([^"\\]{20,})"/g) || [];
    console.log('  KEY TEXT STRINGS (' + strings.length + '):');
    strings.slice(0, 10).forEach(s => console.log('    •', s.slice(0, 120)));
  }
}

inspectCode('Location Strategy', 'scratch/location_original_fn.js');
inspectCode('Setup & Launch', 'scratch/setup_original_fn.js');
inspectCode('Modernization & Transformation', 'scratch/modernization_original_fn.js');
