# Todo List: NeoIntelli Codebase Optimization & Responsive Hardening

## Phase A: Baseline & Architecture Inventory
- [x] Task A.1: Record TypeScript baseline (`npx tsc --noEmit` -> 0 errors)
- [x] Task A.2: Record test suite baseline (`npm test` -> 29/29 files, 394/394 tests passed)
- [x] Task A.3: Inventory all 86 active routes and preserve uncommitted working tree changes

## Phase B: DRY Audit & Component Consolidation
- [x] Task B.1: Create canonical `IndustryCTA.tsx` built on `ExecutiveCTA` with `mobileLabel` support
  - Acceptance: Replaces mismatched `AiDeliveryTeamsCTA` in `IndustryGccPage.tsx`, `BfsiGcc.tsx`, `manufacturing-gcc.tsx`, `private-equity-gcc.tsx`, and unifies `ContextAdvisoryCallout` in `Industries.tsx` and custom section in `retail-gcc.tsx`.
  - Verify: `npx tsc --noEmit` & `npm test`
- [x] Task B.2: Harmonize `TrustStrip.tsx` with `Consultation.tsx` 2-row mobile layout
  - Acceptance: 3 metric cards ("30+ GCCs shaped", "48h First response", "100% Senior-led") render 2 rows on mobile across all trust strip usages.
  - Verify: Visual inspection and test suite.
- [x] Task B.3: Consolidate repeated CTA button classes to `.btn-navy` and `.btn-cyan` canonical design tokens.

## Phase C: Confirmed-Unused Code & Component Cleanup
- [x] Task C.1: Audit unused React components and dead exports
  - Acceptance: Safely archive or remove confirmed 100% unused files that have zero references across active routes, tests, and public pages.
  - Verify: Reference checks and `npx tsc --noEmit`.
- [x] Task C.2: Clean up unused CSS utilities or obsolete styles while preserving existing visual design.

## Phase D: Image & Asset Audit, Migration & Cleanup
- [x] Task D.1: Audit `public/images/` for obsolete test images or broken paths
  - Acceptance: All images referenced by active routes exist and load with correct MIME types and paths.
  - Verify: Audited 590 image references across codebase, fixed 3 paths in legacy `ServicesGrid.tsx` -> 0 missing images.

## Phase E: Responsive & Tablet Hardening (600px–1023px)
- [x] Task E.1: Audit and fix tablet grid compression (600px–1023px) across industry and service pages.
- [x] Task E.2: Ensure all multi-button CTA bars stack gracefully or use single-line `mobileLabel` without overflow.
- [x] Task E.3: Audit table containers and ensure zero unintended horizontal overflow.

## Phase F: Performance Optimization
- [x] Task F.1: Ensure above-the-fold hero images use priority and below-the-fold use `loading="lazy"`.
- [x] Task F.2: Audit dynamic imports and memoization without introducing regressions.

## Phase G: Accessibility & Regression Testing
- [x] Task G.1: Run full Vitest suite to ensure 100% passing tests.
- [x] Task G.2: Verify keyboard accessibility on interactive buttons and dialogs.

## Phase H: Final Code Review & Production Validation
- [x] Task H.1: Run `npx tsc --noEmit`
- [x] Task H.2: Run `npm test`
- [x] Task H.3: Generate comprehensive final optimization report
