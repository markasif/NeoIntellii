# NeoIntelli — Website Improvement & Implementation Roadmap

**Purpose:** Actionable, structured execution plan for the subsequent implementation phase.  
**Auditor Instruction:** Strictly audit-only; this document establishes the scope, sequencing, and validation criteria for the subsequent implementation session.  
**Prioritization Formula:**  
$$\text{Priority Score} = \frac{\text{Impact (1–5)} \times \text{Confidence (1–5)} \times \text{Urgency (1–5)}}{\text{Effort (Hours)}} $$

---

## 1. Roadmap Overview & Timeline Summary

| Phase | Focus Area | Key Issues Addressed | Estimated Effort | Target Outcome |
|:---:|---|---|:---:|---|
| **Phase A** | **Critical Defects & Security** | NAV-001, SEC-001 | **1.0 hour** | Fix broken `/company` 404, sanitize `.env` git tracking |
| **Phase B** | **Navigation & Conversion Flows** | CRO-001, NAV-002, CRO-002, CRO-003 | **2.5 hours** | Standardize CTA hierarchy, polish mobile sidebar, enhance FAQ scanning |
| **Phase C** | **Responsive & Visual Integrity** | RESP-001, DES-001, RESP-002, RESP-004 | **3.0 hours** | Eliminate mobile hero clipping, restore bold font hierarchy, fix table scrolling |
| **Phase D** | **Performance & Bundle Optimization**| PERF-001, PERF-002, PERF-003 | **3.5 hours** | Purge 30MB+ Three.js bloat, enable Next.js image optimization |
| **Phase E** | **Accessibility & Technical SEO** | A11Y-001, A11Y-002, SEO-001, SEO-002 | **2.5 hours** | WCAG 2.2 AA card alt/role cleanup, consolidate recruitment migration |
| **Phase F** | **Architecture & Maintainability** | CODE-001, CODE-002, DES-002 | **1.5 hours** | Prune root decomposition scripts, resolve Recharts test dimensions |
| **TOTAL** | **Full Implementation Cycle** | **22 Issues** | **14.0 hours** | **Flawless Enterprise Production Readiness** |

---

## 2. Phase-by-Phase Implementation Specifications

### PHASE A — Critical Defects & Security (Immediate Execution)

#### Task A.1: Resolve `/company` 404 with 301 Permanent Redirect
- **Issue ID:** `NAV-001` (Severity: P0)
- **Target File:** `next.config.mjs`
- **Specific Action:** In `next.config.mjs`, locate the `redirects()` array (around line 77). Insert:
  ```javascript
  { source: '/company', destination: '/about', permanent: true },
  { source: '/company/', destination: '/about', permanent: true },
  ```
- **Expected Outcome:** Navigating to `http://localhost:3000/company` returns a clean `301/308 Permanent Redirect` directly to `/about`.
- **Regression Risk:** Zero.
- **Acceptance Criteria:** `curl.exe -I http://127.0.0.1:3000/company` responds with `HTTP 308` or `HTTP 301` and `Location: /about`.

#### Task A.2: Sanitize Git Tracking for `.env` and Update `.gitignore`
- **Issue ID:** `SEC-001` (Severity: P1)
- **Target Files:** `.gitignore`, `.env`, `.env.example`
- **Specific Action:**
  1. Add `.env` and `.env*.local` to `.gitignore`:
     ```gitignore
     # Local Environment
     .env
     .env*.local
     ```
  2. Untrack `.env` from git: `git rm --cached .env`
  3. Create `.env.example` with sanitized template variables.
- **Expected Outcome:** `.env` is ignored by Git; local configuration remains intact without being committed to remote GitHub.
- **Regression Risk:** None (Next.js continues reading local `.env` automatically).
- **Acceptance Criteria:** `git status` shows `.env` untracked, and `git ls-files .env` returns empty.

---

### PHASE B — Navigation & Conversion Flows

