/**
 * Source register for the Decision Lab.
 *
 * Every material figure in an exported decision pack maps to one of four
 * bases - user input, published benchmark, NeoIntelli planning assumption, or
 * a derived result - and anything claiming to be a published benchmark has to
 * name a record in here.
 *
 * Two things this register deliberately does NOT do:
 *
 *   - It does not turn a planning assumption into a benchmark by giving it a
 *     source id. The compensation bands the site already ships are modelled on
 *     delivery experience rather than a published salary survey, and they are
 *     registered as exactly that.
 *   - It does not claim a review happened. `lastReviewed` is a field a human
 *     owner sets when they actually review the record; no build step, deploy
 *     or link check may write to it.
 */

import type { SourceReference } from "./types";

export interface RegisteredSource extends SourceReference {
  /** Who owns keeping this current. A role, not a person's name. */
  owner: "finance" | "recruiting" | "ai-practitioner" | "policy-adviser" | "content";
  /** ISO date a human last substantively reviewed the record. */
  lastReviewed: string;
  /** How often this record should be revisited. Operational commitment, not evidence. */
  reviewCadence: "quarterly" | "monthly" | "per-source-update" | "on-material-change";
  /** Currency and unit the source's figures are expressed in. */
  unit?: string;
  /** What the record does not support. Read this before quoting it. */
  limitations: string;
  /** Geographies the record covers. */
  geography: string[];
}

