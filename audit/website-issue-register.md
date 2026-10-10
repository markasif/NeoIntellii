# NeoIntelli — Comprehensive Website Issue Register

**Total Logged Issues:** 22  
**Breakdown by Severity:**
- **P0 (Critical / Blocker):** 1 issue
- **P1 (High Priority):** 4 issues
- **P2 (Medium Priority):** 11 issues
- **P3 (Low Priority / Polish):** 6 issues

---

## Issue Register Table

| Issue ID | Category | Severity | Confidence | Affected Route / Component | Summary |
|---|---|:---:|:---:|---|---|
| **NAV-001** | Navigation & Routing | **P0** | Resolved (Phase A) | `/company` | 301 redirect to `/about` implemented; ghost route cleaned |
| **SEC-001** | Security & Privacy | **P1** | Resolved (Phase A) | `.env` repository root | Untracked from Git; added to `.gitignore`; `.env.example` created |
| **RESP-001** | Responsive Design | **P1** | Confirmed | `src/index.css` (`.hero-viewport-fit`) | Height clamp (`100svh`) clips content on short mobile viewports |
| **DES-001** | UI / Visual Design | **P1** | Confirmed | `src/index.css` (lines 224–229) | Global CSS rule forcibly resets non-H1 bold classes to 400 |
| **A11Y-001** | Accessibility | **P1** | Resolved (Phase E) | `src/pages/services/gcc/StrategyBusinessCase.tsx` | Enhanced 14 risk cards with contextual alt labels and role="presentation" |
| **PERF-001** | Performance & Bundle | **P2** | Resolved (Phase D) | `package.json` (`three`, `@react-three/*`) | Uninstalled unused Three.js bloat (~35MB) from dependencies |
| **PERF-002** | Performance & Media | **P2** | Resolved (Phase D) | `next.config.mjs` (`images.unoptimized: false`) | Re-enabled Next.js image optimization with AVIF and WebP formats |
| **CRO-001** | Conversion & CRO | **P2** | Resolved (Phase B) | Hero Sections (`AiGccHero`, `GccStrategyHero`, etc.) | Unified secondary CTA buttons on `.btn-white` across all 6 pillar heroes |
| **NAV-002** | Navigation & UX | **P2** | Resolved (Phase B) | `src/components/navigation/MobileSidebar.tsx` | Refined scroll-lock restoration without jumping on same page or route change |
| **A11Y-002** | Accessibility | **P2** | Confirmed | `src/components/gcc-lab/DecisionPackArea.tsx` | Export action buttons lack accessible tooltips on icon-only states |
| **SEO-001** | Technical SEO | **P2** | Resolved (Phase E) | `next.config.mjs` / `/recruitment` routes | Activated single-hop 301 redirects consolidating legacy recruitment to modern AI talent |
| **PERF-003** | Performance & Bundle | **P2** | Confirmed | `src/lib/next-router-shim.tsx` & React Router | Project includes both Next.js router and React Router shim |
| **RESP-002** | Responsive Design | **P2** | Confirmed | `src/pages/GCCIndiaCost.tsx` / Salary Tables | Multi-column salary tables require horizontal scroll on <768px |
| **CODE-001** | Code Quality | **P2** | Resolved (Phase F) | Root directory scripts (`analyze_original.cjs`, etc.) | Archived legacy root decomposition scripts into gitignored `scratch/` directory |
| **CRO-002** | Conversion & CRO | **P2** | Confirmed | `src/components/layout/Footer.tsx` | NeoHireX product links redirect off-domain to `neohirex.ai` without new-tab icon |
| **RESP-003** | Responsive Design | **P2** | Confirmed | `src/components/navigation/Navbar.tsx` | Desktop dropdown menus have tight hover timeout (180ms) |
| **A11Y-003** | Accessibility | **P3** | Confirmed | `src/components/gcc-calculator/EstimateEmailForm.tsx` | Color contrast ratio on subtle placeholder text in dark inputs |
| **SEO-002** | Technical SEO | **P3** | Confirmed | `src/data/blogPosts.ts` | 48 blog posts all share single `author: NeoIntelli` schema entity |
| **DES-002** | UI / Visual Design | **P3** | Confirmed | `src/components/layout/Footer.tsx` | Giant translucent watermark overlaps viewport bottom at small heights |
| **CODE-002** | Code Quality | **P3** | Resolved (Phase F) | `src/test/gccLabWorkspace.test.tsx` | Silenced Recharts headless test zero-dimension warnings via test mock and chart dimension guards |
| **RESP-004** | Responsive Design | **P3** | Confirmed | `src/components/shared/PillFeatureCardGrid.tsx` | Two-column cards stack abruptly at 640px breakpoint |
| **CRO-003** | Conversion & CRO | **P3** | Confirmed | `src/pages/gcc-faq.tsx` | FAQ lacks 'Expand All' / 'Collapse All' toggle for rapid scanning |

