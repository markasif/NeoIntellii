# Service navigation

Six service pillars drive the "What We Do" menu and the footer. The "Solutions" menu is a separate, curated list of nine buyer entry points. All of it reads `src/data/serviceNav.ts`, so a route cannot drift between navigation surfaces.

The two menus answer different questions and must stay distinct:

- **What We Do** - what NeoIntelli provides. The six capability pillars.
- **Solutions** - what the buyer arrives with: a problem, an outcome or a starting point. Nine destinations, three per group.

| Pillar | Overview | Sub-pages | In this build? |
|---|---|---|---|
| AI Engineering | `/services/ai-engineering` | 7 | No, `claude/ai-engineering-services-5p5alr` |
| AI Delivery Teams | `/services/ai-delivery-teams` | 4 | No, `claude/ai-delivery-teams-architecture-p1za1h` |
| AI Talent | `/services/ai-talent` | 7 | Yes |
| AI GCC | `/services/ai-gcc` | 7 | Yes |
| GCC Strategy & Setup | `/services/gcc` | 5 | Partly, 3 sub-pages from `claude/gcc-strategy-setup-ouw91r` |
| GCC Operations | `/services/gcc-operations` | 7 | No, `claude/gcc-operations-managed-services-pvso0m` |

## How the menus are laid out

- **What We Do** shows only the six overview pages, numbered `01.` to `06.`, in two columns. The "Our Approach" card on the right keeps the three planning tools reachable.
- **Solutions** shows three conceptual groups of three destinations on the same 1240px panel. Both menus render through the same card layout in `MegaMenuPanel` (`MegaItem.variant: "cards"`), so they cannot drift apart visually: same panel chrome, animation, typography, spacing and hover states. What We Do leads each card with its step number; Solutions leads with the link's icon, in the same tile the other panels use. There are no "Overview" rows - the three headings are groupings, not landing pages.
- **Footer** shows the six pillars plus "More Services" and "Resources" in a four-column grid. Since Solutions became curated, the footer is what carries every service sub-page on every page; `src/test/serviceNav.test.ts` asserts that no taxonomy entry loses its last global link.

## The nine solutions

Defined in `SOLUTION_GROUPS` in `src/data/serviceNav.ts`. Every entry points at a page that already exists - featuring a page here never changes its URL, so `/services/...` destinations keep their canonical paths and nothing is migrated to `/solutions/...`.

| Group | Solution | Destination |
|---|---|---|
| Build your AI capability | AI Micro GCC | `/services/micro-gcc` |
| Build your AI capability | AI Delivery Pods | `/services/ai-delivery-teams/ai-delivery-pod` |
| Build your AI capability | AI Team Build & Transfer | `/services/ai-delivery-teams/ai-team-transfer` |
| Solve an AI challenge | Expert-Validated AI Hiring | `/services/ai-talent/ai-ml-recruitment` (interim) |
| Solve an AI challenge | AI Pilot to Production | `/services/ai-delivery-teams/forward-deployed-ai-engineers` (interim) |
| Solve an AI challenge | AI CoE for Existing GCCs | `/services/gcc/modernization-transformation` (interim) |
| Plan your GCC | GCC Cost Calculator | `/gcc-cost-calculator` |
| Plan your GCC | GCC Readiness Assessment | `/gcc-readiness-assessment` |
| Plan your GCC | GCC Blueprint | `/blueprint` |

Three entries are marked `interim: true`: no dedicated solution landing page exists yet, so each points at the closest existing capability page rather than at a route that would 404. A follow-up phase should build those three pages and drop the flag; the test in `src/test/serviceNav.test.ts` names exactly which three, and each has a `TODO(solutions-phase-2)` comment next to it.

The "Solutions" menu has no hub page of its own and this task did not create one, so `MegaItem.href` is omitted and the trigger renders as a disclosure button: it opens the panel on click and on Enter or Space instead of navigating somewhere that does not represent the menu. Panels carry an `id` that their trigger points at with `aria-controls`, on desktop and in the mobile drawer, and Escape closes the panel and returns focus to its trigger.

`MegaMenuPanel` previously built its column grid with `lg:grid-cols-${item.columns.length}`. Tailwind cannot generate a class from an interpolated value, so that only worked for counts already present elsewhere in the codebase. Column counts now come from a literal map, and `MegaItem.columnsPerRow` sets how many columns share a row.

## Pending pillars

Three pillars were built in parallel and are not in this branch. Their links are declared in the taxonomy and marked `pending` with the branch that delivers them, but `src/lib/navAvailability.ts` filters navigation against the route registry at render time, so a link only renders once its page exists. Nothing 404s at any point, and each pillar appears automatically when its branch merges.

`src/test/serviceNav.test.ts` checks every `live`/`pending` flag against the route registry. When a branch merges, the pending assertion fails and names the entry to flip, so the flags stay accurate.

## After the parallel branches merge

1. Flip the merged pillar's entries to `status: "live"` in `src/data/serviceNav.ts` and drop the `source` field. The test tells you which ones.
2. Remove the entries the merged branch retires from `TRANSITIONAL_LINKS`. That column exists only so live pages still in the sitemap keep a footer link; the AI Engineering branch retires Technology Solutions and the GCC Operations branch retires the operations pages under `/services/gcc`.
3. Check the redirects. `/services/technology/*` and the retired `/services/gcc/*` pages need 301s to their replacements, and the AI Talent redirect map in `next.config.mjs` is still commented out pending a Search Console review.
4. Re-point cross-section links. The AI GCC and AI Talent pages link to `/services/gcc/talent-management`, `/services/gcc/technology-infrastructure` and `/services/gcc/operations-excellence` from `src/data/aiGcc.ts` and `src/data/aiTalent.ts`. The GCC Operations branch replaces those pages, so those two files need updating in the same change.
