# Implementation Plan: NeoIntelli Production-Grade Codebase Refactor

## 1. Overview
Execute a phased, non-breaking architectural refactor across the in-scope NeoIntelli codebase (68 routes). The goal is to eliminate code duplication (DRY), standardize layout wrappers and section spacing to match the homepage baseline, decouple monolithic inline JSX from data structures, organize public assets, and ensure rock-solid responsiveness while preserving 100% visual, typographic, content, SEO, and functional parity.

---

## 2. Architecture Decisions
1. **Visual & Design Freeze**: All current styles, colors, layouts, fonts, weights, line-heights, and animations are strictly frozen.
2. **Typography Preservation**:
   - `font-sans` maps to `--font-plus-jakarta` (Plus Jakarta Sans).
   - `font-manrope` maps to `--font-manrope` (Manrope).
   - `index.css` fallback remains `--font-inter` (Inter).
   - No font swaps or replacements under any circumstances.
3. **Canonical Spacing Standard**: Standard sections across all services and pages align with the Homepage baseline: `py-8 sm:py-10 md:py-12 lg:py-14` on canvas `#E7EDF9` inside `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
4. **Layout Standardization**: Adopt `ServicePageLayout` across pages that currently duplicate Navbar, Footer, and Consultation wrapper boilerplate.
5. **No `/product` Touch**: `/product` remains completely untouched and isolated.
6. **Zero Duplicate Primitives**: Leverage existing approved primitives (`Section`, `UniversalSubnav`, `UniversalLifecycle`, `TypewriterContextButton`, `SectionHeader`, `SlottedStepNumber`, `InBrief`).

---

## 3. Dependency Graph & Phased Roadmap

```
Phase 1: Foundation Alignment & Baseline Fixes
   │  ├── Standardize PageShell & ServicePageLayout
   │  └── Fix legacy route reference in CaseStudies.tsx
   ▼
Phase 2: Shared Component & Primitive Consolidation
   │  ├── Consolidate duplicate FlowDiagram & SourceNote
   │  ├── Standardize InBrief component across pillars
   │  └── Convert hardcoded absolute URLs in Footer.tsx to relative paths
   ▼
Phase 3: Monolith Decoupling & Data Extraction
   │  ├── Decouple 151KB CapabilityGrid into data + reusable card
   │  └── Modularize WhyNeoIntelliLifecycle SVG/section blocks
   ▼
Phase 4: Asset Organization & Dead Code Archiving
   │  ├── Move verified debug/test artifacts to public/unused/
   │  └── Quarantine or clean confirmed redundant single-line re-exports
   ▼
Phase 5: Full Regression Testing, Browser Validation & Verification
      ├── TypeScript (npx tsc --noEmit)
      ├── Vitest (npm test)
      └── Multi-viewport responsiveness verification (375px, 768px, 1024px, 1440px)
```

---

## 4. Phase Breakdown & Checkpoints

### Phase 1: Foundation Alignment & Baseline Fixes
- **Focus:** Align layout wrappers and ensure clean test baseline.
- **Files:** `src/pages/CaseStudies.tsx`, `src/components/layout/ServicePageLayout.tsx`.
- **Checkpoint 1:** `npx tsc --noEmit` and `npm test run src/test/gccOperationsSection.test.ts` pass cleanly.

### Phase 2: Shared Component Consolidation
- **Focus:** Eliminate duplicate component files and relative link navigation.
- **Files:** `src/components/ai-gcc/FlowDiagram.tsx`, `src/components/gcc-operations/FlowDiagram.tsx`, `src/components/ai-gcc/SourceNote.tsx`, `src/components/gcc-operations/SourceNote.tsx`, `src/components/layout/Footer.tsx`.
- **Checkpoint 2:** `npm test` passes, all navigation links function locally without redirecting to production domain.

### Phase 3: Monolith Decoupling & Data Extraction
- **Focus:** Clean up massive inline JSX files.
- **Files:** `src/components/gcc-operations/CapabilityGrid.tsx`, `src/data/gccOperationsContent.ts`, `src/features/home/components/WhyNeoIntelliLifecycle.tsx`.
- **Checkpoint 3:** Zero visual regressions on `/services/gcc-operations` and homepage. `npx tsc --noEmit` passes.

### Phase 4: Asset Organization & Dead Code Cleanup
- **Focus:** Tidy public assets and obsolete re-exports.
- **Files:** `public/images/`, `public/unused/`.
- **Checkpoint 4:** No broken image links across any page.

### Phase 5: Final Verification & Review
- **Focus:** Complete audit checklist, DevTools responsiveness check, typecheck, lint, build.
- **Checkpoint 5:** Production build (`npm run build`) passes cleanly. Visual and functional parity confirmed.
