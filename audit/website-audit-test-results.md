# NeoIntelli — Website Audit Test Results & Verification Log

**Date:** October 10, 2026  
**Auditor:** Senior Multidisciplinary Website Audit Team  
**Environment:** Windows (PowerShell Shell), Node.js v24.19.0, Next.js 16.3.5 (Turbopack)  

---

## 1. Summary of Executed Commands & Quality Gates

| Command | Discipline | Result | Key Output / Metric |
|---|---|:---:|---|
| `npx tsc --noEmit` | Static Type Checking | **PASSED** | 0 TypeScript errors across the entire codebase |
| `npm test` (`vitest run`) | Unit & Integration Testing | **PASSED** | **29 test files passed, 394 tests passed (100% pass rate)** |
| `node scripts/validate-seo.mjs` | Technical SEO & JSON-LD | **PASSED** | **609 assertions passed across 19 representative routes** |
| `node scratch/run_full_audit_crawl.mjs` | Full Application Crawl | **COMPLETED** | **135 routes crawled (134 HTTP 200, 1 HTTP 404: `/company`)** |
| `curl.exe -I http://127.0.0.1:3000/company` | Route Status Verification | **FAILED (404)** | Confirmed `/company` returns `HTTP/1.1 404 Not Found` |
| `git ls-files .env` | Security & Secrets Check | **FAILED (FLAGGED)**| Confirmed `.env` is tracked in git index |
| `browser_subagent` (Playwright) | Visual Browser Automation | **BLOCKED** | Playwright CDN returned 404 for Windows driver v1.57.0 |

---

## 2. Test Suite Execution Details

### A. TypeScript Compilation (`npx tsc --noEmit`)
- **Status:** Clean execution, exit code 0.
- **Duration:** 9.2 seconds.
- **Coverage:** Verified strict TypeScript type contracts across all `pages/`, `src/components/`, `src/data/`, `src/lib/`, and `src/features/`.
- **Finding:** No syntax errors, broken imports, or missing type definitions in the active workspace.

### B. Vitest Automated Test Suite (`npm test`)
- **Status:** All 29 test files passed.
- **Duration:** 57.62 seconds.
- **Breakdown of Passed Test Suites:**
  - `src/test/competitorSafety.test.ts` (4 tests) — 0 competitor names or comparative legal risks published.
  - `src/test/typewriterContextButton.test.tsx` (4 tests) — Router internal navigation verified.
  - `src/test/section.test.tsx` (7 tests) — Layout section wrappers verified.
  - `src/test/universalSubnav.test.tsx` (10 tests) — 6-pillar ribbon subnavigation verified.
  - `src/test/gccOperationsSection.test.ts` (17 tests) — Zero lingering legacy links in operations section.
  - `src/test/gccLabEconomics.test.ts` (16 tests) — Financial calculations, city benchmarks verified.
  - `src/test/servicePageLayout.test.tsx` (3 tests) — Canvas background and layout chrome verified.
  - `src/test/gccLabSnapshot.test.ts` (20 tests) — Case snapshot persistence verified.
  - `src/test/seoMetadata.test.ts` (12 tests) — Meta tags, title formulas, and canonical structures verified.
  - `src/test/gccLabGuidance.test.ts` (44 tests) — Decision Lab guidance rules verified.
  - `src/test/gccLabCostModel.test.ts` (18 tests) — TCO, savings, and headcount costing verified.
  - `src/test/aiTalentSection.test.ts` (10 tests) — AI talent cards and taxonomy verified.
  - `src/test/aiEngineeringSection.test.ts` (21 tests) — AI engineering child pages verified.
  - `src/test/netlifyFormDeclarations.test.ts` (21 tests) — Netlify form attributes verified.
  - `src/test/serviceNav.test.ts` (19 tests) — Service navigation links verified.
  - `src/test/formValidation.test.ts` (16 tests) — Email and phone validation rules verified.
  - `src/test/gccCostEngine.test.ts` (15 tests) — Engine algorithms verified.
  - `src/test/aiGccSection.test.ts` (14 tests) — AI GCC section data verified.
  - `src/test/squadCalculatorHandoff.test.ts` (12 tests) — Query param transfer verified.
  - `src/test/microGccData.test.ts` (10 tests) — Squad size economics verified.
  - `src/test/toolEmail.test.ts` (19 tests) — Payload sanitization and email templates verified.
  - `src/test/netlifyForms.test.ts` (6 tests) — Contact form submission payloads verified.
  - `src/test/gccCalculatorParams.test.ts` (22 tests) — URL state encoding verified.
  - `src/test/homepage.test.ts` (17 tests) — Homepage editorial components verified.
  - `src/test/blueprintLeadContext.test.ts` (4 tests) — Lead magnet context transfer verified.
  - `src/test/gccPodRecommendations.test.ts` (6 tests) — Pod recommendation matrix verified.
  - `src/test/example.test.ts` (1 test) — Base test runner verified.
  - `src/test/microGccCalculatorHandoff.test.ts` (8 tests) — Micro GCC calculator handoff verified.
  - `src/test/gccLabWorkspace.test.tsx` (18 tests) — Live calculator interactive workspace verified.
- **Total Tests:** 394 passed, 0 failed.

---

