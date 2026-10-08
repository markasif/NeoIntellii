# /lp/india-engineering-squad - pre-launch checklist

The page was rebuilt around a single positioning: a controlled way for a US, UK
or EU founder to build their first real engineering team in India without
building the India infrastructure first.

## What was deliberately removed

Phase 1 keeps every commercial detail offline. The page no longer contains, and
must not regain:

- rates, fees, percentages, markups or salary examples
- squad cost examples, on-page cost output or a transfer-fee formula
- testimonials, customer quotes, customer logos and case studies
- invented statistics, certifications or leadership claims

`src/components/landing/india-engineering-squad/cost.ts` was deleted rather than
hidden, so no cost model can be re-linked by accident. The one line the page
says about commercials is that they are discussed privately after role
calibration.

## The calculator handoff, reinstated

Phase 1 also removed the squad designer that handed a team composition to
`/gcc-cost-calculator`. That decision has since been reversed: the "Design your
team" section (`#design-your-team`, component `TeamBlueprintDesigner.tsx`) is
back, deliberately, and sits directly under "Build the squad around the
product."

The rule it respects is narrower than "no calculator", and it is the rule that
actually matters: **no number is quoted on this page**. The section designs a
team shape - a blueprint pod and a headcount per role - and nothing else. Every
rate, range and total lives on `/gcc-cost-calculator`, which already publishes
them, and the CTA opens it in a new tab so the landing page keeps its place.

Two things to preserve if this section is edited:

- The pods and the role roster are read from `@/data/gccCostData`, the same
  module the calculator reads. They are not a second copy. Renaming a pod or
  retiring a role must keep changing both pages at once.
- The handoff is locked by `src/test/squadCalculatorHandoff.test.ts`, which
  round-trips every pod and every role through the query string. A change that
  breaks the link between the two pages should fail there first.

## Outstanding assets

Every image on the page is a reserved slot drawing a neutral placeholder. No
stock photography, no generated people. Dropping a real file in needs no layout
change.

| Slot | Where | Ratio | Render size |
|------|-------|-------|-------------|
| Muzamil portrait | `leadership.ts` `primaryPhoto` | 4:5 | 480 x 600 |
| Karthick Raju portrait | `leadership.ts` `primaryPhoto` | 4:5 | 480 x 600 |
| Ravi Kiran portrait | `leadership.ts` `primaryPhoto` | 4:5 | 480 x 600 |
| Optional second image per leader | `leadership.ts` `secondaryPhoto` | 4:3 | 480 x 360 |
| Bangalore office | `PRESENCE_PHOTOS` in the page | 16:10 | - |
| Workspace, meeting room, team collaboration, interview environment | `PRESENCE_PHOTOS` | 4:3 | - |

Each portrait appears twice - the compact accountability card and the long
profile - from one record, so a photo is set once.

## Claims to confirm before paid traffic

| # | Drafted as | Where | What to confirm |
|---|------------|-------|-----------------|
| 1 | "Initial validated profiles can typically begin reaching the founder during the first two weeks" | Timeline section and FAQ | The sourcing lead time we will stand behind in an ad. |
| 2 | "A typical first squad starts with approximately 3-5 engineers" | Hero, START stage, FAQ | The real minimum engagement size. |
| 3 | "You'll speak with NeoIntelli leadership - not an outsourced appointment-setting team." | Final CTA | That the booking link reaches a named leader, not a sales development team. |
| 4 | Muzamil, Karthick and Ravi named as the accountable escalation path | Leadership sections | That all three agree to being named and reachable on a public landing page. |
| 5 | "A NeoIntelli team member will review your requirements and contact you within one business day." | Lead form and confirmation | The response SLA. |
| 6 | Replacement, performance, exit and transfer answers | "The difficult scenarios" accordion | That each matches the standard engagement terms. |
| 7 | Access controls: "managed access, role-based permissions and appropriate device/network controls where applicable" | IP and diligence cards | That each named control is genuinely supported. |

The leadership bios are used verbatim as supplied. Any change to a title, tenure
or responsibility is a change in `leadership.ts` only.

## Optional link not yet added

The India operating presence section carries no "View Our India Operations"
button, because there is no India-operations page to link to. Add the link there
if one is published.
