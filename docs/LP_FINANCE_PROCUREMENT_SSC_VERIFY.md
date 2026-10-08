# /lp/finance-procurement-shared-services-india - pre-launch VERIFY list

The page reads as finished, but each item below is a commercial, legal or
capability claim that nobody has confirmed. Confirm or edit each one before this
page is pointed at paid traffic.

Where a claim could not be made safely, the copy was written so the page states
no number and no promise we have not earned. Those items are marked
**"drafted conservatively"**: the page is honest as it stands, and the VERIFY is
an opportunity to make it stronger, not a defect to fix before launch.

Every item carries a `VERIFY` comment in the source, so

```
grep -rn "VERIFY" src/pages/landing/FinanceProcurementSharedServicesIndia.tsx \
  src/components/landing/finance-procurement-ssc/
```

regenerates this list.

## Tax and legal

| # | On the page | Where | What to confirm |
|---|-------------|-------|-----------------|
| 1 | "Transfer pricing safe harbour provisions that can apply to small captives, confirmed with your tax counsel" | `MYTH_CARDS`, "What changed" card | Applicability to a 30 to 100 person finance and procurement captive, and the exact wording, with tax counsel. This is the load-bearing claim of the whole "the maths changed" argument. |
| 2 | "Safe harbour provisions may apply. We work with your tax counsel on the arrangement. This is not tax advice." | FAQ, "What about transfer pricing for a foreign parent?" | Same wording review as 1. The "not tax advice" disclaimer should be the one counsel signs off. |

## Capability

| # | On the page | Where | What to confirm |
|---|-------------|-------|-----------------|
| 3 | Six automation items: invoice capture and three-way matching, claims intake, vendor onboarding with risk scoring, requisition to PO workflows, month-end close and reconciliation bots, CFO dashboard | `AUTOMATION` | That we can deliver each of the six. Delete any we cannot. This section is the page's differentiator, so an item we cannot build is the most expensive thing on the page. |
| 4 | "integrated with your ERP" | `OPERATING_LAYERS`, digital enablement row | Which ERPs we have actually integrated with. Naming them (SAP, Oracle, Tally, whichever) is stronger than the generic line that ships today. **Drafted conservatively:** no ERP is named. |
| 5 | Healthcare governance: "Controls aligned to the regulatory obligations your units already carry" | `industries.ts`, healthcare governance pillar | Which healthcare regulations we will name. **Drafted conservatively:** none are named, because naming one we cannot support is worse than naming none. |

## Numbers we have not published

| # | On the page | Where | What to confirm |
|---|-------------|-------|-----------------|
| 6 | "Automating capture and matching is where accounts payable cycle time moves. We set the target with you at the design stage and report against it every month. We do not quote a reduction we have not delivered for you." | Automation section, amber card | The brief asked for an industry cycle-time figure. **Drafted conservatively:** the page states no percentage. Replace with our own delivered figure once we have one, or leave as the target framing. Never publish a reduction we have not achieved. |
| 7 | Understand stage carries no duration | `STEPS`, step 1 | The diagnostic duration. **Drafted conservatively:** no number is stated. |
| 8 | "The sequence is diagnostic, design, first pod live, then the first tower cut over. We commit to dates against your volumes and systems at the design stage, not before." | FAQ, "How long to a working centre?" | The typical elapsed time for each stage. **Drafted conservatively:** the sequence is stated, no timeline is claimed. A credible week range here would be one of the strongest additions to the page. |

## Money

| # | On the page | Where | What to confirm |
|---|-------------|-------|-----------------|
| 9 | "Automation build: scoped and priced separately from the monthly operating cost" | `COST_LINES` | Whether the automation build is included in the operating fee, scoped separately, or a fixed build fee. The 1.6x highlight below it says "excluding ... the automation build if scoped separately", so both lines move together. |

## People

| # | On the page | Where | What to confirm |
|---|-------------|-------|-----------------|
| 10 | "A senior NeoIntelli leader with twenty years of customer-facing delivery and five years in AI and ML" | Leadership cover section | The name, whether to show a photo, and that the twenty and five year figures describe whoever will actually do this. **Drafted conservatively:** nobody is named, so the section stands on the credential alone. |

## Cities

| # | On the page | Where | What to confirm |
|---|-------------|-------|-----------------|
| 11 | "Bengaluru, Pune, Hyderabad, Chennai and Mumbai. We give you a tower-by-tower city recommendation before you commit." | FAQ, "Which cities do you cover?" | The city rationale for finance towers specifically. **Drafted conservatively:** no city is recommended on the page. |

## Campaign setup

| # | On the page | Where | What to confirm |
|---|-------------|-------|-----------------|
| 12 | The healthcare finance hub shows "Standardise GST, TDS and MCA filings across the group" | `REPORTING_VARIANT` in the page, `reporting` in `industries.ts` | Which audience this URL serves. An Indian group sees the GST/TDS/MCA line; a foreign parent sees "Standardise group reporting into your overseas parent". The block shows one, never both. Flip `REPORTING_VARIANT` to `"foreign-parent"` for that ad group, or stand up a second URL if both are running. |
