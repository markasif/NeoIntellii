/**
 * Domain records for the GCC Decision Lab.
 *
 * These types are the contract between the calculation library and every
 * surface that renders it (the workspace UI, the PDF, the CSV, the review
 * submission). Nothing in here imports React or touches the DOM.
 *
 * Two rules run through the whole model and are worth stating once:
 *
 *   1. Every number carries its basis. A figure is either something the user
 *      typed, something a published source says, a NeoIntelli planning
 *      assumption, or a result derived from the other three - and it says
 *      which. Nothing is presented as a benchmark unless a source record
 *      backs it.
 *   2. "Unknown" is never "zero" and never "not applicable". Missing evidence
 *      is carried through to the output as missing evidence.
 */

import type { PROFILE_SCHEMA_VERSION } from "./versions";

/* ------------------------------------------------------------------ money */

/** ISO 4217 codes the lab can display. INR is the FX anchor. */
export type CurrencyCode = "INR" | "USD" | "GBP" | "EUR" | "CHF" | "NOK" | "SEK" | "DKK" | "CAD" | "AUD" | "SGD";

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

/**
 * FX quotes, always expressed as INR per one unit of the foreign currency.
 *
 *   foreign_amount = INR_amount / INR_per_foreign_unit
 *
 * INR itself is quoted as 1 so the same formula works for every currency.
 */
export interface FxSet {
  /** Currency code -> INR per one unit. */
  quotes: Record<CurrencyCode, number>;
  /** ISO date the quotes were captured or entered. */
  quoteDate: string;
  origin: "planning-default" | "user-entered";
  /** Set when the user has overridden one or more quotes. */
  note?: string;
}

/* --------------------------------------------------------------- evidence */

/**
 * Where a number comes from. Everything material in an export maps to one of
 * these four, and `derived` figures link back to the inputs behind them.
 */
export type BasisType = "user-input" | "published-benchmark" | "planning-assumption" | "derived";

export type ConfidenceLabel = "indicative" | "planning-grade" | "source-backed" | "insufficient-evidence";

export interface SourceReference {
  id: string;
  publisher: string;
  title: string;
  /** Official URL, or undefined when the input is the user's own figure. */
  url?: string;
  /** ISO date the source was published or the record last substantively reviewed. */
  asOf: string;
  /** What the source does and does not cover. */
  coverageNote?: string;
}

export interface Assumption {
  id: string;
  label: string;
  value: number;
  unit: string;
  currency?: CurrencyCode;
  /** Planning band, where the evidence supports one. */
  low?: number;
  high?: number;
  basis: BasisType;
  sourceId?: string;
  /** ISO date the value became effective, where the record has one. */
  effectiveFrom?: string;
  /** ISO date the owner should re-check the value. */
  reviewBy?: string;
  confidence: ConfidenceLabel;
  confidenceRationale: string;
  /** True when the user has replaced the default. */
  overridden?: boolean;
  previousValue?: number;
  /**
   * True for an assumption that states a convention rather than a quantity -
   * "these bands are base salary before overhead", say. Renderers show the
   * unit and suppress the number, because a descriptive record's zero is not
   * a value.
   */
  descriptive?: boolean;
}

/* ---------------------------------------------------------------- profile */

export type ObjectiveKey =
  | "add-capacity"
  | "transition-work"
  | "expand-india"
  | "explore";

export type ProjectStage = "exploring" | "planning" | "validated";

export type MandateKey = "not-decided" | "board-approved" | "exec-sponsored" | "team-idea";

export type WorkModel = "office" | "hybrid" | "remote";

export type OwnershipIntent = "own-from-day-one" | "transfer-later" | "provider-employed" | "undecided";

export type CompensationBasis = "base-salary" | "india-ctc" | "total-employer-cost";

export type SeniorityKey = "junior" | "mid" | "senior" | "lead";

export interface TeamRow {
  /** Stable ID: edits and diffs are matched on this, never on array index. */
  id: string;
  /** Canonical role key from the role catalogue. */
  roleKey: string;
  seniority: SeniorityKey;
  /** Whole or fractional FTE. 0.5 is a half-time seat, not half a person. */
  fte: number;
  /** 1-based month the seat starts, relative to the scenario start. */
  startMonth: number;
  compensationBasis: CompensationBasis;
  skillTags: string[];
  /** Benchmark record the default compensation came from. */
  benchmarkId?: string;
  /** Annual compensation the user typed, in `overrideCurrency`. Wins over the benchmark. */
  overrideAnnual?: number;
  overrideCurrency?: CurrencyCode;
  /** Advisory / fractional seats are costed but excluded from headcount. */
  advisory?: boolean;
}

