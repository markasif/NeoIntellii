# Implementation Plan: NeoIntelli Autonomous Codebase Optimization & Responsive Hardening

## 1. Overview
Execute a comprehensive, non-breaking architectural optimization, DRY consolidation, unused asset cleanup, responsive/tablet hardening, and production validation across the NeoIntelli platform (86 active routes).

## 2. Invariants & Design Freeze
1. **Design Freeze:** All existing colors, gradients, typography, hierarchy, layouts, spacing, card styles, and animations are strictly frozen.
2. **Typography Preservation:** Plus Jakarta Sans (`font-sans`), Manrope (`font-manrope`), Inter (`font-inter`).
3. **No `/product` Touch:** `/product` routes and assets remain completely isolated.
4. **Preserve User Modifications:** All recent working-tree modifications (wavesOnMobile, .btn-navy, MarqueePillButton, PillFeatureCardGrid) must be maintained intact.
5. **No Regressions:** TypeScript (`npx tsc --noEmit`), Vitest suite (394/394 tests), and production build must pass cleanly.

## 3. Phased Roadmap
- **Phase A — Baseline Tests & Architecture Inventory:** Record baseline metrics, active routes, and asset maps.
- **Phase B — DRY Audit & Component Consolidation:**
  - Create canonical `IndustryCTA` wrapping `ExecutiveCTA` with `mobileLabel` support to resolve the mismatched `AiDeliveryTeamsCTA` and `ContextAdvisoryCallout` across industry pages (`IndustryGccPage.tsx`, `BfsiGcc.tsx`, `manufacturing-gcc.tsx`, `private-equity-gcc.tsx`, `retail-gcc.tsx`, and `Industries.tsx`).
  - Harmonize `TrustStrip.tsx` 3 metric cards to match `Consultation.tsx` 2-row mobile layout.
  - Consolidate duplicated card wrappers and button styling patterns.
- **Phase C — Confirmed-Unused Code & Component Cleanup:**
  - Identify and safely remove dead exports, obsolete unused components, and redundant legacy shims without touching active routes.
- **Phase D — Image & Asset Audit, Migration & Cleanup:**
  - Audit `public/images/` and unreferenced files.
  - Fix any broken or misaligned asset references.
- **Phase E — Responsive & Tablet Hardening (600px–1023px):**
  - Verify and harden breakpoints across mobile (320px–480px), tablet (600px–1023px), desktop, and ultrawide.
  - Fix button overflowing, grid squishing, and horizontal scroll defects.
- **Phase F — Performance Optimization:**
  - Audit image loading (`loading="lazy"`, `sizes`, LCP priorities).
  - Eliminate layout shifts (CLS) and unoptimized re-renders.
- **Phase G — Accessibility & Regression Testing:**
  - Run full Vitest suite (394+ tests).
  - Verify keyboard navigability, ARIA attributes, and semantic landmarks.
- **Phase H — Final Code Review & Production Validation:**
  - Typecheck (`npx tsc --noEmit`), full test run, production build check, and comprehensive final report.
