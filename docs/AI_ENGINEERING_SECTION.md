# Enterprise AI Engineering section

The `/services/ai-engineering` section positions NeoIntelli as a **production AI engineering partner**: identify the AI opportunity, engineer it into production, then help build the permanent team, AI Micro GCC or AI GCC that owns it. Defining message: **Build AI that works in production.** Broader story: **Build the AI. Build the team. Build the capability.**

It replaces the former Technology Solutions category. This note records how the section is built, how the migration was done and what remains open, so later edits keep the contract and the parallel AI GCC and AI Talent work merges cleanly.

## Pages

| Route | Component | H1 | Primary CTA |
|---|---|---|---|
| `/services/ai-engineering` | `src/pages/services/AIEngineering.tsx` | Build AI that works in production. | Discuss My AI Use Case |
| `/services/ai-engineering/generative-agentic-ai` | `src/pages/services/ai-engineering/GenerativeAgenticAI.tsx` | Build Generative & Agentic AI for real enterprise workflows. | Discuss My GenAI / Agentic Use Case |
| `/services/ai-engineering/applied-ai-ml` | `src/pages/services/ai-engineering/AppliedAIML.tsx` | Applied AI & Machine Learning for business decisions. | Assess My AI / ML Use Case |
| `/services/ai-engineering/data-engineering` | `src/pages/services/ai-engineering/DataEngineering.tsx` | Build the data foundation your AI can trust. | Assess My AI Data Foundation |
| `/services/ai-engineering/ai-product-engineering` | `src/pages/services/ai-engineering/AIProductEngineering.tsx` | Build AI into the product, not beside it. | Discuss My AI Product |
| `/services/ai-engineering/ai-agents-automation` | `src/pages/services/ai-engineering/AIAgentsAutomation.tsx` | Turn business workflows into agent-enabled systems. | Map My AI Automation Opportunity |
| `/services/ai-engineering/mlops-llmops-agentops` | `src/pages/services/ai-engineering/MLOpsLLMOpsAgentOps.tsx` | Operate models, LLM applications and agents in production. | Review My Production AI Stack |
| `/services/ai-engineering/ai-evaluation-assurance` | `src/pages/services/ai-engineering/AIEvaluationAssurance.tsx` | Know whether your AI actually works. | Assess My AI Evaluation Approach |

Next.js route wrappers live in `pages/services/ai-engineering.tsx` and `pages/services/ai-engineering/*.tsx` and follow the existing `PageShell` / `createStaticProps` pattern.

## Single source of truth

