/**
 * Country, mobility and policy considerations.
 *
 * Every record here surfaces a *consideration*, never an entitlement, and
 * every record models a value of exactly zero. A quantified benefit belongs in
 * its own scenario, built only after the evidence and the assumptions behind
 * it have been recorded and reviewed by an adviser.
 *
 * Four things this module refuses to do, because each of them is a way sites
 * in this market routinely mislead:
 *
 *   - It never renders an "eligible" or "approved" state from basic inputs.
 *     The strongest status available is "potentially relevant".
 *   - It never merges "we do not know" with "does not apply". Those are two
 *     different statuses and they mean different things to a reader.
 *   - It never treats a source being published as a scheme being open. A
 *     commencement date is a fact about a provision, not about your claim.
 *   - It never stacks provisions. Deductions are not cash grants, and nothing
 *     here assumes two benefits combine.
 */

import { hasMembership, isResolvedCountry } from "./countries";
import type { CommencementStep, PolicyRecord, Profile, SurfacedPolicy } from "./types";

export const POLICY_RULES_VERSION = "policy-rules-1.0.0";

const record = (input: Omit<PolicyRecord, "modeledValue">): PolicyRecord => ({ ...input, modeledValue: 0 });

export const POLICY_RECORDS: PolicyRecord[] = [
  record({
    id: "uk-dcc",
    jurisdiction: "United Kingdom / India",
    provision: "Double Contribution Convention",
    title: "UK-India social security arrangement for posted workers",
    summary:
      "Signed 10 February 2026, in force from 15 July 2026. It stops a worker moving between the two countries paying social security in both at once, and the detached-worker period was extended from three years to five (60 months). A UK employer's employee working in India can stay on UK National Insurance for up to five years, evidenced by a certificate of coverage from HMRC applied for on form CA9107 - which is what shows the Indian Employees' Provident Fund Organisation that no Indian contribution is due. Whether it applies at all turns on someone actually being posted: a UK company employing Indian-resident staff through an Indian entity is not, on those facts alone, within scope.",
    officialUrl: "https://www.gov.uk/government/publications/social-security-agreement-between-the-uk-and-india/uk-and-india-new-social-security-agreement",
    secondaryUrl:
      "https://www.gov.uk/guidance/apply-for-a-certificate-to-confirm-you-pay-uk-national-insurance-when-working-in-a-country-that-has-a-social-security-agreement-with-the-uk-ca9107",
    sourceAsOf: "2026-07-15",
    commencement: [{ date: "2026-07-15", what: "The convention comes into force" }],
    category: "mobility",
    qualifyingGeography: ["United Kingdom", "India"],
    qualifyingActivity: "Temporary posting of an employee between the two countries",
    missingFacts: [
      "Whether anyone is actually being posted, and in which direction",
      "The assignment start date, and whether it was already running on 15 July 2026",
      "The expected duration of the assignment against the 60-month maximum",
      "Which entity employs the person during the assignment",
    ],
    excludedCriteria: [
      "Locally hired Indian employees of an Indian entity - the commonest GCC shape, and out of scope on those facts",
      "Any figure for what this is worth. The convention changes where contributions are paid; this model attaches no saving to it",
    ],
    reviewOwner: "policy-adviser",
    reviewBy: "2026-10-06",
    nextValidationStep:
      "Read the current HMRC guidance and the National Insurance Manual entry for India, and confirm the CA9107 process for the specific assignment.",
  }),
  record({
    id: "eea-transfers",
    jurisdiction: "EEA",
    provision: "GDPR Chapter V",
    title: "Transfers of personal data to India",
    summary:
      "Whether a transfer occurs depends on the processing and the organisations involved, not on where a server sits. Remote access from India to personal data held in the EEA is capable of being a transfer. A transfer needs a mechanism and, depending on the circumstances, a transfer impact assessment.",
    officialUrl: "https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052021-interplay-between-application-article_en",
    sourceAsOf: "2026-09-05",
    category: "privacy",
    qualifyingGeography: ["EEA"],
    qualifyingActivity: "Processing of personal data originating in, or accessed from, the EEA",
    missingFacts: [
      "Which personal data the India team would see or access",
      "Which legal entity in India receives it",
      "Whether access is remote or the data is held in India",
      "The role of each entity - controller, processor or joint",
    ],
    excludedCriteria: [
      "Hosting location on its own, which does not determine whether a transfer occurs",
      "Any conclusion about a specific arrangement - this record surfaces the question, it does not answer it",
    ],
    reviewOwner: "policy-adviser",
    reviewBy: "2026-10-05",
    nextValidationStep: "Map the data flows and the receiving entity with your data protection adviser before the first access is granted.",
  }),
  record({
    id: "uk-transfers",
    jurisdiction: "United Kingdom",
    provision: "UK GDPR restricted transfers",
    title: "UK restricted transfers to India",
    summary:
      "A UK restricted transfer needs its own transfer mechanism under the UK framework, including the IDTA or the UK Addendum where applicable. An EEA mechanism is not automatically a UK one.",
    officialUrl: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/",
    sourceAsOf: "2026-09-05",
    category: "privacy",
    qualifyingGeography: ["United Kingdom"],
    qualifyingActivity: "Processing of personal data originating in, or accessed from, the UK",
    missingFacts: ["Which UK personal data is in scope", "Which India entity receives or accesses it"],
    excludedCriteria: ["Any assumption that an EEA transfer mechanism also covers the UK"],
    reviewOwner: "policy-adviser",
    reviewBy: "2026-10-05",
    nextValidationStep: "Confirm the applicable UK transfer mechanism with your adviser.",
  }),
  record({
    id: "swiss-review",
    jurisdiction: "Switzerland",
    provision: "Swiss Federal Act on Data Protection",
    title: "Swiss data protection review",
    summary:
      "Switzerland has its own data protection regime. It is not covered by an EEA conclusion and needs its own review, even where the practical arrangements look similar.",
    officialUrl: "https://www.edoeb.admin.ch/",
    sourceAsOf: "2026-09-05",
    category: "privacy",
    qualifyingGeography: ["Switzerland"],
    missingFacts: ["Which Swiss personal data is in scope", "Which India entity receives or accesses it"],
    excludedCriteria: ["Any substitution of an EEA analysis for a Swiss one"],
    reviewOwner: "policy-adviser",
    reviewBy: "2026-10-05",
    nextValidationStep: "Obtain a Swiss-law review of the arrangement.",
  }),
  record({
    id: "efta-facilitation",
    jurisdiction: "EFTA / India",
    provision: "Invest India EFTA Desk",
    title: "Investment facilitation for EFTA-state companies",
    summary:
      "Invest India operates an EFTA Desk covering Iceland, Liechtenstein, Norway and Switzerland. It is facilitation and support - a route to help, not a grant and not a quantified benefit.",
    officialUrl: "https://www.investindia.gov.in/",
    sourceAsOf: "2026-09-05",
    category: "investment-facilitation",
    qualifyingGeography: ["Iceland", "Liechtenstein", "Norway", "Switzerland"],
    qualifyingEntity: "A company from one of the four EFTA states investing in India",
    missingFacts: ["The investment structure and timeline"],
    excludedCriteria: [
      "Any monetary value - facilitation is not funding",
      "Treaty commencement dates and investment-target figures, which are not reproduced here and would need separate verification against the treaty record",
    ],
    reviewOwner: "policy-adviser",
    reviewBy: "2026-10-05",
    nextValidationStep: "Contact the EFTA Desk once the entity structure is decided.",
  }),
  record({
    id: "karnataka-beyond-bengaluru",
    jurisdiction: "Karnataka",
    provision: "GCC Policy 2024-2029 - Beyond Bengaluru provisions",
    title: "Karnataka support directed outside the Bengaluru urban area",
    summary:
      "Karnataka's GCC Policy 2024-2029 carries a named Beyond Bengaluru track promoting Mysuru, Mangaluru, Hubballi-Dharwad-Belagavi, Tumakuru, Kalaburagi and Shivamogga, with provisions reported to include rental reimbursement, reimbursement of employer provident fund contributions, patent fee reimbursement and an employment-linked electricity duty exemption. These are directed at those locations. A team in Bengaluru does not receive them.",
    officialUrl: "https://eitbt.karnataka.gov.in/",
    sourceAsOf: "2026-09-06",
    category: "state-financial-support",
    qualifyingGeography: [
      "Mysuru", "Mangaluru", "Hubballi-Dharwad-Belagavi", "Tumakuru", "Kalaburagi", "Shivamogga",
    ],
    qualifyingEntity: "Depends on the individual provision",
    qualifyingActivity: "Depends on the individual provision",
    missingFacts: [
      "Which specific provision is being considered",
      "The exact location, since the track is location-defined",
      "Investment and employment commitments the provision attaches to",
      "Whether the scheme is currently open for applications",
    ],
    excludedCriteria: [
      "A Bengaluru location, which is what the Beyond Bengaluru track exists to steer away from",
      "Any stacking with central provisions",
      "Any modelled monetary value",
    ],
    reviewOwner: "policy-adviser",
    reviewBy: "2026-10-06",
    nextValidationStep:
      "Read the notified policy text on the Karnataka electronics, IT and biotechnology department site, identify the specific provision, and confirm with the department that it is open and that the location qualifies. Karnataka also announced an IT, SpaceTech and Startup Policy 2025-2030, so check which instrument now governs.",
  }),
  record({
    id: "karnataka-statewide",
    jurisdiction: "Karnataka",
    provision: "GCC Policy 2024-2029 - statewide provisions",
    title: "Karnataka statewide GCC provisions",
    summary:
      "The same policy carries provisions that are not location-restricted, reported to include capital investment support and infrastructure grants, alongside special eligibility categories for innovation centres, diversity and emerging technology including AI and machine learning. Each carries its own investment, employment and activity conditions, and each has to be read on its own terms.",
    officialUrl: "https://eitbt.karnataka.gov.in/",
    sourceAsOf: "2026-09-06",
    category: "state-financial-support",
    qualifyingGeography: ["Karnataka"],
    qualifyingEntity: "Depends on the individual provision",
    qualifyingActivity: "Depends on the individual provision; an emerging-technology category is reported to cover AI and ML",
    missingFacts: [
      "Which specific provision is being considered",
      "The capital investment and employment commitments you could make",
      "Whether the scheme is currently open for applications",
      "Whether an AI mandate meets the emerging-technology definition as notified",
    ],
    excludedCriteria: [
      "Any stacking with the Beyond Bengaluru track or with central provisions",
      "Any modelled monetary value",
      "Any assumption that a headline percentage applies to your investment",
    ],
    reviewOwner: "policy-adviser",
    reviewBy: "2026-10-06",
    nextValidationStep:
      "Obtain the notified policy text and operational guidelines from the state department and have an adviser assess the specific provision against your investment plan.",
  }),
  record({
    id: "gst-export-services",
    jurisdiction: "India",
    provision: "IGST Act - export of services",
    title: "GST treatment of services the India entity supplies to the group",
    summary:
      "Qualifying exports of services are zero-rated when the statutory conditions are met. One of those conditions turns on the relationship between supplier and recipient, and the CBIC has clarified that an Indian company and a body corporate incorporated abroad are separate persons - so a subsidiary supplying its overseas group companies is not caught by the 'merely establishments of a distinct person' exclusion, and such supplies can qualify as export of services subject to the remaining conditions. A branch or liaison office of the same foreign company is a different structure and does not sit in the same place. This is conditional treatment that follows from how you incorporate and contract, not a general saving every capability centre receives.",
    officialUrl: "https://cbic-gst.gov.in/",
    sourceAsOf: "2026-09-06",
    category: "central-tax-export",
    qualifyingGeography: ["India"],
    qualifyingEntity:
      "A separate Indian legal entity supplying overseas group companies sits differently from a branch or liaison office of the same foreign company",
    missingFacts: [
      "Whether the India operation would be a separate legal entity, or a branch or liaison office",
      "How services would be contracted and invoiced, and in what currency",
      "The place of supply on the actual facts",
    ],
    excludedCriteria: [
      "Any generic percentage saving",
      "Any conclusion before the entity structure is decided",
      "The remaining statutory export conditions, which this record does not assess",
    ],
    reviewOwner: "policy-adviser",
    reviewBy: "2026-10-06",
    nextValidationStep:
      "Have your tax adviser confirm the treatment against the final entity and contracting structure, including the place-of-supply and payment conditions.",
  }),
  record({
    id: "india-dpdp",
    jurisdiction: "India",
    provision: "Digital Personal Data Protection Act and Rules",
    title: "India personal data obligations, and which of them are live",
    summary:
      "India's personal data regime commences in steps rather than all at once. Reported commencement is: the institutional provisions and the rulebook from 13 November 2025; consent manager registration from 13 November 2026; and the substantive data fiduciary obligations, rights, enforcement and penalty architecture from 13 May 2027. Your India entity will process employee personal data at minimum, so the regime is in scope for you whatever else the team touches - but which obligations bite depends on when you start.",
    officialUrl: "https://www.meity.gov.in/",
    sourceAsOf: "2026-09-06",
    commencement: [
      { date: "2025-11-13", what: "Institutional provisions and the rulebook" },
      { date: "2026-11-13", what: "Consent manager registration and the corresponding Board function" },
      { date: "2027-05-13", what: "Data fiduciary obligations, rights, enforcement and penalties" },
    ],
    category: "privacy",
    qualifyingGeography: ["India"],
    missingFacts: [
      "Which personal data the India entity would process, beyond its own employees",
      "Whether you would be a significant data fiduciary on the notified criteria",
    ],
    excludedCriteria: [
      "Any assumption that publication of the Act or the Rules means every obligation is already in force",
      "Any assessment of significant-data-fiduciary status, which has its own criteria",
    ],
    reviewOwner: "policy-adviser",
    reviewBy: "2026-10-06",
    nextValidationStep:
      "Re-check provision-specific commencement immediately before go-live, and confirm the dates above against the notified rules rather than against this summary.",
  }),
  record({
    id: "stpi-scheme",
    jurisdiction: "India",
    provision: "STP Scheme",
    title: "Software Technology Parks of India registration",
    summary:
      "Eligible software-export units can register under the STP scheme for single-window support and qualifying duty-free technology imports. Registration is a process with conditions, and the historical income-tax holiday is not available to a newly established unit.",
    officialUrl: "https://stpi.in/",
    sourceAsOf: "2026-09-05",
    category: "central-tax-export",
    qualifyingGeography: ["India"],
    qualifyingActivity: "Export of software services from a registered unit",
    missingFacts: ["Whether the unit would qualify", "Whether registration is worth the compliance overhead at your scale"],
    excludedCriteria: [
      "Any income-tax holiday for a newly established unit",
      "Any modelled monetary value",
    ],
    reviewOwner: "policy-adviser",
    reviewBy: "2026-10-05",
    nextValidationStep: "Ask your adviser whether registration is worthwhile at your planned scale.",
  }),
  record({
    id: "transfer-pricing",
    jurisdiction: "India",
    provision: "Transfer pricing and safe harbour rules",
    title: "Intercompany charging between the India entity and the group",
    summary:
      "How the India entity charges the group is a transfer-pricing question with its own rules, and safe-harbour treatment is not automatic. This is a separate, adviser-reviewed layer: the cost model in this workspace reports the group's economic operating cost and does not add an intercompany mark-up to it.",
    officialUrl: "https://incometaxindia.gov.in/",
    sourceAsOf: "2026-09-05",
    category: "central-tax-export",
    qualifyingGeography: ["India"],
    missingFacts: ["The intended intercompany charging model", "The functional profile of the India entity"],
    excludedCriteria: [
      "Any safe-harbour eligibility conclusion",
      "Any mark-up added to the economic cost shown in this workspace",
    ],
    reviewOwner: "policy-adviser",
    reviewBy: "2026-10-05",
    nextValidationStep: "Commission a transfer-pricing review once the functional profile is settled.",
  }),
];

