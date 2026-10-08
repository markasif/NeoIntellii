# AI Talent section

`/services/ai-talent` positions NeoIntelli on **technically validated AI talent**: specialist recruiters, the NeoHireX Hiring OS and practitioner-led technical validation, from one critical hire to an AI team, an AI Recruitment Hub or an AI Micro GCC.

## Pages

| Route | Component | Search family |
|---|---|---|
| `/services/ai-talent` | `AITalentOverview.tsx` | AI recruitment India, AI talent India |
| `/services/ai-talent/ai-ml-recruitment` | `AIMLRecruitment.tsx` | AI ML recruitment agency India |
| `/services/ai-talent/genai-agentic-ai-hiring` | `GenAIAgenticHiring.tsx` | GenAI recruitment, LLM engineer hiring, agentic AI hiring |
| `/services/ai-talent/data-engineering-data-science-hiring` | `DataHiring.tsx` | Data engineer / data scientist recruitment |
| `/services/ai-talent/mlops-ai-platform-hiring` | `MLOpsPlatformHiring.tsx` | MLOps recruitment, AI platform engineer hiring |
| `/services/ai-talent/ai-leadership-executive-search` | `AILeadershipSearch.tsx` | AI executive search, Head of AI hiring |
| `/services/ai-talent/recruitment-hub` | `RecruitmentHub.tsx` | AI RPO, AI recruitment outsourcing |
| `/services/ai-talent/ai-reskilling-academy` | `AIReskillingAcademy.tsx` | AI reskilling, GenAI upskilling for GCCs |

All components live in `src/pages/services/ai-talent/`; Next route files in `pages/services/ai-talent*`.

## Architecture

- `src/data/aiTalent.ts`: routes, subnav labels, visible names, CTAs, service-interest values, context links, the eight-step validation flow ("We interview. You hire.") and the `RoleProfile` type used by every specialist page (owns / production signals / resume signals that mislead / how NeoIntelli evaluates).
- `src/components/service-section/`: `ServiceHero`, `ServiceSubnav`, `ServiceCTA`, `RelatedServices`, shared by the AI GCC and AI Talent sections. The AI GCC wrappers in `src/components/ai-gcc/` delegate to these.
- `src/components/ai-talent/`: `AiTalentPageLayout` (navbar, hero with Home → AI Talent → Service crumbs, subnav, CTA, related, expert review, footer), `RoleProfiles`, `HiringPathCards`.
- CTAs book the `staffing` cal.com event via `/book-a-call` with `source_page`, `service_interest` and `cta_name`.

## Legacy recruitment pages

Nothing was deleted or redirected. Search Console clicks, impressions, backlinks and conversions must be reviewed first. Until then:

- `/services/ai-data-recruitment`, `/services/ai-talent-acquisition` and `/recruitment` stay live and indexable, are no longer in the mega menu, and link to the new section from their related links.
- The planned 301 map is in `next.config.mjs` as commented entries. Activating it also requires removing those paths from `ROUTE_SEO` (which drives the sitemap) and from the footer/llms.txt.
- `/recruitment/contract-staffing` is kept as the contract / contract-to-hire engagement model and is linked from the hub and footer.
- `/services/gcc/talent-management` (GCC workforce strategy) and `/services/talent` (delivery pods) are kept and unchanged.

## Claims

No statistics are published in this section. The competitor and market figures in the brief (Quess skill-gap percentages, Zyoin hire and talent-pool counts) were not used because they could not be verified from primary sources in the build environment. Competitor names do not appear on the pages; the test suite enforces this.

## Tests

`src/test/aiTalentSection.test.ts` locks routes, indexability, sitemap source, titles, single H1, breadcrumbs, Service schemas, In brief blocks, related-link counts, the validation flow, navigation promotion of the new hub, llms.txt links, and the absence of numeric claims, competitor names and generic anchors.