export type IndiaCityKey = "bengaluru" | "hyderabad" | "chennai" | "pune" | "mumbai" | "gurugram" | "noida" | "other";

export interface PrivacyAnswers {
  /** Markets whose personal data the India team would touch. */
  dataOriginMarkets: string[];
  /** Markets the product or service is sold into. */
  servingMarkets: string[];
  /** Legal entity that would receive the data in India. */
  receivingEntity: "client-entity" | "provider-entity" | "not-decided" | "unknown";
  /** Would India-based staff remotely access personal data held elsewhere? */
  indiaRemoteAccess: "yes" | "no" | "unknown";
  regulatedActivities: string[];
}

export interface MobilityAnswers {
  /** Would anyone be posted between the HQ country and India? */
  postingWorkers: "yes" | "no" | "unknown";
  direction?: "hq-to-india" | "india-to-hq";
  /** ISO date the assignment starts or started. */
  assignmentStart?: string;
  /** Whole months. */
  expectedDurationMonths?: number;
  /** An assignment that predates the arrangement's commencement is treated separately. */
  preExisting?: "yes" | "no" | "unknown";
  employer?: "hq-entity" | "india-entity" | "provider" | "unknown";
}

export interface Profile {
  schemaVersion: typeof PROFILE_SCHEMA_VERSION;
  profileId: string;
  /** ISO 3166-1 alpha-2 of the HQ country, or "OTHER"/"UNKNOWN". */
  country: string;
  hqCity?: string;
  /** IANA zone, used for the working-overlap calculation. */
  hqTimeZone?: string;
  displayCurrency: CurrencyCode;
  objective: ObjectiveKey;
  projectStage: ProjectStage;
  mandate: MandateKey;
  industry?: string;
  team: TeamRow[];
  city: IndiaCityKey;
  /** True while the city is still the lab's opening default rather than a choice. */
  cityIsDefault: boolean;
  workModel: WorkModel;
  ownership: OwnershipIntent;
  /** ISO date the scenario starts. Month 1 begins here. */
  startDate: string;
  privacy: PrivacyAnswers;
  mobility: MobilityAnswers;
  /** Answers keyed by readiness question id. */
  readiness: Record<string, ReadinessAnswer>;
  createdAt: string;
  updatedAt: string;
}

export type ReadinessAnswer = "in-place" | "partly" | "not-in-place" | "not-sure";

/* --------------------------------------------------------------- scenario */

export type AiComputeMode = "not-budgeted" | "monthly-budget" | "structured";

export interface AiComputeConfig {
  mode: AiComputeMode;
  /** Flat monthly figure the user entered, in `currency`. */
  monthlyBudget?: number;
  currency?: CurrencyCode;
  /** Structured inputs. Each is optional; whatever is supplied is summed. */
  gpuHoursPerMonth?: number;
  gpuHourlyRate?: number;
  apiUnitsPerMonth?: number;
  apiUnitRate?: number;
  storageMonthly?: number;
  platformMonthly?: number;
  /** One-time training spend, charged in `trainingMonth`. */
  oneTimeTraining?: number;
  trainingMonth?: number;
  /** Owned hardware, charged once. Never combined with rented GPU hours for the same capacity. */
  hardwarePurchase?: number;
  hardwarePurchaseMonth?: number;
}

/** Which cost lines a bundled fee already covers, so they are not billed twice. */
export interface FeeBundle {
  recruitment: boolean;
  workspace: boolean;
  equipment: boolean;
  itSecurityOps: boolean;
  entityLegalPayroll: boolean;
}

export type EngagementKey = "client-managed" | "neointelli-managed";

export interface CostAssumptionOverrides {
  /** Annual salary step-up applied on each scenario anniversary, as a fraction. */
  salaryEscalation?: number;
  /**
   * Workload complexity, as a fraction added to compensation only.
   * It prices the scarcity of the skill, so it never touches workspace,
   * operations or fee lines.
   */
  complexityMultiplier?: number;
  /** Per-seat monthly fee for a managed engagement. */
  partnerFeePerSeatMonthly?: number;
  /** Fraction added to base salary to reach India CTC, for base-salary rows. */
  benefitsRate?: number;
  /** Fraction of the running cost booked as explicit contingency. */
  contingencyRate?: number;
  /** Per-seat monthly workspace cost, in benchmark currency. */
  workspacePerSeatMonthly?: number;
  itSecurityPerSeatMonthly?: number;
  /** One-time per-hire costs. */
  recruitmentPerHire?: number;
  equipmentPerHire?: number;
  /** Team-wide monthly costs. */
  entityLegalMonthly?: number;
  travelOversightMonthly?: number;
  fractionalLeadershipMonthly?: number;
  /** One-time, charged in month 1 unless a schedule says otherwise. */
  initialSetup?: number;
  /** Annual attrition as a fraction; drives vacancy and replacement cost. */
  attritionRate?: number;
  /** Months a seat stays empty before a backfill starts. */
  backfillMonths?: number;
}

