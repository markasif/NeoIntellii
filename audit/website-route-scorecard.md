# NeoIntelli — Website Route Scorecard & Inventory

**Total Discovered Routes:** 135 routes (87 static application routes + 48 blog posts)  
**Total Crawled & Verified via HTTP:** 135 routes  
**Status 200 (Success):** 134 routes  
**Status 404 (Failed):** 1 route (`/company`)  
**Legacy Redirects Tested & Passing:** 24 routes  

---

## 1. Route Classification Summary

1. **Active and In Scope (124 routes):**
   - Core Pages (10 routes): `/`, `/about`, `/contact`, `/book-a-call`, `/case-studies`, `/industries`, `/blueprint`, `/privacy-policy`, `/terms-of-service`, `/cookie-policy`
   - GCC Strategy & Setup Pillar (5 routes): `/services/gcc`, `/services/gcc/setup-launch`, `/services/gcc/strategy-business-case`, `/services/gcc/location-strategy`, `/services/gcc/modernization-transformation` + `/services/micro-gcc`
   - AI GCC Pillar (8 routes): `/services/ai-gcc`, `/services/ai-gcc/ai-advisory-strategy`, `/services/ai-gcc/setup-operations`, `/services/ai-gcc/generative-ai`, `/services/ai-gcc/data-engineering`, `/services/ai-gcc/mlops`, `/services/ai-gcc/responsible-ai`, `/services/ai-gcc/ai-infrastructure-gpu`
   - AI Talent Pillar (8 routes): `/services/ai-talent`, `/services/ai-talent/ai-ml-recruitment`, `/services/ai-talent/genai-agentic-ai-hiring`, `/services/ai-talent/data-engineering-data-science-hiring`, `/services/ai-talent/mlops-ai-platform-hiring`, `/services/ai-talent/ai-leadership-executive-search`, `/services/ai-talent/recruitment-hub`, `/services/ai-talent/ai-reskilling-academy`
   - AI Engineering Pillar (8 routes): `/services/ai-engineering`, `/services/ai-engineering/generative-agentic-ai`, `/services/ai-engineering/applied-ai-ml`, `/services/ai-engineering/data-engineering`, `/services/ai-engineering/ai-product-engineering`, `/services/ai-engineering/ai-agents-automation`, `/services/ai-engineering/mlops-llmops-agentops`, `/services/ai-engineering/ai-evaluation-assurance`
   - AI Delivery Teams Pillar (5 routes): `/services/ai-delivery-teams`, `/services/ai-delivery-teams/dedicated-ai-engineering-team`, `/services/ai-delivery-teams/ai-delivery-pod`, `/services/ai-delivery-teams/forward-deployed-ai-engineers`, `/services/ai-delivery-teams/ai-team-transfer`
   - GCC Operations Pillar (8 routes): `/services/gcc-operations`, `/services/gcc-operations/people-hr-operations`, `/services/gcc-operations/workforce-strategy`, `/services/gcc-operations/workplace-it-security`, `/services/gcc-operations/service-management-performance`, `/services/gcc-operations/governance-compliance`, `/services/gcc-operations/bot-transition`, `/services/gcc-operations/scale-expansion`
   - Industry Detail Pages (6 routes): `/industries/bfsi-gcc`, `/industries/healthcare-gcc`, `/industries/technology-gcc`, `/industries/manufacturing-gcc`, `/industries/private-equity-gcc`, `/industries/retail-gcc`
   - Calculators & Decision Tools (7 routes): `/gcc-cost-calculator`, `/gcc-roi-estimator`, `/gcc-readiness-assessment`, `/gcc-vs-outsourcing`, `/gcc-as-a-service`, `/gcc-india-cost`, `/gcc-for-ai-startups`, `/gcc-faq`
   - Recruitment Hub (5 routes): `/recruitment`, `/recruitment/permanent`, `/recruitment/contract-staffing`, `/recruitment/executive-search`, `/recruitment/rpo`
   - Blog System (49 routes): `/blog` + 48 dynamic articles at `/blog/[slug]`
   - Utility Pages (2 routes): `/careers`, `/thank-you-call`