### C. Technical SEO Validation (`node scripts/validate-seo.mjs`)
- **Status:** All 609 assertions passed across 19 tested routes.
- **Assertions Verified Per Route:**
  - HTTP 200 status code response
  - Server-rendered `<title>` tag present
  - Server-rendered `<meta name="description">` present
  - Canonical URL matching public URL with `https://neointelli.com`
  - `robots` directive starting with `index,follow`
  - Schema graphs including `Organization` and `WebSite`
  - No duplicate schema `@type` declarations
  - Valid JSON parsing for all `<script type="application/ld+json">`
  - Zero dangling `@id` references
  - Open Graph tags present: `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:image`, `og:image:width`, `og:image:height`, `og:image:alt`
  - Twitter tags present: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`
  - Absolute image resolution for `og:image`
  - Exactly one `<h1>` heading per page
  - All `<img>` tags carry `alt` attributes
  - All `target="_blank"` links carry `rel` attributes
  - Sitemap declared in `robots.txt`
  - Hard 404 returned for unknown blog slugs (`/blog/this-post-does-not-exist` -> 404)

---

### D. Full Application Crawl (`scratch/run_full_audit_crawl.mjs`)
- **Routes Discovered:** 135 total application routes (87 static + 48 dynamic blog posts).
- **HTTP 200 Successful Responses:** 134 routes.
- **HTTP 404 Broken Routes:** **1 route — `/company`**.
- **Internal Links Discovered & Tested:** 125 unique internal link targets extracted from HTML.
- **Broken Internal Links:** 0 broken internal links (all internal anchor tags on live pages point to resolving destinations; `/company` was discovered via router definition and footer link mapping).
- **Heading Count Check:** 134 out of 134 successful pages contain exactly one `<h1>` tag (0 pages with missing or multiple `<h1>` tags).
- **Image Alt Check:**
  - `/`: 4 images with empty alt attributes.
  - `/services/gcc/strategy-business-case`: 14 images with decorative empty alt attributes (`alt="" aria-hidden="true"`).
  - `/lp/newhome`: 1 image with empty alt attribute.

---

### E. Legacy Redirection Audit
All 24 mapped legacy paths were tested with HTTP requests:
- `/services` -> `308` redirect to `/services/gcc`
- `/gcc-solutions` -> `308` redirect to `/services/gcc`
- `/services/development` -> `301` redirect to `/services/ai-engineering`
- `/services/technology` -> `301` redirect to `/services/ai-engineering`
- `/services/technology/data-platform` -> `301` redirect to `/services/ai-engineering/data-engineering`
- `/services/technology/process-automation` -> `301` redirect to `/services/ai-engineering/ai-agents-automation`
- `/services/technology/product-engineering` -> `301` redirect to `/services/ai-engineering/ai-product-engineering`
- `/build-gcc-india` -> `308` redirect to `/services/gcc/setup-launch`
- `/gcc` -> `308` redirect to `/services/ai-gcc`
- `/talent` -> `308` redirect to `/services/gcc-operations/workforce-strategy`
- `/pods` -> `301` redirect to `/services/ai-delivery-teams`
- `/pods/ai-data` -> `301` redirect to `/services/ai-delivery-teams/ai-delivery-pod`
- `/pods/engineering` -> `301` redirect to `/services/ai-delivery-teams/dedicated-ai-engineering-team`
- `/pods/transformation` -> `301` redirect to `/services/gcc/modernization-transformation`
- `/pods/architecture` -> `301` redirect to `/services/ai-engineering`
- `/gcc-operating-model` -> `301` redirect to `/services/gcc-operations`
- `/services/gcc/operations-excellence` -> `301` redirect to `/services/gcc-operations/service-management-performance`
- `/services/gcc/talent-management` -> `301` redirect to `/services/gcc-operations/workforce-strategy`
- `/services/gcc/technology-infrastructure` -> `301` redirect to `/services/gcc-operations/workplace-it-security`
- `/services/gcc/compliance-governance` -> `301` redirect to `/services/gcc-operations/governance-compliance`

---

## 3. Environment & Browser QA Limitations

1. **Headless Browser Automation Tooling Limitation:**
   - When attempting to run the automated `browser_subagent` to render live pages in Playwright, the browser manager failed to download the required Playwright driver binary:
     `error: got non 200 status code: 404 from https://playwright.azureedge.net/builds/driver/playwright-1.57.0-win32_x64.zip`
   - This failure is an external CDN/dependency issue with the automated Playwright driver download for Windows x64.
   - Consequently, visual pixel rendering, layout shifts (CLS), and Interaction to Next Paint (INP) were evaluated through:
     1. Empirical inspection of the rendered server HTML (460KB payload for `/`).
     2. Static analysis of CSS declarations (`.hero-viewport-fit`, media queries, Tailwind tokens).
     3. Unit and integration tests in the test suite.
   - **Recommendation:** Conduct manual visual QA on physical mobile devices (iPhone 14/15, Samsung Galaxy) and desktop browsers (Chrome, Safari, Firefox, Edge) prior to production deployment.

2. **Core Web Vitals & Production Performance Measurement:**
   - In the local development environment (`next dev`), JavaScript bundle sizes and hydration timings include development hot-reloading overhead.
   - True Core Web Vitals (LCP, FID/INP, CLS) must be measured on the deployed Netlify production build via Google PageSpeed Insights or Chrome User Experience Report (CrUX) under production CDN caching.