const BY_ID = new Map(POLICY_RECORDS.map((entry) => [entry.id, entry]));
export const findPolicy = (id: string): PolicyRecord | undefined => BY_ID.get(id);

/** Human labels. "Criteria not met" and "more information needed" are different answers. */
export const STATUS_LABELS: Record<SurfacedPolicy["status"], string> = {
  "potentially-relevant": "Potentially relevant",
  "more-information-needed": "More information needed",
  "criteria-not-met": "Criteria not met",
  "expired-or-awaiting-review": "Expired or awaiting review",
};

export const STATUS_EXPLANATIONS: Record<SurfacedPolicy["status"], string> = {
  "potentially-relevant": "On what you have told us, this is worth looking at. It is not a finding that you qualify.",
  "more-information-needed": "We cannot tell yet. The facts listed below are the ones that decide it.",
  "criteria-not-met": "On what you have told us, this does not apply. That is a conclusion about your answers, not about the provision.",
  "expired-or-awaiting-review": "This record is past its review date. It stays visible so you can see it, but it should not be relied on.",
};

/**
 * Which policy records to surface for a profile, and in what state.
 *
 * The rules only ever read what the visitor has actually answered. An
 * unanswered question produces "more information needed", never a conclusion
 * in either direction.
 */
export function surfacePolicies(profile: Profile): SurfacedPolicy[] {
  const surfaced: SurfacedPolicy[] = [];
  const country = profile.country;
  const startDate = Date.parse(profile.startDate);

  /**
   * Splits a phased provision against the case's own start date.
   *
   * This is the difference between "the rules are published" and "these
   * obligations apply to you on the day you go live", which is the question a
   * launch plan actually turns on.
   */
  const splitCommencement = (steps: CommencementStep[] | undefined) => {
    if (!steps || steps.length === 0 || Number.isNaN(startDate)) return undefined;
    const inForce: CommencementStep[] = [];
    const notYet: CommencementStep[] = [];
    steps.forEach((step) => {
      const at = Date.parse(step.date);
      if (!Number.isNaN(at) && at <= startDate) inForce.push(step);
      else notYet.push(step);
    });
    return { inForce, notYet };
  };

  const add = (id: string, status: SurfacedPolicy["status"], reason: string) => {
    const entry = BY_ID.get(id);
    if (entry) surfaced.push({ record: entry, status, reason, commencementAtStart: splitCommencement(entry.commencement) });
  };

  const dataOrigins = profile.privacy.dataOriginMarkets;
  const serving = profile.privacy.servingMarkets;
  const remoteAccess = profile.privacy.indiaRemoteAccess;
  const touchesMarket = (code: string) => dataOrigins.includes(code) || serving.includes(code);

  /* -------------------------------------------------------------- privacy */

  // Data origin decides this, not where the head office is. A US company
  // processing EEA personal data is in scope; an EEA company that processes
  // none is not, on those facts.
  const eeaByOrigin = dataOrigins.some((code) => hasMembership(code, "gdpr-applicable"));
  const eeaByHq = hasMembership(country, "gdpr-applicable");
  if (eeaByOrigin || eeaByHq) {
    add(
      "eea-transfers",
      remoteAccess === "unknown" || profile.privacy.receivingEntity === "unknown" || profile.privacy.receivingEntity === "not-decided"
        ? "more-information-needed"
        : "potentially-relevant",
      eeaByOrigin
        ? "You said the India team would work with personal data originating in the EEA."
        : "Your head office is in an EEA country, so EEA personal data is likely to be in scope. Confirm what the India team would actually see.",
    );
  }

  if (hasMembership(country, "uk-gdpr") || touchesMarket("GB")) {
    add(
      "uk-transfers",
      remoteAccess === "unknown" ? "more-information-needed" : "potentially-relevant",
      hasMembership(country, "uk-gdpr")
        ? "Your head office is in the UK, so UK personal data is likely to be in scope."
        : "You named the UK as a data origin or serving market.",
    );
  }

  if (hasMembership(country, "swiss-fadp") || touchesMarket("CH")) {
    add("swiss-review", "more-information-needed", "Switzerland has its own regime and is not covered by an EEA analysis.");
  }

  add(
    "india-dpdp",
    "potentially-relevant",
    "The India entity will process personal data of its own employees at minimum, so India's regime is in scope whatever else the team touches. The dates below are read against your own start date.",
  );

  /* ------------------------------------------------------------- mobility */

  if (hasMembership(country, "uk")) {
    const mobility = profile.mobility;
    if (mobility.postingWorkers === "no") {
      add(
        "uk-dcc",
        "criteria-not-met",
        "You said nobody is being posted between the UK and India. On those facts the convention does not apply, and no saving is assumed from it. Locally hired Indian employees of an Indian entity - the commonest GCC shape - are not posted workers.",
      );
    } else if (mobility.postingWorkers === "yes") {
      // A pre-existing India-to-UK assignment is the case that runs the other
      // way: such a worker is not a detached worker under the convention and
      // becomes subject to UK social security from commencement. Surfacing
      // this as a generic "may help" would be the wrong way round.
      if (mobility.direction === "india-to-hq" && mobility.preExisting === "yes") {
        add(
          "uk-dcc",
          "potentially-relevant",
          "You have someone sent from India who was already working in the UK immediately before the convention commenced. On the published guidance that person is reported not to be a detached worker under the convention and to become subject to UK social security legislation from commencement. Read this as a cost to check, not a saving to claim.",
        );
      } else {
        const missing =
          !mobility.assignmentStart || mobility.expectedDurationMonths == null || mobility.preExisting === "unknown";
        const overLong = (mobility.expectedDurationMonths ?? 0) > 60;
        add(
          "uk-dcc",
          missing ? "more-information-needed" : overLong ? "criteria-not-met" : "potentially-relevant",
          overLong
            ? `You have entered an expected duration of ${mobility.expectedDurationMonths} months. The detached-worker period runs to 60 months, so an assignment longer than that is not covered for its whole length.`
            : "You said workers would be posted between the UK and India. Direction, start date, employer and expected duration all bear on whether the convention applies and for how long.",
        );
      }
    } else {
      add("uk-dcc", "more-information-needed", "We do not know yet whether anyone would be posted between the UK and India.");
    }
  }

  /* ------------------------------------- investment facilitation and trade */

  if (hasMembership(country, "efta")) {
    add(
      "efta-facilitation",
      "potentially-relevant",
      "Your head office is in an EFTA state, so the Invest India EFTA Desk covers you. It is facilitation, not funding.",
    );
  }

  /* -------------------------------------------------- state and central tax */

  if (profile.city === "bengaluru") {
    add(
      "karnataka-statewide",
      "more-information-needed",
      "Your selected city is in Karnataka, so the state's statewide provisions are worth reading. Each carries its own investment, employment and activity conditions.",
    );
    add(
      "karnataka-beyond-bengaluru",
      "criteria-not-met",
      "The Beyond Bengaluru track is defined by location and exists to steer centres away from the Bengaluru urban area. A team in Bengaluru does not receive it. It is shown here so the distinction is explicit rather than assumed.",
    );
  }

  add(
    "gst-export-services",
    "more-information-needed",
    profile.privacy.receivingEntity === "provider-entity"
      ? "You would be working through a provider's entity, so the supply chain has an extra party in it and the export analysis is not simply yours to make. Nothing is modelled for it here."
      : "Whether the India operation is a separate legal entity or a branch of the same company, and how services are contracted and invoiced, decide the GST treatment. Nothing is modelled for it here.",
  );
  add("stpi-scheme", "more-information-needed", "Registration may be worth considering for a software-export unit. Nothing is modelled for it here.");
  add("transfer-pricing", "more-information-needed", "Intercompany charging is a separate adviser-reviewed layer and is not in the cost model.");

  if (!isResolvedCountry(country)) {
    surfaced.unshift({
      record: {
        ...POLICY_RECORDS[0],
        id: "country-unresolved",
        jurisdiction: "Not selected",
        provision: "Country selection",
        title: "Select a country to see the considerations that apply",
        summary:
          "Country-specific considerations depend on an actual country, not a region. \"Europe\" is not a jurisdiction: Germany, Norway and Switzerland sit in three different combinations of EU, EEA and EFTA membership and three different privacy regimes.",
        officialUrl: "",
        category: "privacy",
        qualifyingGeography: [],
        missingFacts: ["Your head office country"],
        excludedCriteria: [],
        reviewOwner: "content",
        nextValidationStep: "Pick a country in the profile.",
      },
      status: "more-information-needed",
      reason: "No country has been selected yet.",
    });
  }

  return surfaced;
}

/** Default modelled value for every policy record, everywhere, in release one. */
export const MODELLED_POLICY_VALUE = 0;

export const POLICY_VALUE_NOTE =
  "Every consideration here is modelled at zero value. A deduction is not a cash grant, provisions do not automatically stack, and none of these is quantified until the evidence and assumptions behind it have been recorded and reviewed.";
