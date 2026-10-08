# Decision Lab — research log, 6 September 2026

What was checked, what changed in the product as a result, and what is still
open. Read this alongside `GCC_DECISION_LAB.md`.

## How this research was done, and its limits

Searches were run against the open web on 6 September 2026. **Direct fetching
of primary sources was not possible** — the session's network policy blocks
`gov.uk`, `icaew.com` and most other domains at the egress proxy, so every
finding below rests on **search-result summaries and secondary reporting, not
on the notified text read first-hand**.

That is a real limitation and it is reflected in the code: each record's
`limitations` field now says where the figure came from, and every affected
record still carries `reviewOwner: "policy-adviser"` with an unchanged review
date. **Nothing here discharges pending input #10** (first substantive adviser
review). What it does is make that review far cheaper — the adviser now has
specific dates, form numbers and provisions to confirm or correct, rather than
a blank page.

---

## 1. UK–India Double Contribution Convention

**Corroborated**: signed 10 February 2026, in force 15 July 2026. The
detached-worker period was extended from three years to five, so 60 months is
the agreed maximum rather than an expectation. A certificate of coverage is
applied for on **form CA9107**, and it is what evidences to the Indian
Employees' Provident Fund Organisation that no Indian contribution is due.

**Correction — this was the most important finding.** The previous record said
pre-existing assignments have "separate treatment", which is vague and, for one
direction, points the wrong way. Reporting on the guidance indicates that a
worker sent from India who was **already working in the UK immediately before
15 July 2026 is not a detached worker under the convention and becomes subject
to UK social security legislation from that date**. That is a cost appearing,
not a saving. A tool that surfaced the convention as uniformly favourable would
have been actively misleading for that case.

**Changed**: the record's summary, both official URLs (the agreement page and
the CA9107 guidance page — the previously cited URL was unverified and has been
replaced), and the surfacing rule, which now branches on direction and
pre-existing status and produces the adverse statement where it applies. A new
rule also returns *criteria not met* when the entered duration exceeds 60
months. Tests: `gccLabGuidance.test.ts`.

## 2. Karnataka GCC Policy 2024–2029

**Corroborated**: a policy covering 2024–2029 with a named **Beyond Bengaluru**
track promoting Mysuru, Mangaluru, Hubballi-Dharwad-Belagavi, Tumakuru,
Kalaburagi and Shivamogga. Provisions reported across that track include rental
reimbursement, reimbursement of employer provident fund contributions, patent
fee reimbursement and an employment-linked electricity duty exemption. Separate
statewide provisions and special eligibility categories (innovation centres,
diversity, emerging technology including AI/ML) are also reported. The official
department is `eitbt.karnataka.gov.in`, not the generic state portal.

**Changed**: the single Karnataka record is now **two records** with different
geography — which is what the specification asked for and what the previous
single record could not express. A Bengaluru team now gets *criteria not met*
on Beyond Bengaluru with the reason stated, rather than a vague "more
information needed". That is a conclusion the model can legitimately reach: the
track is location-defined and the location is known.

**Flagged**: Karnataka has since announced an IT, SpaceTech and Startup Policy
2025–2030. Which instrument now governs is an open question and is written into
the record's `nextValidationStep`.

## 3. India DPDP — phased commencement

**Corroborated**: three dates of practical importance — **13 November 2025**
(institutional provisions and the rulebook), **13 November 2026** (consent
manager registration), **13 May 2027** (data fiduciary obligations, rights,
enforcement and penalties).

**Changed**: `PolicyRecord` gained a `commencement` field, and the surfacing
layer now splits those steps against the visitor's **own start date**, so the
workspace says which obligations are live on the day they go live rather than
implying all of them are. This is the single most decision-relevant thing found
today, and no other tool in this market appears to do it.

## 4. GST on services supplied to the group

**Corroborated**: the CBIC has clarified that an Indian company and a body
corporate incorporated abroad are **separate persons** under the CGST Act, so a
subsidiary supplying overseas group companies is not caught by the "merely
establishments of a distinct person" exclusion, and such supplies can qualify as
export of services subject to the remaining conditions.

