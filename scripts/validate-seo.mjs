// Validates the server-rendered SEO contract against a running build.
//   npm run build && npm start &   then   node scripts/validate-seo.mjs
// Override the target with SEO_BASE_URL=https://neointelli.com
const baseUrl = process.env.SEO_BASE_URL ?? 'http://localhost:3000';

const routes = [
  '/',
  '/about',
  '/contact',
  '/blog',
  '/industries/retail-gcc',
  '/services/ai-engineering',
  '/services/ai-engineering/generative-agentic-ai',
  '/services/ai-delivery-teams',
  '/services/ai-gcc',
  '/services/ai-gcc/mlops',
  '/services/gcc-operations',
  '/services/gcc-operations/bot-transition',
  '/recruitment',
  '/services/gcc',
  '/services/gcc/strategy-business-case',
  '/services/gcc/location-strategy',
  '/services/gcc/setup-launch',
  '/services/gcc/modernization-transformation',
  '/blog/gcc-model-in-india',
];

// Page-level schema type expected per route. Blog posts stay WebPage and carry
// their article semantics in the BlogPosting entity.
const PAGE_TYPE = { '/about': 'AboutPage', '/contact': 'ContactPage', '/blog': 'CollectionPage' };

const assertions = [];
const report = [];
const addAssertion = (condition, route, message) => assertions.push({ condition, route, message });

const extractTag = (html, selector) => html.match(selector)?.[0] ?? '';
const attr = (tag, name) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return tag.match(new RegExp(`${escaped}=["']([^"']*)["']`, 'i'))?.[1] ?? '';
};
const meta = (html, key, kind = 'property') =>
  attr(extractTag(html, new RegExp(`<meta[^>]+${kind}=["']${key}["'][^>]*>`, 'i')), 'content');

const parsedJsonLd = (html) => {
  const nodes = [];
  let malformed = 0;
  for (const match of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { nodes.push(JSON.parse(match[1])); } catch { malformed += 1; }
  }
  return { nodes, malformed };
};

