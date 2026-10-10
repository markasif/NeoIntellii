# NeoIntelli — Website Audit Executive Summary

**Date:** October 10, 2026  
**Auditor:** Senior Multidisciplinary Website Audit Team (Frontend Architecture, UI/UX, Performance, SEO, A11y, CRO, Security, QA)  
**Target Repository:** `markasif/NeoIntellii` (Local Dev: `Next.js 16.3.5 Turbopack`)  
**Scope:** Comprehensive Audit across Architecture, 135 Application Routes, Navigation, Design System, Responsiveness, SEO, Accessibility, Security, and Conversion.  
**Audit Mode:** Strictly Non-Invasive & Read-Only (Zero application source code modifications made).

---

## 1. Overall Website Score: 81.6 / 100 (Grade: B+ / Strong)

The overall score is calculated using a transparent weighted rubric across 11 disciplines, prioritizing user journeys, technical integrity, security, and discoverability:

| Discipline / Category | Weight | Score (0–100) | Weighted Contribution | Status Summary |
|---|:---:|:---:|:---:|---|
| **Architecture & Code Quality** | 10% | **84** | 8.40 | Clean Next.js Pages shell, 394 unit tests passing, Turbopack support. Dead Three.js package bloat present. |
| **UI/UX & Visual Design** | 12% | **82** | 9.84 | Modern enterprise aesthetic, dark navy cards, liquid glass effects; global font-weight normalization creates visual flattening. |
| **Responsive Design** | 10% | **76** | 7.60 | Strong desktop/tablet grid systems; `.hero-viewport-fit` height clamps clip content on short/mobile viewports. |
| **Navigation & Link Integrity** | 12% | **85** | 10.20 | Deep interconnected 6-pillar architecture; 1 broken route (`/company` 404), legacy redirects cleanly mapped. |
| **Performance & Bundle** | 10% | **78** | 7.80 | Instant SSR HTML payloads, `unoptimized: true` on images, heavy unused 3D dependencies (`three`, `@react-three`). |
| **SEO & Discoverability** | 12% | **92** | 11.04 | Exceptional structured JSON-LD schemas (609 automated assertions passed), clean canonicals, complete sitemap. |
| **Accessibility (WCAG 2.2 AA)** | 8% | **76** | 6.08 | Semantic landmarks present; contrast ratios in dark subcards and decorative alt text coverage need polish. |
| **Content & IA Strategy** | 8% | **88** | 7.04 | Highly authoritative AI GCC positioning, rich domain-specific data, clear 6-pillar service taxonomy. |
| **Functionality & Reliability** | 8% | **86** | 6.88 | GCC Cost Calculator & Lab models fully functional, robust client-side validation, 0 build-breaking runtime errors. |
| **Security & Privacy** | 5% | **72** | 3.60 | Server-side API key containment in `/api/send-tool-email`, but `.env` containing Supabase keys is committed to git. |
| **Conversion & CRO** | 5% | **83** | 4.15 | Clear primary CTAs, persistent consultation touchpoints, high-value interactive decision tools. |
| **TOTAL WEIGHTED SCORE** | **100%** | — | **81.63 / 100** | **Strong Enterprise Foundation with Targeted Refinements Required** |

---

## 2. Executive Assessment & Findings Overview

NeoIntelli's web platform represents a sophisticated, content-rich enterprise web application built on **Next.js 16.3.5**. It successfully positions the company as India's premier AI-first Global Capability Center (GCC) operating partner. Unlike conventional agency websites that offer vague marketing claims, NeoIntelli features extensive domain depth, including 6 dedicated service pillars, 6 industry GCC models, 48 comprehensive technical guides/articles, and a proprietary interactive GCC Cost & Decision Lab (`/gcc-cost-calculator` and `/lp/gcc-playbook`).

The automated test suite demonstrates high engineering rigor with **394 unit/integration tests passing across 29 test files** and **609 automated SEO assertions passing across 19 critical routes**. 

However, the audit team identified critical architectural, security, and responsive defects that must be resolved before scaling marketing spend and international organic campaigns.

---

## 3. Top 5 Website Strengths

1. **State-of-the-Art Technical SEO & Schema Architecture (Score: 92/100):**  
   Every indexable route implements comprehensive JSON-LD graphs linking `Organization`, `WebSite`, `LocalBusiness`, `WebPage`, `BreadcrumbList`, `FAQPage`, and `Service` schemas with bidirectional `@id` resolution and zero dangling entity references.
2. **Exemplary Interactive Decision Engines (Score: 88/100):**  
   The GCC Cost Calculator (`/gcc-cost-calculator`) and Decision Lab (`/lp/gcc-playbook`) provide genuine utility for C-suite decision-makers with live city-by-city salary modeling, sensitivity parameters, and zero client data leakage.
3. **Rigorous Automated Quality Gates (Score: 86/100):**  
   The repository maintains 394 automated Vitest tests covering economics formulas, Netlify form payloads, competitor safety, and URL migration integrity.
4. **Comprehensive Content & Information Architecture (Score: 88/100):**  
   The taxonomy clearly articulates the 6 pillars: GCC Strategy & Setup, AI GCC, AI Talent, AI Engineering, AI Delivery Teams, and GCC Operations, backed by 48 thoroughly researched blog posts.
