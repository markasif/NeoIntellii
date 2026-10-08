# Migration Rationale: HTML-First Rendering for SEO + GEO + Netlify

## Decision
Kept the existing React + Vite stack, but migrated from CSR-only behavior to a **static prerendered multi-page output** at build time.

## Why this was selected
- Preserves current design system and components with minimal UI risk.
- Produces real HTML per important route (not empty SPA shell), improving crawlability and AI parser access.
- Netlify-friendly and simple: deploy static `dist` output with redirects/headers.
- Lower risk/cost than full framework migration while addressing the core SEO blocker.

## Tradeoff vs Next.js migration
### Selected: Vite + SSR prerender pipeline
- ✅ Real HTML generated for key pages at build time.
- ✅ Keeps current architecture/components and avoids full rewrite.
- ✅ Strong Netlify compatibility.
- ⚠️ Content updates still require rebuild/redeploy (static workflow).

### Deferred: Next.js migration
- ✅ Strong built-in SSR/SSG/ISR primitives.
- ✅ Better for large CMS-heavy dynamic publishing at scale.
- ❌ Higher migration effort and regression risk right now.

## Future trigger to migrate
Move to Next.js/Astro when dynamic content volume or CMS ISR needs exceed static prerender workflow efficiency.
