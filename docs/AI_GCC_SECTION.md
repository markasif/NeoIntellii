# AI GCC section

The `/services/ai-gcc` section positions NeoIntelli as the **AI GCC Operating Partner in India**. This note records how the section is built so that later edits keep the contract.

## Pages

| Route | Component | Search intent |
|---|---|---|
| `/services/ai-gcc` | `src/pages/services/AISolutions.tsx` | AI GCC India (hub) |
| `/services/ai-gcc/ai-advisory-strategy` | `src/pages/services/ai-gcc/AIAdvisoryStrategy.tsx` | AI advisory for GCCs |
| `/services/ai-gcc/setup-operations` | `src/pages/services/ai-gcc/SetupOperations.tsx` | AI GCC setup India |
| `/services/ai-gcc/generative-ai` | `src/pages/services/ai-gcc/GenerativeAI.tsx` | Agentic AI GCC |
| `/services/ai-gcc/data-engineering` | `src/pages/services/ai-gcc/DataEngineering.tsx` | AI data platform GCC |
| `/services/ai-gcc/mlops` | `src/pages/services/ai-gcc/MLOps.tsx` | MLOps / AgentOps GCC |
| `/services/ai-gcc/responsible-ai` | `src/pages/services/ai-gcc/ResponsibleAI.tsx` | AI governance GCC |
| `/services/ai-gcc/ai-infrastructure-gpu` | `src/pages/services/ai-gcc/AIInfrastructureGpu.tsx` | AI infrastructure / GPU setup GCC |

URLs are unchanged from the previous version; only visible names, titles and H1s changed. The GPU page is new.

## Single source of truth

- `src/data/aiGcc.ts` holds routes, subnav labels, visible service names, CTA labels, lead-form service interest values, the nine operating engines and the contextual links to Micro GCC, recruitment, GCC services and the planning tools. Subnav, hub cards, related links, footer labels and tests read from it.
- `src/data/aiGccSources.ts` holds every external statistic with publisher, title, year, URL and context. No number renders on these pages without passing through `SourceNote`.
- `src/lib/seo.ts` holds titles, meta descriptions, keywords, the `Service` schemas and the shared `Organization` entity (`https://neointelli.com/#organization`). The hub no longer emits `FAQPage`; buyer questions are plain HTML headings via `AnswerBlock`.
- `src/lib/pageMeta.ts` holds the short names used for breadcrumbs (Home → AI GCC → Service) and related-link cards.

## Shared components (`src/components/ai-gcc/`)

`AiGccPageLayout` (navbar, hero, subnav, content, CTA, related, expert review, footer), `AiGccHero`, `AiGccSubnav`, `AiGccCTA`, `Section`, `InBrief`, `SourceNote`, `ExpertReview`, `OperatingEngineGrid`, `AiGccArchitecture`, `BuyerPathCards`, `ResponsiveTable`, `GpuComputeComparison`, `RelatedAiGccServices`, `AnswerBlock`, `FlowDiagram`, `CapabilityGrid`, `PointOfView`, `MetricsWeDesignFor`.

Titles and meta come only from `SEOHead` via `ROUTE_SEO`; the layout never touches `document.title`.

## Lead attribution

Every AI GCC CTA links to `/book-a-call` with `placement`, `type=ai`, `source_page`, `service_interest` and `cta_name` (`src/lib/aiGccCta.ts`). `/book-a-call` echoes the three lead parameters into the existing `cta_book_call_click` and `meeting_booked` dataLayer events. No new analytics platform.

## Claim governance

- External statistics: only the two McKinsey "State of AI 2025" figures in `aiGccSources.ts`, each with source, year and context. They were cross-checked against secondary reports during the September 2026 rewrite because the primary page could not be fetched from the build environment. Confirm against the primary source before treating them as final.
- Engineering objectives are labelled "Metrics we design for" / "Metrics we expose" and carry no numbers.
- Removed: 10x deployment frequency, 30%+ infra savings, 99.5% pipeline reliability, <1% hallucination, 30-50% productivity, 60%+ cost reduction, "pilot to production in 3-4 months", indicative investment ranges and the 12-week launch plan, all of which were unsourced or NeoIntelli benchmarks without verification.
- The AI GCC section uses "Explore the GCC Blueprint" and never "9-Day GCC Blueprint". Pages outside this section (home, GCC Services, landing pages) still mention a 9-day readiness sprint; that wording is out of scope here and should be reconciled with the 4-8 week Blueprint separately.

## Expert review

`ExpertReview` renders "Reviewed by Karthick Raju · Reviewed <date>" from `AI_GCC_EXPERT_REVIEW` in `src/data/aiGcc.ts`. Update `reviewedOn` when the content is materially revised. The site names no job title and no company for Karthick Raju anywhere: the reviewer records leave `role` unset, the `/lp/india-engineering-squad` profiles leave `designation` and `shortRole` null, and `src/lib/seo.ts` carries no `founder`, `jobTitle` or `worksFor` for him. Leave it that way.

## Agent readiness

- `public/robots.txt` allows search and answer-engine crawlers (Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot). Training crawlers are listed separately; the current policy allows them and was not changed.
- `public/llms.txt` mirrors the canonical pages only.
- Markdown content negotiation, Content Signals, WebMCP, MCP cards and the other agent-protocol items were deliberately not implemented; see the rewrite summary for the reasoning.

## Tests

`src/test/aiGccSection.test.ts` locks routes, indexability, sitemap source, titles, single H1, breadcrumbs, Service schemas, related-link counts, In brief blocks, llms.txt links, the absence of 9-day wording and unsourced metrics, and CTA attribution.
