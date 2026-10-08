# NeoIntelli GCC Decision Lab

Route: `/lp/gcc-playbook`. Indexable, own canonical, in the sitemap and `llms.txt`.

One workspace with four areas over a single case — Team & cost, Compare,
Prepare, Decision pack — built on a UI-free domain library that
`/gcc-cost-calculator` now shares.

---

## 1. What was built

### Release one, complete

| Area | What it does |
|---|---|
| **Team & cost** | Shared profile (country, currency, city, work model, objective), three ways to build a team (starter template, own rows, rules-based planner), the full cost model with every line item, and an assumption ledger where every default is inspectable and editable. |
| **Compare** | The baseline question first, then a 60-month monthly comparison (3 years by default), payback, ROI with its definition on screen, up to three cities side by side, six stress tests, and up to three saved scenarios with a line-by-line "why did this change?". |
| **Prepare** | Entry arrangement as five independent dimensions with rules, country / data / mobility questions and the policy explorer, working-hour overlap from real IANA zones, six-dimension readiness, a rule-based risk register, and a dependency-scheduled 90-day plan. |
| **Decision pack** | Inspectable on-screen summary, a real searchable PDF, an editable CSV with the full monthly cash flow, device-only save, and the practitioner review request. |

### Explicitly not built (release two backlog)

- Validated city rankings with a numeric fit score. `NUMERIC_FIT_SCORING_ENABLED`
  in `src/lib/gcc-lab/cities.ts` is the flag, and the five conditions that must
  be true before it is turned on are written next to it.
- Quantified policy scenarios. Every policy record models a value of zero and
  `PolicyRecord.modeledValue` is typed as the literal `0`, so quantifying one
  is a deliberate type change, not an accident.
- Cross-device accounts, collaboration and shared links. No public
  profile-sharing URL exists; a future private link needs server-side access
  control, unpredictable tokens, expiry and revocation.
- Additional countries and cities; richer AI architecture templates;
  outcome-based benchmark calibration.
- Deliberately out of scope, now and later: a generic chatbot, and anything
  that gives legal advice.

---

## 2. Architecture

```
src/lib/gcc-lab/            pure TypeScript, no React, no DOM
  types.ts                  every domain record
  versions.ts               MODEL_VERSION, DATA_VERSION, horizon
  currency.ts               FX, anchored on INR, quoted as INR per unit
  countries.ts              overlapping EU / EEA / EFTA / UK memberships
  roles.ts                  canonical roles + compensation register
  sources.ts                source register with owners and cadences
  defaults.ts               planning bands and the not-budgeted list
  costModel.ts              the 60-month monthly cash engine
  economics.ts              baselines, net difference, payback, ROI, NPV
  sensitivity.ts            stress tests and scenario deltas
  teamTemplates.ts          six templates + the rules-based planner
  cities.ts                 city records and the comparison
  entryPathways.ts          five dimensions + pathway rules
  policy.ts                 policy records + surfacing rules
  readiness.ts              six dimensions, gates, coverage
  risk.ts                   rule-based risk register
  launchPlan.ts             dependency-scheduled plan
  overlap.ts                working-hour overlap from IANA zones
  snapshot.ts               the immutable result snapshot
  csv.ts                    CSV export
  pdf.ts                    PDF export (jsPDF, dynamically imported)
  storage.ts                device-only persistence
  profile.ts                construction, normalization, hashing
  legacyBridge.ts           /gcc-cost-calculator on the same engine

src/components/gcc-lab/     the workspace UI
src/pages/landing/GccPlaybook.tsx   the public page
pages/lp/gcc-playbook.tsx           the Next route
src/data/gccPlaybook.ts             FAQ + glossary (shared with the schema)
```

### Data flow

```
validated input → normalized profile → selected scenario → pure cost calculation
  → derived comparison / readiness / risk / plan → immutable export snapshot
```

Results are memoized on their inputs, so editing an input invalidates them by
construction; there is no cache to go stale. An export reads a snapshot taken
at the moment the export started, so editing while a PDF renders cannot mix
versions into it.

### One engine, two routes

`src/lib/gccCostEngine.ts` no longer contains arithmetic. It normalizes the
calculator's own inputs into a lab `Profile` + `Scenario`
(`legacyBridge.normalizeLegacyInput`) and reads the answer out of
`costModel.computeCostResult`. There is one salary table, one benefits
multiplier and one fee schedule in the codebase.