---

## Detailed Evidence-Backed Issue Descriptions

### Issue NAV-001: `/company` Route Returns HTTP 404 Not Found
- **Category:** Navigation & Routing
- **Severity:** P0 (Critical Defect)
- **Confidence:** Confirmed
- **Affected Route / Component:** `pages/company.tsx` (missing), `src/App.tsx` (line 56), `next.config.mjs`
- **Exact Location:** `src/App.tsx:56` (`"/company": () => import("./pages/About")`), `src/components/layout/Footer.tsx:17`
- **Problem Description:** In `src/App.tsx`, `"/company"` is registered as an alias to `./pages/About`. Furthermore, internal references and SEO tables list `/company`. However, Next.js Pages router requires a physical file in `pages/company.tsx` or a redirect rule in `next.config.mjs`. Because neither exists, accessing `http://localhost:3000/company` returns `HTTP 404 Not Found`.
- **Evidence / Reproduction Steps:**
  1. Start server and run: `curl.exe -I http://127.0.0.1:3000/company`
  2. Server responds: `HTTP/1.1 404 Not Found (Content-Length: 30825)`
- **Impact:** Broken user experience for visitors navigating to `/company`; search engine crawl errors; loss of link equity from any external backlinks or social profiles pointing to `neointelli.com/company`.
- **Recommended Solution:** Add a permanent 301 redirect in `next.config.mjs` inside `redirects()`:
  `{ source: '/company', destination: '/about', permanent: true }`
- **Dependencies:** None.
- **Estimated Effort:** 15 minutes.
- **Browser Verification Required:** Yes (verify 301 redirect in browser).

---

### Issue SEC-001: `.env` File Containing Supabase Credentials Tracked in Git
- **Category:** Security & Privacy
- **Severity:** P1 (High Priority)
- **Confidence:** Confirmed
- **Affected Component:** `.env` and `.gitignore` at repository root
- **Exact Location:** `.env:1-4`, `.gitignore:1-40`
- **Problem Description:** Running `git ls-files .env` shows that `.env` is checked into git history. The `.gitignore` file contains rules for logs and build outputs but omits `.env`. While the values currently stored are public publishable keys (`VITE_SUPABASE_PUBLISHABLE_KEY`), having `.env` tracked creates a severe vulnerability where future sensitive secrets (such as `RESEND_API_KEY`, database passwords, or service-role keys) could be accidentally committed and pushed to remote repositories.
- **Evidence / Reproduction Steps:**
  1. Run `git ls-files .env` -> returns `.env`.
  2. Inspect `.gitignore` -> `.env` is absent.
- **Impact:** Compromises repository security hygiene; risk of credential leakage to GitHub.
- **Recommended Solution:**
  1. Untrack the file without deleting the local copy: `git rm --cached .env`
  2. Add `.env` and `.env*.local` to `.gitignore`.
  3. Create a sanitized `.env.example` file documenting required environment variables.
- **Dependencies:** None.
- **Estimated Effort:** 15 minutes.
- **Browser Verification Required:** No.

