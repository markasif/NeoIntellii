const fs = require('fs');

function parseBundle(name, file) {
  const code = fs.readFileSync(file, 'utf8');
  console.log(`\n================================================================`);
  console.log(`=== FULL STRUCTURE OF: ${name} ===`);
  console.log(`================================================================`);

  // Let's find the main export function: export{XX as default}
  const exportMatch = code.match(/export\s*\{\s*([a-zA-Z0-9_$]+)\s*as\s*default\s*\}/);
  const mainFnName = exportMatch ? exportMatch[1] : null;
  console.log('Main export function name:', mainFnName);

  // Find all Section or section declarations
  // Match patterns like: id:"...", eyebrow:"...", title:...
  const sectionRegex = /id:\s*"([^"]+)"[\s\S]*?(?:eyebrow:\s*"([^"]*)")?[\s\S]*?title:\s*(?:"([^"]*)"|([^,\n\}]+))/g;
  
  // Or let's scan for all "eyebrow:" or "title:" or "caption:" or "lead:"
  const lines = code.split('\n');
  let currentSection = null;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l.includes('id:') && (l.includes('"') || l.includes("'"))) {
      console.log('\n--- SECTION LINE:', l.slice(0, 120));
    }
    if (l.includes('eyebrow:')) {
      console.log('    EYEBROW:', l.slice(0, 120));
    }
    if (l.includes('title:')) {
      console.log('    TITLE:', l.slice(0, 120));
    }
    if (l.includes('lead:') || l.includes('description:')) {
      console.log('    LEAD/DESC:', l.slice(0, 120));
    }
    if (l.includes('InBrief') || l.includes('AnswerBlock') || l.includes('AnswerList') || l.includes('Matrix') || l.includes('Lifecycle') || l.includes('Flow') || l.includes('Hero')) {
      console.log('    COMPONENT CALL:', l.slice(0, 120));
    }
  }
}

parseBundle('Location Strategy', 'scratch/location_pretty.js');
parseBundle('Setup & Launch', 'scratch/setup_pretty.js');
parseBundle('Modernization & Transformation', 'scratch/modernization_pretty.js');
