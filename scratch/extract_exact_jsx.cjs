const fs = require('fs');

function extractMainComponent(file, output) {
  const code = fs.readFileSync(file, 'utf8');
  // Find where the main component begins
  // Look for: function XX(){return ...}
  // The main export is at the end: export{XX as default};
  const exportMatch = code.match(/export\s*\{\s*([a-zA-Z0-9_$]+)\s*as\s*default\s*\}/);
  if (!exportMatch) {
    console.log('No export match in', file);
    return;
  }
  const fnName = exportMatch[1];
  console.log(`Extracting function ${fnName} from ${file}...`);
  
  // Find "function fnName(" or "function fnName ()"
  const fnRegex = new RegExp(`function\\s+${fnName}\\s*\\([^)]*\\)\\s*\\{`, 'g');
  const match = fnRegex.exec(code);
  if (!match) {
    console.log('Could not find function declaration for', fnName);
    return;
  }
  
  const startIdx = match.index;
  // Let's get the whole function to the end
  const fnCode = code.slice(startIdx);
  fs.writeFileSync(output, fnCode);
  console.log(`Saved ${output} (${fnCode.length} chars)`);
}

extractMainComponent('scratch/location_pretty.js', 'scratch/location_original_fn.js');
extractMainComponent('scratch/setup_pretty.js', 'scratch/setup_original_fn.js');
extractMainComponent('scratch/modernization_pretty.js', 'scratch/modernization_original_fn.js');
