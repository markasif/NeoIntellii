# Specification: NeoIntelli Production-Grade Codebase Refactor

## 1. Objective
Refactor the NeoIntelli codebase to production-grade standards: eliminate duplicate code (DRY), standardize component reuse, decouple monolithic inline JSX from data structures, organize public assets, and ensure rock-solid responsiveness.

**CRITICAL INVARIANT:**
The current rendered website is approved and is the visual source of truth.
- ZERO redesign
- ZERO typography changes (preserve exact font family, weights, sizes, and line-heights)
- ZERO content changes
- ZERO SEO or metadata changes
- ZERO business logic or API changes
- ZERO modifications to `/product` or anything specifically related to `/product`

---

## 2. Tech Stack & Invariants
- **Framework:** Next.js v16.3.5 (Pages router via `pages/*.tsx` wrapping `@/pages/*.tsx`)
- **Language:** TypeScript 5.8.3 (Strict mode, zero type errors)
- **Styling:** Tailwind CSS 3.4.17 + Vanilla CSS in `src/index.css`
- **Animations:** Framer Motion 12.35.2
- **Icons:** Lucide React
- **Testing:** Vitest 3.2.4 + React Testing Library
- **Typography Invariant:**
  - `font-sans`: Resolves to `--font-plus-jakarta` (Plus Jakarta Sans) as configured in `tailwind.config.ts`
  - `font-manrope`: Resolves to `--font-manrope` (Manrope)
  - `body` base fallback: Resolves to `--font-inter` (Inter)
  - `font-mono`: Used for numbers, codes, and metrics
  - `font-serif-display`: Used for decorative accents on `/lp/ai-first-gcc`
- **Canvas Invariant:** `#E7EDF9` with dark navy text `#2B3D66` / `#0D306C`
- **Section Spacing Invariant:** `py-8 sm:py-10 md:py-12 lg:py-14` (Homepage baseline)

---

## 3. Commands
- **Dev Server:** `npm run dev` (`next dev`)
- **Typecheck:** `npx tsc --noEmit`
- **Test:** `npm test` (`vitest run`)
- **Lint:** `npm run lint` (`next lint`)
- **Build Validation:** `npm run build` (`next build`)
- **SEO Validation:** `npm run seo:validate`

---

## 4. Boundaries (The Three-Tier Rule)

### Always Do:
- Run `npx tsc --noEmit` and `npm test` after each incremental task.
- Preserve exact visual rendering, component dimensions, padding, colors, and typography.
- Reuse existing approved architecture: `ServicePageLayout`, `Section`, `UniversalSubnav`, `UniversalLifecycle`, `TypewriterContextButton`, `SectionHeader`, `SlottedStepNumber`.
- Move candidate unused/debug assets to `/public/unused/` instead of hard deleting.

### Ask First:
- If any change could potentially impact `/product`.
- If an ambiguous design inconsistency cannot be resolved safely without visual change.
- If a route, URL structure, or canonical SEO link needs modification.

### Never Do:
- Touch or refactor anything related to `/product`.
- Replace or swap the font family (no injecting new fonts, no overriding font hierarchy).
- Change page content, marketing copy, or editorial wording.
- Alter calculators, assessment logic, or form submission endpoints.
- Break existing URLs, 301 redirects, or canonical links.

---

## 5. Scope & Component Architecture

### In-Scope Domains (68 Routes):
- Homepage (`/`)
- All 6 Service Pillars:
  1. GCC Strategy & Setup (`/services/gcc/*`, `/services/micro-gcc`)
  2. GCC Operations & Managed Services (`/services/gcc-operations/*`)
  3. Enterprise AI Engineering (`/services/ai-engineering/*`)
  4. AI GCC Architecture (`/services/ai-gcc/*`)
  5. AI Delivery Teams (`/services/ai-delivery-teams/*`)
  6. AI Talent & Recruitment (`/services/ai-talent/*`)
- Industry Verticals (`/industries/*`)
- Decision Lab & Tools (`/gcc-cost-calculator`, `/gcc-roi-estimator`, `/gcc-readiness-assessment`, etc.)
- Inner & Legal Pages (`/about`, `/case-studies`, `/contact`, `/careers`, `/blog`, `/privacy-policy`, etc.)
- Landing Pages (`/lp/*`)

### Out of Scope:
- `/product` and any components or assets specifically dedicated to `/product`.

---

## 6. Approved Component Strategy

```
Page Composition (e.g. BfsiGcc.tsx)
  │
  ├── ServicePageLayout or IndustryGccPage (Canvas #E7EDF9, Navbar, Footer, Consultation)
  │
  ├── Section (Canonical container: light #E7EDF9 / navy gradient with SVG waves)
  │     │
  │     ├── SectionHeader (eyebrow, title, description)
  │     │
  │     └── Domain UI Component (e.g. UniversalLifecycle, OutcomeCardGrid, InBrief)
  │
  └── UI Primitives (TypewriterContextButton, SlottedStepNumber, AmbientGlow)
```

**Do NOT Recreate:**
- No `UniversalLifecycle2` or `NewLifecycle`
- No `NewSection` or `CustomSection`
- No `UniversalSubnav2`
- No `ServicePageLayoutNew`
- No duplicate `InBrief` or `FlowDiagram`

---

## 7. Success Criteria & Verification
1. **Visual Parity:** Identical pixel rendering on representative breakpoints (375px, 768px, 1024px, 1440px).
2. **Typography Preservation:** Verified computed font-family in browser remains Plus Jakarta Sans on standard pages and Manrope on redesigned sections.
3. **Spacing Consistency:** All standard sections adhere to the homepage vertical rhythm `py-8 sm:py-10 md:py-12 lg:py-14`.
4. **Zero TypeScript Errors:** `npx tsc --noEmit` passes with 0 errors.
5. **Clean Test Suite:** Vitest tests pass cleanly.
6. **No Broken Links:** Zero broken internal links across all 68 routes.
