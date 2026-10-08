# Spec: AI Talent Section Redesign (/services/ai-talent & Inner Pages)

## 1. Executive Summary & Objective

### Objective
Redesign the `/services/ai-talent` hub page and all 7 specialist/sub-service inner pages to elevate them to the same state-of-the-art visual, structural, and interactive standard as the newly redesigned AI-GCC section (`/services/ai-gcc`).

The redesign must transform these pages from text-dense, plain-white layouts into a high-converting, authoritative enterprise capability showcase for global CTOs, Heads of AI, and GCC leaders looking to hire, scale, or reskill AI talent in India.

### Scope: 8 Routes
1. `/services/ai-talent` — **AI Talent Overview Hub**
2. `/services/ai-talent/ai-ml-recruitment` — **AI & ML Recruitment**
3. `/services/ai-talent/genai-agentic-ai-hiring` — **GenAI & Agentic AI Hiring**
4. `/services/ai-talent/data-engineering-data-science-hiring` — **Data Engineering & Science Hiring**
5. `/services/ai-talent/mlops-ai-platform-hiring` — **MLOps & AI Platform Hiring**
6. `/services/ai-talent/ai-leadership-executive-search` — **AI Leadership & Executive Search**
7. `/services/ai-talent/recruitment-hub` — **AI Recruitment Hub + NeoHireX**
8. `/services/ai-talent/ai-reskilling-academy` — **AI Talent Academy & Reskilling**

---

## 2. Assumptions & Pre-requisites

### Assumptions
1. **Design System & Canvas**: The design system aligns directly with the AI-GCC and GCC Operations design language:
   - Primary canvas background: `#E7EDF9` (ice blue / canvas slate)
   - High-contrast typography: deep navy `#0D306C` for headings, `#2B3D66` for readable body text
   - Accents: vibrant cyan `#00A3E0` / `#0e92b8` for tech emphasis, amber `#F59E0B` for warnings/drop-caps, purple `#7C3AED` for validation badges
   - Elevation & cards: white `#FFFFFF` cards with subtle borders (`border-black/[0.06]`), soft shadows (`card-shadow-soft`), dark navy cards for focal contrast
2. **Framework & Routing**:
   - Next.js + React Router hybrid architecture (managed via `src/App.tsx` and Next pages).
   - Zero route drift: URLs, anchor names, canonical tags, and query params (`aiGccBookingUrl` with `sourcePage` and `serviceInterest`) must be strictly preserved.
3. **Data Integrity**:
   - `src/data/aiTalent.ts` remains the single source of truth for page metadata, routes, subnav groupings, and core role descriptions. Content may be enriched or structured with additional metadata (e.g. icon keys, badge tags), but existing information cannot be lost.
4. **Scope Discipline**:
   - Do NOT break or modify existing `/services/ai-gcc/` pages when sharing or reusing components.
   - AI Talent components will be housed cleanly in `src/components/ai-talent/`.

---

## 3. Tech Stack & Commands

| Tool / Layer | Specification |
| :--- | :--- |
| **Framework** | Next.js 14 / React 18 / TypeScript |
| **Styling** | Tailwind CSS + custom tokens in `src/index.css` |
| **Icons** | Lucide React |
| **Animations** | Framer Motion (page transitions, hover states, accordion expansions) |
| **Testing** | Vitest (`npm run test`) + Next.js build validation (`npm run build`) |
| **Browser MCP** | Chrome DevTools MCP for DOM inspection, responsive check, and console audit |

### Commands
- **Dev Server**: `npm run dev` (running locally on port 3000)
- **Run Unit Tests**: `npm run test`
- **Run Build Validation**: `npm run build`
- **SEO Validation**: `npm run seo:validate`

---

## 4. Current State Audit & Deficiencies

