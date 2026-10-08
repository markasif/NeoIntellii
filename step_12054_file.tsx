# NeoIntelli Codebase & Architecture Audit Report

**Status:** APPROVED FOR REFACTORING BASELINE  
**Scope:** Production-grade Code Quality, DRY Architecture, Responsive Stability  
**Out of Scope:** `/product` and any product-specific logic (Fully Isolated)  
**Visual & Design Constraint:** 100% Frozen â€” Visual Source of Truth is the Current Rendered Website  

---

## Executive Summary

This audit establishes the baseline architectural inventory, component graph, typography truth, spacing standards, and duplication map for the NeoIntelli production refactoring phase. 

The website is currently deployed via **Next.js (Pages Router with `@/pages` wrappers)** running Next.js v16.3.5 and TypeScript 5.8.3, styled with Tailwind CSS 3.4.17 and Framer Motion. 

| Metric | Discovered Baseline |
|---|---|
| **Total In-Scope Routes** | 68 active routes (0 `/product` routes exist in app) |
| **Active TypeScript Status** | 0 errors (`npx tsc --noEmit` passes clean) |
| **Active Vitest Test Suite** | 29 test files, 394 tests (392 passing, 2 known legacy assertion issues) |
| **Primary Rendered Fonts** | **Plus Jakarta Sans** (`--font-plus-jakarta` via `font-sans`) & **Manrope** (`--font-manrope` via `font-manrope`) |
| **Base Body Fallback Font** | **Inter** (`--font-inter` defined in `globals/index.css`) |
| **Primary Section Spacing** | `py-8 sm:py-10 md:py-12 lg:py-14` on canvas `#E7EDF9` (Homepage standard) |
| **Primary Max-Width** | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |

---

## A. Route Inventory (All Routes Except `/product`)

All 68 routes are served via Next.js Pages router (`pages/*.tsx`) wrapping core page implementations in `src/pages/*.tsx` using `PageShell` and `createStaticProps`.

### 1. Core & Brand Routes
1. `/` â€” Homepage (`src/pages/Index.tsx`)
2. `/about` â€” About NeoIntelli (`src/pages/About.tsx`)
3. `/blog` â€” Insights & Perspectives Hub (`src/pages/Blog.tsx`)
4. `/blog/[slug]` â€” Dynamic Article Page (`src/pages/BlogPost.tsx`)
5. `/case-studies` â€” Client Impact & Delivery Proof (`src/pages/CaseStudies.tsx`)
6. `/contact` â€” Executive Consultation & Contact (`src/pages/Contact.tsx`)
7. `/careers` â€” Careers & Culture (`src/pages/careers.tsx`)
8. `/industries` â€” Industry Verticals Overview (`src/pages/Industries.tsx`)
9. `/blueprint` â€” GCC Advisory Blueprint (`src/pages/SEOBlueprint.tsx`)
10. `/book-a-call` â€” Direct Meeting Booking (`src/pages/BookACall.tsx`)
11. `/thank-you-call` â€” Post-booking Confirmation (`src/pages/ThankYouCall.tsx`)
12. `/privacy-policy` â€” Privacy Policy (`src/pages/PrivacyPolicy.tsx`)
13. `/terms-of-service` â€” Terms of Service (`src/pages/TermsOfService.tsx`)
14. `/cookie-policy` â€” Cookie Policy (`src/pages/CookiePolicy.tsx`)
15. `404` â€” Not Found (`src/pages/NotFound.tsx`)

### 2. Decision Lab & Advisory Tools
16. `/gcc-cost-calculator` â€” Interactive India GCC Cost Calculator (`src/pages/GccCostCalculator.tsx`)
17. `/gcc-roi-estimator` â€” 3-Year & 5-Year GCC ROI Estimator (`src/pages/gcc-roi-estimator.tsx`)
18. `/gcc-readiness-assessment` â€” Diagnostic Capability Assessment (`src/pages/gcc-readiness-assessment.tsx`)
19. `/gcc-as-a-service` â€” Managed GCC Solutions (`src/pages/GccAsAService.tsx`)
20. `/gcc-vs-outsourcing` â€” Strategic Comparative Model (`src/pages/GccVsOutsourcing.tsx`)
21. `/gcc-india-cost` â€” Comprehensive India Cost Guide (`src/pages/GCCIndiaCost.tsx`)
22. `/gcc-for-ai-startups` â€” Micro GCC for AI Ventures (`src/pages/gcc-for-ai-startups.tsx`)
23. `/gcc-faq` â€” Comprehensive GCC Knowledge Base (`src/pages/gcc-faq.tsx`)