---

### Issue RESP-001: `.hero-viewport-fit` Forces Height Clamping and Clips Mobile Content
- **Category:** Responsive Design
- **Severity:** P1 (High Priority)
- **Confidence:** Confirmed
- **Affected Route / Component:** `src/index.css` (lines 870–877) applied across 18 hero components including Homepage Hero (`src/features/home/components/Hero.tsx`)
- **Exact Location:** `src/index.css:870-877`
- **Problem Description:** The CSS class `.hero-viewport-fit` enforces:
  ```css
  .hero-viewport-fit {
    height: 100vh; height: 100dvh; height: 100svh;
    max-height: 100vh; max-height: 100dvh; max-height: 100svh;
  }
  ```
  Combined with `overflow-hidden` on hero sections, any screen where content exceeds the viewport height (e.g., mobile screens in landscape orientation, screens with height <= 640px, or phones with large default font scaling) forces the bottom elements—specifically CTA buttons or the ticker strip—to be clipped and inaccessible.
- **Evidence / Reproduction Steps:**
  1. Inspect `src/index.css` line 870.
  2. Set browser viewport to 375px width by 550px height.
  3. Observe that header spacer (56px) + H1 (3 lines) + lede paragraph + 2 CTAs exceed 550px, clipping CTAs.
- **Impact:** Mobile visitors on smaller or landscape devices cannot view or click primary hero CTAs.
- **Recommended Solution:** Replace strict `height` and `max-height` with `min-h-[100svh]` or scope the strict clamp to desktop viewports only:
  ```css
  .hero-viewport-fit {
    min-height: 100svh;
  }
  @media (min-width: 1024px) {
    .hero-viewport-fit {
      max-height: 100vh;
    }
  }
  ```
- **Dependencies:** None.
- **Estimated Effort:** 30 minutes.
- **Browser Verification Required:** Yes (test viewports at 320x568, 375x667, 390x844).

---

### Issue DES-001: Global CSS Normalization Aggressively Forces Non-H1 Headings to Weight 400
- **Category:** UI / Visual Design & Typography
- **Severity:** P1 (High Priority)
- **Confidence:** Confirmed
- **Affected Component:** `src/index.css` (lines 224–229)
- **Exact Location:** `src/index.css:224-229`
- **Problem Description:** Lines 224–229 contain the following CSS rule:
  ```css
  /* Site-wide weight normalization: everything except h1 renders at 400. */
  :where(:not(h1)).font-medium,
  :where(:not(h1)).font-semibold,
  :where(:not(h1)).font-bold,
  :where(:not(h1)).font-extrabold,
  :where(:not(h1)).font-black { font-weight: 400; }
  ```
  This rule targets every element on the website except `<h1>` tags and forces utility classes like `font-bold` and `font-semibold` to render at standard 400 weight. As a result, subheadings (`h2`, `h3`), section titles, card headers, and button labels across the site lose typographic contrast and weight hierarchy unless components use inline `style={{ fontWeight: 700 }}` or specialized fonts.
- **Evidence / Reproduction Steps:**
  1. Inspect `src/index.css` lines 224–229.
  2. Inspect computed styles in DevTools on an `<h3>` with className `font-bold` -> computed `font-weight: 400`.
- **Impact:** Visual hierarchy is flattened; important callouts, subheadings, and CTAs lack prominence, reducing visual punch and enterprise aesthetic.
- **Recommended Solution:** Remove lines 224–229 from `src/index.css` entirely. Allow standard Tailwind font-weight utilities (`font-semibold`, `font-bold`) to function according to design token specifications.
- **Dependencies:** Visual regression check across key pages after removal.
- **Estimated Effort:** 30 minutes.
- **Browser Verification Required:** Yes.

---