| Component / Area | Current State | Deficiencies Identified | Redesign Target |
| :--- | :--- | :--- | :--- |
| **Canvas & Layout** | Plain `bg-white` in `AiTalentPageLayout.tsx` | Feels flat, generic, and disjointed from AI-GCC's `#E7EDF9` canvas. | Implement `#E7EDF9` canvas with Framer Motion entry and smooth subnav anchor snapping. |
| **Hero Section** | Standard `ServiceHero` with simple dark gradient background | Lacks interactivity, trust badges, typewriter hover cues, or role family counters. | Dedicated `AiTalentHero` supporting breadcrumbs, eyebrow badges, trust stats, and dynamic action buttons. |
| **Subnav** | Generic `ServiceSubnav` | Missing sticky behavior with amber active-indicator ribbon, poor mobile horizontal scroll experience. | Dedicated sticky `AiTalentSubnav` matching `AiGccSubnav` design and smooth scroll. |
| **Role Profiles** (`RoleProfiles.tsx`) | 3 plain text bullet lists (`signals`, `falsePositives`, `evaluation`) in basic white boxes | Extremely text-heavy, high cognitive load, lack of visual scanning aids or status icons. | Interactive **Role Matrix** with category tabs, status pills (green for production signals, amber for false positives, violet for evaluation rigor), and hover elevation. |
| **Validation Flow** | Basic `FlowDiagram` | Rigid vertical list without visual progression cues or step differentiation. | Elevated **Validation Roadmap** with stage chips, interactive cards, and technical assessor callouts. |
| **Engagement Cards** (`HiringPathCards.tsx`) | Simple 4-column border grid | Lacks depth, accent gradients, or clear differentiation between individual hire vs. Micro GCC. | Upgraded interactive path cards with gradient borders, clear badges, and hover lift. |
| **Comparison Tables** | Standard HTML tables | Hard to scan on mobile, lack visual priority badges. | Modern responsive tables with pill badges, highlighted recommended columns, and sticky headers. |

---

## 5. Component Architecture & Reuse Strategy

```
src/components/ai-talent/
├── AiTalentPageLayout.tsx       # Upgraded: #E7EDF9 canvas, sticky subnav, smooth scroll, Consultation footer
├── AiTalentHero.tsx             # New: Signature hero with breadcrumbs, role tag, trust metrics & typewriter secondary CTA
├── AiTalentSubnav.tsx           # New: Sticky subnav with 5 grouped categories, active pill, mobile horizontal scroll
├── RoleMatrix.tsx               # Upgraded replacement for RoleProfiles: tabs, signal badges, collapsible depth
├── HiringPathCards.tsx          # Upgraded: 4-card engagement deck with hover elevation & gradient highlight
├── ValidationRoadmap.tsx        # Upgraded: Interactive 8-step practitioner evaluation flow
├── NeoHireXMosaic.tsx           # New: Showcase of NeoHireX OS (What it does vs. What it does not do)
├── ReskillingPathwayCards.tsx   # New: Before -> Target Role transition cards for Academy page
├── ExecutiveSearchFlow.tsx      # New: 7-stage confidential executive search milestone flow
└── index.ts                     # Clean barrel exports
```

### Decoupling & Reuse Rules:
1. **Reuse from `src/components/ai-gcc/`**:
   - `Section.tsx` (reusable section wrapper with eyebrow, lead, tones `default`, `muted`, `brand`)
   - `InBrief.tsx` (executive summary callout)
   - `AnswerBlock.tsx` (structured Q&A / FAQ items)
   - `PointOfView.tsx` / `SplitValuePointOfView.tsx` (opinionated editorial pull-quotes)
   - `Consultation.tsx` (standardized bottom lead-generation conversion block)
2. **Dedicated AI-Talent Primitives**:
   - Create specialized, tailored components in `src/components/ai-talent/` rather than modifying `ai-gcc` internals. This ensures 100% regression safety for all `/services/ai-gcc/*` routes.

---

## 6. Page-by-Page Redesign Specifications & Acceptance Criteria