// Every @id referenced by one node must be defined by another node on the page.
const danglingIdRefs = (nodes) => {
  const defined = new Set(nodes.map((n) => n['@id']).filter(Boolean));
  const referenced = new Set();
  const walk = (value) => {
    if (Array.isArray(value)) return value.forEach(walk);
    if (!value || typeof value !== 'object') return;
    const keys = Object.keys(value);
    if (keys.length === 1 && keys[0] === '@id') referenced.add(value['@id']);
    else Object.values(value).forEach(walk);
  };
  nodes.forEach((n) => Object.entries(n).forEach(([k, v]) => { if (k !== '@id') walk(v); }));
  return [...referenced].filter((id) => !defined.has(id));
};

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`);
  const html = await response.text();
  const canonical = attr(extractTag(html, /<link[^>]+rel=["']canonical["'][^>]*>/i), 'href');
  const robots = meta(html, 'robots', 'name');
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '';
  const description = meta(html, 'description', 'name');
  const { nodes, malformed } = parsedJsonLd(html);
  const types = nodes.map((n) => n['@type']);
  const duplicates = Object.entries(types.reduce((c, t) => ({ ...c, [t]: (c[t] ?? 0) + 1 }), {}))
    .filter(([, count]) => count > 1).map(([type]) => type);
  const dangling = danglingIdRefs(nodes);
  const ogImage = meta(html, 'og:image');
  const expectedPageType = route.startsWith('/blog/') ? 'WebPage' : (PAGE_TYPE[route] ?? 'WebPage');

  addAssertion(response.ok, route, `HTTP ${response.status}`);
  addAssertion(Boolean(title), route, 'A server-rendered title is present');
  addAssertion(Boolean(description), route, 'A server-rendered meta description is present');
  addAssertion(canonical === `https://neointelli.com${route === '/' ? '/' : route}`, route, `Canonical matches the public route (got "${canonical}")`);
  addAssertion(robots.startsWith('index,follow'), route, 'Indexable robots policy is present');
  addAssertion(types.includes(expectedPageType), route, `Page-level schema is ${expectedPageType} (got ${types.join(', ') || 'none'})`);
  addAssertion(!types.includes('ArticlePage'), route, 'No invalid ArticlePage schema type');
  addAssertion(types.includes('Organization') && types.includes('WebSite'), route, 'Organization and WebSite entities are present');
  addAssertion(duplicates.length === 0, route, `No duplicate JSON-LD @type values (${duplicates.join(', ') || 'none'})`);
  addAssertion(malformed === 0, route, 'All JSON-LD scripts parse as valid JSON');
  addAssertion(dangling.length === 0, route, `No dangling @id references (${dangling.join(', ') || 'none'})`);
  for (const tag of ['og:title', 'og:description', 'og:url', 'og:type', 'og:site_name', 'og:image', 'og:image:width', 'og:image:height', 'og:image:alt']) {
    addAssertion(Boolean(meta(html, tag)), route, `${tag} is present`);
  }
  for (const tag of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']) {
    addAssertion(Boolean(meta(html, tag, 'name')), route, `${tag} is present`);
  }
  addAssertion(ogImage.startsWith('https://'), route, 'og:image is an absolute URL');
  // og:image must be absolute for crawlers, but fetch it from the server under
  // test so this also works against a local build.
  const ogImageOnTarget = ogImage.replace('https://neointelli.com', baseUrl);
  const ogImageHead = await fetch(ogImageOnTarget, { method: 'HEAD' });
  addAssertion(ogImageHead.ok, route, `og:image resolves (${ogImageOnTarget} -> ${ogImageHead.status})`);
  addAssertion((ogImageHead.headers.get('content-type') ?? '').startsWith('image/'), route, 'og:image is served as an image');

  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  addAssertion(h1s.length === 1, route, `Exactly one H1 (found ${h1s.length})`);

  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  addAssertion(imgs.every((t) => /\balt=/.test(t)), route, 'Every img has an alt attribute');
  const anchors = html.match(/<a\b[^>]*>/gi) ?? [];
  addAssertion(anchors.every((t) => !/target="_blank"/.test(t) || /\brel="/.test(t)), route, 'Every target=_blank link carries rel');

  report.push({ route, status: response.status, canonical, schemas: types.join(', '), ogImage: ogImage.split('/').pop() });
}

// An unknown blog slug must be a hard 404, not a 200 that redirects client-side.
{
  const response = await fetch(`${baseUrl}/blog/this-post-does-not-exist`);
  addAssertion(response.status === 404, '/blog/<unknown>', `Unknown blog slug returns 404 (got ${response.status})`);
}

// robots.txt and the sitemap must be reachable and consistent.
{
  const robots = await fetch(`${baseUrl}/robots.txt`);
  const robotsBody = await robots.text();
  addAssertion(robots.ok, '/robots.txt', `HTTP ${robots.status}`);
  addAssertion(/Sitemap:\s*https:\/\/neointelli\.com\/sitemap\.xml/i.test(robotsBody), '/robots.txt', 'Declares the sitemap');
  addAssertion(!/^Disallow:\s*\/\s*$/m.test(robotsBody), '/robots.txt', 'Does not block the whole site');

  const sitemap = await fetch(`${baseUrl}/sitemap.xml`);
  const xml = await sitemap.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  addAssertion(sitemap.ok, '/sitemap.xml', `HTTP ${sitemap.status}`);
  addAssertion(locs.length > 0, '/sitemap.xml', `Contains URLs (${locs.length})`);
  addAssertion(new Set(locs).size === locs.length, '/sitemap.xml', 'No duplicate URLs');
  addAssertion(locs.every((l) => l.startsWith('https://neointelli.com')), '/sitemap.xml', 'All URLs are absolute and canonical-host');

  // Sampled: every sitemap URL must be indexable, not a redirect or a 404.
  for (const loc of locs.slice(0, 12)) {
    const path = loc.replace('https://neointelli.com', '') || '/';
    const page = await fetch(`${baseUrl}${path}`, { redirect: 'manual' });
    addAssertion(page.status === 200, '/sitemap.xml', `${path} returns 200 (got ${page.status})`);
  }
}

console.table(report);

const failures = assertions.filter((a) => !a.condition);
if (failures.length) {
  console.error(`\nSEO validation failures (${failures.length}/${assertions.length}):`);
  for (const f of failures) console.error(`- ${f.route}: ${f.message}`);
  process.exitCode = 1;
} else {
  console.log(`\nSEO validation passed: ${assertions.length} assertions across ${routes.length} routes.`);
}