The calculator's pinned numbers are unchanged — `src/test/gccCostEngine.test.ts`
was not modified and still passes, which is the proof.

### Currency

FX quotes are **INR per one unit** of the foreign currency:

```
foreign_amount = INR_amount / INR_per_foreign_unit
```

Cross-currency conversion goes through INR rather than multiplying two quotes.

Register figures describe costs incurred in India, so they are treated as
INR-native: translated from their published USD form at a **fixed** rate
(`BENCHMARK_INR_PER_USD` in `roles.ts`), then converted to the base currency at
the scenario's quote. The fixed rate is deliberately not the scenario's quote —
if it moved with the scenario, a rate shock would convert into rupees and back
out and produce no change at all, which is the bug this design exists to
prevent.

Lab scenarios compute in INR; the calculator computes in USD and quotes the
benchmark rate itself, so the two conversions cancel exactly and its published
figures are untouched.

A figure the visitor types in a foreign currency stays FX-neutral in that
currency. That is correct: they have pinned it.

---

## 3. Rule definitions

Every rule carries an id and a version, and every recommendation records the
inputs that made it fire.

| Rule set | Version constant | Where |
|---|---|---|
| Team templates and the planner | `TEMPLATE_RULES_VERSION` | `teamTemplates.ts` |
| Entry arrangement | `PATHWAY_RULES_VERSION` | `entryPathways.ts` |
| Policy surfacing | `POLICY_RULES_VERSION` | `policy.ts` |
| Readiness | `READINESS_RULES_VERSION` | `readiness.ts` |
| Risk register | `RISK_RULES_VERSION` | `risk.ts` |
| Launch plan | `PLAN_RULES_VERSION` | `launchPlan.ts` |

Outcomes the rules can reach that a sales-shaped tool usually cannot:

- **Entry arrangement**: `defer-no-owner` (defer the centre entirely),
  `short-horizon-pod` / `limited-pod` (start smaller), `insufficient-information`
  (refuse to recommend). A NeoIntelli-managed option is not the default and is
  not always offered.
- **Readiness**: three gates — no budget owner, no accountable sponsor,
  unresolved data access. Any open gate, or any unanswered question, blocks a
  "ready" verdict whatever the average says.
- **Policy**: the strongest status is *potentially relevant*. There is no
  "eligible" state and no green badge. *Criteria not met* and *more information
  needed* are separate statuses because they mean different things.

---

## 4. Source and data register

`src/lib/gcc-lab/sources.ts` holds the machine-readable register. Each record
carries a publisher, URL, as-of date, unit, geography, coverage note,
**limitations**, an owner role, a last-reviewed date and a review cadence.

`lastReviewed` is a field a human owner sets when they actually review the
record. **No build step, deploy or link check may write to it.** `isStale()`
compares it against the record's own cadence; a stale record stays visible and
inspectable but loses the right to carry an unqualified recommendation.

| Source | Owner | Cadence | What it is |
|---|---|---|---|
| `ni-comp-bands` | recruiting | quarterly | India role compensation planning bands. **A NeoIntelli planning assumption, not a published salary survey. No sample size.** |
| `ni-operating-costs` | finance | quarterly | Workspace, IT/security ops. Planning assumptions, not quotations. |
| `ni-fee-basis` | finance | on material change | Engagement fee charging base. **An internal pricing input pending commercial sign-off, not an approved price list.** |
| `ni-fx-planning` | finance | per source update | Round planning FX quotes. Not a live feed, not dealable. |
| `aon-salary-increase` | finance | on material change | Aon's India salary increase and turnover study. **The only third-party quantitative source in the register.** All-industry and sector-level, not GCC-specific; reported from Aon's published summary rather than the purchased study. |
| `hmrc-dcc` | policy adviser | monthly | UK–India Double Contribution Convention guidance. |
| `edpb-transfers` | policy adviser | monthly | EEA transfer guidance. |
| `ico-transfers` | policy adviser | monthly | UK restricted transfers. |
| `cbic-export-services` | policy adviser | monthly | GST export-of-services treatment. |
| `karnataka-policy` | policy adviser | monthly | Karnataka GCC provisions. |
| `invest-india-efta` | policy adviser | monthly | EFTA Desk facilitation. |
| `meity-dpdp` | policy adviser | monthly | India personal data rules. |