### 3. Industry Verticals
24. `/industries/bfsi-gcc` â€” Banking & Financial Services GCC (`src/pages/industries/BfsiGcc.tsx`)
25. `/industries/healthcare-gcc` â€” Healthcare & Life Sciences GCC (`src/pages/industries/HealthcareGcc.tsx`)
26. `/industries/manufacturing-gcc` â€” Manufacturing & Industrial GCC (`src/pages/industries/manufacturing-gcc.tsx`)
27. `/industries/private-equity-gcc` â€” Private Equity Portfolio GCC (`src/pages/industries/private-equity-gcc.tsx`)
28. `/industries/retail-gcc` â€” Retail, eCommerce & CPG GCC (`src/pages/industries/retail-gcc.tsx`)
29. `/industries/technology-gcc` â€” Software & Technology GCC (`src/pages/industries/TechnologyGcc.tsx`)

### 4. Pillar 1: GCC Strategy & Setup
30. `/services/gcc` â€” GCC Strategy Hub (`src/pages/services/GCCServices.tsx`)
31. `/services/micro-gcc` â€” AI Micro GCC Core Service (`src/pages/services/MicroGCC.tsx`)
32. `/services/gcc/strategy-business-case` â€” Strategy & Board Business Case (`src/pages/services/gcc/StrategyBusinessCase.tsx`)
33. `/services/gcc/setup-launch` â€” Day 0 to Day 180 Setup & Launch (`src/pages/services/gcc/SetupLaunch.tsx`)
34. `/services/gcc/location-strategy` â€” Multi-City Location Selection (`src/pages/services/gcc/LocationStrategy.tsx`)
35. `/services/gcc/modernization-transformation` â€” Legacy GCC Modernization (`src/pages/services/gcc/ModernizationTransformation.tsx`)

### 5. Pillar 2: GCC Operations & Managed Services
36. `/services/gcc-operations` â€” Operations & Managed Services Hub (`src/pages/services/gcc-operations/GccOperations.tsx`)
37. `/services/gcc-operations/workforce-strategy` â€” Workforce Planning & Talent Architecture
38. `/services/gcc-operations/people-hr-operations` â€” HR Operations & Statutory Infrastructure
39. `/services/gcc-operations/workplace-it-security` â€” Physical & Information Security
40. `/services/gcc-operations/service-management-performance` â€” SLA, Metrics & Performance
41. `/services/gcc-operations/governance-compliance` â€” Governance, Audit & Risk
42. `/services/gcc-operations/bot-transition` â€” Build-Operate-Transfer Architecture
43. `/services/gcc-operations/scale-expansion` â€” Scale & Multi-center Expansion

### 6. Pillar 3: Enterprise AI Engineering
44. `/services/ai-engineering` â€” AI Engineering Pillar Hub (`src/pages/services/AIEngineering.tsx`)
45. `/services/ai-engineering/generative-agentic-ai` â€” Generative & Multi-Agent Architecture
46. `/services/ai-engineering/applied-ai-ml` â€” Applied Machine Learning Systems
47. `/services/ai-engineering/data-engineering` â€” Enterprise Data Lake & Feature Engineering
48. `/services/ai-engineering/ai-product-engineering` â€” Production AI Application Engineering
49. `/services/ai-engineering/ai-agents-automation` â€” Autonomous Agent Workflows
50. `/services/ai-engineering/mlops-llmops-agentops` â€” Production AI Operations Lifecycle
51. `/services/ai-engineering/ai-evaluation-assurance` â€” Guardrails, Evals & Benchmarks