**Changed**: the record now names that distinction and contrasts it with a
branch or liaison office of the same foreign company, which sits differently.
This ties the entity-structure decision to a real tax consequence — still
conditional, still modelled at zero, and still an adviser's call.

## 5. Compensation and turnover — Aon

**Found, and it is the best-quality source of the day**: Aon's Annual Salary
Increase and Turnover Study for India projects a **9.1%** salary increase for
2026 (up from 8.9% in 2025), with **technology consulting at 6.8%**, and
attrition declining from a 21.4% peak in 2022 towards roughly **16.5%**.

**Changed**: Aon is now in the source register, and both figures are offered in
the workspace as **one-click anchors** beside the salary-escalation and
attrition fields — each with its source link and, more importantly, its scope
caveat printed next to it. An all-industry India increase is not a GCC
increase, and "technology consulting" is not an in-house capability centre;
both are said in the UI rather than left for the reader to work out.

**Neither is adopted as a default.** The model keeps its own stated 8%
escalation assumption and still leaves attrition unmodelled until someone
chooses. A sourced figure the visitor picked beats an unsourced one the model
picked; a sourced figure the model picked *silently* is the worst of the three.

### Open concern for the compensation owner (pending input #7)

Published 2026 commentary on Indian AI/ML pay puts **senior engineers around
₹45L–₹100L and principal/staff at GCCs around ₹80L–₹180L**. Our bands, grossed
up to CTC, put a senior AI engineer in Bengaluru at about **₹58.6L** — inside
that range — and a lead at roughly **₹75L**, which is **below the bottom of the
published principal/staff range**.

Caveats that matter before anyone acts on this: the published figures come from
recruitment-platform content of mixed quality, they mix CTC and base
inconsistently, and they conflate product companies, FAANG India and GCCs,
which the same sources say differ by 30–45%. This is a **signal that the lead
tier may be miscalibrated**, not a finding that it is. It is the recruiting
owner's call, and it should be made against a purchased benchmark rather than
against blog content.

**Not changed in code.** Rewriting the bands on this evidence would have moved
`/gcc-cost-calculator`'s published numbers site-wide on the strength of
marketing copy. That is exactly the failure the specification warns against.

## 6. Competitive picture

| Who | What they offer | Where the gap is |
|---|---|---|
| Pithonix GCC Playbook | AI-generated blueprint, city selection, five-year cost projection, talent strategy, risk map | Generated output; no visible assumption ledger, and no way to substitute your own figures |
| Miracle.Global | Digital Twin, Capability System, a "Nano GCC" model with a published price point | A quoted price, not an inspectable model |
| ANSR | Executive playbook content, large delivery track record | Content and services, not a self-service tool |
| Embark | A GCC calculator launched August 2026 | New; scope unassessed |
| GCCX / Astravise / Wisemonk | Published 2025–26 cost benchmarks by city, model and function | Confident single figures with methodology not exposed |

**The market is full of confident numbers.** Several publish per-workstation,
per-seat and setup figures for exactly the lines this model marks "Not
budgeted". Adopting any of them was considered and rejected: the specification
forbids inheriting competitor figures, and a blended vendor number presented as
a NeoIntelli planning assumption would be a worse lie than a blank.

What was built instead is the **"How to get the figures this model will not
invent for you"** panel — per line, who to call and what to ask them for. That
converts a dead-end blank into a task, adds no unverified number, and is the
one thing on this page a competitor cannot copy without also giving up their
headline figure.

**The differentiator is not another number.** It is that this is the only tool
in the set that shows its working, refuses to fill a gap it cannot evidence,
and lets a CFO put their own figures in and see the whole 60-month cash
schedule. Everything above is in service of that.

---

## Still open after this round

1. Primary-source verification of every policy record by the adviser
   (pending input #10). This research narrows it; it does not close it.
2. Compensation band calibration at the senior and lead tiers
   (pending input #7), against a purchased benchmark.
3. The six not-budgeted cost lines (pending inputs #1–#5). Unchanged — the
   guidance panel makes them answerable, it does not answer them.
4. Whether Karnataka's 2025–2030 policy supersedes the 2024–2029 GCC policy.
5. STPI's practical relevance at GCC scale was not researched this round.