export interface Scenario {
  id: string;
  label: string;
  /** Which revision of the profile this scenario was built from. */
  profileRevision: number;
  /** Team-row overrides applied on top of the profile, keyed by row id. */
  teamOverrides: Record<string, Partial<TeamRow>>;
  cityOverride?: IndiaCityKey;
  engagement: EngagementKey;
  feeBundle: FeeBundle;
  /** Shift every start month by this many months. Used by the delay stress test. */
  hiringDelayMonths: number;
  costAssumptions: CostAssumptionOverrides;
  aiCompute: AiComputeConfig;
  fx: FxSet;
  /**
   * Currency the engine computes in. Line items are stored natively and
   * converted into this once, so a display-currency change never re-rounds a
   * figure the visitor typed.
   */
  baseCurrency: CurrencyCode;
  baseline: BaselineConfig;
  entryArrangement?: string;
  modelVersion: string;
  dataVersion: string;
}

/* --------------------------------------------------------------- baseline */

export interface BaselineRoleCost {
  roleKey: string;
  seniority: SeniorityKey;
  fte: number;
  /** Annual fully loaded cost the user supplied for this role at HQ. */
  annualCost: number;
  currency: CurrencyCode;
  /** What the figure includes, in the user's words. */
  inclusions?: string;
}

export interface BaselineConfig {
  objective: ObjectiveKey;
  /** User-supplied comparable HQ or vendor costs. Empty means no baseline. */
  roles: BaselineRoleCost[];
  /**
   * For a transition: HQ cost that stays after the move (management, tooling,
   * retained roles). Monthly, in `currency`.
   */
  retainedMonthly?: number;
  /** Months the old and new teams both run. */
  overlapMonths?: number;
  /** One-time separation and knowledge-transfer costs. */
  separationOneTime?: number;
  transitionOneTime?: number;
  /** For an existing India centre: current monthly run rate. */
  existingIndiaMonthly?: number;
  currency: CurrencyCode;
}

/* ---------------------------------------------------------------- results */

export type CostCategory =
  | "talent"
  | "incremental-benefits"
  | "recruitment"
  | "workspace"
  | "equipment"
  | "it-security-ops"
  | "entity-legal-payroll"
  | "partner-fees"
  | "fractional-leadership"
  | "travel-oversight"
  | "initial-setup"
  | "transition"
  | "ai-compute"
  | "contingency";

export type CostUnit =
  | "monthly-recurring"
  | "per-seat-monthly"
  | "per-hire-one-time"
  | "one-time"
  | "usage-based"
  | "derived-percentage";

export interface CostLineItem {
  category: CostCategory;
  label: string;
  unit: CostUnit;
  /** Amounts per month, index 0 = month 1, in benchmark currency. */
  monthly: number[];
  /** Total across the horizon. */
  total: number;
  /** Sum of the first twelve months. */
  firstYear: number;
  /** Steady-state monthly amount, measured at the target team size. */
  steadyStateMonthly: number;
  basis: BasisType;
  /** Set when a bundled fee already covers this line, so it is zeroed here. */
  coveredByBundle?: boolean;
  note?: string;
}

export interface CostWarning {
  id: string;
  severity: "info" | "caution" | "blocking";
  message: string;
}

export interface CostResult {
  /** Month-by-month India cash, benchmark currency, index 0 = month 1. */
  indiaCashMonthly: number[];
  lineItems: CostLineItem[];
  firstYearCash: number;
  steadyStateMonthly: number;
  steadyStateAnnual: number;
  oneTimeTotal: number;
  /** Planning band on the steady-state monthly figure, where one is supported. */
  steadyStateBand?: { low: number; high: number };
  /** Headcount by month, advisory seats excluded. */
  headcountMonthly: number[];
  /** FTE-months planned but unfilled because of a hiring delay or attrition. */
  unfilledFteMonths: number;
  currency: CurrencyCode;
  exclusions: string[];
  warnings: CostWarning[];
}

export interface EconomicsResult {
  /** Comparable baseline cash by month, or null when no baseline exists. */
  baselineCashMonthly: number[] | null;
  netDifferenceMonthly: number[] | null;
  cumulativeDifference: number[] | null;
  /**
   * Earliest month the cumulative difference turns non-negative after an
   * initial deficit. null when there is no deficit or no recovery - the
   * `paybackState` says which.
   */
  paybackMonth: number | null;
  paybackState: "no-baseline" | "no-initial-deficit" | "recovered" | "not-recovered-in-horizon";
  /** First month after which the cumulative difference stays non-negative. */
  sustainedPaybackMonth: number | null;
  /** True when the cumulative difference goes negative again after recovering. */
  reversesLater: boolean;
  roiPercent: number | null;
  roiUnavailableReason?: string;
  /** Separately identified transition investment used as the ROI denominator. */
  transitionInvestment: number;
  npv: number | null;
  discountRateAnnual: number | null;
  currency: CurrencyCode;
  /** Language the UI must use for the difference, given the objective. */
  differenceLabel: string;
  warnings: CostWarning[];
}