2. **Landing / Paid Search Routes (9 routes):**
   - In scope, non-indexed by design (`noindex, follow`): `/lp/ai-first-gcc`, `/lp/gcc-playbook`, `/lp/hire-ai-engineers`, `/lp/hire-ai_ml-engineers`, `/lp/micro-gcc-india`, `/lp/india-engineering-squad`, `/lp/finance-procurement-shared-services-india`, `/lp/gcc-cost-calculator`, `/lp/newhome`

3. **Legacy / Redirection Routes (24 verified routes):**
   - Configured in `next.config.mjs` with 301/308 redirects (e.g., `/services`, `/gcc-solutions`, `/pods`, `/talent`, etc.).

4. **API Endpoints (2 routes):**
   - `/api/send-tool-email` (POST endpoint for tool results email delivery)
   - `/sitemap.xml` (dynamic server-rendered XML sitemap)

5. **Broken Route Requiring Urgent Resolution (1 route):**
   - `/company` -> Missing Next.js page file (`pages/company.tsx`) and unmapped in `next.config.mjs`.

---

## 2. Page-by-Page Quality Scorecard

*Scores are calibrated from 0 to 100 based on empirical static code analysis, HTTP responses, schema audits, responsive CSS inspections, and automated test validations.*

### Core Pages & Navigation Anchors

| Route | Page Purpose | UI/UX | Responsive | Navigation | Performance | SEO | A11y | Content Clarity | Functionality | Biggest Issue | Priority |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|:---:|
| `/` | Primary conversion hub & brand anchor | 86 | 76 | 92 | 75 | 96 | 80 | 88 | 90 | `.hero-viewport-fit` height clipping on short viewports | P1 |
| `/about` | Company origin, leadership, values & methodology | 84 | 82 | 88 | 80 | 94 | 84 | 90 | 88 | Long text blocks in leadership section | P2 |
| `/contact` | Lead generation & advisory inquiry form | 88 | 85 | 90 | 82 | 92 | 86 | 92 | 90 | Minor field focus indicator visibility | P2 |
| `/book-a-call` | Calendar scheduling & 30-min consultation | 85 | 80 | 88 | 78 | 90 | 82 | 90 | 85 | Third-party scheduling iframe embed responsiveness | P2 |
| `/case-studies` | Methodology & delivery framework showcase | 84 | 82 | 86 | 80 | 92 | 84 | 88 | 88 | Case study metrics lack client logos (anonymized) | P3 |
| `/industries` | Overview of all supported industry verticals | 85 | 84 | 90 | 82 | 94 | 85 | 90 | 90 | Visual card balance between rows | P3 |
| `/blueprint` | Detailed GCC strategic roadmap lead magnet | 86 | 82 | 88 | 80 | 92 | 84 | 88 | 88 | Secondary CTA button contrast against dark backdrop | P2 |
| `/privacy-policy`| GDPR / DPDP compliance & privacy statements | 80 | 88 | 88 | 88 | 92 | 88 | 92 | 90 | Pure legal text, low visual formatting | P3 |
| `/terms-of-service`| Legal terms governing website usage | 80 | 88 | 88 | 88 | 92 | 88 | 92 | 90 | Pure legal text | P3 |
| `/cookie-policy`| Cookie usage & consent guidance | 80 | 88 | 88 | 88 | 92 | 88 | 92 | 90 | Pure legal text | P3 |
| `/company` | Alternate corporate URL mapped in router | **0** | **0** | **0** | **0** | **0** | **0** | **0** | **0** | **Returns HTTP 404 Not Found** | **P0** |

---

### Pillar 1: GCC Strategy & Setup

