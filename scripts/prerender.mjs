import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const dist = resolve(root, "dist");

const template = await readFile(resolve(dist, "index.html"), "utf8");
const serverEntryPath = resolve(dist, "server", "entry-server.js");
const { render, PRERENDER_ROUTES } = await import(`file://${serverEntryPath}`);

for (const route of PRERENDER_ROUTES) {
  const { appHtml, head } = render(route);
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta name="description"[\s\S]*?\/>/g, "")
    .replace(/<meta name="author"[\s\S]*?\/>/g, "")
    .replace(/<meta name="robots"[\s\S]*?\/>/g, "")
    .replace(/<meta property="og:[\s\S]*?\/>/g, "")
    .replace(/<meta name="twitter:[\s\S]*?\/>/g, "")
    .replace(/<link rel="canonical"[\s\S]*?>/g, "")
    .replace("</head>", `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const filePath = route === "/" ? resolve(dist, "index.html") : resolve(dist, route.slice(1), "index.html");
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, html, "utf8");
}

// Generate sitemap.xml dynamically
const sitemapUrls = PRERENDER_ROUTES.map((route) => {
  const priority = route === "/" ? "1.0" : route.startsWith("/services") ? "0.9" : "0.7";
  const changefreq = route === "/" || route === "/blog" ? "weekly" : "monthly";
  const lastmod = new Date().toISOString().split("T")[0];
  return `  <url><loc>https://neointelli.com${route === "/" ? "/" : route}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}).join("\n");

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>`;

await writeFile(resolve(dist, "sitemap.xml"), sitemapXml, "utf8");
console.log(`✓ Dynamic sitemap.xml generated with ${PRERENDER_ROUTES.length} routes.`);

await rm(resolve(dist, "server"), { recursive: true, force: true });