export interface ResultSnapshot {
  caseId: string;
  /** Hash of the normalized profile + scenario. Two identical inputs hash alike. */
  inputHash: string;
  computedAt: string;
  modelVersion: string;
  dataVersion: string;
  fxQuoteDate: string;
  profile: Profile;
  scenario: Scenario;
  cost: CostResult;
  economics: EconomicsResult;
  assumptions: Assumption[];
  sources: SourceReference[];
  warnings: CostWarning[];
  /** Questions the case cannot answer yet. Printed prominently in the pack. */
  openQuestions: string[];
  reviewState: "planning-estimate" | "practitioner-reviewed";
}

/* -------------------------------------------------------------- guidance */

export type PolicyStatus =
  | "potentially-relevant"
  | "more-information-needed"
  | "criteria-not-met"
  | "expired-or-awaiting-review";

/** A dated step in a provision's commencement, for rules that phase in. */
export interface CommencementStep {
  /** ISO date the step takes effect. */
  date: string;
  /** What comes into force on that date. */
  what: string;
}

export interface PolicyRecord {
  id: string;
  jurisdiction: string;
  provision: string;
  title: string;
  summary: string;
  officialUrl: string;
  /** A second official link where the process lives separately from the rule. */
  secondaryUrl?: string;
  sourceAsOf: string;
  /**
   * Phased commencement, where the provision has one.
   *
   * Publication is not commencement. Where a rule comes into force in steps,
   * the steps are recorded here so the workspace can say which obligations are
   * actually live on the visitor's own start date instead of implying all of
   * them are.
   */
  commencement?: CommencementStep[];
  category: "state-financial-support" | "central-tax-export" | "mobility" | "investment-facilitation" | "privacy";
  /** Where the provision applies. Empty means the record does not say. */
  qualifyingGeography: string[];
  qualifyingEntity?: string;
  qualifyingActivity?: string;
  /** Facts the record needs before eligibility could even be assessed. */
  missingFacts: string[];
  /** Criteria this record explicitly does not cover. */
  excludedCriteria: string[];
  reviewOwner: string;
  reviewBy: string;
  /** Always zero in release one. A quantified benefit needs its own scenario. */
  modeledValue: 0;
  nextValidationStep: string;
}

export interface SurfacedPolicy {
  record: PolicyRecord;
  status: PolicyStatus;
  /** Why this record was surfaced for this profile. */
  reason: string;
  /**
   * For a phased provision, which steps are already in force on the case's own
   * start date and which are not. Computed at surfacing time, so a case
   * starting next quarter and one starting in two years do not get the same
   * answer.
   */
  commencementAtStart?: { inForce: CommencementStep[]; notYet: CommencementStep[] };
}

export interface Recommendation {
  ruleId: string;
  ruleVersion: string;
  /** The profile fields that made this rule fire. */
  triggeringInputs: string[];
  headline: string;
  explanation: string;
  alternatives: string[];
  missingEvidence: string[];
  confidence: ConfidenceLabel;
  /** Set when the user has dismissed or replaced the recommendation. */
  overriddenByUser?: boolean;
}

export interface RiskItem {
  id: string;
  title: string;
  category:
    | "role-concentration"
    | "hiring-dependency"
    | "budget-fx"
    | "data"
    | "ai-governance"
    | "vendor-transfer"
    | "hq-oversight";
  /** Ordered, not scored: there are no invented probabilities here. */
  severity: "watch" | "significant" | "critical";
  trigger: string;
  severityRationale: string;
  missingEvidence: string[];
  mitigation: string;
  suggestedOwner: string;
  phase: "before-launch" | "first-90-days" | "ongoing";
}

export interface PlanTask {
  id: string;
  workstream: "legal-entity" | "hiring" | "workplace-it" | "data-security" | "delivery" | "governance";
  title: string;
  ownerRole: string;
  prerequisites: string[];
  /** Working-day estimate as a range. */
  durationDays: { low: number; high: number };
  /** Day offsets from the scenario start, computed from prerequisites. */
  startDay: number;
  endDay: number;
  status: "not-started" | "in-progress" | "done" | "not-applicable";
  sourceRule: string;
  note?: string;
}
