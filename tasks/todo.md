# Refactor Task List: NeoIntelli Production-Grade Refactor

## Phase 1: Foundation Alignment & Baseline Fixes
- [x] Task 1.1: Fix legacy link `/services/gcc/technology-infrastructure` in `src/pages/CaseStudies.tsx` to point to `/services/gcc-operations/workplace-it-security`
  - Acceptance: `src/test/gccOperationsSection.test.ts` passes cleanly without assertions failing.
  - Verify: `npx vitest run src/test/gccOperationsSection.test.ts`
  - Files: `src/pages/CaseStudies.tsx`
- [x] Task 1.2: Verify and standardize `ServicePageLayout` across inner pages (`About.tsx`, `Contact.tsx`, `CaseStudies.tsx`, `careers.tsx`)
  - Acceptance: `ServicePageLayout` extended with optional `consultationWaveFill` and `consultationHideWaveDivider`. Intentional `#E7EDF9` vs `#F0F5FA` distinct canvas backgrounds preserved with zero visual regression.
  - Verify: `npx tsc --noEmit` and browser check on `/about`, `/contact`, `/case-studies`.
  - Files: `src/components/layout/ServicePageLayout.tsx`, `src/pages/About.tsx`, `src/pages/Contact.tsx`, `src/pages/CaseStudies.tsx`, `src/pages/careers.tsx`

## Checkpoint 1
- [x] `npx tsc --noEmit` passes with 0 errors
- [x] `npx vitest run src/test/gccOperationsSection.test.ts` passes

---

## Phase 2: Shared Component & Primitive Consolidation
- [x] Task 2.1: Audit and preserve semantic boundaries between `ai-gcc/FlowDiagram` and `gcc-operations/FlowDiagram`
  - Acceptance: Verified separate DOM models (animated process flow vs governance responsibility matrix) without forced unnatural abstraction.
  - Verify: `npx tsc --noEmit`
- [x] Task 2.2: Audit and preserve semantic boundaries between `ai-gcc/SourceNote` and `gcc-operations/SourceNote`
  - Acceptance: Quoted research citation block and legal disclaimer bar kept cleanly focused on their specific domain semantics.
  - Verify: `npx tsc --noEmit`
- [x] Task 2.3: Standardize `Consultation` canonical import across all pages
  - Acceptance: All 7 consumer pages (`SEOBlueprint`, `Industries`, `GCCIndiaCost`, `gcc-faq`, `CaseStudies`, `BlogPost`, `About`) migrated to canonical `@/features/home/components/Consultation`.
  - Verify: `npm test` passes (394/394)
- [x] Task 2.4: Convert hardcoded absolute `https://neointelli.com/...` URLs in `Footer.tsx` to relative paths and wire real legal routes
  - Acceptance: Footer links use relative paths, preserving smooth internal navigation in local and preview environments.
  - Verify: `npm test` and browser click-through
  - Files: `src/components/layout/Footer.tsx`

## Checkpoint 2
- [x] TypeScript check clean (0 errors)
- [x] Vitest test suite clean (394/394 passing across 29 test files)

---

## Phase 3: Monolith Decoupling & Data Extraction
- [x] Task 3.1: Audit `CapabilityGrid.tsx` architecture
  - Acceptance: Verified component is already a pure reusable renderer consuming page `items` props. Card vector illustrations preserved for exact pixel fidelity.
  - Verify: `npx tsc --noEmit` and production build clean
  - Files: `src/components/gcc-operations/CapabilityGrid.tsx`
- [x] Task 3.2: Audit and modularize `WhyNeoIntelliLifecycle.tsx`
  - Acceptance: Modularized within `src/features/home`, zero SVG regressions on homepage.
  - Verify: `npx tsc --noEmit` and visual check on homepage
  - Files: `src/features/home/components/WhyNeoIntelliLifecycle.tsx`

## Checkpoint 3
- [x] Zero visual or functional regressions on `/services/gcc-operations` and `/`
- [x] TypeScript check passes

---

## Phase 4: Asset Organization & Dead Code Archiving
- [x] Task 4.1: Move verified debug/test images to `public/unused/images/`
  - Acceptance: 5 verified unused debug images moved to `public/unused/images/`. Zero active references broken.
  - Verify: Grep for references before moving. Verify no 404s.
  - Files: `public/unused/images/*`
- [x] Task 4.2: Audit `src/components/home/redesign` and verify 0 active references
  - Acceptance: All active consumers point to `src/features/home`. Redundant copies ready for safe archiving.
  - Verify: `npx tsc --noEmit` and build clean

## Checkpoint 4
- [x] All pages load without missing assets
- [x] `npx tsc --noEmit` clean

---

## Phase 5: Final Verification, Review & Validation
- [x] Task 5.1: Run complete automated test suite
  - Result: 29/29 test files passed, 394/394 tests passed.
- [x] Task 5.2: Run production Next.js build
  - Result: 136/136 static and server pages compiled with exit code 0.
- [x] Task 5.3: Responsive verification across standard viewports (375px, 768px, 1024px, 1440px)
- [x] Task 5.4: Generate Final Refactor Report

