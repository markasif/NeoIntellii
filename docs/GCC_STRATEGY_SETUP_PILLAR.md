# GCC Strategy & Setup pillar

The general GCC section is repositioned as one service pillar: decide the GCC, design the GCC, launch the GCC.
Operating the center after launch belongs to the GCC Operations pillar.

## Routes

| Route | Status | Page component |
| --- | --- | --- |
| `/services/gcc` | kept, repositioned as the parent | `src/pages/services/GCCServices.tsx` |
| `/services/gcc/strategy-business-case` | new | `src/pages/services/gcc/StrategyBusinessCase.tsx` |
| `/services/gcc/location-strategy` | new | `src/pages/services/gcc/LocationStrategy.tsx` |
| `/services/gcc/setup-launch` | kept, reworked as execution-only | `src/pages/services/gcc/SetupLaunch.tsx` |
| `/services/gcc/modernization-transformation` | new | `src/pages/services/gcc/ModernizationTransformation.tsx` |
| `/services/micro-gcc` | kept, untouched, promoted from the pillar | (owned elsewhere) |
| `/build-gcc-india` | 301 to `/services/gcc/setup-launch` (`next.config.mjs`) | removed |

## Shared pieces

- `src/lib/gccStrategyRoutes.ts` - route registry, subnav taxonomy, cross-pillar link targets, lead-context helpers.
- `src/components/gcc-strategy/` - subnav, hero, In brief, matrices, flows, workstream timeline, related links, CTA, source note.
- `src/data/gccStrategyFaqs.ts` - visible Q&A per page; the parent's FAQ JSON-LD is built from the same array.
- `src/data/gccStrategyContent.ts` - setup phases and workstreams, qualitative city assessment, maturity stages.
- `src/data/gccMarketProof.ts` - the single market-proof block. `stats` is empty on purpose; see "Needs business input".

## For the parallel streams

- **GCC Operations**: `GCC_OPERATIONS_LINKS` in `src/lib/gccStrategyRoutes.ts` points at the current live routes
  (`/services/gcc/operations-excellence`, `/gcc-as-a-service`, ...) under the new taxonomy labels. Update the hrefs there
  once `/services/gcc-operations/*` exists; nothing else in this pillar needs to change. No redirects were added for the
  legacy operating routes. The footer "GCC Setup" column now carries only this pillar; the legacy operating pages are no
  longer listed in the footer and can be re-listed under a GCC Operations column.
- **AI Engineering**: `AI_PILLAR_LINKS.aiEngineering` still targets `/services/technology`; the pillar is `pending` in `src/data/serviceNav.ts`. Repoint it when that branch merges.
- **AI Talent**: `AI_PILLAR_LINKS.aiTalent` targets `/services/ai-talent`, live since the six-pillar navigation restructure.
- **Navigation**: this branch no longer hand-edits the menus. `src/data/serviceNav.ts` from the navigation restructure is the
  single source of truth; merging main brought it in and the three GCC pages were flipped from `pending` to `live` there, which is
  what `src/test/serviceNav.test.ts` asks for. Do not re-add a hand-written GCC column to `megaMenu.ts` or `Footer.tsx`.

## Needs business input before publishing

- Market figures: fill `gccMarketProof.stats` from the current nasscom-Zinnov India GCC Landscape edition (source, year, last-checked date). Until then the parent shows a qualitative block with no numbers.
- State GCC incentives: the location page explains categories and caveats only. Named policies and amounts should be added only from the current official state documents, with a last-checked date.
- Timelines and outcome claims from the old `/build-gcc-india` page (50+ engagements, 12-week universal launch, client result stories, cost tables) were not migrated because they could not be verified in the repository.