### 7. Pillar 4: AI GCC Architecture
52. `/services/ai-gcc` â€” AI GCC Architecture Hub (`src/pages/services/AISolutions.tsx`)
53. `/services/ai-gcc/ai-advisory-strategy` â€” AI Maturity & Roadmap Strategy
54. `/services/ai-gcc/setup-operations` â€” Turnkey AI GCC Operating Model
55. `/services/ai-gcc/generative-ai` â€” GenAI Labs within Capability Centers
56. `/services/ai-gcc/data-engineering` â€” High-Throughput Data Infrastructure
57. `/services/ai-gcc/mlops` â€” Dedicated MLOps & LLM Orchestration
58. `/services/ai-gcc/responsible-ai` â€” Ethical AI & DPDP/EU-AI Act Compliance
59. `/services/ai-gcc/ai-infrastructure-gpu` â€” GPU Compute Cluster & Infra Strategy

### 8. Pillar 5: AI Delivery Teams
60. `/services/ai-delivery-teams` â€” Delivery Teams Overview (`src/pages/services/ai-delivery-teams/AiDeliveryTeams.tsx`)
61. `/services/ai-delivery-teams/dedicated-ai-engineering-team` â€” Retained Squads
62. `/services/ai-delivery-teams/ai-delivery-pod` â€” Time-boxed Milestone Pods
63. `/services/ai-delivery-teams/forward-deployed-ai-engineers` â€” Codebase-embedded Specialists
64. `/services/ai-delivery-teams/ai-team-transfer` â€” Build-Operate-Transfer Engineering Teams

### 9. Pillar 6: AI Talent & Recruitment
65. `/services/ai-talent` â€” AI Talent Hub (`src/pages/services/ai-talent/AITalentOverview.tsx`)
66. `/services/ai-talent/ai-ml-recruitment` â€” AI/ML Role Placements
67. `/services/ai-talent/genai-agentic-ai-hiring` â€” GenAI & Agentic Specialist Search
68. `/services/ai-talent/data-engineering-data-science-hiring` â€” Data Team Hiring
69. `/services/ai-talent/mlops-ai-platform-hiring` â€” Platform & Infrastructure Hiring
70. `/services/ai-talent/ai-leadership-executive-search` â€” CXO & Head of GCC Hiring
71. `/services/ai-talent/recruitment-hub` â€” Full-cycle Hiring Hub
72. `/services/ai-talent/ai-reskilling-academy` â€” Enterprise Upskilling & Academy

### 10. Recruitment Hub & Legacy Direct Routes
73. `/recruitment` â€” Direct Recruitment Portal (`src/pages/recruitment/RecruitmentHub.tsx`)
74. `/recruitment/permanent` â€” Direct Permanent Placement
75. `/recruitment/contract-staffing` â€” Contract & SOW Staffing
76. `/recruitment/executive-search` â€” Direct Leadership Search
77. `/recruitment/rpo` â€” Recruitment Process Outsourcing
78. `/services/ai-talent-acquisition` â€” Talent Acquisition Landing
79. `/services/ai-data-recruitment` â€” Data Recruitment Landing

### 11. Specialized Campaign Landing Pages (`/lp`)
80. `/lp/ai-first-gcc` â€” AI-First GCC Campaign (`src/pages/landing/AiFirstGcc.tsx`)
81. `/lp/newhome` â€” Alternative Visual Landing
82. `/lp/hire-ai-engineers` â€” AI Engineers Campaign
83. `/lp/hire-ai_ml-engineers` â€” AI/ML Engineers Campaign
84. `/lp/micro-gcc-india` â€” Micro GCC Dedicated Campaign
85. `/lp/india-engineering-squad` â€” India Engineering Squad Campaign
86. `/lp/finance-procurement-shared-services-india` â€” Shared Services Campaign
87. `/lp/gcc-cost-calculator` â€” Dedicated Calculator Funnel
88. `/lp/gcc-playbook` â€” Playbook Download Funnel

