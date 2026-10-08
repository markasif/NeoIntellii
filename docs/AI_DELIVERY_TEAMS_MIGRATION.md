# Talent Pods to AI Delivery Teams: migration record

Internal record for the migration that replaced the Talent Pods service category
with **AI Delivery Teams**, canonical parent `/services/ai-delivery-teams`.

Positioning: *Dedicated AI Engineering Teams, Delivery Pods & Forward-Deployed
Engineers.* "AI Delivery Pod" is now one engagement model inside the category,
not the category itself.

---

## 1. Route audit and migration matrix

Every `/pods/*` and `/services/talent*` route that existed before the migration.
Nothing was hard-deleted before its destination existed and its inbound links
were re-pointed.

| Current URL | Current title | Current H1 | Primary intent | Organic relevance | New destination | Redirect | Reason |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/services/talent` | Specialist Talent Pods & GCC Staffing India | You don't need more recruiters. You need a team that can ship. | Category page for senior-led delivery pods | Category-level; mixed AI, generic engineering, transformation, architecture, PMO intent | `/services/ai-delivery-teams` | 301 | Direct category replacement. Only the AI delivery-team concepts were carried across; the generic engineering, transformation, architecture, GCC seed-team and PMO material was dropped rather than migrated. |
| `/pods/ai-data` | AI & Data Pod for GCCs | AI & Data Pod. | One cross-functional AI/data delivery unit | Closest match to AI delivery-pod search intent | `/services/ai-delivery-teams/ai-delivery-pod` | 301 | Same intent, broader scope: the new page covers GenAI, Agentic AI, applied ML, data, MLOps, evaluation and AI product depending on the charter. |
| `/pods/engineering` | Engineering Pod for GCCs | Engineering Pod. | Embedded stable engineering team | Generic (frontend, backend, mobile, DevOps, platform); off-position for an AI specialist | `/services/ai-delivery-teams/dedicated-ai-engineering-team` | 301 | The useful part was the "embedded stable team" engagement model, which the dedicated AI team page now owns. A generic Engineering Pod was deliberately not recreated. |
| `/pods/transformation` | Transformation Pod for GCCs | Transformation Pod. | Program management, BA, change, process consulting, PMO, delivery management | Not AI delivery-team intent | `/services/gcc/operations-excellence` (see note) | 301 | GCC transformation/operations intent, not AI delivery. No replacement Transformation page was created in this stream. |
| `/pods/architecture` | Architecture Pod for GCCs | Architecture Pod. | Enterprise, solution, cloud, data, security, integration architecture | Belongs with AI engineering and GCC advisory | `/services/ai-gcc/ai-advisory-strategy` (see note) | 301 | Architecture and advisory intent. `/ai-delivery-teams/architecture-pod` was deliberately not created. |
| `/pods` | (no page; 404) | n/a | Directory root | None | `/services/ai-delivery-teams` | 301 | Added so a hand-typed or truncated legacy URL lands on the category rather than a 404. |
| `/staffing-solution-neointelli/:path*` | (legacy, already redirecting) | n/a | Legacy staffing URLs | Historic | `/services/ai-delivery-teams` | 301 | Re-pointed from `/services/talent` to the final destination so the rule does not become a two-hop chain. |

**Note on the two destinations marked "(see note)".** These two redirects resolve
at build time in `next.config.mjs` via `firstExistingRoute()`:

| Legacy URL | Preferred destination (parallel stream) | Destination used until it exists |
| --- | --- | --- |
| `/pods/transformation` | `/services/gcc/modernization-transformation` | `/services/gcc/operations-excellence` |
| `/pods/architecture` | `/services/ai-engineering` | `/services/ai-gcc/ai-advisory-strategy` |

The preferred routes belong to the parallel GCC Strategy and AI Engineering
workstreams and did not exist when this migration landed. Rather than shipping a
301 into a 404, or a hard-coded stop-gap that someone has to remember to change,
the config checks `pages/` at build time and switches to the preferred
destination on the first build after that page lands. No follow-up edit needed;
the redirect stays single-hop either way.

### Verified redirect behaviour

Checked against a production build (`npm run build && npm start`):

- Every legacy URL returns **301** on the first hop and lands on a **200** page.
- **No chains** (one hop), **no loops**, no legacy URL left resolving to a page.
- Trailing-slash forms (`/pods/ai-data/`) pick up Next.js's own slash
  normalisation (308) before the 301. That applies to every URL on the site and
  is not specific to these rules; the canonical, sitemapped forms are single-hop.
- All 114 unique internal links across the 108 sitemapped pages return 200, so no
  internal link points at a redirect.

---

## 2. Concepts deliberately retired

| Retired | Where its buyers now go |
| --- | --- |
| Talent Pods / Specialist Talent Pods (category) | AI Delivery Teams |
| Engineering Pod | Dedicated AI Engineering Team |
| Transformation Pod | GCC operations and transformation |
| Architecture Pod | AI engineering and advisory |
| GCC Seed Team | `/services/micro-gcc` ("Explore AI Micro GCC") |
| Architecture Council | AI engineering / AI GCC advisory (no standalone page) |
| Transformation PMO | GCC modernization / operations |
| Product Engineering Scale-Up | AI product engineering, or a dedicated AI team for ongoing work |

No SEO pages were created for team configurations (GenAI, ML, Data, MLOps,
Product, Evaluation). They appear as configurations inside the category and link
out to the technical capability page that owns each subject, which avoids
duplicating the AI Engineering pillar.

---

## 3. Claim audit

Every claim inherited from the Talent Pods page was classified before it could
appear on a new page. Nothing in the "removed" column was replaced with a
different number.

| Inherited claim | Classification | Action |
| --- | --- | --- |
| 6 to 9 months to hire a working AI team directly | Unsupported (no cited source) | Removed. The new pages describe the hiring-cycle trade-off qualitatively. |
| 4 to 6 weeks to stand up a pod | Unsupported | Removed. New pages state that durations are agreed at scoping. |
| 85%+ pod retention at 12 months | Unsupported first-party metric | Removed. |
| 70 to 75% GCC market retention benchmark | External research without a source or year | Removed. |
| 1:5 senior leverage (vs 1:15 in staff aug) | Unsupported | Removed. |
| 6 to 8 weeks to measurable output | Unsupported | Removed. |
| Capability transfer begins at month 6 | Unsupported fixed commitment | Removed. Team Transfer now states explicitly that no fixed transfer month is promised and publishes a 13-point readiness checklist instead. |
| 30+ GCCs shaped | Unsupported first-party metric | Not carried over. |
| 100% senior-led | Unsupported absolute | Not carried over. |
| Teams are **pre-assembled**, "not assembled on demand" | Material commercial claim, not consistently verifiable | Replaced with **purpose-assembled**: "purpose-assembled from technically validated AI specialists around the delivery mandate." |
| Pod members have **worked together before** | Not verifiable per engagement | Removed. The pages claim designed operating practice (review, evaluation, documentation, handover), not prior shared history. |
| "Instant readiness" / "instant operational readiness" (blog) | Unsupported | Removed, and the blog now argues explicitly that no engagement starts at full speed. |

Access-sensitive statements ("works in your repositories", "deploys") are
qualified with **where agreed** throughout. IP language is uniform: *client-specific
deliverables, NeoIntelli pre-existing IP, reuse rights and assignment terms are
defined in the engagement agreement before delivery begins.* Security language is
limited to least privilege, client-controlled access approval, secrets
management, environment isolation and defined production access. No certification
is claimed.

**Still requires a human before any number goes live:** any first-party metric
(time to assemble, technical qualification rate, retention, transfer duration,
production KPI improvement). The page components are structured so validated,
anonymised figures can be added later; none are published now.

---

## 4. Structured data

Reuses the existing shared infrastructure in `src/lib/seo.ts`: one canonical
`Organization` entity, `WebSite`, `WebPage`, `BreadcrumbList`, and a `Service`
node for the category parent. No invented Schema.org types.

`FAQPage` markup is deliberately **not** emitted for any of the five new pages.
Google no longer shows the FAQ rich result for most sites, and `QAPage` does not
apply to company-written answers. The visible question-and-answer content is kept
because it is useful to readers and to answer engines; only the markup is
omitted. Existing `FAQPage` usage elsewhere on the site was left untouched.

---

## 5. Editorial backlog (not built in this stream)

Supporting articles that would strengthen the five service pages. These are
listed as a backlog deliberately: thin posts written only to hold keywords would
work against the pages they are meant to support.

1. What Is a Forward-Deployed AI Engineer?
2. AI Delivery Pod vs Staff Augmentation
3. Dedicated AI Team vs In-House Hiring
4. AI Pod vs AI Consulting
5. How to Structure a GenAI Delivery Team
6. What Roles Does an Agentic AI Team Need?
7. How to Measure an AI Engineering Team
8. When Should AI Capability Move In-House?
9. How to Move AI From Pilot to Production
10. FDE vs Solutions Engineer

`/blog/specialist-talent-pods-gcc-india` was **kept at its existing URL** (no
redirect) and rewritten from a "pre-assembled specialist pods" thesis to a
comparison of AI delivery models, permanent hiring and a Micro GCC.

---

## 5b. Merge with the pillar restructure (PR #48)

`main` gained the six-pillar service taxonomy while this branch was in review.
That restructure introduced `src/data/serviceNav.ts` as the single source of
truth for the mega menu and footer, replacing the hand-written arrays this
branch had edited, which is what produced the conflict.

The restructure anticipated this work: it declared the AI Delivery Teams pillar
with all four child URLs, marked `pending` against this branch, and
`src/test/serviceNav.test.ts` fails as soon as those routes exist. Resolution
followed that design:

| Conflict | Resolution |
| --- | --- |
| `megaMenu.ts`, `Footer.tsx` | Took main's versions. Navigation is generated from `serviceNav.ts`; the hand-written columns added here were obsolete. |
| `serviceNav.ts` | Flipped the AI Delivery Teams pillar and its four links from `pending` to `live`, and dropped the now-unused branch constant. |
| `App.tsx` | Union: kept main's AI Talent and GPU routes alongside the AI Delivery Teams routes, and dropped main's `/pods/*` entries, whose pages this migration removed. |
| `seo.ts` | Kept main's Organization description and added "AI delivery teams" to its capability list. OG prefixes keep both `/services/ai-delivery-teams` and `/services/ai-talent`; `/services/talent` was dropped. |
| `llms.txt` | Took main's rewritten structure and merged the AI Delivery Teams section in, between AI GCC and AI Talent. |
| `SetupOperations.tsx` | Took main's rewrite wholesale; the one-line copy edit made here no longer had a target. |
| `AIDataRecruitment.tsx`, `AITalentAcquisition.tsx` | Union of both related-link sets, minus the dead `/pods/ai-data` and `/services/talent` entries. |

Two follow-on fixes the merge surfaced, both caught by main's own tests:

- `TRANSITIONAL_LINKS` in `serviceNav.ts` still carried "Specialist Delivery
  Pods" pointing at `/services/talent`. Removed: the route now redirects, and
  the pillar already covers it.
- `AI_TALENT_CONTEXT_LINKS.talentPods` in `src/data/aiTalent.ts` pointed at the
  same retired page. Re-pointed at `/services/ai-delivery-teams` and renamed to
  `aiDeliveryTeams`; nothing referenced the old key.

`ECOSYSTEM_LINKS.talent` in `src/lib/aiDeliveryTeams.ts` now resolves to
`/services/ai-talent` rather than `/services/ai-data-recruitment`, since the AI
Talent pillar went live in the same merge. That is the destination the "Explore
AI Talent" and "Hire Permanent AI Talent" cross-links were always meant to have.

Still pending after this merge, so the build-time redirect fallbacks in
`next.config.mjs` remain in effect: `/services/ai-engineering` (AI Engineering
branch) and `/services/gcc/modernization-transformation` (GCC Strategy branch).

---

## 6. Known follow-ups

- **Search Console.** After deployment, monitor the five new URLs for clicks,
  impressions, queries, CTR, position and conversions, plus Google's generative
  AI performance reporting (AI Overviews and AI Mode) for the category. Requires
  Search Console access. Commercial leads stay the primary measure; AI
  impressions on their own are not the goal.
- **`text-heading` token collision (pre-existing, site-wide).** `text-heading` is
  both a colour utility in `src/index.css` and a `1.5rem` font-size key in
  `tailwind.config.ts`. Combined with an arbitrary size (`text-[15px]`) the size
  loses and the element renders at 24px. The new pages match the rest of the site
  because the same pattern is used everywhere (`/services/micro-gcc`, `/contact`
  and others render identically). Worth a separate, deliberate cleanup rather
  than a change inside this migration.
- **Industry pages.** Only link and taxonomy corrections were made
  (`/industries/technology-gcc` now points at the four delivery models). The
  surrounding copy was left alone to avoid colliding with parallel work.