#### Task B.1: Standardize Secondary Hero CTAs (`.btn-white`)
- **Issue ID:** `CRO-001` (Severity: P2)
- **Target Components:** `src/features/home/components/Hero.tsx`, `src/components/gcc-strategy/GccStrategyHero.tsx`, `src/components/ai-gcc/AiGccHero.tsx`, `src/components/ai-talent/AiTalentHero.tsx`
- **Specific Action:** Ensure all secondary hero action buttons uniformly apply the `.btn-white` class with high-contrast borders and hover states, preventing washed-out appearance against light blue architectural backdrops.
- **Expected Outcome:** Unified, predictable visual hierarchy across all 6 service pillar heroes.
- **Regression Risk:** Low.
- **Acceptance Criteria:** Secondary buttons across all hero sections maintain minimum 4.5:1 text-to-background contrast and identical padding/border radii.

#### Task B.2: Smooth Mobile Sidebar Closing & Scroll Restoration
- **Issue ID:** `NAV-002` (Severity: P2)
- **Target Component:** `src/components/navigation/MobileSidebar.tsx`
- **Specific Action:** In the scroll-lock `useEffect` (lines 84–110), ensure that when `isOpen` becomes `false`, the window scroll position is restored cleanly:
  ```typescript
  if (!isOpen && originalBodyPosition === "fixed") {
    window.scrollTo(0, scrollYRef.current);
  }
  ```
- **Expected Outcome:** Mobile users on iOS Safari and Android Chrome retain their exact scroll position when opening and closing the mobile menu.
- **Regression Risk:** Low.
- **Acceptance Criteria:** Scroll down 1000px, open mobile menu, close menu -> page remains at 1000px without jumping to top.

#### Task B.3: External Link Indicator for NeoHireX Product Links
- **Issue ID:** `CRO-002` (Severity: P2)
- **Target Component:** `src/components/layout/Footer.tsx` (lines 111–114)
- **Specific Action:** Add `target="_blank" rel="noopener noreferrer"` and an `<ExternalLink className="w-3 h-3 ml-1 inline" />` icon to links leading to `https://neohirex.ai/*`.
- **Expected Outcome:** Users understand clicking "AI Interview" or "DPDP Act 2023" opens an external product portal without leaving the main NeoIntelli site.
- **Regression Risk:** None.
- **Acceptance Criteria:** External links render external indicator and open in a new browser tab.

---

### PHASE C — Responsive & Visual Consistency

#### Task C.1: Remove Hard Viewport Height Clamping on Mobile Heroes
- **Issue ID:** `RESP-001` (Severity: P1)
- **Target File:** `src/index.css` (lines 870–877)
- **Specific Action:** Refactor `.hero-viewport-fit` to allow expansion on viewports shorter than 640px:
  ```css
  .hero-viewport-fit {
    min-height: 100svh;
  }
  @media (min-width: 1024px) {
    .hero-viewport-fit {
      height: 100svh;
      max-height: 100svh;
    }
  }
  ```
- **Expected Outcome:** On mobile screens in portrait and landscape modes, hero content and CTA buttons never get clipped by the viewport boundary.
- **Regression Risk:** Low (desktop retains 100svh full-screen presentation).
- **Acceptance Criteria:** Render hero at 375x550px viewport; all CTAs and bottom tickers remain fully visible and scrollable.

#### Task C.2: Remove Destructive Global Font-Weight Flattening
- **Issue ID:** `DES-001` (Severity: P1)
- **Target File:** `src/index.css` (lines 224–229)
- **Specific Action:** Delete the following lines:
  ```css
  /* REMOVE THIS BLOCK */
  :where(:not(h1)).font-medium,
  :where(:not(h1)).font-semibold,
  :where(:not(h1)).font-bold,
  :where(:not(h1)).font-extrabold,
  :where(:not(h1)).font-black { font-weight: 400; }
  ```
- **Expected Outcome:** Tailwind typography utility classes (`font-semibold`, `font-bold`, `font-extrabold`) function as intended, restoring contrast and readability to section titles, metrics, card badges, and buttons.
- **Regression Risk:** Medium (requires visual verification that no heading becomes unintentionally bold where 400 was desired).
- **Acceptance Criteria:** `h2` and `h3` elements with `font-bold` render at computed font weight `700`.

#### Task C.3: Responsive Horizontal Scroll Indicators for Benchmark Tables
- **Issue ID:** `RESP-002` (Severity: P2)
- **Target File:** `src/pages/GCCIndiaCost.tsx`
- **Specific Action:** Add a subtle horizontal scroll indicator and mobile prompt above multi-city tables:
  ```tsx
  <div className="sm:hidden text-xs text-[#505D74] flex items-center gap-1.5 mb-2">
    <span>↔ Scroll horizontally to view all cities</span>
  </div>
  ```