### 12. API & Infrastructure Routes
89. `/api/send-tool-email` â€” Form Email Dispatcher API
90. `/sitemap.xml` â€” Dynamic XML Sitemap Generator

---

## B & C. Existing Shared Component & Layout Inventory

The codebase already contains a set of approved reusable components created in previous refactorings:

### 1. Structural Layout Primitives
- [ServicePageLayout.tsx](file:///c:/Users/Mohammed%20Asif/Desktop/Neointelli-og/src/components/layout/ServicePageLayout.tsx)  
  *Approved standard:* Canvas `#E7EDF9`, global `<Navbar />`, `<Footer />`, `<Consultation hideUpperCta hideWaveDivider />`, smooth scroll hash restoration.
- [Section.tsx](file:///c:/Users/Mohammed%20Asif/Desktop/Neointelli-og/src/components/ui/Section.tsx)  
  *Approved standard:* Canonical section container supporting light canvas (`#E7EDF9`), navy gradient (`from-[#081B3E] via-[#0A224E] to-[#061530]`) with top/bottom SVG waves, `width` presets, `AmbientGlow`, and `paddingVariant="ops" | "default"`.
- [SectionHeader.tsx](file:///c:/Users/Mohammed%20Asif/Desktop/Neointelli-og/src/components/ui/SectionHeader.tsx)  
  *Approved standard:* Standardized eyebrow, title (with optional colored period/mark), and lede description with responsive center/left alignment.

### 2. Navigation Primitives
- [UniversalSubnav.tsx](file:///c:/Users/Mohammed%20Asif/Desktop/Neointelli-og/src/components/navigation/UniversalSubnav.tsx)  
  *Approved standard:* Sticky horizontal scroll subnav for all 6 service pillars. Supports `variant="cyan" | "ocean"`, auto-scrolling active link into view, scroll button indicators, and smooth offset targeting.
- [Navbar.tsx](file:///c:/Users/Mohammed%20Asif/Desktop/Neointelli-og/src/components/navigation/Navbar.tsx)  
  *Approved standard:* Sticky glass navigation with animated dropdown menus, mobile sheet drawer, and logo inversion on dark headers.
- [Footer.tsx](file:///c:/Users/Mohammed%20Asif/Desktop/Neointelli-og/src/components/layout/Footer.tsx)  
  *Approved standard:* Comprehensive brand footer with all pillar directories, links, social channels, and copyright.

### 3. Interactive & Specialized Primitives
- [TypewriterContextButton.tsx](file:///c:/Users/Mohammed%20Asif/Desktop/Neointelli-og/src/components/ui/TypewriterContextButton.tsx)  
  *Approved standard:* Rounded pill with sparkle icon that animates out a contextual link with typewriter effect on hover.
- [UniversalLifecycle.tsx](file:///c:/Users/Mohammed%20Asif/Desktop/Neointelli-og/src/components/shared/UniversalLifecycle.tsx)  
  *Approved standard:* Continuous sinusoidal wave lifecycle visualization with interactive stage selection, high/low alternating nodes, and responsive vertical fallback.
- [IndustryGccPage.tsx](file:///c:/Users/Mohammed%20Asif/Desktop/Neointelli-og/src/components/shared/IndustryGccPage.tsx)  
  *Approved standard:* Reusable full-page orchestrator for industry subpages (`Retail`, `Manufacturing`, `Healthcare`, `PE`, `BFSI`, `Technology`).
- [FiveCardHeroGrid.tsx](file:///c:/Users/Mohammed%20Asif/Desktop/Neointelli-og/src/components/shared/FiveCardHeroGrid.tsx)  
  *Approved standard:* 5-card horizontal/grid showcase used in Blog and Case Studies.
- [ConnectedEcosystem.tsx](file:///c:/Users/Mohammed%20Asif/Desktop/Neointelli-og/src/components/shared/ConnectedEcosystem.tsx)  
  *Approved standard:* Cross-pillar card grid connecting related services.
- [SlottedStepNumber.tsx](file:///c:/Users/Mohammed%20Asif/Desktop/Neointelli-og/src/components/gcc-operations/SlottedStepNumber.tsx)  
  *Approved standard:* Outlined step counter with cyan/amber accent rules.
- [InBrief.tsx](file:///c:/Users/Mohammed%20Asif/Desktop/Neointelli-og/src/components/ai-gcc/InBrief.tsx)  
  *Approved standard:* Compact executive summary callout.

---

## D, E, F, G. Duplications & Anti-Patterns Identified

### 1. Duplicate Page Layout Wrappers & Canvas Drift
- **Issue:** Several pages re-implement their own outer `div`, `<Navbar />`, `<Footer />`, and `<Consultation />` rather than adopting `ServicePageLayout`.
  - `src/pages/About.tsx`, `src/pages/CaseStudies.tsx`, `src/pages/Contact.tsx`, `src/pages/Blog.tsx`, and `src/pages/careers.tsx` all duplicate this wrapper boilerplate.
- **Background Inconsistency:** 
  - Standard Canvas: `#E7EDF9`
  - `IndustryGccPage.tsx`: uses `#F0F5FA` (divergent light tint).
  - Several subpages mix inline background hexes instead of adhering to the canonical canvas token.

### 2. Duplicate Flow Diagrams & SVG Diagrams
- `src/components/ai-gcc/FlowDiagram.tsx` (3,132 bytes) and `src/components/gcc-operations/FlowDiagram.tsx` (3,202 bytes) are **99% identical duplicate code** that can be consolidated into one shared diagram component.

### 3. Duplicate Source Note Callouts
- `src/components/ai-gcc/SourceNote.tsx` (1,392 bytes)
- `src/components/gcc-operations/SourceNote.tsx` (1,530 bytes)
- `src/components/ai-engineering/SourceNote.tsx` (1,500 bytes)  
  *All three render an identical source citation card with small caption and link.*

### 4. Duplicate InBrief Implementations
- `src/components/ai-gcc/InBrief.tsx` (3,259 bytes)
- `src/components/gcc-operations/InBrief.tsx` (1,041 bytes)
- `src/components/gcc-operations/InBriefCard.tsx` (3,041 bytes)  
  *Three divergent versions of the same executive summary block.*

### 5. Massive Inline JSX & Monolithic Datasets
- `src/components/gcc-operations/CapabilityGrid.tsx` is **151,232 bytes** (over 3,500 lines) of inline JSX and hardcoded data. This should be decoupled into a clean data module in `src/data/gccOperationsContent.ts` and rendered through a reusable card component.
- `src/features/home/components/WhyNeoIntelliLifecycle.tsx` is **69,692 bytes** (1,379 lines) containing massive inline SVG shapes and duplicate section markup.

### 6. Absolute Production URLs in Navigation Components
- `src/components/layout/Footer.tsx` has approximately 40 hardcoded absolute links (`https://neointelli.com/services/...`). When clicking these links during local development, testing, or preview staging, the browser unexpectedly leaves `localhost` and navigates to the live production website.

---

## H. Typography Audit (Preservation Source of Truth)

> [!IMPORTANT]
> **Typography Rule:** DO NOT modify font families, weights, clamp scales, or line heights. The current rendered typography is frozen.

### 1. Font Families Discovered from Code & Config
- **`pages/_app.tsx`** loads four Google Fonts via `next/font/google`:
  1. `Inter` (`--font-inter`)
  2. `Instrument_Serif` (`--font-instrument-serif`)
  3. `Plus_Jakarta_Sans` (`--font-plus-jakarta`)
  4. `Manrope` (`--font-manrope`)
- **Tailwind Config Resolution (`tailwind.config.ts`):**
  - `font-sans`: `var(--font-plus-jakarta), var(--font-inter), Inter, sans-serif`
  - `font-manrope`: `var(--font-manrope), sans-serif`
  - `font-display`: `var(--font-plus-jakarta), var(--font-inter), Inter, sans-serif`
- **Rendered Reality in the Browser:**
  - **Homepage & General Service Pages:** Because the root `<main>` or page wrapper specifies `font-sans`, **Plus Jakarta Sans** is the active font rendered for UI, body, and headings.
  - **Redesigned Sections & New Pages:** (Blog, IndustryGccPage, CaseStudies, FiveCardHeroGrid, Footer, etc.) explicitly use `font-manrope` or `font-[family-name:var(--font-manrope)]`, rendering **Manrope**.
  - **Display Numbers & Codes:** Render with `font-mono`.
  - **Specialized Serif Accents:** `/lp/ai-first-gcc` uses `.font-serif-display` (`Instrument Serif`).

### 2. Typographic Scale & Weights
- **H1 (Hero Headings):** `text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px]`, `font-extrabold` (700/800), tracking `[-0.03em]` to `[-0.035em]`, line-height `1.10` to `1.14`.
- **H2 (Section Headings):** `text-2xl sm:text-3xl lg:text-[38px] xl:text-[42px]`, `font-extrabold`, line-height `1.15`.
- **H3 (Card & Pillar Titles):** `text-base sm:text-lg lg:text-xl font-bold`, tracking `[-0.015em]`.
- **Body Text:** `text-sm sm:text-base` (15px to 17px), font-weight 400, line-height `1.55` to `1.6`, color `text-[#505D74]` or `hsl(var(--body))`.
- **Eyebrows / Badges:** `text-[10.5px]` to `text-[13px]`, `font-bold`, uppercase, tracking `[0.18em]` to `[0.22em]`, color `#169DC8` or `#DE8017`.
- **CTAs & Buttons:** `text-xs sm:text-[13px] font-bold`, tracking `[-0.01em]`.

---

## I. Spacing System (Homepage Baseline Reference)

The Homepage (`src/pages/Index.tsx` & `src/features/home/components/`) serves as the strict reference baseline:

### 1. Section Vertical Padding
- **Standard Light Sections:**  
  `py-8 sm:py-10 md:py-12 lg:py-14` (32px mobile â†’ 40px sm â†’ 48px md â†’ 56px desktop).  
  *Found in: NeoHireXMatrix, GCCLifecycle, GCCCapabilitiesMosaic, GCCStartingPoint, Industries, DecisionTools, EngagementModel, Insights, FAQSection.*
- **Deep Contrast / Navy Sections:**  
  `pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-20` (or `pb-20 sm:pb-26 lg:pb-32` when containing elevated floating cards or wave dividers).  
  *Found in: WhyNeoIntelliLifecycle, Consultation.*

### 2. Container & Margins
- **Standard Max Width:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Compact Text Max Width:** `max-w-3xl mx-auto text-center px-2`
- **Header Bottom Margins:** `mb-6 sm:mb-8` for compact cards; `mb-8 sm:mb-10 lg:mb-12` for full-width mosaics.
- **Card Padding:** `p-5 sm:p-6 lg:p-7` (compact) to `p-6 sm:p-8 lg:p-10` (feature).

---

## J. Responsive Design Health

- **Mobile Viewports (320pxâ€“430px):**
  - Most grids properly collapse to single column (`grid-cols-1`).
  - Mobile overflow risks exist in multi-column tables or wide SVG wave dividers if not wrapped in `overflow-x-clip`.
  - Subnavs correctly provide horizontal scrolling tracks.
- **Tablet (768px):**
  - Two-column layouts (`md:grid-cols-2`) transition smoothly.
- **Wide Desktop (1440px+):**
  - Layouts are safely anchored by `max-w-7xl` containers.

---

## K. Asset & Image Audit

### 1. Active Asset Categories
- `/hero/hero.png` â€” Main homepage sunset architectural background
- `/logo/` â€” NeoIntelli and NeoHireX brand logos (`.webp`)
- `/images/industries/` â€” Industry cards (`crisp_pe.png`, etc.)
- `/images/delivery-teams/` â€” Squad and pod photography
- `/images/gcc-operations/` â€” Operating reality and hero graphics

### 2. Candidate Artifacts for `/public/unused/`
The following files in `public/images/` represent test, debug, or obsolete versioned assets:
- `debug_crop_prod.png`, `debug_crop_team.png`, `debug_line_area.png`
- `ref_delivery_card.png`, `ref_valid_card.png`
- `pathway_team_orig.png`, `team_discussion_raw.png`
- Duplicate iterative exports: `pillar_card1_arch_v2.png`, `pillar_card2_valid_v2.png`, `pillar_card2_valid_v3.png`, `pillar_card3_deliver_v2.png`, `pillar_card3_deliver_v3.png`, `pillar_card4_transfer_v2.png`

---

## L. Legacy Code & Dead Code Candidates

1. `redesign-source/` directory: A complete standalone Next.js project artifact containing obsolete iterations. Must remain untouched or clearly quarantined.
2. `src/pages/landing/NewHome.tsx`: A legacy experimental home variant not linked to any active navigation menu.
3. `src/components/gcc-operations/OpsSection.tsx` & `src/components/ai-gcc/Section.tsx`: One-line passthroughs that should directly reference `src/components/ui/Section.tsx`.

---

## P. `/product` Dependency & Safety Analysis

> [!CAUTION]
> **Strict Verification:** `/product` is 100% out of scope.

- **Routes:** No `/product` route exists in `pages/`, `src/pages/`, or `src/App.tsx`.
- **Navigation:** `src/components/navigation/Navbar.tsx` features a "Product" dropdown, but **100% of its links point to external URLs** (`https://neohirex.ai/...`).
- **Services:** `/services/ai-engineering/ai-product-engineering` is a service page under AI Engineering, completely distinct from any software product application.
- **Component Coupling:** Zero shared components depend on product-specific logic or internal product state.

---

## Q. Refactoring Risks & Mitigations

| Risk | Impact | Mitigation Strategy |
|---|---|---|
| **Typography Drift** | High | Keep all `font-sans`, `font-manrope`, and font variables untouched. Zero changes to `tailwind.config.ts` font tokens. |
| **Spacing Regressions** | Medium | Use `Section.tsx` with `paddingVariant="ops"` (`py-8 sm:py-10 md:py-12 lg:py-14`) to match homepage vertical rhythm without ad-hoc overrides. |
| **Breaking Internal Links** | High | Run full test suite (`npm test`) and audit against `isValidRoute` in `src/App.tsx`. Fix the known legacy link in `CaseStudies.tsx`. |
| **SEO / Metadata Regressions** | High | Zero modifications to page titles, meta tags, schema scripts, or canonical links. |
| **Broken Image Paths** | High | Retain existing image paths during initial phases; move only verified test/debug files to `/public/unused/`. |

---

## R. Phased Refactoring Roadmap

```
PHASE 1: Foundation & Baseline Alignment
  â”œâ”€â”€ Establish Specs & Plans in tasks/
  â”œâ”€â”€ Standardize Page Shell / ServicePageLayout across in-scope pages
  â””â”€â”€ Resolve 2 known pre-existing test failures (CaseStudies legacy URL)

PHASE 2: Shared Component & Primitive Consolidation
  â”œâ”€â”€ Unify duplicate FlowDiagram & SourceNote components
  â”œâ”€â”€ Consolidate InBrief / InBriefCard into approved InBrief primitive
  â””â”€â”€ Convert hardcoded absolute URLs in Footer.tsx to relative paths

PHASE 3: Monolith Decoupling & Data Extraction
  â”œâ”€â”€ Extract 151KB CapabilityGrid inline data to src/data/gccOperationsContent.ts
  â””â”€â”€ Modularize WhyNeoIntelliLifecycle section blocks

PHASE 4: Asset Organization & Dead Code Archiving
  â”œâ”€â”€ Move verified debug/test images to public/unused/
  â””â”€â”€ Clean up redundant single-line re-export files

PHASE 5: Full Regression Testing & Validation
  â”œâ”€â”€ Run typecheck (npx tsc --noEmit)
  â”œâ”€â”€ Run Vitest test suite (100% passing)
  â””â”€â”€ Browser visual verification across 375px, 768px, 1280px, 1440px
```

