# Refactor Task List: NeoIntelli Production-Grade Refactor

## Phase 1: Foundation Alignment & Baseline Fixes
- [ ] Task 1.1: Fix legacy link `/services/gcc/technology-infrastructure` in `src/pages/CaseStudies.tsx` to point to `/services/gcc-operations/workplace-it-security`
  - Acceptance: `src/test/gccOperationsSection.test.ts` passes cleanly without assertions failing.
  - Verify: `npx vitest run src/test/gccOperationsSection.test.ts`
  - Files: `src/pages/CaseStudies.tsx`
- [ ] Task 1.2: Verify and standardize `ServicePageLayout` across inner pages (`About.tsx`, `Contact.tsx`, `CaseStudies.tsx`, `careers.tsx`)
  - Acceptance: Pages consume `ServicePageLayout` seamlessly, preserving exact headers, canvas `#E7EDF9`, and consultation.
  - Verify: `npx tsc --noEmit` and browser check on `/about`, `/contact`, `/case-studies`.
  - Files: `src/pages/About.tsx`, `src/pages/Contact.tsx`, `src/pages/CaseStudies.tsx`, `src/pages/careers.tsx`

## Checkpoint 1
- [ ] `npx tsc --noEmit` passes with 0 errors
- [ ] `npx vitest run src/test/gccOperationsSection.test.ts` passes

---

## Phase 2: Shared Component & Primitive Consolidation
- [ ] Task 2.1: Consolidate duplicate `FlowDiagram` into a unified primitive in `src/components/shared/FlowDiagram.tsx`
  - Acceptance: `src/components/ai-gcc/FlowDiagram.tsx` and `src/components/gcc-operations/FlowDiagram.tsx` share one clean implementation without visual alteration.
  - Verify: `npx tsc --noEmit`
  - Files: `src/components/shared/FlowDiagram.tsx`, `src/components/ai-gcc/FlowDiagram.tsx`, `src/components/gcc-operations/FlowDiagram.tsx`
- [ ] Task 2.2: Consolidate duplicate `SourceNote` into `src/components/shared/SourceNote.tsx`
  - Acceptance: Single reusable `SourceNote` used across ai-gcc, gcc-operations, and ai-engineering.
  - Verify: `npx tsc --noEmit`
  - Files: `src/components/shared/SourceNote.tsx`, `src/components/ai-gcc/SourceNote.tsx`, `src/components/gcc-operations/SourceNote.tsx`, `src/components/ai-engineering/SourceNote.tsx`
- [ ] Task 2.3: Standardize `InBrief` / `InBriefCard`
  - Acceptance: All pillars consume the approved `InBrief` component with consistent styling.
  - Verify: `npx tsc --noEmit`
  - Files: `src/components/ai-gcc/InBrief.tsx`, `src/components/gcc-operations/InBrief.tsx`, `src/components/gcc-operations/InBriefCard.tsx`
- [ ] Task 2.4: Convert hardcoded absolute `https://neointelli.com/...` URLs in `Footer.tsx` to relative paths
  - Acceptance: Footer links use relative paths, preserving smooth internal navigation in local and preview environments.
  - Verify: `npm test` and browser click-through
  - Files: `src/components/layout/Footer.tsx`

## Checkpoint 2
- [ ] TypeScript check clean
- [ ] Vitest test suite clean

---

## Phase 3: Monolith Decoupling & Data Extraction
- [ ] Task 3.1: Decouple 151KB inline JSX from `src/components/gcc-operations/CapabilityGrid.tsx`
  - Acceptance: Data cleanly separated into `src/data/gccOperationsContent.ts`, component reduced from 151KB to a lightweight renderer.
  - Verify: `npx tsc --noEmit` and visual check on `/services/gcc-operations`
  - Files: `src/components/gcc-operations/CapabilityGrid.tsx`, `src/data/gccOperationsContent.ts`
- [ ] Task 3.2: Modularize `WhyNeoIntelliLifecycle.tsx` (69KB)
  - Acceptance: Extract SVG filters/gradients and stage card definitions into structured sub-modules.
  - Verify: `npx tsc --noEmit` and visual check on homepage
  - Files: `src/features/home/components/WhyNeoIntelliLifecycle.tsx`

## Checkpoint 3
- [ ] Zero visual or functional regressions on `/services/gcc-operations` and `/`
- [ ] TypeScript check passes

---

## Phase 4: Asset Organization & Dead Code Archiving
- [ ] Task 4.1: Move verified debug/test images to `public/unused/`
  - Acceptance: Files like `debug_crop_prod.png`, `debug_crop_team.png`, `ref_delivery_card.png`, etc., moved to `public/unused/images/`. No active references broken.
  - Verify: Grep for references before moving. Verify no 404s.
  - Files: `public/images/*`, `public/unused/*`
- [ ] Task 4.2: Clean up single-line alias re-exports where safe
  - Acceptance: Remove redundant passthrough alias files that are not part of public API contracts.
  - Verify: `npx tsc --noEmit`

## Checkpoint 4
- [ ] All pages load without missing assets
- [ ] `npx tsc --noEmit` clean

---

## Phase 5: Final Verification, Review & Validation
- [ ] Task 5.1: Run complete automated test suite
  - Command: `npm test`
- [ ] Task 5.2: Run production Next.js build
  - Command: `npm run build`
- [ ] Task 5.3: Responsive verification across standard viewports (375px, 768px, 1024px, 1440px)
- [ ] Task 5.4: Generate Final Refactor Report