- **Expected Outcome:** Mobile visitors immediately recognize that data extends beyond the right edge of the screen.
- **Regression Risk:** Zero.
- **Acceptance Criteria:** Message visible only below 640px.

---

### PHASE D — Performance & Bundle Optimization

#### Task D.1: Uninstall Unused Three.js Dependencies
- **Issue ID:** `PERF-001` (Severity: P2)
- **Target File:** `package.json`
- **Specific Action:** Run `npm uninstall three @react-three/fiber @react-three/drei @types/three`.
- **Expected Outcome:** Reduces `node_modules` size by ~35MB, accelerates install/build times, prevents accidental dead chunk splitting.
- **Regression Risk:** Zero (verified zero usages in `src/`).
- **Acceptance Criteria:** `npm run build` succeeds with zero unresolved import errors.

#### Task D.2: Enable Next.js Native Image Optimization
- **Issue ID:** `PERF-002` (Severity: P2)
- **Target File:** `next.config.mjs` (line 73)
- **Specific Action:** Change `unoptimized: true` to `unoptimized: false` (or remove the override). Configure remote patterns or Netlify image optimization plugin.
- **Expected Outcome:** Images are automatically converted to WebP/AVIF format with responsive `srcset` generation, cutting hero and card image weight by 40–60%.
- **Regression Risk:** Medium (test image loading across local dev and Netlify preview).
- **Acceptance Criteria:** Hero image response headers return `Content-Type: image/webp` or `image/avif`.

---

### PHASE E — Accessibility & Technical SEO

#### Task E.1: Enhance WCAG Semantics for Risk Register Cards
- **Issue ID:** `A11Y-001` (Severity: P1)
- **Target File:** `src/pages/services/gcc/StrategyBusinessCase.tsx`
- **Specific Action:** In lines 480–484, update the `<img src={item.image} ... />` tag to provide a contextual alt label or move the image to a CSS `backgroundImage` with `role="presentation"`.
- **Expected Outcome:** 14 automated accessibility audit warnings resolved.
- **Regression Risk:** Zero.
- **Acceptance Criteria:** Automated SEO / A11y crawler reports 0 empty alt errors on `/services/gcc/strategy-business-case`.

#### Task E.2: Finalize Legacy Recruitment 301 Migration
- **Issue ID:** `SEO-001` (Severity: P2)
- **Target File:** `next.config.mjs` (lines 105–114)
- **Specific Action:** Uncomment the planned 301 redirects mapping `/recruitment/rpo` and `/recruitment/executive-search` directly to their modern counterparts in `/services/ai-talent/*`.
- **Expected Outcome:** Consolidated keyword equity and single canonical source for talent acquisition queries.
- **Regression Risk:** Low (check existing search engine traffic).
- **Acceptance Criteria:** Requesting `/recruitment/rpo` returns 301 to `/services/ai-talent/recruitment-hub`.

---

### PHASE F — Architecture & Maintainability

#### Task F.1: Archive Legacy Decompilation Scripts from Root
- **Issue ID:** `CODE-001` (Severity: P2)
- **Target Directory:** Project Root
- **Specific Action:** Create `scripts/archive/` and move the 15 one-off `.cjs`, `.js`, and `.txt` files (`analyze_original.cjs`, `decompile_dist.cjs`, etc.) into the archive directory.
- **Expected Outcome:** Clean, professional workspace root containing only standard configuration files (`next.config.mjs`, `package.json`, `tsconfig.json`, `tailwind.config.ts`).
- **Regression Risk:** Zero.
- **Acceptance Criteria:** Clean root listing; `npm test` and `npm run dev` function identically.

#### Task F.2: Supply Default Dimensions for Recharts Test Harness
- **Issue ID:** `CODE-002` (Severity: P3)
- **Target File:** `src/test/gccLabWorkspace.test.tsx`
- **Specific Action:** Provide mock container dimensions (`minWidth: 400, minHeight: 300`) in test mocks for `<ResponsiveContainer>` so Recharts does not emit zero-dimension stderr logs during test runs.
- **Expected Outcome:** Clean, quiet test suite execution with 0 stderr noise.
- **Regression Risk:** None.
- **Acceptance Criteria:** `npm test` runs with zero stderr logs.