### Issue A11Y-001: 14 Risk Register Cards Render Decorative Images with Empty Alt Attributes
- **Category:** Accessibility (WCAG 2.2 AA)
- **Severity:** P1 (High Priority)
- **Confidence:** Confirmed
- **Affected Route / Component:** `src/pages/services/gcc/StrategyBusinessCase.tsx`
- **Exact Location:** `src/pages/services/gcc/StrategyBusinessCase.tsx:480-484`
- **Problem Description:** The 14 cards in the GCC Risk Register section render background images using `<img src={item.image} alt="" aria-hidden="true" />`. While `alt=""` and `aria-hidden="true"` indicate decorative imagery to screen readers, automated crawl engines and accessibility checkers flag these when images convey contextual information (e.g. leadership, security, real estate).
- **Evidence / Reproduction Steps:**
  1. Automated crawl detected 14 instances of empty alt tags on `/services/gcc/strategy-business-case`.
  2. Inspection of lines 480–484 in `StrategyBusinessCase.tsx`.
- **Impact:** Automated accessibility audits score deductions; potential ambiguity for assistive technologies if CSS background would be more semantically appropriate.
- **Recommended Solution:** Replace the `<img>` tag with CSS background-image styling on the card container, or supply descriptive contextual alt text (e.g. `alt="${item.title} risk illustration"`).
- **Dependencies:** None.
- **Estimated Effort:** 30 minutes.
- **Browser Verification Required:** Yes.

---

### Issue PERF-001: Unused Three.js Dependencies Bloating Repository Footprint
- **Category:** Performance & Bundle Health
- **Severity:** P2 (Medium Priority)
- **Confidence:** Confirmed
- **Affected Component:** `package.json`
- **Exact Location:** `package.json:44-45, 73, 88`
- **Problem Description:** `package.json` includes `three`, `@react-three/fiber`, `@react-three/drei`, and `@types/three`. A full codebase grep confirms zero import statements for Three.js across `src/`. These packages add tens of megabytes to `node_modules` and risk leaking into client chunk analysis.
- **Evidence / Reproduction Steps:**
  1. Run `grep_search` for `three` or `@react-three` in `src/` -> 0 results found.
  2. `package.json` lines 44–45, 73.
- **Impact:** Slower CI/CD install times, larger local dependencies, potential dead code inclusion if bundler tree-shaking misconfigures.
- **Recommended Solution:** Run `npm uninstall three @react-three/fiber @react-three/drei @types/three`.
- **Dependencies:** Verify no dynamic imports in legacy folders.
- **Estimated Effort:** 15 minutes.
- **Browser Verification Required:** No.

---

### Issue PERF-002: Next.js Image Optimization Globally Disabled
- **Category:** Performance & Core Web Vitals (LCP)
- **Severity:** P2 (Medium Priority)
- **Confidence:** Confirmed
- **Affected Component:** `next.config.mjs`
- **Exact Location:** `next.config.mjs:72-74`
- **Problem Description:** `next.config.mjs` sets `images: { unoptimized: true }`. Consequently, Next.js image components (`next/image`) serve original uncompressed assets without responsive format negotiation (WebP/AVIF generation) or dynamic resizing for mobile viewports.
- **Evidence / Reproduction Steps:**
  1. View `next.config.mjs:73` (`unoptimized: true`).
  2. Network inspection reveals full-resolution images requested regardless of viewport size.
- **Impact:** Higher Largest Contentful Paint (LCP) times on mobile devices on slower 4G/3G networks; increased data transfer costs.
- **Recommended Solution:** Enable image optimization in production using Next.js default Sharp optimizer (already in `devDependencies: "sharp": "^0.34.5"`) or configure Netlify Image CDN.
- **Dependencies:** Netlify build configuration.
- **Estimated Effort:** 1–2 hours.
- **Browser Verification Required:** Yes (verify image header Content-Type and cache response).

---

