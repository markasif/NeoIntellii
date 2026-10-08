# Go-Live Audit Report — neointelli.com

## Automated content sweep (resolved)

| Check | Pre-fix | Post-fix |
|---|---|---|
| Em-dashes (—) | 78 hits across 19 files | 0 |
| En-dashes (–) | 21 hits across 7 files | 0 |
| AI-tell phrases (delve, tapestry, robust solution, seamlessly, etc.) | 0 | 0 |
| Placeholder text (lorem, TODO, Acme, "your company") | 0 | 0 |
| Phone numbers | 0 | 0 |
| Twitter/X links | 0 | 0 |
| Stale years (2023/2024) in Footer/index.html | 0 | 0 |

## Brand-name positioning (verified, not "our clients")

No third-party staffing, RPO or executive-search firm is named anywhere in the Recruitment section. Earlier drafts compared NeoIntelli to named competitors; those names have been removed and replaced with category descriptions ("high-volume staffing desks", "large global RPO providers", "established retained-search firms"). Pass.

## Link integrity

- **Broken internal links (fixed):** 6 industry links in `src/pages/gcc-faq.tsx` pointed to `/industries/{slug}` instead of `/industries/{slug}-gcc`. Corrected.
- **Redirect conflict (fixed):** `netlify.toml` and `public/_redirects` had `/careers -> /services/talent` 301 which would have hidden the live `/careers` page. Removed both.
- **Remaining cross-checked:** 0 internal hrefs point to nonexistent routes.

## Domain normalization

- `robots.txt` Sitemap directive: now `https://neointelli.com/sitemap.xml` (was www).
- `index.html`, `src/lib/seo.ts`, `public/llms.txt`, two page files: all www refs collapsed to apex.
- `public/sitemap.xml`: already on apex (89 URLs).

## Manual checks still required (browser-tool walkthrough)

These need live verification once preview is up:

1. Mega-menu link walk (Services / Capabilities / Industries / Recruitment) - confirm scroll-to-top and no 404.
2. Calculator submits (Cost, ROI, Readiness) - confirm `send-tool-email` edge function 200s.
3. Contact form submit - Netlify Forms AJAX success.
4. Mobile (375x812) and tablet (820x1180) responsive spot-check on Home + Recruitment hub.
5. 404 fallback on `/bogus-route`.
6. Console clean on every audited route.

## Domain go-live steps (user-driven)

1. Publish the project in Lovable to activate the `.lovable.app` staging URL.
2. Project Settings -> Domains -> Connect Domain -> `neointelli.com` and `www.neointelli.com`.
3. Set `neointelli.com` (apex) as Primary; `www` redirects to it.
4. At your DNS provider: A `@` -> 185.158.133.1, A `www` -> 185.158.133.1, TXT `_lovable` per the connect dialog. If behind Cloudflare, tick "Domain uses Cloudflare or a similar proxy" in the Advanced section.
5. Wait for status -> Active with SSL.
6. Post-DNS smoke test: `/`, `/sitemap.xml`, `/robots.txt`, `/recruitment`, refresh a deep link.
7. Submit `https://neointelli.com/sitemap.xml` in Google Search Console; request indexing on top 5 routes.