5. **Modern, High-Impact Enterprise Visual Identity (Score: 82/100):**  
   Curated palette of deep navy (`#0A224E`), cyan accent (`#169DC8`), sky-blue waves, and custom geometric pill cards conveying high-trust capability.

---

## 4. Top 5 Systemic Weaknesses & Critical Risks

1. **Active Broken Route Returning 404 (`/company`):**  
   `src/App.tsx` configures `"/company": () => import("./pages/About")` and `src/components/layout/Footer.tsx` / `src/lib/seo.ts` reference `/company`. However, Next.js Pages router relies on `pages/company.tsx` (which does not exist) and `next.config.mjs` lacks a `/company` redirect, returning an immediate **HTTP 404 Not Found** to visitors.
2. **Security Risk — `.env` File Tracked in Git:**  
   `git ls-files .env` confirms that `.env` is committed to version control and `.gitignore` lacks an entry for `.env`. While the values currently stored are client-safe anon keys, tracking `.env` directly in source control risks accidental leakage of administrative service role secrets.
3. **Responsive Clipping from Hardcoded Viewport Clamping (`.hero-viewport-fit`):**  
   In `src/index.css`, `.hero-viewport-fit` imposes `height: 100svh; max-height: 100svh;` with `overflow-hidden`. On mobile devices (viewports <= 600px height or landscape mode), hero content, buttons, or bottom ticker strips are clipped off-screen.
4. **Global Font-Weight Normalization Neutralizing Hierarchy:**  
   In `src/index.css` (lines 224–229), a broad CSS selector (`:where(:not(h1)).font-medium, :where(:not(h1)).font-bold ... { font-weight: 400; }`) flattens headings (`h2` through `h6`), card titles, and buttons down to standard 400 weight unless explicitly overridden inline.
5. **Dead Dependency Weight in Production Bundle:**  
   `package.json` installs `three`, `@react-three/fiber`, and `@react-three/drei`, which total over 30MB in node modules and introduce potential bundle bloat, despite being completely unreferenced in `src/`.

---

## 5. Top 10 Improvement Opportunities

| Rank | Issue ID | Area | Finding Summary | Recommended Action | Severity | Effort |
|:---:|:---:|---|---|---|:---:|:---:|
| 1 | **NAV-001** | Navigation | `/company` returns HTTP 404 | Add 301 redirect in `next.config.mjs` from `/company` to `/about` or create `pages/company.tsx`. | **P0** | 15 min |
| 2 | **SEC-001** | Security | `.env` tracked in git repository | Remove `.env` from git tracking (`git rm --cached .env`), add `.env*` to `.gitignore`. | **P1** | 15 min |
| 3 | **RESP-001** | Responsive | `.hero-viewport-fit` clips mobile content | Change `height: 100svh; max-height: 100svh;` to `min-h-[100svh]` or apply only on desktop (`md:` breakpoint). | **P1** | 30 min |
| 4 | **DES-001** | Visual Design | Global CSS forces headings to `font-weight: 400` | Remove lines 224-229 in `src/index.css` so Tailwind `font-bold` and `font-semibold` behave naturally. | **P1** | 30 min |
| 5 | **PERF-001** | Performance | Unused Three.js dependencies in bundle | Uninstall `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` from `package.json`. | **P2** | 15 min |
| 6 | **PERF-002** | Performance | `images.unoptimized: true` in `next.config.mjs` | Enable Next.js image optimization or configure Sharp/Netlify Image CDN for WebP/AVIF generation. | **P2** | 2 hours |
| 7 | **A11Y-001** | Accessibility | Subcard background contrast in dark themes | Calibrate text colors in dark cards (e.g. `StrategyBusinessCase.tsx` risk register) to ensure 4.5:1 ratio. | **P2** | 2 hours |
| 8 | **CRO-001** | Conversion | Secondary CTAs lack visual contrast in some headers | Ensure all secondary CTAs use high-contrast white button styles (`.btn-white`) with explicit borders. | **P2** | 1 hour |
| 9 | **NAV-002** | Navigation | Mobile sidebar accordion reset behavior | Ensure mobile sidebar sections remember active pillar and lock background scroll reliably across Safari iOS. | **P2** | 1 hour |
| 10 | **ARCH-001** | Architecture | Redundant root-level temporary script clutter | Archive or delete leftover one-off decomposition scripts (`analyze_original.cjs`, `decompile_dist.cjs`, etc.). | **P3** | 30 min |

---

## 6. Highest-Risk Pages Identified

1. **`/company`** — High Risk: Returns 404 to users and crawlers; referenced in Footer and SEO tables.
2. **`/services/gcc/strategy-business-case`** — Medium Risk: Contains 14 cards with decorative background images needing explicit alt/role attributes, plus dense technical text blocks.
3. **`/` (Homepage)** — Medium Risk: Hero container can experience content clipping on short viewports due to `.hero-viewport-fit` height clamping.
4. **`/recruitment` vs `/services/ai-talent`** — Medium Risk: Multiple overlapping recruitment and staffing routes exist during ongoing migration.