The cadences above are **operational commitments to assign**, not evidence that
any review has happened.

### Deliberately excluded from published copy

Nothing in this feature reproduces: a competitor calculator count, the Mint
anecdote, the 39-of-62 ANSR cohort figure, or any competitor ROI percentage.
The Nasscom–Zinnov national figures are not used either — they are optional
context the product does not need, and reproducing them would mean carrying
their definitions and FY period correctly for no benefit.

---

## 5. Pending business inputs

The product is **not production-ready** until these are resolved. Each one is a
specific ask, not "please confirm everything".

| # | Blocked thing | Who | Exactly what is needed |
|---|---|---|---|
| 1 | Recruitment cost per hire | Recruiting + Finance | One planning figure, or a band, per seniority tier. Currently renders "Not budgeted" and is listed as an exclusion on every estimate. |
| 2 | Laptop and equipment per hire | Finance | One-off hardware cost per hire. Same treatment as above. |
| 3 | Entity, legal, accounting and payroll | Finance | Monthly retained cost, split by "own entity" vs "provider-employed". |
| 4 | Initial setup | Finance | One-time entity and workplace setup, as a band. This is also the ROI denominator, so ROI is unavailable without it. |
| 5 | Travel and HQ oversight | Finance | Monthly planning figure. |
| 6 | Fee basis sign-off | Finance | Confirm the per-seat managed fee band and the fractional leadership retainer, and confirm which cost lines a bundled fee actually covers (the `FeeBundle` flags). |
| 7 | Compensation band review | Recruiting | Confirm the bands are current, and state whether a distribution (not just a point) can be published. The 10% planning band around each point figure is a placeholder. **Research on 6 Sep 2026 suggests the lead tier may sit below published market — see `GCC_DECISION_LAB_RESEARCH.md` §5 for the evidence and its caveats. Decide against a purchased benchmark, not against blog content.** |
| 8 | Template quantities | AI practitioner | Sign off the six template core shapes. Until then every proposal says "pending NeoIntelli practitioner sign-off". |
| 9 | City talent evidence | Recruiting | The city observations are qualitative and unsourced. Either substantiate them or agree they stay explicitly qualitative. |
| 10 | Policy record review | Policy adviser | First substantive review of all twelve records; set `lastReviewed` honestly. **Narrowed by the 6 Sep 2026 research: the adviser now has specific dates, form numbers and provisions to confirm rather than a blank page. Primary sources could not be fetched directly (egress policy), so nothing is first-hand verified.** |
| 11 | Salary escalation default | Finance | The 8% default is still a planning assumption with no source of its own. Aon's published 9.1% (India, all industries) and 6.8% (technology consulting) are now offered in the UI as adoptable anchors with their scope caveats, but neither is the default. Confirm which — if either — NeoIntelli should stand behind. |
| 14 | Karnataka governing instrument | Policy adviser | Karnataka announced an IT, SpaceTech and Startup Policy 2025–2030 after the GCC Policy 2024–2029. Establish which now governs the provisions the workspace surfaces. |
| 12 | Practitioner review workflow | Operations | There is no mechanism to record that a review happened, so `reviewState` can only ever be `planning-estimate`. Needs a process and a way to set it. |
| 13 | Netlify form provisioning | Deployment | `gcc-decision-lab` is declared in `public/__forms.html` and will be detected on the next production deploy. Confirm it appears and that submissions route to the right inbox. |

### Integration status

- **Netlify Forms** — declared, untested against production. The client submits
  to `/__forms.html`; success is claimed only after that resolves.
- **`/api/send-tool-email`** — reused. Needs `RESEND_API_KEY`. Best-effort: its
  failure changes the confirmation wording, never the outcome.
- **CRM** — none connected. Nothing in the code claims one exists, and no
  response-time SLA is stated anywhere.
- **Rate limiting and spam protection** — the honeypot is in place and Netlify
  applies its own. **Server-side rate limiting and idempotent de-duplication on
  `submissionId` are not implemented** — the client reuses one id across
  retries, but nothing server-side enforces uniqueness yet. Assign before launch.

---

## 6. Testing

