// Regenerates the 1200x630 Open Graph / Twitter card images in
// public/images/og. Run from the repo root: node scripts/generate-og-images.mjs
// The previous sitewide social image was a 1024x1024 square, which crops badly
// in the summary_large_image cards this site declares.
import sharp from 'sharp';
import fs from 'node:fs';

const W = 1200, H = 630;
const NAVY = '#36326a';       // --primary  244 36% 31%
const TEAL = '#0b9fc9';       // --accent   193 89% 39%

const logo = fs.readFileSync('public/images/neointelli-logo-white.svg', 'utf8')
  .replace(/^<svg /, '<svg ');

// Strip the outer <svg> wrapper so the logo can be placed inside the canvas SVG.
const logoInner = logo.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

const esc = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

const variants = [
  ['og-default',     'AI-First GCC Services in India'],
  ['og-gcc',         'GCC Setup &amp; Advisory in India'],
  ['og-gcc-operations', 'GCC Operations &amp; Managed Services'],
  ['og-ai-gcc',      'AI-First GCC Design &amp; Build'],
  ['og-technology',  'Technology &amp; Product Engineering'],
  ['og-ai-engineering', 'Enterprise AI Engineering'],
  ['og-talent',      'AI Delivery Teams &amp; Pods'],
  ['og-recruitment', 'Recruitment &amp; Staffing in India'],
  ['og-industries',  'Industry GCC Solutions'],
  ['og-blog',        'Insights on India GCCs &amp; AI'],
  ['og-about',       'About NeoIntelli'],
  ['og-contact',     'Talk to Our GCC Team'],
];

const canvas = (label) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY}"/>
      <stop offset="55%" stop-color="#2b4a86"/>
      <stop offset="100%" stop-color="${TEAL}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.18" r="0.62">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g transform="translate(96,150) scale(0.78)">${logoInner}</g>
  <text x="96" y="330" font-family="Inter, Helvetica, Arial, sans-serif" font-size="54" font-weight="700" fill="#ffffff">${label}</text>
  <rect x="96" y="372" width="96" height="6" rx="3" fill="#ffffff" opacity="0.85"/>
  <text x="96" y="452" font-family="Inter, Helvetica, Arial, sans-serif" font-size="30" fill="#ffffff" opacity="0.86">Design, launch and scale your Global Capability Centre in India</text>
  <text x="96" y="556" font-family="Inter, Helvetica, Arial, sans-serif" font-size="27" font-weight="600" fill="#ffffff" opacity="0.75">neointelli.com</text>
</svg>`;

for (const [name, label] of variants) {
  const out = `public/images/og/${name}.png`;
  await sharp(Buffer.from(canvas(label)))
    .png({ compressionLevel: 9, palette: true })
    .toFile(out);
  const { width, height } = await sharp(out).metadata();
  console.log(name.padEnd(16), `${width}x${height}`, (fs.statSync(out).size / 1024).toFixed(0) + 'KB');
}