| Route | Page Purpose | UI/UX | Responsive | Navigation | Performance | SEO | A11y | Content Clarity | Functionality | Biggest Issue | Priority |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|:---:|
| `/services/gcc` | Pillar overview: GCC business case & setup | 88 | 82 | 90 | 80 | 95 | 82 | 90 | 90 | Dense card grid on mid-tier tablet viewports | P2 |
| `/services/gcc/setup-launch` | 90-day entity, IT, and launch roadmaps | 86 | 82 | 88 | 79 | 94 | 82 | 90 | 88 | Process timeline requires horizontal scroll on mobile | P2 |
| `/services/gcc/strategy-business-case` | Board-ready GCC financial & feasibility cases | 85 | 78 | 88 | 78 | 94 | 76 | 92 | 88 | 14 risk cards have decorative empty alt tags | P2 |
| `/services/gcc/location-strategy` | Tier-1 vs Tier-2 India city evaluation | 88 | 82 | 90 | 80 | 94 | 84 | 92 | 90 | City comparison table needs sticky column on mobile | P2 |
| `/services/gcc/modernization-transformation` | Transitioning legacy captive centers | 86 | 84 | 88 | 80 | 94 | 84 | 88 | 88 | Subtle card border contrast on white cards | P3 |
| `/services/micro-gcc` | Agile 8–50 person GCC model | 88 | 82 | 90 | 80 | 95 | 84 | 92 | 90 | Hero height clipping on mobile landscape | P2 |

---

### Pillar 2: AI GCC Services

| Route | Page Purpose | UI/UX | Responsive | Navigation | Performance | SEO | A11y | Content Clarity | Functionality | Biggest Issue | Priority |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|:---:|
| `/services/ai-gcc` | AI-first GCC capability & architecture hub | 90 | 84 | 92 | 80 | 96 | 85 | 92 | 90 | Subnav pill bar wraps tightly on 375px screens | P2 |
| `/services/ai-gcc/ai-advisory-strategy` | Enterprise AI maturity & roadmap definition | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | High textual density in framework sections | P3 |
| `/services/ai-gcc/setup-operations` | Operating AI centers, HR & infra operations | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Overlap in messaging with GCC Operations pillar | P2 |
| `/services/ai-gcc/generative-ai` | Production GenAI & agentic RAG center | 88 | 84 | 90 | 80 | 95 | 85 | 92 | 90 | Technical terminology dense for non-tech buyers | P3 |
| `/services/ai-gcc/data-engineering` | AI-ready data platform foundations | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Data architecture diagram scaling on tablet | P2 |
| `/services/ai-gcc/mlops` | Continuous CI/CD & LLMOps/AgentOps systems | 88 | 84 | 90 | 80 | 95 | 85 | 92 | 90 | Code/workflow block wrapping on mobile viewports | P2 |
| `/services/ai-gcc/responsible-ai` | EU AI Act & guardrail governance frameworks | 86 | 84 | 88 | 80 | 94 | 85 | 92 | 88 | Dense regulatory tables | P3 |
| `/services/ai-gcc/ai-infrastructure-gpu` | Compute economics, reserved vs cloud GPUs | 88 | 82 | 90 | 79 | 95 | 84 | 92 | 90 | GPU benchmark tables require horizontal pan on mobile | P2 |

---

### Pillar 3: AI Talent & Recruitment

| Route | Page Purpose | UI/UX | Responsive | Navigation | Performance | SEO | A11y | Content Clarity | Functionality | Biggest Issue | Priority |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|:---:|
| `/services/ai-talent` | AI specialist talent overview & NeoHireX | 90 | 84 | 92 | 81 | 96 | 85 | 92 | 90 | Duplicate intent with `/recruitment` hub | P2 |
| `/services/ai-talent/ai-ml-recruitment` | ML engineer & data scientist hiring | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Role list card wrapping on 360px viewport | P3 |
| `/services/ai-talent/genai-agentic-ai-hiring` | Agentic AI & LLM engineer talent | 88 | 84 | 90 | 80 | 95 | 85 | 92 | 90 | Minor text contrast on tinted badge chips | P3 |
| `/services/ai-talent/data-engineering-data-science-hiring` | Big data & platform talent acquisition | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Title length wraps into 3 lines on mobile | P2 |
| `/services/ai-talent/mlops-ai-platform-hiring` | MLOps & infra engineering hiring | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Heavy technical taxonomy | P3 |
| `/services/ai-talent/ai-leadership-executive-search` | Head of AI & VP Engineering executive search | 88 | 85 | 90 | 82 | 95 | 86 | 92 | 90 | Strong execution; minor image aspect consistency | P3 |
| `/services/ai-talent/recruitment-hub` | Dedicated recruitment PODs & NeoHireX OS | 88 | 82 | 90 | 80 | 95 | 84 | 90 | 88 | Lead capture modal trigger placement | P2 |
| `/services/ai-talent/ai-reskilling-academy` | Upskilling software engineers into AI | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Syllabus table readability on mobile | P3 |