### 6.1 Hub: `/services/ai-talent` (`AITalentOverview.tsx`)
- **Hero**: Eyebrow: `AI Talent · India`, Headline: `AI, ML & Data Talent Services in India`, Subtitle, Trust badges: `NeoHireX OS Included`, `Practitioner Validated`, `1 Hire to 100+ Pods`.
- **InBrief**: Executive summary of NeoIntelli's dual advantage (Recruiter Sourcing + NeoHireX AI screening + Senior Practitioner Validation).
- **Engagement Paths**: 4 modernized cards (One Critical Hire, Build an AI Team, Run an AI Recruitment Hub, Build an AI GCC).
- **Validation Flow**: 8-step practitioner assessment pipeline with clear step metrics.
- **Specialist Grid**: 7 interactive role-family cards linking to specialist pages with role count and keyword tags.
- **NeoHireX OS Showcase**: Two-column interactive comparison ("What NeoHireX Does" vs "What NeoHireX Does Not Do — humans decide").
- **Engagement Models**: Responsive comparison table (`Permanent`, `Contract-to-hire`, `Recruitment Hub`, `Micro GCC`).
- **FAQ & CTA**: Accordion FAQ and dual-action bottom CTA.

### 6.2 Specialist Page: `/services/ai-talent/ai-ml-recruitment` (`AIMLRecruitment.tsx`)
- **Role Groups**: Machine Learning Engineering, Specialist AI Engineering, Data Science and Architecture.
- **Interactive Role Matrix**:
  - Filter by role (MLE, Applied AI, Deep Learning, NLP, Vision, Research).
  - Production Signals (emerald checkmarks: shipped models, drift recovery, latency budgets).
  - Resume Red Flags (amber alert icons: Kaggle-only, framework lists without systems).
  - Technical Evaluation Bar (indigo badge: end-to-end architecture walkthrough, live debugging).
- **Architecture Callout**: Why generalist recruiters fail on ML talent.

### 6.3 Specialist Page: `/services/ai-talent/genai-agentic-ai-hiring` (`GenAIAgenticHiring.tsx`)
- **Role Groups**: GenAI & LLM Engineering, Agentic AI Engineering.
- **Tech Stack Tag Strip**: RAG, Context Engineering, Tool Calling, MCP, Agent Orchestration, Tracing.
- **Interactive Role Matrix**: Deep dive into GenAI Engineer, RAG Engineer, AI Product Engineer, Agentic AI Engineer, AI Systems Engineer.
- **Evaluation Criteria**: Dedicated block detailing how MCP integration and autonomous agent loops are tested.

### 6.4 Specialist Page: `/services/ai-talent/data-engineering-data-science-hiring` (`DataHiring.tsx`)
- **Role Groups**: Data Engineering, Data Science.
- **Interactive Role Matrix**: Data Engineer, Analytics Engineer, Data Platform Engineer, Streaming Engineer, Data Architect, Data Scientist.
- **Pipeline Rigor Block**: How we assess pipeline telemetry, data contracts, and schema drift handling.

### 6.5 Specialist Page: `/services/ai-talent/mlops-ai-platform-hiring` (`MLOpsPlatformHiring.tsx`)
- **Role Groups**: MLOps and ML Platform, LLMOps and AgentOps.
- **Interactive Role Matrix**: MLOps Engineer, AI Platform Engineer, LLMOps Engineer, AgentOps Engineer, AI Systems Engineer.
- **Platform Lifecycle Matrix**: Visual mapping of the 5 pillars (Registry, CI/CD Gates, Observability, FinOps, Governance).

### 6.6 Leadership Page: `/services/ai-talent/ai-leadership-executive-search` (`AILeadershipSearch.tsx`)
- **Hero**: Executive styling with dark navy accents and confidential search banner.
- **Roles Targeted**: CAIO, Head of AI, VP AI/Data, AI Directors, Distinguished Architects, GCC AI Heads.
- **Executive Search Milestone Flow**: 7 confidential stages (Mandate -> Market Map -> Confidential Outreach -> Structured Assessment -> Practitioner Validation -> Shortlist -> Offer & Onboarding).
- **"What a Head of AI Owns" Grid**: 6-card capability framework (Mandate, Team Topology, Platform, Governance, Business Value, C-Suite Relationships).

### 6.7 Scale Hiring: `/services/ai-talent/recruitment-hub` (`RecruitmentHub.tsx`)
- **Hero**: Focus on scale hiring (10 to 100+ hires) with dedicated PODs.
- **Hub Architecture Grid**: 11 offer components (POD, NeoHireX, Screening, AI Interview, Technical Assessment, Scheduling, Analytics, Dashboards).
- **Scale Tiers Matrix**: Interactive tier cards (10 hires, 20-50 hires, 50-100+ hires).
- **NeoHireX Demo CTA**: Direct booking and live tour path.