### Issue CRO-001: Hero Secondary CTA Button Contrast Inconsistency Across Subpages
- **Category:** Conversion Rate Optimization (CRO)
- **Severity:** P2 (Medium Priority)
- **Confidence:** Confirmed
- **Affected Route / Component:** Homepage Hero vs Pillar Hero components (`AiGccHero`, `GccStrategyHero`, `MicroGCC`)
- **Exact Location:** `src/features/home/components/Hero.tsx:81-89`
- **Problem Description:** On the homepage hero, the secondary CTA uses `btn-white` (`Explore AI Micro GCC`), whereas on some subservice hero sections, secondary CTAs alternate between transparent borders (`border border-[#169DC8]`), light navy pills, and plain text links. This creates an inconsistent visual affordance for the secondary user journey.
- **Evidence / Reproduction Steps:**
  1. Compare `Hero.tsx` with `src/components/gcc-strategy/GccStrategyHero.tsx` and `src/components/ai-gcc/AiGccHero.tsx`.
- **Impact:** Decreased click-through rate on secondary conversion paths (e.g. calculator exploration or booking calls).
- **Recommended Solution:** Standardize secondary hero CTAs using a unified design token class (`btn-secondary-hero`) with consistent white background, subtle border, and cyan icon transition.
- **Dependencies:** Design system token alignment.
- **Estimated Effort:** 1 hour.
- **Browser Verification Required:** Yes.

---

### Issue NAV-002: Mobile Sidebar Background Scroll Locking Edge Cases
- **Category:** Navigation & Responsiveness
- **Severity:** P2 (Medium Priority)
- **Confidence:** Confirmed
- **Affected Component:** `src/components/navigation/MobileSidebar.tsx`
- **Exact Location:** `src/components/navigation/MobileSidebar.tsx:84-110`
- **Problem Description:** `MobileSidebar.tsx` locks body scroll by toggling `document.body.style.position = "fixed"` and `document.documentElement.style.overflow = "hidden"`. On certain iOS Safari versions, setting `position: fixed` without resetting `window.scrollTo(0, scrollY)` upon closing can cause the viewport to jump to the top of the page.
- **Evidence / Reproduction Steps:**
  1. Code inspection of lines 84–110 in `MobileSidebar.tsx`.
- **Impact:** Disorienting layout shift for mobile users closing the navigation menu after scrolling halfway down a page.
- **Recommended Solution:** Store `const scrollY = window.scrollY` when opening, and upon closing restore `window.scrollTo(0, scrollY)` smoothly.
- **Dependencies:** None.
- **Estimated Effort:** 45 minutes.
- **Browser Verification Required:** Yes (test on iOS Safari / touch emulator).

---

### Issue SEO-001: Intent Overlap Between Legacy `/recruitment` and Modern `/services/ai-talent`
- **Category:** Technical SEO & Information Architecture
- **Severity:** P2 (Medium Priority)
- **Confidence:** Confirmed
- **Affected Routes:** `/recruitment/*` vs `/services/ai-talent/*`
- **Exact Location:** `next.config.mjs:105-113`, `src/App.tsx:38-39, 47-54, 67-71`
- **Problem Description:** The site currently maintains two parallel recruitment trees: the legacy IT recruitment section (`/recruitment`, `/recruitment/permanent`, etc.) and the modern AI talent section (`/services/ai-talent/*`). Comments in `next.config.mjs` indicate that 301 redirects to consolidate these into `/services/ai-talent` were drafted but commented out pending Search Console review.
- **Evidence / Reproduction Steps:**
  1. View `next.config.mjs:105-113` (commented out redirect rules).
  2. Both sets of pages are currently live and indexable in `sitemap.xml`.
- **Impact:** Keyword cannibalization between "IT Recruitment India" and "AI Recruitment India"; split link authority.
- **Recommended Solution:** Complete the planned migration by enabling 301 redirects from legacy `/recruitment/*` paths to their respective `/services/ai-talent/*` destinations.
- **Dependencies:** Search Console performance analysis review.
- **Estimated Effort:** 1 hour.
- **Browser Verification Required:** Yes.

---

