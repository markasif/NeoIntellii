# SEO / GEO / AI Discoverability Action Checklist

## Technical SEO checklist
- [x] Unique route-level titles and descriptions
- [x] Canonical URL per route
- [x] Open Graph + Twitter card metadata
- [x] Robots directives
- [x] XML sitemap
- [x] Robots.txt sitemap reference
- [x] Structured data baseline (Organization, Website, Breadcrumb)
- [x] 404 route exists
- [x] Key routes prerendered into static HTML at build time

## On-page SEO checklist
- [x] Clear primary H1 on key pages
- [x] Improved semantic sectioning on homepage
- [x] Internal links to core service pages
- [ ] Add quantified proof points on all service pages
- [ ] Add richer alt/context around all strategic visuals

## GEO / AI discoverability checklist
- [x] Entity-focused organization details in JSON-LD
- [x] FAQ content and FAQ schema on homepage
- [x] Explicit “what we do / who it is for / outcomes” language
- [ ] Expand industry-specific Q&A and glossary pages
- [ ] Add author entities and citations in insights content

## Content checklist
- [x] Core services clearly articulated
- [x] Audience and outcomes clarified on homepage
- [ ] Add implementation methodology page with process evidence
- [ ] Add trust center page (security, governance, compliance)

## Performance checklist
- [x] Cache headers for static assets and images
- [x] Lazy loading already used for key images
- [ ] Optimize large images to modern formats and responsive srcset
- [ ] Add Lighthouse budget monitoring in CI

## Accessibility checklist
- [x] Landmark structure retained (`main`, `section`, `footer`)
- [x] Semantic FAQ (`details/summary`) added
- [ ] Audit color contrast for all gradient badges
- [ ] Verify keyboard focus order for carousel controls

## Netlify deployment checklist
- [x] `netlify.toml` build/publish configured
- [x] SPA fallback redirects configured
- [x] Response headers configured
- [x] Public `_redirects` and `_headers` included in build output
- [ ] Confirm primary domain + HTTPS + host canonical redirect in Netlify UI