### 6.8 Capability Building: `/services/ai-talent/ai-reskilling-academy` (`AIReskillingAcademy.tsx`)
- **Hero**: "Build AI talent from the engineering team you already have".
- **7-Stage Conversion Flow**: Assessment -> Capability Gap -> Role Conversion -> Learning Path -> Real Project -> Technical Validation -> Internal Deployment.
- **Conversion Pathways Grid**: 6 high-conversion transition cards (e.g. Backend -> GenAI Engineer, DevOps -> MLOps Engineer, QA -> AI Evaluation Engineer) with visual arrows and prerequisite/curriculum callouts.

---

## 7. Implementation Boundaries

### ALWAYS:
- Preserve all existing route URLs, SEO titles, descriptions, and breadcrumb schemas.
- Ensure all CTA links generate valid booking URLs with correct `sourcePage` and `serviceInterest`.
- Keep responsive design flawless on mobile (375px), tablet (768px), and desktop (1280px+).
- Use semantic HTML tags (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<h1>`–`<h3>`).
- Run tests (`npm run test`) and verify the build (`npm run build`) before considering any task complete.

### ASK FIRST:
- Modifying any shared files in `src/components/ai-gcc/` or `src/components/layout/`.
- Changing route definitions in `src/App.tsx`.
- Adding new third-party NPM packages (prefer Lucide React and existing dependencies).

### NEVER:
- Modify or break any `/services/ai-gcc/*` routes or component logic.
- Remove technical depth or role criteria from candidate signal sections.
- Use raw, unstyled HTML elements without design system tokens.
- Commit code with TypeScript compilation errors or broken links.

---

## 8. Automated Test Contracts (Strict Constraints)
The test suite in `src/test/aiTalentSection.test.ts` asserts strict invariants on all 8 pages:
1. **Single H1 via Layout Hero**: Each page passes `hero={{ title: "..." }}` to `AiTalentPageLayout`. The page source must NOT contain an explicit `<h1` tag inside the page body, and the `title` string must match the exact canonical wording:
   - `/services/ai-talent`: `"AI, ML & Data Talent Services in India"`
   - `/services/ai-talent/ai-ml-recruitment`: `"AI & Machine Learning Recruitment in India"`
   - `/services/ai-talent/genai-agentic-ai-hiring`: `"Hire GenAI & Agentic AI Engineers in India"`
   - `/services/ai-talent/data-engineering-data-science-hiring`: `"Hire Data Engineering & Data Science Talent in India"`
   - `/services/ai-talent/mlops-ai-platform-hiring`: `"Hire MLOps & AI Platform Engineers in India"`
   - `/services/ai-talent/ai-leadership-executive-search`: `"AI Leadership & Executive Search in India"`
   - `/services/ai-talent/recruitment-hub`: `"Your AI Recruitment Hub in India"`
   - `/services/ai-talent/ai-reskilling-academy`: `"Build AI talent from the engineering team you already have."`
2. **Breadcrumb Structure**: Must resolve to `Home -> AI Talent` (hub) or `Home -> AI Talent -> [Service Name]` (inner pages).
3. **No FAQPage Schema Drift**: Pages emit a `Service` JSON-LD schema, not a duplicate `FAQPage` schema.
4. **Valid Links Only**: All internal links must link to valid registered paths with no trailing slashes or broken query params.

---

## 9. Definition of Done (Success Criteria)
1. **Visual & Aesthetic Quality**: All 8 pages render on the signature `#E7EDF9` canvas with modern typography, navy line icons, badge chips, and smooth Framer Motion transitions.
2. **Component Reusability**: Components in `src/components/ai-talent/` are modular, strongly typed, and cleanly decoupled.
3. **Automated Tests Pass**: `npm run test` passes 100% of all 10 tests in `src/test/aiTalentSection.test.ts`.
4. **Zero Regressions**: No broken routes, no build errors (`npm run build`), and booking workflows route properly.
5. **Browser Verified**: Verified with DevTools at mobile and desktop viewport sizes with zero console errors.
