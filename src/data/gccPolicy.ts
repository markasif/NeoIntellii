/**
 * India GCC policy, tax and regulatory statements used across the GCC pages.
 *
 * CLAIM GOVERNANCE
 * ----------------
 * Everything here is written to be defensible against a primary source and is
 * deliberately conditional. Specifically, this file must never state:
 *   - "0% GST for GCCs" (exports of services are ZERO-RATED, and only when the
 *     statutory export-of-services conditions in the IGST Act are satisfied)
 *   - "0% customs duty for GCCs" (duty-free treatment is a qualifying-import
 *     concession available to eligible STP units, not to GCCs generally)
 *   - that a newly established 2026 GCC receives the historical Section 10AA
 *     SEZ income-tax holiday
 *   - that every GCC qualifies for the transfer-pricing safe harbour
 *   - that state and central benefits are automatically stackable
 *   - a count of "N states have GCC policies" without a current official count
 *
 * Sources, by claim:
 *   FDI            — DPIIT Consolidated FDI Policy / FEMA (NDI) Rules
 *   GST            — CBIC, Integrated Goods and Services Tax Act, s.16 (zero-rated
 *                    supply) read with s.2(6) (export of services)
 *   STPI           — Software Technology Parks of India, STP Scheme
 *   Safe harbour   — CBDT / Ministry of Finance, Finance Act 2026 and the
 *                    amended safe-harbour Income-tax Rules (effective FY2026-27)
 *   Labour codes   — Ministry of Labour & Employment / PIB, four Labour Codes
 *                    brought into effect 21 November 2025
 *   State policies — the respective state government policy notification
 */

export interface PolicyCard {
  n: string;
  title: string;
  body: string;
}

/** Compact, high-level policy strip for the GCC overview page. */
export const GCC_POLICY_HIGHLIGHTS: PolicyCard[] = [
  {
    n: "01",
    title: "Foreign investment",
    body: "Up to 100% FDI is permitted under the automatic route for activities not subject to sector-specific restrictions.",
  },
  {
    n: "02",
    title: "Export of services",
    body: "Qualifying exports of services are zero-rated under GST when the statutory export-of-services conditions are met.",
  },
  {
    n: "03",
    title: "STPI framework",
    body: "Eligible software-export units can use the STP scheme for single-window support and qualifying duty-free technology imports.",
  },
  {
    n: "04",
    title: "State GCC programs",
    body: "Several states now operate GCC-specific policies or schemes. NeoIntelli validates eligibility only after the mandate and location shortlist are clear.",
  },
];

/** Setup-stage mechanics. Deeper than the overview strip, still conditional. */
export const GCC_SETUP_CONSIDERATIONS: PolicyCard[] = [
  {
    n: "01",
    title: "Foreign investment route",
    body: "Foreign ownership depends on the activity and sector. Activities not subject to sector-specific restrictions can generally receive up to 100% FDI under the automatic route.",
  },
  {
    n: "02",
    title: "Export GST",
    body: "Qualifying exports of services are zero-rated under GST, subject to the statutory export-of-services conditions and appropriate registration and filing.",
  },
  {
    n: "03",
    title: "STPI / SEZ fit",
    body: "For eligible software-export operations, assess whether STPI provides practical value through its export framework, single-window support and qualifying duty-free technology imports. Evaluate SEZ structures separately based on the operating model, and do not model the historical Section 10AA income-tax holiday for a new 2026 setup.",
  },
  {
    n: "04",
    title: "Transfer pricing",
    body: "Eligible IT-service international transactions may use India's 2026 safe-harbour framework, which applies a 15.5% margin with an eligibility threshold of ₹2,000 crore, subject to the applicable Income-tax Rules and filing requirements.",
  },
];

export const GCC_SETUP_DISCLAIMER =
  "Entity, tax, transfer-pricing and incentive treatment is case-specific and should be validated with qualified legal and tax advisers before inclusion in a board case.";

export interface StatePolicy {
  state: string;
  policy: string;
}

/**
 * Named state frameworks only. No benefit amounts, no eligibility thresholds
 * and no claim about how many states have a policy in total: those change and
 * are validated from the latest official notification during an engagement.
 */
export const STATE_GCC_POLICIES: StatePolicy[] = [
  { state: "Karnataka", policy: "Global Capability Center Policy 2024-2029" },
  { state: "Gujarat", policy: "GCC Policy 2025-30" },
  { state: "Uttar Pradesh", policy: "GCC Policy 2024" },
  { state: "Maharashtra", policy: "GCC Policy 2025" },
  { state: "Tamil Nadu", policy: "Special Scheme to Promote GCCs" },
];

export const STATE_GCC_POLICIES_NOTE =
  "Policy status checked September 2026. Eligibility, benefit amounts, qualifying investment and employment conditions vary by state and are validated from the latest official notification during an engagement.";

/** Labour-code position used on the compliance page and in the FAQ. */
export const LABOUR_CODES_STATEMENT =
  "India's four Labour Codes became effective on 21 November 2025, rationalising 29 central labour laws. GCC employment, payroll, workforce policies and working-condition controls should therefore be designed against the current central framework together with applicable state rules.";