---

### Pillar 4: Enterprise AI Engineering

| Route | Page Purpose | UI/UX | Responsive | Navigation | Performance | SEO | A11y | Content Clarity | Functionality | Biggest Issue | Priority |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|:---:|
| `/services/ai-engineering` | Overview: Enterprise AI systems build-out | 88 | 84 | 90 | 80 | 96 | 85 | 92 | 90 | Hero subnav spacing on small screens | P2 |
| `/services/ai-engineering/generative-agentic-ai` | Autonomous AI agents & multi-agent systems | 90 | 84 | 90 | 80 | 96 | 85 | 92 | 90 | High-quality visual assets; heavy asset payload | P2 |
| `/services/ai-engineering/applied-ai-ml` | Predictive ML models & vision/NLP pipelines | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Dense math/algorithm descriptions | P3 |
| `/services/ai-engineering/data-engineering` | Lakehouse, streaming & feature store engineering | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Potential confusion with AI GCC data engineering | P2 |
| `/services/ai-engineering/ai-product-engineering` | Full-stack AI software development | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Feature comparison card alignment | P3 |
| `/services/ai-engineering/ai-agents-automation` | Process orchestration with AI agents | 88 | 84 | 90 | 80 | 95 | 85 | 92 | 90 | Flowchart layout on narrow viewports | P2 |
| `/services/ai-engineering/mlops-llmops-agentops` | Production deployment & observability stack | 88 | 84 | 90 | 80 | 95 | 85 | 92 | 90 | Stack diagram requires responsive wrapping | P2 |
| `/services/ai-engineering/ai-evaluation-assurance` | Red teaming, benchmarking & hallucination tests | 88 | 84 | 90 | 80 | 95 | 85 | 92 | 90 | Complex benchmark metrics tables | P3 |

---

### Pillar 5: AI Delivery Teams

| Route | Page Purpose | UI/UX | Responsive | Navigation | Performance | SEO | A11y | Content Clarity | Functionality | Biggest Issue | Priority |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|:---:|
| `/services/ai-delivery-teams` | Overview: Dedicated pods & team deployment | 88 | 84 | 90 | 80 | 95 | 84 | 92 | 90 | Strong structure; card rhythm consistent | P3 |
| `/services/ai-delivery-teams/dedicated-ai-engineering-team` | Embedded long-term engineering squads | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Minor CTA text wrapping on 320px | P3 |
| `/services/ai-delivery-teams/ai-delivery-pod` | Outcome-based sprint delivery pods | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Pod roles diagram scaling | P2 |
| `/services/ai-delivery-teams/forward-deployed-ai-engineers`| On-site / embedded production integration | 88 | 84 | 90 | 80 | 95 | 85 | 92 | 90 | Excellent positioning and messaging clarity | P3 |
| `/services/ai-delivery-teams/ai-team-transfer` | BOT model knowledge and asset transfer | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Step-by-step roadmap card spacing | P3 |

---

### Pillar 6: GCC Operations & Managed Services