- `src/data/aiEngineering.ts` holds routes, visible names, subnav and menu labels, H1s, SEO titles, meta descriptions, keywords, CTA labels, `service_interest` values, the six-stage lifecycle, the Production AI Readiness Framework dimensions and stages, and the cross-pillar link targets. The subnav, hub cards, related links, `ROUTE_SEO`, `PRERENDER_ROUTES`, the `Service` schemas and the tests read from it.
- `src/data/aiEngineeringSources.ts` holds the external references cited through `SourceNote` (Sculley et al. 2015, Google's Rules of ML, NIST AI RMF 1.0, the Model Context Protocol). No statistics are used anywhere in the section, so there are none to source.
- `src/lib/seo.ts` derives titles, descriptions and keywords from the registry, maps `/services/ai-engineering*` to `og-ai-engineering.png`, and emits one `Service` entity per page referencing the shared Organization (`https://neointelli.com/#organization`). The hub `Service` carries an `OfferCatalog` of the seven children. No `FAQPage` or `QAPage` markup: buyer questions are plain HTML headings via `AnswerBlock`.
- `src/lib/pageMeta.ts` holds the short names used for breadcrumbs (Home → Services → AI Engineering → Page) and related-link cards.

Titles and meta come only from `SEOHead` via `ROUTE_SEO`; the layout never touches `document.title`.

## Shared components (`src/components/ai-engineering/`)

`AiEngineeringPageLayout` (navbar, hero with visible breadcrumbs, subnav, content, one contextual CTA, related services, footer), `AiEngineeringHero`, `AiEngineeringSubnav` (real links, horizontally scrollable on mobile, `aria-current`), `AiEngineeringCTA`, `Section`, `InBrief`, `AnswerBlock`, `AiCapabilityGrid`, `AiEngineeringLifecycle`, `ArchitectureDiagram`, `FlowDiagram`, `DecisionComparison` (table scrolls inside its own container), `EngineeringMetricGrid`, `PathCards`, `PointOfView`, `ReadinessFramework`, `RelatedAiServices`, `SourceNote`.

Each page has its own text-based technical visual (`FlowDiagram` with page-specific steps; the hub uses `ArchitectureDiagram` and `AiEngineeringLifecycle`). No essential copy lives inside images.

## Lead context

Every primary CTA links to `/book-a-call?type=ai&placement=…&source_page=…&service_interest=…&cta_name=…` (`src/lib/aiEngineeringCta.ts`). The three lead keys match the convention the parallel AI GCC work uses, so the single reader that work adds to `/book-a-call` will echo AI Engineering context into `cta_book_call_click` and `meeting_booked` as well. This branch deliberately does not modify `src/pages/BookACall.tsx`, to avoid a merge conflict with that work. If the AI GCC branch does not merge, add the same three-line read to `BookACall.tsx` (see `readAiEngineeringLeadParams`).

The secondary CTA links to `/contact?topic=Enterprise AI engineering&source_page=…&service_interest=…&cta_name=…`. `src/pages/Contact.tsx` pre-selects the topic and writes the three values into hidden fields of the existing Netlify `contact` form (declared in `public/__forms.html`, locked by `src/test/netlifyFormDeclarations.test.ts`). No new form system.

Cal.com only forwards UTM and click-id keys to the booking record today (`calTrackingConfig` in `src/lib/calEmbed.ts`); the lead keys are captured in the dataLayer events, not on the cal.com booking itself. Extending `TRACKED_KEYS` would forward them, provided the cal.com event type has matching booking questions. Verify in a test booking before relying on it.

## Technology → AI Engineering migration

### Routes found

All routes under `/services/technology` in the repository were inventoried from `src/App.tsx`, `pages/services/technology*`, `ROUTE_SEO`, `PRERENDER_ROUTES`, `pageMeta`, `buildServiceSchema`, `PAGE_FAQS`, `public/llms.txt`, `scripts/validate-seo.mjs` and every internal link. Exactly five existed; no unknown routes were found. No backlink, analytics or Search Console data is present in the repository or connected tooling, so redirect targets were chosen on content intent alone.

| Current route | Current title / H1 | Purpose | New destination | Redirect | Reason |
|---|---|---|---|---|---|
| `/services/technology` | GCC Technology Enablement / "Technology that makes your GCC an asset." | Broad technology pillar: product engineering, data platforms, automation, integration for GCCs | `/services/ai-engineering` | 301 | Pillar-to-pillar; the AI Engineering hub covers the same buyer intent with an AI-first scope |
| `/services/technology/data-platform` | Data Platform Services for GCCs / "Data Platform." | Data architecture, pipelines, lakehouse, governance, analytics enablement | `/services/ai-engineering/data-engineering` | 301 | Equivalent intent; content merged (lakehouse, pipelines, quality, lineage, cataloguing, governance) |
| `/services/technology/process-automation` | Process Automation Services for GCCs / "Process Automation." | Workflow automation, RPA, IDP, process modernisation | `/services/ai-engineering/ai-agents-automation` | 301 | Repositioned as AI-enabled workflow automation; the new page keeps deterministic automation and RPA as layer 1 |
| `/services/technology/product-engineering` | Product Engineering Services for GCCs / "Product Engineering." | Product development lifecycle, platform engineering, cloud-native architecture | `/services/ai-engineering/ai-product-engineering` | 301 | Repositioned around AI-native products and AI features in existing software |
| `/services/technology/integration-programs` | Enterprise Integration Programs for GCCs / "Integration Programs." | API strategy, middleware, system integration, migration | `/services/ai-engineering` | 301 | Integration is now a capability embedded across AI Product Engineering, AI Agents & Automation, Data Engineering and GenAI; no single child page matches the whole intent, so the hub is the safe target |

`/services/development`, an older alias that redirected to `/services/technology`, now points straight at `/services/ai-engineering` so there is no chain. Redirects are declared in `next.config.mjs` with `statusCode: 301` (not `permanent: true`, which Next.js serves as 308). Trailing-slash variants (`/services/technology/`) are normalised first by Next.js's built-in 308 and then hit the 301; this two-hop path is inherent to the framework's trailing-slash handling and applies to every redirect on the site.

### Removed references

The retired pages and their source components were deleted (`pages/services/technology*`, `src/pages/services/TechnologySolutions.tsx`, `src/pages/services/technology/*`). Technology entries were removed from `src/App.tsx`, `ROUTE_SEO`, `PRERENDER_ROUTES` (and therefore the sitemap), `pageMeta`, `buildServiceSchema`, `PAGE_FAQS`, the OG-image prefix map, the mega menu ("What We Do" step 06 and the Solutions column), the footer column, the homepage service card and capability list, `/lp/newhome`, `public/llms.txt` and `scripts/validate-seo.mjs`. Related-link references on the GCC, pods, talent and recruitment pages, one blog post link and the AI GCC data engineering related link now point directly at final AI Engineering URLs. `public/images/og/og-technology.png` is kept on disk so previously shared social cards do not break.

## Navigation

Navigation is generated from `SERVICE_PILLARS` in `src/data/serviceNav.ts`, which `main` introduced. AI Engineering is pillar 1, with an Overview link plus the seven children, and it feeds the "What We Do" cards, the "Solutions" mega menu and the footer service columns from one declaration. `navAvailability.ts` filters any link whose route does not exist, so pillars still on parallel branches stay hidden until they merge.

Section subnav labels (from the AI Engineering registry, not the taxonomy): Overview, GenAI & Agents, Applied AI & ML, Data Engineering, AI Product Engineering, AI Automation, MLOps & AgentOps, AI Evaluation.

## Cross-pillar links

Centralised in `AI_ENGINEERING_CROSS_LINKS`:

- AI Talent → `/services/ai-data-recruitment` (the current canonical AI hiring page). Retarget here if the AI Talent work changes its hub URL.
- AI Micro GCC → `/services/micro-gcc`.
- AI GCC → `/services/ai-gcc`.
- Responsible AI governance → `/services/ai-gcc/responsible-ai` (linked contextually from GenAI, Agents, MLOps and Evaluation; no governance page was duplicated).
- AI infrastructure & GPU → `/services/ai-gcc` for now. The dedicated `/services/ai-gcc/ai-infrastructure-gpu` page exists only on the parallel AI GCC branch; switch this constant to it once that branch has merged so the link never 404s in between. No GPU page was created here.

No edits were made to AI GCC page copy except one related-link href on `src/pages/services/ai-gcc/DataEngineering.tsx` that pointed at a retired Technology URL.

## Cannibalisation guard

AI GCC pages answer "what capabilities should my AI GCC own?" (ownership, operating model, team topology, standards, governance). AI Engineering pages answer "can NeoIntelli design and build this for my company?" (implementation, architecture, pipelines, evaluation, delivery). The data engineering page states this distinction explicitly and links to the AI GCC counterpart; no copy blocks are shared between the two sections.

## Claim governance

- No quantitative claims, percentages, multipliers, timelines or client evidence appear in the section (`src/test/aiEngineeringSection.test.ts` fails on `%` and `Nx` patterns).
- Engineering objectives are labelled "Metrics we design for" / "Metrics we measure" with the note that targets are agreed per system against a baseline.
- External references render only through `SourceNote` with publisher, title, year and URL. Google's Rules of ML carries no publication date; it is labelled "undated guide". Verify each reference against the primary source before treating it as final.
- Editorial positions render through `PointOfView` and are presented as NeoIntelli's view, not as universal fact.

## Production AI Readiness Framework

Structure only: eleven dimensions and five stages in `src/data/aiEngineering.ts`, rendered by `ReadinessFramework` on the hub. No scoring benchmarks are published; add them only with evidence.

## Parallel work (resolved)

The parallel work merged to `main` first as PR #48 (AI GCC restructure, the new AI Talent section, and a navigation restructure around six service pillars). `main` was merged into this branch and the five conflicts were resolved as follows.

| File | Resolution |
|---|---|
| `src/components/layout/megaMenu.ts` | Took `main`. Navigation is now generated from `SERVICE_PILLARS`, so the hand-written AI Engineering column is redundant. |
| `src/components/layout/Footer.tsx` | Took `main`, same reason. |
| `src/pages/services/ai-gcc/DataEngineering.tsx` | Took `main`. Its rewrite carries no Technology link, so the one-line fix this branch made is no longer needed. |
| `public/llms.txt` | Took `main`'s restructured file and re-inserted the `## AI Engineering` section ahead of `## AI GCC`, matching pillar order. |
| `src/lib/seo.ts` | Rebased onto `main` rather than stitching markers: kept its new AI GCC, GPU and AI Talent routes and schemas, then re-applied the AI Engineering routes, schemas and OG mapping and the Technology removals. |

`main` declared this section in `src/data/serviceNav.ts` as pillar 1 with `status: "pending"` and `source: claude/ai-engineering-services-5p5alr`, and all seven child URLs match what this branch built. The merge flips the pillar and its seven links to `live` and drops the now-unused branch constant, which is what `src/test/serviceNav.test.ts` asks for when a pending branch lands.

Three further changes the merge required:

- `main`'s `TRANSITIONAL_LINKS` still carried `Technology Solutions -> /services/technology`, a route this branch retires. It was removed. `navAvailability.ts` would have hidden it at render time, so it was never a user-visible 404, but it was a navigation entry pointing at nothing.
- `main` changed `buildBreadcrumbItems` to drop intermediate segments with no page of their own, so the trail is `Home -> AI Engineering -> Service`. `AiEngineeringHero` was updated to match; otherwise the visible breadcrumb would have disagreed with the page's own `BreadcrumbList`.
- Two fixtures in `src/test/serviceNav.test.ts` used `/services/ai-engineering` as an example of a route that does not exist yet. They now use `/services/ai-delivery-teams`, which is still pending, and the suite asserts that AI Engineering is live.

Cross-links were retargeted now that their destinations exist: AI Talent points at the `/services/ai-talent` pillar (the legacy `/services/ai-data-recruitment` page still resolves but is out of navigation and `llms.txt`), and AI infrastructure points at `/services/ai-gcc/ai-infrastructure-gpu`.

Still pending on their own branches, declared in `serviceNav.ts` and hidden by `navAvailability.ts` until they land: AI Delivery Teams, GCC Strategy & Setup, GCC Operations & Managed Services.

## Tests

`src/test/aiEngineeringSection.test.ts` locks the route list, H1/title map, uniqueness, indexability, prerender and sitemap source, breadcrumb names, `Service` schemas, absence of `FAQPage`, social image, 301 redirects without chains, removal of Technology references, AI GCC technical pages left intact, navigation and llms.txt entries, the 50-100 word In brief on every child page, the 50-80 word definition on the hub, the absence of em dashes, hype vocabulary and unsupported numbers, source completeness, and CTA lead context.

## Styling note

Section components use `text-primary`, not `text-heading`, for headings and emphasis text. Both resolve to the same colour (`--heading` and `--primary` are both `244 36% 31%`), but the global `.text-heading` utility in `src/index.css` also sets `font-size: 1.5rem`, which overrode Tailwind size utilities on any element that combined the two (subnav links and table cells rendered at 24px). Keep using `text-primary` here; changing it back reintroduces the sizing bug.

## QA record

Verified against a production build (`npm run build`, exit 0) served by `next start`.

- **Build, lint, types, tests.** Production build succeeds. `npx tsc --noEmit -p tsconfig.app.json` is clean. ESLint reports no new errors or warnings in the section; the two pre-existing `no-explicit-any` errors in `src/components/layout/MegaMenuPanel.tsx` are present on `main` and were left alone. `npx vitest run` passes 145 tests across 11 files. Note that `npm run lint` (`next lint`) prompts for interactive ESLint setup and cannot run unattended; use `npx eslint` instead.
- **Routes.** All eight URLs return 200 with exactly one H1, a self-referencing canonical, `index,follow` robots, and Organization, WebSite, WebPage, BreadcrumbList and Service JSON-LD with no duplicate types and no dangling `@id` references. Titles, H1s and meta descriptions are unique across the section.
- **Redirects.** All five retired Technology URLs plus `/services/development` return 301 to a final canonical URL that itself returns 200, with no chains and no loops. Trailing-slash variants take the framework's built-in 308 normalisation first, then the 301.
- **Sitemap.** 111 URLs, 8 AI Engineering entries, 0 Technology entries.
- **AI GCC.** The four AI GCC technical pages still return 200 and are unchanged.
- **Responsive and accessibility.** 24 checks across 375px, 768px and 1366px: no horizontal overflow on any page at any width, exactly one H1, exactly one `aria-current="page"` in the subnav, no console errors, and no text below 11px. Keyboard tabbing moves through the subnav in order with visible focus rings.
- **SEO validator.** `node scripts/validate-seo.mjs` passes 423 assertions across 13 routes, including the two new AI Engineering routes added to its route list.
- **Lead context.** `/book-a-call` and `/contact` both return 200 with the lead parameters attached.