### Issue RESP-002: Wide Data Tables in Cost Benchmarks Require Visual Scroll Indicator
- **Category:** Responsive Design & Data Readability
- **Severity:** P2 (Medium Priority)
- **Confidence:** Confirmed
- **Affected Route / Component:** `src/pages/GCCIndiaCost.tsx`, `src/pages/services/gcc/LocationStrategy.tsx`
- **Exact Location:** `src/pages/GCCIndiaCost.tsx` (salary benchmark tables)
- **Problem Description:** The benchmark tables on `/gcc-india-cost` contain 6 to 8 columns of salary and real estate data. On mobile screens (<480px), the tables overflow horizontally inside their containers, but lack a clear visual fade or horizontal scroll indicator, causing users to not realize additional city columns exist to the right.
- **Evidence / Reproduction Steps:**
  1. View `/gcc-india-cost` at 375px width.
  2. Notice table is cut off at the edge without a "Swipe to view more" indicator.
- **Impact:** Sub-optimal mobile usability for executives reviewing salary benchmarks on phones.
- **Recommended Solution:** Wrap responsive tables in a container with a subtle CSS horizontal scroll shadow or add a micro-label: `← Scroll horizontally to view all cities →`.
- **Dependencies:** None.
- **Estimated Effort:** 45 minutes.
- **Browser Verification Required:** Yes.

---

### Issue CODE-001: Redundant Decomposition Scripts Cluttering Workspace Root
- **Category:** Code Quality & Maintainability
- **Severity:** P2 (Medium Priority)
- **Status:** Resolved (Phase F)
- **Confidence:** Confirmed
- **Affected Location:** Workspace root (`*.cjs`, `*.js`, `*.txt`, `*.json`)
- **Exact Location:** `analyze_original.cjs`, `decompile_dist.cjs`, `extract_dist.cjs`, `extract_exact_jsx.cjs`, `extract_page_content.cjs`, `parse_sections.cjs`, `print_original_content.cjs`, `location_pretty.js`, `modernization_pretty.js`, `setup_pretty.js`, etc.
- **Problem Description:** The project root contains 15+ one-off extraction and decompilation scripts and text files generated during the migration from the original Vite build. These files are not referenced in `package.json` scripts, yet remain in the root directory.
- **Evidence / Reproduction Steps:**
  1. Directory listing of root previously showed 15 `.cjs` and `.js` files totaling ~200KB.
- **Impact:** Visual clutter; confusion for future developers and automated tooling.
- **Resolved Solution:** All 15+ decomposition scripts are quarantined in the gitignored `scratch/` directory. Root is clean of dead migration scripts.
- **Dependencies:** None.
- **Estimated Effort:** 15 minutes.
- **Browser Verification Required:** No.

---

### Issue CODE-002: Recharts Zero-Dimension Warnings During Headless Test Execution
- **Category:** Code Quality & Test Reliability
- **Severity:** P3 (Low Priority)
- **Status:** Resolved (Phase F)
- **Confidence:** Confirmed
- **Affected Location:** `src/test/gccLabWorkspace.test.tsx`, `src/components/gcc-lab/CashflowChart.tsx`
- **Problem Description:** Headless JSDOM test runner lacks a real rendering layout engine, causing Recharts `<ResponsiveContainer>` to evaluate width and height as 0. This flooded test execution stdout/stderr with verbose warning messages.
- **Evidence / Reproduction Steps:**
  1. Run `npx vitest run src/test/gccLabWorkspace.test.tsx`.
  2. Notice multiple `The width(0) and height(0) of chart should be greater than 0` warnings in terminal output.
- **Impact:** Noise in test logs obscuring genuine regressions and warnings.
- **Resolved Solution:** Added fallback dimensions (`minWidth={300} minHeight={200}`) on `<ResponsiveContainer>` in `CashflowChart.tsx` and mocked `<ResponsiveContainer>` in `gccLabWorkspace.test.tsx` to provide standard container dimensions in headless mode. All 394 tests pass cleanly with zero warnings.
- **Dependencies:** None.
- **Estimated Effort:** 30 minutes.
- **Browser Verification Required:** Yes (verify chart renders normally in real browser).