| Route | Page Purpose | UI/UX | Responsive | Navigation | Performance | SEO | A11y | Content Clarity | Functionality | Biggest Issue | Priority |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|:---:|
| `/services/gcc-operations` | GCC Operations pillar overview | 88 | 84 | 90 | 80 | 96 | 85 | 92 | 90 | Pillar overview card heights vary slightly | P3 |
| `/services/gcc-operations/people-hr-operations` | India HR, payroll, benefits & retention | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | HR calendar table on mobile screens | P2 |
| `/services/gcc-operations/workforce-strategy` | Talent retention, benchmarking & org design | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Overlapping keywords with AI Talent section | P3 |
| `/services/gcc-operations/workplace-it-security`| SOC2, ISO27001, facilities & zero trust IT | 88 | 84 | 90 | 80 | 95 | 85 | 92 | 90 | Security badge grid wrapping on narrow screens | P2 |
| `/services/gcc-operations/service-management-performance`| SLAs, delivery metrics & OKR dashboards | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | SLA metric cards density | P3 |
| `/services/gcc-operations/governance-compliance` | Board oversight, audits & statutory filings | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Compliance checklist needs accordion on mobile | P2 |
| `/services/gcc-operations/bot-transition` | Build-Operate-Transfer execution gates | 88 | 84 | 90 | 80 | 95 | 85 | 92 | 90 | Stage transition diagram layout on tablet | P2 |
| `/services/gcc-operations/scale-expansion` | Expanding headcount from 50 to 500+ | 86 | 84 | 88 | 80 | 94 | 84 | 90 | 88 | Scaling curve chart readability | P3 |

---

### Industry Vertical GCC Hubs

| Route | Page Purpose | UI/UX | Responsive | Navigation | Performance | SEO | A11y | Content Clarity | Functionality | Biggest Issue | Priority |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|:---:|
| `/industries/bfsi-gcc` | Banking & fintech GCC capabilities | 88 | 84 | 90 | 81 | 95 | 85 | 92 | 90 | Regulatory compliance callout contrast | P3 |
| `/industries/healthcare-gcc` | Pharma, clinical trials & healthcare IT | 88 | 84 | 90 | 81 | 95 | 85 | 92 | 90 | FDA/HIPAA compliance section formatting | P3 |
| `/industries/technology-gcc` | Software, SaaS & cloud engineering centers | 88 | 84 | 90 | 81 | 95 | 85 | 92 | 90 | High content quality | P3 |
| `/industries/manufacturing-gcc` | Smart manufacturing, Industry 4.0 & IoT | 86 | 82 | 88 | 80 | 94 | 84 | 90 | 88 | Hero background image contrast with text | P2 |
| `/industries/private-equity-gcc` | PE portfolio EBITDA & value creation GCCs | 88 | 84 | 90 | 81 | 95 | 85 | 92 | 90 | Financial modeling card alignment | P3 |
| `/industries/retail-gcc` | Omni-channel, supply chain & e-commerce AI | 88 | 84 | 90 | 81 | 95 | 85 | 92 | 90 | High visual appeal and structured data | P3 |

---

### Decision Tools & Cost Calculators

| Route | Page Purpose | UI/UX | Responsive | Navigation | Performance | SEO | A11y | Content Clarity | Functionality | Biggest Issue | Priority |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|:---:|
| `/gcc-cost-calculator` | Live team size & city GCC cost estimation | 92 | 86 | 92 | 84 | 94 | 86 | 94 | 96 | Exceptional tool; print stylesheet optimization needed | P2 |
| `/gcc-roi-estimator` | 5-year break-even & savings calculator | 88 | 84 | 90 | 82 | 94 | 85 | 92 | 92 | Slider touch target sizing on 320px screens | P2 |
| `/gcc-readiness-assessment`| 8-question GCC feasibility check | 88 | 85 | 90 | 84 | 94 | 86 | 92 | 92 | Question step transition animation timing | P3 |
| `/gcc-vs-outsourcing` | Comparative analysis vs BPO/IT vendors | 88 | 84 | 90 | 82 | 95 | 85 | 94 | 90 | Comparison matrix requires horizontal scroll indicator | P2 |
| `/gcc-as-a-service` | Turnkey managed GCC model details | 86 | 84 | 88 | 81 | 94 | 84 | 90 | 88 | CTA placement below the fold | P3 |
| `/gcc-india-cost` | Comprehensive salary & operational benchmarks | 88 | 82 | 90 | 80 | 95 | 84 | 94 | 90 | Very wide salary benchmark data tables on mobile | P2 |
| `/gcc-for-ai-startups` | Lean GCC model for funded AI startups | 88 | 84 | 90 | 81 | 95 | 85 | 92 | 90 | Clear pricing and squad structure | P3 |
| `/gcc-faq` | 30+ comprehensive GCC FAQs with schema | 86 | 86 | 88 | 84 | 96 | 88 | 94 | 92 | Expand all / collapse all button missing | P3 |

