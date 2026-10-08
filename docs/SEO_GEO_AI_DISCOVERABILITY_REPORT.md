# SEO, GEO & AI Discoverability

How this site is made readable by search crawlers and by answer engines
(ChatGPT Search, Perplexity, Claude, Google AI Overviews), and where the
remaining gaps are.

This document previously described a Vite + `StaticRouter` prerender pipeline
(`src/entry-server.tsx`, `scripts/prerender.mjs`). That architecture is gone:
the site is a Next.js `pages/` app and metadata is rendered server-side. The
description below matches the code as it stands.

## 1. How metadata reaches the HTML

Every route in `pages/` renders through `PageShell` (`src/lib/page-helpers.tsx`),
which mounts `SEOHead` (`src/components/page/SEOHead.tsx`) inside `next/head`.
Because `SEOHead` renders during SSG, the title, description, canonical,
Open Graph tags and every JSON-LD block are present in the HTML source before
any JavaScript runs — which is what non-executing crawlers and answer-engine
fetchers actually read.

Pages are statically generated with `revalidate: 3600` (`createStaticProps`),
so crawlers get static HTML rather than a client-rendered shell.

`src/lib/seo.ts` is the single source of truth. `ROUTE_SEO` drives on-page
metadata, `pages/sitemap.xml.ts`, and the indexability check, so a route cannot
be in the sitemap without metadata or vice versa.

## 2. Structured data emitted

| Entity | Where |
| --- | --- |
| `Organization`, `WebSite` | Every page, so `@id` references resolve within each page's own graph |
| `WebPage` (or `AboutPage`/`ContactPage`/`CollectionPage`) | Every indexable route |
| `BreadcrumbList` | Every route except the homepage |
| `Service` | Every page in the six-pillar service navigation |
| `LocalBusiness` | Homepage |
| `Person` | `/about` |
| `BlogPosting` | Every `/blog/<slug>` |
| `HowTo` | `/services/gcc/setup-launch` |
| `FAQPage` | Homepage, industry pages, and the comparison/cost pages |

### Why `FAQPage` is not on the service pages

The AI GCC, AI Engineering and AI Delivery Teams sections deliberately omit
`FAQPage`. Google withdrew the FAQ rich result for most sites, and `QAPage`
describes user-generated Q&A, which these are not. The buyer questions are
still on the page as real `h2`/`h3` headings with the answer in the first
paragraph (`AnswerBlock`), which is the format answer engines extract from.
`src/test/aiEngineeringSection.test.ts` locks the absence of the markup so it is
not reintroduced by accident. See `docs/AI_DELIVERY_TEAMS_MIGRATION.md`.

## 3. Answer-first content pattern

Each service page opens with a self-contained definition before any marketing
copy — an `In brief` block on the child pages, a 50-80 word definition on the
hubs. Buyer questions then appear as headings with the direct answer in the
first paragraph, never hidden behind an accordion. This is the highest-value
AEO signal on the site and it is now consistent across all six pillars.

## 4. Crawl and machine-readable assets

- `public/robots.txt` explicitly allows search crawlers, answer-engine
  crawlers (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`) and training
  crawlers, and points at the sitemap and `llms.txt`.
- `pages/sitemap.xml.ts` generates from `ROUTE_SEO` + `blogPosts`, so a new
  page appears with no extra step. Paid `/lp/*` pages are excluded by design
  and render `noindex,follow`.
- `public/llms.txt` is the machine-readable site summary, including a
  Disambiguation section stating that "GCC" means Global Capability Center and
  not the Gulf Cooperation Council.

## 5. Guards

`src/test/seoMetadata.test.ts` enforces sitewide:

- title <= 60 characters, description 70-160 characters, on every route
- unique title and description per route
- a `Service` entity with a `provider` on every service-navigation page
- no route falling through to the default metadata
- `llms.txt`: no duplicate section headings, only live indexable links, and
  coverage of every service page plus the industry and direct-answer pages

Section-level tests (`aiGccSection`, `aiEngineeringSection`, `aiTalentSection`,
`gccOperationsSection`, `homepage`, `serviceNav`) keep each pillar's routes,
titles, schemas and navigation in sync.

## 6. Known gaps

- **No freshness signal.** `WebPage` carries no `dateModified`, and blog posts
  are dated at month precision only. Answer engines weight recency; wiring a
  real last-reviewed date per page would help, but it needs an editorial
  process to keep it honest rather than a build timestamp.
- **Thin AEO on some non-service pages.** `/contact`, `/industries` and
  `/gcc-cost-calculator` carry no question-shaped headings, so there is little
  for an answer engine to extract.
- **`/case-studies` has no client-approved quantified outcomes**, which is the
  single strongest authority signal the site is missing.
- **Author/entity model for insight content** is limited to one `Person` on
  `/about`; blog posts all attribute to the same author with no topical
  credentials expressed in markup.

## 7. Deployment

Netlify builds with `npm run build` (Next.js). `netlify.toml` and
`public/_headers` carry the caching and header configuration; `public/_redirects`
plus `next.config.mjs` carry the legacy-route redirects.