```
npm test          # 352 tests, 23 files
npm run build     # Next production build
npx tsc --noEmit -p tsconfig.app.json
```

All green as of this change. New suites:

| File | Covers |
|---|---|
| `gccLabCostModel.test.ts` | Shared-engine identity across both routes, input hashing, the ramp fixture (1.3m / 200k), degenerate inputs, no double counting, bundled fees, FX both directions, delay capacity, compute modes. |
| `gccLabEconomics.test.ts` | Payback in all four states, baseline language per objective, transition phasing, scope mismatch, ROI definition and unavailability, stress tests in display currency. |
| `gccLabGuidance.test.ts` | Overlapping memberships, policy surfacing and statuses, phased commencement read against the case's start date, the direction-dependent DCC rule, readiness gates and coverage, team proposals and diffs, city evidence, pathway outcomes, plan dependencies, DST-aware overlap, published anchors and CTC legibility. |
| `gccLabSnapshot.test.ts` | Snapshot immutability and provenance, screen/CSV reconciliation, CSV formula escaping, storage save/expire/unavailable. |
| `gccLabWorkspace.test.tsx` | Inputs surviving area changes, diff-and-undo, city change not resetting the team, keyboard operation, the chart's table alternative, and the review form's consent, retry and payload rules. |

### Acceptance cases from the specification

| # | Case | Where |
|---|---|---|
| 1 | Identical costs on both entry routes | `gccLabCostModel` + the untouched `gccCostEngine` suite |
| 2 | No NaN, Infinity or misleading zero | `gccLabCostModel` "degenerate inputs" |
| 3 | No double counting; advisory toggles only its own line | `gccLabCostModel` "no double counting" |
| 4 | 2 FTE fixture → 1.3m year one, 200k steady state | `gccLabCostModel` "the ramp fixture" |
| 5 | INR 8.5m at 85 = USD 100k; both FX directions | `gccLabCostModel` "FX" + `gccLabEconomics` |
| 6 | −30 / −10 / +10 → month-3 payback; no-deficit; no-recovery | `gccLabEconomics` "payback" |
| 7 | Growth language, no baseline hides ROI, expansion ≠ US replacement | `gccLabEconomics` "baselines and result language" |
| 8 | Delay updates capacity and retained transition cost | `gccLabEconomics` + `gccLabCostModel` |
| 9 | Currency change preserves inputs; Norway EEA+EFTA; UK without posting | `gccLabGuidance` + `gccLabWorkspace` |
| 10 | Data-origin triggers review with a US HQ; unknown stays unknown | `gccLabGuidance` "policy surfacing" |
| 11 | Beyond-Bengaluru provisions; unsupported policies at zero | `gccLabGuidance` |
| 12 | Readiness cannot reach ready through gaps or a high average | `gccLabGuidance` "readiness" |
| 13 | Preview/undo; city change preserves team and baseline | `gccLabWorkspace` |
| 14 | Screen/CSV reconcile; snapshot immune to concurrent edits | `gccLabSnapshot` |
| 15 | Anonymous use sends nothing; retry reuses one submission id | `gccLabWorkspace` |
| 16 | Save/expire/blocked storage; nothing in URLs | `gccLabSnapshot` + `gccLabWorkspace` |
| 17 | Keyboard, chart alternative, export failure, existing routes | `gccLabWorkspace` + the untouched route tests |

### Accessibility

axe-core (WCAG 2.0/2.1 A and AA rulesets) reports **zero violations** across all
four areas at 1440px and at 390px.