export const SOURCE_REGISTER: RegisteredSource[] = [
  {
    id: "ni-comp-bands",
    publisher: "NeoIntelli",
    title: "India role compensation planning bands",
    asOf: "2026-09-05",
    owner: "recruiting",
    lastReviewed: "2026-09-05",
    reviewCadence: "quarterly",
    unit: "Annual base salary, USD",
    geography: ["Bengaluru", "Hyderabad", "Chennai", "Pune"],
    coverageNote:
      "Base salary only, before statutory and benefits overhead. Four cities, four seniority tiers, per role.",
    limitations:
      "A NeoIntelli planning assumption modelled on delivery and hiring experience, not a published salary survey. It carries no sample size and must not be presented as market data. Verify against a current benchmark before quoting a figure to a client.",
  },
  {
    id: "ni-operating-costs",
    publisher: "NeoIntelli",
    title: "India GCC operating cost planning assumptions",
    asOf: "2026-09-05",
    owner: "finance",
    lastReviewed: "2026-09-05",
    reviewCadence: "quarterly",
    unit: "USD per seat per month, or USD one-time",
    geography: ["India"],
    coverageNote:
      "Workspace, IT and security operations, entity and payroll administration, recruitment and equipment.",
    limitations:
      "Planning assumptions, not quotations. Real figures depend on the city, the workspace model, the entity structure and the vendor. Every one of them is editable in the workspace.",
  },
  {
    id: "ni-fee-basis",
    publisher: "NeoIntelli",
    title: "NeoIntelli engagement fee basis",
    asOf: "2026-09-05",
    owner: "finance",
    lastReviewed: "2026-09-05",
    reviewCadence: "on-material-change",
    unit: "USD per seat per month; USD per month",
    geography: ["India"],
    coverageNote:
      "The charging base for a managed engagement and for fractional AI leadership, and which cost lines a bundled fee already covers.",
    limitations:
      "An internal pricing input pending commercial sign-off, not an approved price list. Historical commercial percentages and build-operate-transfer terms are NOT carried into this model as universal pricing.",
  },
  {
    id: "ni-fx-planning",
    publisher: "NeoIntelli",
    title: "Planning FX quotes",
    asOf: "2026-09-05",
    owner: "finance",
    lastReviewed: "2026-09-05",
    reviewCadence: "per-source-update",
    unit: "INR per one unit of foreign currency",
    geography: ["Global"],
    coverageNote: "Round planning quotes used so the arithmetic is inspectable.",
    limitations:
      "Not a live rate and not a dealable rate. There is no rate feed connected. Enter your own quote for anything that matters.",
  },
  {
    id: "aon-salary-increase",
    publisher: "Global HR consultancy",
    title: "Annual Salary Increase and Turnover Study, India",
    url: "https://www.aon.com/apac/in-the-press/asia-newsroom/2026/aon-survey-projects-slight-uptick-in-salaries-in-india-2026",
    asOf: "2026-09-06",
    owner: "finance",
    lastReviewed: "2026-09-06",
    reviewCadence: "on-material-change",
    unit: "Percentage salary increase; percentage attrition",
    geography: ["India"],
    coverageNote:
      "An annual compensation study covering salary increase projections and turnover across Indian industry sectors. The 2026 figures reported are an all-industry increase projection of 9.1%, a technology consulting figure of 6.8%, and attrition trending down towards roughly 16.5%.",
    limitations:
      "All-industry and sector-level figures, not GCC-specific and not role-specific. 'Technology consulting' is not the same thing as an in-house capability centre, and neither figure is a substitute for what your own offers actually clear at. Reported here from the publisher's published summary rather than from the purchased study, so verify against the study itself before relying on it commercially.",
  },
  {
    id: "hmrc-dcc",
    publisher: "HM Revenue & Customs",
    title: "Guidance on the UK-India Double Contribution Convention",
    url: "https://www.gov.uk/government/publications/social-security-agreement-between-the-uk-and-india/uk-and-india-new-social-security-agreement",
    asOf: "2026-07-15",
    owner: "policy-adviser",
    lastReviewed: "2026-09-05",
    reviewCadence: "monthly",
    geography: ["United Kingdom", "India"],
    coverageNote:
      "Signed 10 February 2026, in force 15 July 2026. The detached-worker period was extended from three years to five (60 months). A certificate of coverage is applied for on form CA9107.",
    limitations:
      "Applies to workers actually posted between the two countries. A UK company employing only Indian-resident staff through an Indian entity is not, on those facts, in scope. An India-to-UK assignment already running immediately before commencement is reported to fall outside the detached-worker treatment and to become subject to UK social security instead, so the convention is not uniformly favourable. Not a savings figure.",
  },
  {
    id: "edpb-transfers",
    publisher: "European Data Protection Board",
    title: "Guidelines on the interplay of Chapter V with the rest of the GDPR (international transfers)",
    url: "https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052021-interplay-between-application-article_en",
    asOf: "2026-09-05",
    owner: "policy-adviser",
    lastReviewed: "2026-09-05",
    reviewCadence: "monthly",
    geography: ["EEA"],
    coverageNote:
      "When a disclosure is a transfer to a third country, including remote access by staff outside the EEA.",
    limitations:
      "Whether a transfer occurs depends on the processing and the organisations involved, not on where a server sits. This record cannot conclude anything about a specific arrangement.",
  },
  {
    id: "ico-transfers",
    publisher: "Information Commissioner's Office",
    title: "International transfers guidance",
    url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/",
    asOf: "2026-09-05",
    owner: "policy-adviser",
    lastReviewed: "2026-09-05",
    reviewCadence: "monthly",
    geography: ["United Kingdom"],
    coverageNote:
      "UK restricted transfers need their own transfer mechanism, including IDTA or the UK Addendum where applicable.",
    limitations: "Guidance, not a determination for any particular arrangement.",
  },
  {
    id: "cbic-export-services",
    publisher: "Central Board of Indirect Taxes and Customs",
    title: "GST treatment of exports of services",
    url: "https://www.cbic.gov.in/",
    asOf: "2026-09-05",
    owner: "policy-adviser",
    lastReviewed: "2026-09-05",
    reviewCadence: "monthly",
    geography: ["India"],
    coverageNote:
      "Qualifying exports of services are zero-rated when the statutory conditions in the IGST Act are met. The CBIC has clarified that an Indian company and a body corporate incorporated abroad are separate persons, so a subsidiary supplying overseas group companies is not caught by the 'merely establishments of a distinct person' exclusion.",
    limitations:
      "Conditional treatment, not a generic saving for every capability centre. The lab models no GST benefit by default.",
  },
  {
    id: "karnataka-policy",
    publisher: "Government of Karnataka",
    title: "Karnataka GCC policy",
    url: "https://eitbt.karnataka.gov.in/",
    asOf: "2026-09-05",
    owner: "policy-adviser",
    lastReviewed: "2026-09-05",
    reviewCadence: "monthly",
    geography: ["Karnataka"],
    coverageNote:
      "GCC Policy 2024-2029, including a named Beyond Bengaluru track covering Mysuru, Mangaluru, Hubballi-Dharwad-Belagavi, Tumakuru, Kalaburagi and Shivamogga, alongside statewide provisions and special eligibility categories.",
    limitations:
      "Provisions must be read individually and against the notified text, not against a summary. A Bengaluru team does not receive the Beyond Bengaluru track, which exists to steer centres elsewhere. Karnataka has since announced an IT, SpaceTech and Startup Policy 2025-2030, so which instrument governs needs checking. Nothing here is a grant entitlement and no monetary value is modelled.",
  },
  {
    id: "invest-india-efta",
    publisher: "Invest India",
    title: "EFTA Desk",
    url: "https://www.investindia.gov.in/",
    asOf: "2026-09-05",
    owner: "policy-adviser",
    lastReviewed: "2026-09-05",
    reviewCadence: "monthly",
    geography: ["Iceland", "Liechtenstein", "Norway", "Switzerland", "India"],
    coverageNote: "Investment facilitation for companies from the four EFTA states.",
    limitations:
      "Facilitation and support, not a grant entitlement and not a quantified benefit. Treaty commencement and investment-target figures are not reproduced here and would need separate verification against the treaty record.",
  },
  {
    id: "meity-dpdp",
    publisher: "Ministry of Electronics and Information Technology",
    title: "Digital Personal Data Protection rules",
    url: "https://www.meity.gov.in/",
    asOf: "2026-09-05",
    owner: "policy-adviser",
    lastReviewed: "2026-09-05",
    reviewCadence: "monthly",
    geography: ["India"],
    coverageNote:
      "Obligations commence in phases. Reported commencement: institutional provisions and the rulebook from 13 November 2025; consent manager registration from 13 November 2026; substantive data fiduciary obligations, rights, enforcement and penalties from 13 May 2027.",
    limitations:
      "Publication of an Act or of rules is not the same as every obligation being in force. The dates above are taken from published commentary on the notified rules rather than read off the notification itself, and must be confirmed against it before any release that relies on them.",
  },
];

const BY_ID = new Map(SOURCE_REGISTER.map((source) => [source.id, source]));

export const findSource = (id: string): RegisteredSource | undefined => BY_ID.get(id);

/** The plain SourceReference shape, for embedding in a snapshot. */
export function sourceRefs(ids: string[]): SourceReference[] {
  return ids
    .map((id) => BY_ID.get(id))
    .filter((source): source is RegisteredSource => source != null)
    .map(({ id, publisher, title, url, asOf, coverageNote }) => ({ id, publisher, title, url, asOf, coverageNote }));
}

/**
 * A record is stale when its own cadence says it should have been looked at by
 * now. Stale records stay visible and inspectable - they just lose the right
 * to carry an unqualified recommendation or a financial eligibility claim.
 */
export function isStale(source: RegisteredSource, today: Date = new Date()): boolean {
  const reviewed = new Date(source.lastReviewed);
  if (Number.isNaN(reviewed.getTime())) return true;
  const days = (today.getTime() - reviewed.getTime()) / 86_400_000;
  switch (source.reviewCadence) {
    case "monthly": return days > 31;
    case "quarterly": return days > 92;
    case "per-source-update": return days > 92;
    case "on-material-change": return days > 365;
    default: return false;
  }
}
