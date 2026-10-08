# Netlify Deployment Guide

## Build settings
- **Build command:** `npm run build` (runs client build + SSR render build + route prerender pass)
- **Publish directory:** `dist`
- **Node version:** use an LTS version compatible with current toolchain (18+ recommended)

## Environment variables

Set these in **Netlify → Site configuration → Environment variables** (all scopes: Production, Deploy Previews, Branch deploys). The Next.js API route `pages/api/send-tool-email.ts` reads them at runtime. Without `RESEND_API_KEY`, “Send my cost estimate” still captures the lead in Netlify Forms but cannot mail the visitor.

| Variable | Required | Example |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, to send result emails | `re_...` (Resend dashboard → API Keys) |
| `EMAIL_FROM` | Recommended | `NeoIntelli <noreply@neointelli.com>` |
| `EMAIL_REPLY_TO` | Optional | Omit so estimate emails stay no-reply |
| `EMAIL_BCC` | Optional | Internal inbox to copy on every estimate |

Local development uses `.env.local` (gitignored). After changing Netlify env vars, trigger a new deploy so the API route picks them up.

CLI equivalent (from a linked site):

```sh
netlify env:set RESEND_API_KEY "re_..."
netlify env:set EMAIL_FROM "NeoIntelli <estimates@neointelli.com>"
```

## Redirect strategy
- Static prerendered route HTML is generated for key routes, and SPA fallback is also defined:
  - `/* /index.html 200` in `public/_redirects`
  - equivalent fallback in `netlify.toml`
- This prevents broken deep links on browser refresh.

## Headers strategy
Configured in both `netlify.toml` and `public/_headers`:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Aggressive immutable caching for `/assets/*`
- Daily caching for `/images/*`

## Forms/functions notes
- A hidden Netlify-compatible contact form exists in `index.html` for static form detection.
- No Netlify Functions are required for current deployment.

## Safe deployment steps
1. Connect GitHub repository to Netlify.
2. Set build command and publish directory.
3. Deploy preview and verify route deep links.
4. Validate `/robots.txt` and `/sitemap.xml` post-deploy.
5. Confirm canonical host and TLS behavior.
6. Run Lighthouse + Search Console URL inspection for priority pages.

## Known limitations
- Route-level metadata is updated client-side; while widely indexed, non-JS bot reliability is lower than SSR/SSG.
- If indexing gaps appear, prioritize migration to a pre-rendered architecture (Next.js/Astro) in a planned phase.