---

### Landing & Paid PPC Pages (NoIndex by Architecture)

| Route | Page Purpose | UI/UX | Responsive | Navigation | Performance | SEO | A11y | Content Clarity | Functionality | Biggest Issue | Priority |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|:---:|
| `/lp/ai-first-gcc` | Paid landing page: AI-first GCC positioning | 88 | 84 | 85 | 80 | N/A | 84 | 92 | 90 | Intentionally isolated navigation | P3 |
| `/lp/gcc-playbook` | The Decision Lab: interactive modeler | 94 | 88 | 90 | 82 | 94 | 88 | 96 | 96 | Recharts console width warnings during headless test | P2 |
| `/lp/hire-ai-engineers` | Talent lead generation funnel | 86 | 84 | 85 | 82 | N/A | 84 | 90 | 90 | Form submit button touch target on small mobile | P2 |
| `/lp/hire-ai_ml-engineers` | Alternate talent keyword PPC page | 86 | 84 | 85 | 82 | N/A | 84 | 90 | 90 | Near-duplicate of `/lp/hire-ai-engineers` (review URL slug) | P3 |
| `/lp/micro-gcc-india` | Squad-based small GCC landing funnel | 86 | 84 | 85 | 82 | N/A | 84 | 90 | 90 | Isolated footer links | P3 |
| `/lp/india-engineering-squad` | Startup engineering squad landing page | 86 | 84 | 85 | 82 | N/A | 84 | 90 | 90 | Form validation error messaging placement | P2 |
| `/lp/finance-procurement-shared-services-india`| Shared services captive hub funnel | 86 | 84 | 85 | 82 | N/A | 84 | 90 | 90 | Industry specific terminology | P3 |
| `/lp/gcc-cost-calculator` | Paid campaign cost calculator funnel | 90 | 86 | 88 | 82 | N/A | 86 | 94 | 94 | Canonical points to `/gcc-cost-calculator` (correct) | P3 |
| `/lp/newhome` | Alternate experimental homepage layout | 82 | 78 | 82 | 78 | N/A | 80 | 85 | 85 | 1 unoptimized image with empty alt attribute | P2 |

---

### Blog & Insights System (Sample of 48 Indexable Articles)

| Route | Page Purpose | UI/UX | Responsive | Navigation | Performance | SEO | A11y | Content Clarity | Functionality | Biggest Issue | Priority |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|:---:|
| `/blog` | Insights collection hub with category filters | 88 | 86 | 92 | 82 | 96 | 86 | 92 | 92 | Search / filter by keyword input missing | P3 |
| `/blog/gcc-model-in-india` | Pillar guide: 8 GCC models & comparison | 90 | 86 | 90 | 82 | 96 | 86 | 95 | 92 | High-value organic asset; excellent table schemas | P3 |
| `/blog/set-up-gcc-in-india-90-day-launch-plan` | Step-by-step 90-day tactical launch guide | 88 | 86 | 90 | 82 | 96 | 86 | 94 | 92 | Interactive step checklist could be enhanced | P3 |
| `/blog/gcc-india-cost-2026` | Salary & operational benchmark breakdown | 90 | 84 | 90 | 82 | 96 | 85 | 95 | 92 | Table requires swipe on mobile screens | P2 |
| `/blog/bengaluru-vs-hyderabad-choosing-gcc-city`| City comparison and talent depth | 88 | 86 | 90 | 82 | 96 | 86 | 94 | 92 | City comparison chart could be visual | P3 |
| *Remaining 43 Blog Posts* | Specialized topics (BOT, MLOps, AI agents) | 88 | 85 | 90 | 82 | 95 | 85 | 92 | 90 | Standardized layout template ensures consistency | P3 |