One correction was needed and is documented here because it adds a token. The
brand teal `--secondary` (#0b96bc) measures 3.44:1 on white. That is fine for a
border, a focus ring or a control fill, all of which need 3:1, and short of the
4.5:1 that normal text needs — either as teal text on white or as white text on
teal. `--accent-strong` (the same hue at 32% lightness, 4.87:1) was added for
the workspace's small links, eyebrows and solid teal buttons. `--secondary` is
untouched and no existing page changes.

### Verified in a real browser

Chromium via Playwright against `next start`: all four areas render with no page
errors; PDF downloads as 6 pages of real searchable text (455 text runs) with
running headers and page numbers; CSV downloads with 60 monthly rows; the FX
stress moves the number the right way in both directions (−9.1% / +11.1%);
mobile at 390px has zero horizontal overflow and a working result disclosure.

---

## 7. Known limitations

1. **The compensation register covers four cities.** Mumbai, Gurugram, Noida and
   "somewhere else" are selectable but produce a blocking warning and unpriced
   seats until the visitor supplies figures. They are never ranked.
2. **Six cost lines default to not budgeted** (see pending inputs). The estimate
   says so on the total, in the exclusions list, in the CSV and in the PDF, but
   it is a partial cost until they are filled in.
3. **The planning band around a point salary is a stated assumption, not a
   measured distribution.** The register holds one figure per role/city/tier.
4. **City observations are qualitative and unsourced.** No attrition rate and no
   time-to-hire figure is published anywhere in this feature, because none is
   substantiated. The one attrition figure that appears is Aon's published
   India-wide number, offered as an adoptable anchor with its scope stated, not
   as a city or GCC figure.
5. **No live FX feed.** Quotes are planning defaults with a date and an origin,
   and the visitor can replace them.
6. **`reviewState` can only be `planning-estimate`** until a review-recording
   process exists.
6a. **Policy records rest on secondary reporting, not primary text.** The
   session's network policy blocked direct access to `gov.uk` and most official
   domains, so commencement dates, form numbers and provision names come from
   search summaries. Each record's `limitations` field says so, and the adviser
   review is still required.
7. **Scenarios live in the browser tab.** Saving to the device is opt-in, expires
   after 30 days, and never stores contact details.
8. **Field performance is unmeasured.** Lab measurement only: the route builds
   to 63.5 kB page JS on top of the shared bundle; recharts loads only when
   Compare is open and jsPDF only when an export runs. LCP/INP/CLS targets are
   engineering targets to validate against field data, not claims.
9. **Server-side rate limiting is not implemented** (see integration status).

---

## 8. Migration and compatibility

**Changed behaviour**: none. `computeCosts` has the same signature, the same
return shape and the same numbers; `roleCostRows`, `usEquivalent`, `seatCount`
and `roundToNearest10k` are untouched.

**New internal API**: `computeCosts` now delegates to
`gcc-lab/legacyBridge.legacyAnnualTotals`. A change to the lab's default cost
assumptions could move the calculator's numbers, which is the point — but it
means `src/test/gccCostEngine.test.ts` is now a regression guard for both, and
should not be relaxed.

**New dependencies**: `jspdf`, `jspdf-autotable` (both dynamically imported, so
neither is in the initial bundle) and `@testing-library/user-event` (dev only).

**Test setup**: `src/test/setup.ts` now provides a no-op `ResizeObserver`, which
jsdom lacks and recharts constructs on mount.

**Compile constraint worth knowing**: the build tsconfig sets no `target`, so
`[...someSet]` and `[...someMap.values()]` fail to compile. Use `Array.from`.

**Risk to watch**: the fixed `BENCHMARK_INR_PER_USD` and the default FX quote
for USD are both 85 today, which is what makes the calculator's numbers cancel
out exactly. Changing the *default FX quote* without changing the benchmark
rate is fine and intended. Changing the *benchmark rate* re-strikes the register
and will move the calculator's published figures — do it deliberately, with the
bands.

---

## 9. Analytics

Events: `workspace_opened`, `first_estimate_viewed`, `team_template_applied`,
`assumption_changed`, `scenario_compared`, `readiness_completed`,
`export_succeeded`, `review_started`, `review_submitted`, `review_failed`.

Only `review_submitted` is forwarded server-side. Attributes are coarse
enumerations — a template key, a format, a bucketed seat count. **No salary, no
profile text, no email, no company name and no privacy or readiness answer
reaches analytics**, and `gccLabWorkspace.test.tsx` asserts that a visitor who
only calculates sends nothing anywhere at all.

Business metrics to instrument off these: qualified review submissions per
engaged session, accepted meetings, opportunities, pipeline influenced.
Diagnostics: time to first estimate, abandonment, scenario usage, successful
exports, returning sessions. The 60–90 second first-estimate figure is a
usability target to test, not copy — it does not appear on the page.


---

## 10. Research log

`GCC_DECISION_LAB_RESEARCH.md` records the 6 September 2026 research round:
what was checked, what changed in the product, what deliberately did not, the
competitive picture, and what remains open. Read it before touching the policy
records or the compensation bands.
