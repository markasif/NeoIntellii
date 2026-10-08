/**
 * Curated AI team templates and the rules that suggest one.
 *
 * This is a rules-based role planner, not a model. Every suggestion names the
 * rule that produced it, the inputs that made it fire, what it assumes and
 * what evidence it is missing - and every one of them is a proposal the
 * visitor applies with a diff, never an edit that lands on their team behind
 * their back.
 *
 * The quantities below are starting shapes for a first delivery team, drawn
 * from the pod blueprints the site already publishes. They are pending
 * practitioner sign-off and are labelled as proposals until they have it. No
 * template guarantees autonomous delivery, and none of them is a staffing law:
 * an architect-to-engineer ratio is a prompt to review the shape of a team,
 * not a rule that decides its size.
 */

import type { Recommendation, SeniorityKey, TeamRow } from "./types";
import { createTeamRow } from "./profile";

export const TEMPLATE_RULES_VERSION = "team-rules-1.0.0";

export type WorkloadKey =
  | "genai-application"
  | "agentic-workflow"
  | "computer-vision"
  | "ml-forecasting"
  | "data-platform"
  | "product-engineering";

export interface TemplateSeat {
  roleKey: string;
  seniority: SeniorityKey;
  fte: number;
  /** Why this seat is in the core, in one line. */
  why: string;
  /** Shared or fractional rather than a dedicated hire. */
  shared?: boolean;
  skillTags?: string[];
}

export interface TeamTemplate {
  key: WorkloadKey;
  label: string;
  summary: string;
  /** The smallest shape that can own the work end to end. */
  core: TemplateSeat[];
  /** Seats to add as the workload grows. Not part of the first proposal. */
  expansion: TemplateSeat[];
  /** What this shape can be accountable for. */
  responsibilities: string[];
  /** Stated plainly, because they are the part that most often turns out to be wrong. */
  assumptions: string[];
  /** Roles most teams already have at HQ and should not duplicate on day one. */
  usuallySuppliedByHq: string[];
  /** What has to exist outside the team for it to deliver. */
  deliveryDependencies: string[];
  /** Roles worth deferring past the first wave, and why. */
  deferUntilLater: { roleKey: string; why: string }[];
}

/** Evaluation, security and data ownership are in every template on purpose. */
const EVAL_RESPONSIBILITY = "Evaluation and regression suites for model and agent behaviour";
const SECURITY_RESPONSIBILITY = "Secure handling of the data the team is given access to";
const OWNERSHIP_RESPONSIBILITY = "Named ownership of the datasets and prompts the system depends on";

export const TEAM_TEMPLATES: TeamTemplate[] = [
  {
    key: "genai-application",
    label: "GenAI application team",
    summary: "Ships a retrieval-backed product feature end to end, with evaluation built in from the first sprint.",
    core: [
      { roleKey: "ai", seniority: "senior", fte: 1, why: "Owns retrieval, prompting and the evaluation harness", skillTags: ["rag", "guardrails"] },
      { roleKey: "fullstack", seniority: "senior", fte: 1, why: "Turns the model into a product surface people can use", skillTags: ["react", "pyweb"] },
      { roleKey: "qa", seniority: "mid", fte: 1, why: "Regression and evaluation suites, not just functional testing", skillTags: ["llmeval", "api"] },
    ],
    expansion: [
      { roleKey: "ai", seniority: "mid", fte: 1, why: "A second builder once the evaluation harness is stable" },
      { roleKey: "dataeng", seniority: "senior", fte: 1, why: "When retrieval outgrows a single document store", skillTags: ["dbt", "dq"] },
      { roleKey: "devops", seniority: "senior", fte: 1, why: "When serving moves off a managed endpoint", shared: true },
    ],
    responsibilities: [
      "Retrieval, prompting and orchestration for one product surface",
      EVAL_RESPONSIBILITY,
      SECURITY_RESPONSIBILITY,
      OWNERSHIP_RESPONSIBILITY,
    ],
    assumptions: [
      "You are using a hosted model rather than training your own",
      "Product direction and design stay with HQ",
      "One product surface, not a platform serving several teams",
    ],
    usuallySuppliedByHq: ["po", "ba"],
    deliveryDependencies: [
      "A decision on which model provider and region you will use",
      "Access to the documents or data retrieval depends on",
      "Someone at HQ who can accept or reject the output",
    ],
    deferUntilLater: [
      { roleKey: "devops", why: "A managed endpoint carries the first release; dedicated serving infrastructure can wait until traffic justifies it" },
      { roleKey: "datasci", why: "Offline analysis matters once there is production behaviour to analyse" },
    ],
  },
  {
    key: "agentic-workflow",
    label: "Agentic workflow team",
    summary: "Builds multi-step agents against real systems, where the hard part is tool access, guardrails and knowing when the agent is wrong.",
    core: [
      { roleKey: "ai", seniority: "senior", fte: 1, why: "Orchestration, tool calling and failure handling", skillTags: ["langgraph", "mcp", "guardrails"] },
      { roleKey: "backend", seniority: "senior", fte: 1, why: "The tools an agent calls are ordinary services and have to be built properly", skillTags: ["python", "microservices"] },
      { roleKey: "qa", seniority: "senior", fte: 1, why: "Agent behaviour needs adversarial testing, not a happy-path suite", skillTags: ["llmeval"] },
    ],
    expansion: [
      { roleKey: "ai", seniority: "mid", fte: 1, why: "A second builder once the first workflow is in production" },
      { roleKey: "devops", seniority: "senior", fte: 1, why: "Observability across agent runs", skillTags: ["observability"] },
    ],
    responsibilities: [
      "End-to-end agent workflows against your own systems",
      "Guardrails, escalation paths and human-in-the-loop design",
      EVAL_RESPONSIBILITY,
      SECURITY_RESPONSIBILITY,
      OWNERSHIP_RESPONSIBILITY,
    ],
    assumptions: [
      "The systems the agent needs to call already have usable interfaces",
      "Someone owns the decision about what an agent is allowed to do unsupervised",
    ],
    usuallySuppliedByHq: ["po"],
    deliveryDependencies: [
      "Credentials and a safe environment for the systems the agent will touch",
      "An agreed definition of an acceptable failure rate",
    ],
    deferUntilLater: [
      { roleKey: "dataeng", why: "Only needed once agent runs become a dataset in their own right" },
    ],
  },
  {
    key: "computer-vision",
    label: "Computer vision team",
    summary: "Trains and serves vision models where the data pipeline and the labelling loop matter more than the architecture.",
    core: [
      { roleKey: "ml", seniority: "senior", fte: 1, why: "Model training and the evaluation protocol", skillTags: ["cv", "dl"] },
      { roleKey: "dataeng", seniority: "mid", fte: 1, why: "Ingest, labelling pipeline and dataset versioning", skillTags: ["airflow", "dq"] },
      { roleKey: "devops", seniority: "mid", fte: 1, why: "GPU environments and inference serving", shared: true, skillTags: ["gpu", "k8s"] },
    ],
    expansion: [
      { roleKey: "ml", seniority: "mid", fte: 1, why: "A second modeller once the first pipeline is repeatable" },
      { roleKey: "qa", seniority: "mid", fte: 1, why: "Drift and regression checks against a held-out set" },
    ],
    responsibilities: [
      "Dataset curation, labelling workflow and versioning",
      "Model training, evaluation protocol and drift monitoring",
      SECURITY_RESPONSIBILITY,
      OWNERSHIP_RESPONSIBILITY,
    ],
    assumptions: [
      "You have or can obtain labelled data, or budget for labelling",
      "Inference latency and hardware constraints are known",
    ],
    usuallySuppliedByHq: ["po", "ba"],
    deliveryDependencies: [
      "A labelling budget or an existing labelled corpus",
      "Clarity on where inference runs - cloud, on-premise or on device",
    ],
    deferUntilLater: [
      { roleKey: "fullstack", why: "A product surface can follow the model rather than lead it" },
    ],
  },
  {
    key: "ml-forecasting",
    label: "ML and forecasting team",
    summary: "Classical modelling where the business question, the feature pipeline and the measurement are the work.",
    core: [
      { roleKey: "datasci", seniority: "senior", fte: 1, why: "Frames the question and owns the measurement", skillTags: ["forecast", "exp"] },
      { roleKey: "dataeng", seniority: "senior", fte: 1, why: "Feature pipelines that survive contact with production", skillTags: ["dbt", "airflow"] },
      { roleKey: "ml", seniority: "mid", fte: 1, why: "Productionises the model and the retraining loop", skillTags: ["classical", "serving"] },
    ],
    expansion: [
      { roleKey: "devops", seniority: "mid", fte: 1, why: "Once retraining needs scheduling and monitoring", shared: true },
      { roleKey: "ba", seniority: "mid", fte: 1, why: "When several business units want their own forecast" },
    ],
    responsibilities: [
      "Problem framing, feature engineering and model selection",
      "Backtesting, measurement and retraining",
      OWNERSHIP_RESPONSIBILITY,
      SECURITY_RESPONSIBILITY,
    ],
    assumptions: [
      "The historical data needed to backtest exists and is accessible",
      "A business owner will act on the forecast",
    ],
    usuallySuppliedByHq: ["po", "ba"],
    deliveryDependencies: [
      "Access to historical data with enough depth to backtest",
      "An agreed accuracy target that someone will be held to",
    ],
    deferUntilLater: [
      { roleKey: "ai", why: "Generative work is a different problem; do not staff it before it is on the roadmap" },
    ],
  },
  {
    key: "data-platform",
    label: "Data platform team",
    summary: "Builds the pipelines, contracts and quality checks everything else depends on.",
    core: [
      { roleKey: "dataeng", seniority: "lead", fte: 1, why: "Owns the platform design and the data contracts", skillTags: ["spark", "dbt", "dq"] },
      { roleKey: "dataeng", seniority: "mid", fte: 1, why: "Builds and runs the pipelines", skillTags: ["airflow", "streaming"] },
      { roleKey: "devops", seniority: "mid", fte: 1, why: "Infrastructure, access control and cost management", shared: true, skillTags: ["iac", "observability"] },
    ],
    expansion: [
      { roleKey: "dataeng", seniority: "mid", fte: 1, why: "Per additional source system of real complexity" },
      { roleKey: "qa", seniority: "mid", fte: 1, why: "Data quality testing as a discipline rather than a side task" },
    ],
    responsibilities: [
      "Ingest, transformation and data contracts",
      "Data quality, lineage and access control",
      SECURITY_RESPONSIBILITY,
      OWNERSHIP_RESPONSIBILITY,
    ],
    assumptions: [
      "Source systems can be read without a separate integration programme",
      "Someone owns the definitions the pipelines encode",
    ],
    usuallySuppliedByHq: ["po"],
    deliveryDependencies: [
      "Read access to the source systems",
      "A decision on where the platform lives and who administers it",
    ],
    deferUntilLater: [
      { roleKey: "ml", why: "Modelling on an unfinished platform produces results nobody can reproduce" },
    ],
  },
  {
    key: "product-engineering",
    label: "Product engineering team",
    summary: "Core platform delivery for a software product, with AI as a feature rather than the whole mandate.",
    core: [
      { roleKey: "backend", seniority: "senior", fte: 1, why: "Services and the core domain model", skillTags: ["python", "microservices"] },
      { roleKey: "fullstack", seniority: "senior", fte: 1, why: "Product surface, end to end", skillTags: ["react", "node"] },
      { roleKey: "qa", seniority: "mid", fte: 1, why: "Release confidence", skillTags: ["e2e", "api"] },
    ],
    expansion: [
      { roleKey: "backend", seniority: "mid", fte: 1, why: "As the service surface grows" },
      { roleKey: "devops", seniority: "mid", fte: 1, why: "When deployment becomes someone's full-time concern", shared: true },
      { roleKey: "ai", seniority: "senior", fte: 1, why: "When an AI feature moves from experiment to roadmap" },
    ],
    responsibilities: [
      "Feature delivery against an HQ-owned roadmap",
      "Release quality and operational support",
      SECURITY_RESPONSIBILITY,
    ],
    assumptions: [
      "Product direction and design stay with HQ",
      "The existing codebase can be worked on by a team in another time zone",
    ],
    usuallySuppliedByHq: ["po", "ba"],
    deliveryDependencies: [
      "A backlog someone owns and keeps current",
      "Development environment access from India",
    ],
    deferUntilLater: [
      { roleKey: "datasci", why: "Analytics is a different mandate; adding it early blurs what this team is accountable for" },
    ],
  },
];

export const findTemplate = (key: WorkloadKey): TeamTemplate | undefined =>
  TEAM_TEMPLATES.find((template) => template.key === key);

/* ------------------------------------------------------------- the planner */

export interface PlannerAnswers {
  workload: WorkloadKey | null;
  stage: "idea" | "prototype" | "in-production" | null;
  /** Roles HQ already covers. Nothing here is proposed again. */
  hqCapabilities: string[];
  dataReadiness: "ready" | "partial" | "not-ready" | "unknown";
  deliveryObjective: "own-a-product" | "support-hq" | "research" | null;
  /** Who is accountable for what this team ships. */
  responsibilityOwner: "india-lead" | "hq-lead" | "shared" | "undecided";
  /** Monthly budget ceiling in the display currency, if there is one. */
  budgetCeilingMonthly: number | null;
}

export interface TeamProposal {
  template: TeamTemplate;
  /** The seats being proposed, after HQ capability and budget rules. */
  seats: TemplateSeat[];
  /** Seats the rules removed, and why. */
  removed: { seat: TemplateSeat; why: string }[];
  recommendations: Recommendation[];
  /** Order to hire in. First entry is the first hire. */
  hiringOrder: string[];
}

const seatKey = (seat: TemplateSeat) => `${seat.roleKey}:${seat.seniority}`;

/**
 * Turns the planner answers into a proposal.
 *
 * Deterministic and inspectable: the same answers always produce the same
 * proposal, and every departure from the template's core carries a rule id.
 */
export function proposeTeam(answers: PlannerAnswers): TeamProposal | null {
  const template = answers.workload ? findTemplate(answers.workload) : undefined;
  if (!template) return null;

  const recommendations: Recommendation[] = [];
  const removed: { seat: TemplateSeat; why: string }[] = [];
  let seats = [...template.core];

  const rec = (
    ruleId: string,
    triggeringInputs: string[],
    headline: string,
    explanation: string,
    alternatives: string[],
    missingEvidence: string[],
    confidence: Recommendation["confidence"] = "planning-grade",
  ) => {
    recommendations.push({
      ruleId,
      ruleVersion: TEMPLATE_RULES_VERSION,
      triggeringInputs,
      headline,
      explanation,
      alternatives,
      missingEvidence,
      confidence,
    });
  };

  rec(
    "template-selected",
    [`workload=${answers.workload}`],
    `Start from the ${template.label.toLowerCase()}`,
    `${template.summary} The core shape below is a proposal for a first delivery team, not a validated staffing ratio - it is pending NeoIntelli practitioner sign-off.`,
    TEAM_TEMPLATES.filter((other) => other.key !== template.key).slice(0, 2).map((other) => other.label),
    ["Practitioner sign-off on the core quantities", "Your own view of what HQ will keep"],
  );

  // Roles HQ already covers are not proposed again.
  const supplied = new Set(answers.hqCapabilities);
  seats = seats.filter((seat) => {
    if (!supplied.has(seat.roleKey)) return true;
    removed.push({ seat, why: "You said HQ already covers this role, so it is not duplicated here." });
    return false;
  });
  if (removed.length > 0) {
    rec(
      "hq-capability-dedup",
      [`hqCapabilities=${answers.hqCapabilities.join("|")}`],
      "Roles HQ already covers are left out",
      `${removed.map((entry) => entry.seat.roleKey).join(", ")} removed because you said HQ supplies them. Check that HQ can cover them across the time-zone gap as well as inside its own working day.`,
      ["Keep the role in India anyway if HQ cover is thin or single-threaded"],
      ["Whether the HQ cover is one person or a team"],
    );
  }

  if (answers.dataReadiness === "not-ready" || answers.dataReadiness === "partial") {
    const alreadyHasData = seats.some((seat) => seat.roleKey === "dataeng");
    if (!alreadyHasData) {
      seats = [
        ...seats,
        { roleKey: "dataeng", seniority: "senior", fte: 1, why: "Added because the data this team needs is not ready yet", skillTags: ["dq", "airflow"] },
      ];
    }
    rec(
      "data-readiness-gap",
      [`dataReadiness=${answers.dataReadiness}`],
      "Staff the data problem before the model problem",
      "You told us the data this team depends on is not ready. A modelling team blocked on data is the most expensive way to discover a pipeline gap, so a data engineering seat is included in the first wave.",
      ["Fix the data at HQ first and start the India team later", "Start with a smaller pod scoped only to the data work"],
      ["What specifically is missing - access, quality or definition"],
    );
  }

  if (answers.stage === "idea") {
    const cut = seats.filter((seat) => seat.roleKey === "qa" && seats.length > 2);
    if (cut.length > 0) {
      rec(
        "early-stage-shape",
        [`stage=${answers.stage}`],
        "This may be smaller than a full team",
        "At idea stage the risk is building the wrong thing, not building it slowly. A two- or three-person pod that can be wrong quickly is usually a better first step than a full team, and the model supports deferring a GCC entirely.",
        ["Start with a two-person pod", "Defer the team until there is a prototype to scale"],
        ["Whether the idea has a funded owner at HQ"],
        "indicative",
      );
    }
  }

  if (answers.responsibilityOwner === "undecided") {
    rec(
      "ownership-undecided",
      ["responsibilityOwner=undecided"],
      "Decide who is accountable before the first hire",
      "No named owner for what this team ships is the single most common reason a first India team stalls. It is a readiness gate in this model, not a preference.",
      ["Name an HQ owner for the first six months", "Hire the India lead first and hold everything else"],
      ["Who at HQ has the authority to accept or reject the work"],
      "insufficient-evidence",
    );
  }

  if (answers.budgetCeilingMonthly != null && answers.budgetCeilingMonthly > 0) {
    rec(
      "budget-ceiling",
      [`budgetCeilingMonthly=${answers.budgetCeilingMonthly}`],
      "Check this shape against your ceiling",
      "Cost the proposal in the Team & cost area before committing to it. If it does not fit, cut scope rather than seniority - a team of juniors with no lead is the shape that most reliably fails at this distance.",
      ["Reduce headcount and keep the seniority mix", "Start one wave later with the same shape"],
      ["Whether the ceiling is a hard budget or a first-year target"],
    );
  }

  // Shared and fractional seats are called out rather than presented as hires.
  const sharedSeats = seats.filter((seat) => seat.shared);
  if (sharedSeats.length > 0) {
    rec(
      "shared-seats",
      [`sharedRoles=${sharedSeats.map((seat) => seat.roleKey).join("|")}`],
      "Some of these are shared, not dedicated hires",
      `${sharedSeats.map((seat) => seat.roleKey).join(", ")} are usually shared or fractional at this size. They are costed as full seats here; reduce the FTE if you intend to share them.`,
      ["Buy the capability fractionally rather than hiring for it"],
      [],
    );
  }

  const hiringOrder = [...seats]
    .sort((a, b) => {
      const rank: Record<SeniorityKey, number> = { lead: 0, senior: 1, mid: 2, junior: 3 };
      return rank[a.seniority] - rank[b.seniority];
    })
    .map(seatKey);

  return { template, seats, removed, recommendations, hiringOrder };
}

/** The proposal as team rows, ready to be diffed against the current team. */
export function proposalToRows(proposal: TeamProposal, startMonth = 1): TeamRow[] {
  return proposal.seats.map((seat) =>
    createTeamRow({
      roleKey: seat.roleKey,
      seniority: seat.seniority,
      fte: seat.fte,
      startMonth,
      skillTags: seat.skillTags ?? [],
      compensationBasis: "base-salary",
    }),
  );
}

export interface TeamDiff {
  added: { roleKey: string; seniority: SeniorityKey; fte: number }[];
  removed: { roleKey: string; seniority: SeniorityKey; fte: number }[];
  unchanged: { roleKey: string; seniority: SeniorityKey; fte: number }[];
}

/**
 * What applying a proposal would actually change.
 *
 * Nothing is written until the visitor accepts this diff, and the previous
 * team is kept so the change can be undone. A suggestion never silently
 * overwrites an edit somebody made by hand.
 */
export function diffTeam(current: TeamRow[], proposed: TeamRow[]): TeamDiff {
  const key = (row: { roleKey: string; seniority: SeniorityKey }) => `${row.roleKey}:${row.seniority}`;
  const currentCounts = new Map<string, number>();
  current.forEach((row) => currentCounts.set(key(row), (currentCounts.get(key(row)) ?? 0) + row.fte));
  const proposedCounts = new Map<string, number>();
  proposed.forEach((row) => proposedCounts.set(key(row), (proposedCounts.get(key(row)) ?? 0) + row.fte));

  const added: TeamDiff["added"] = [];
  const removed: TeamDiff["removed"] = [];
  const unchanged: TeamDiff["unchanged"] = [];

  const keys = new Set(Array.from(currentCounts.keys()).concat(Array.from(proposedCounts.keys())));
  keys.forEach((entry) => {
    const [roleKey, seniority] = entry.split(":") as [string, SeniorityKey];
    const before = currentCounts.get(entry) ?? 0;
    const after = proposedCounts.get(entry) ?? 0;
    if (after > before) added.push({ roleKey, seniority, fte: after - before });
    else if (after < before) removed.push({ roleKey, seniority, fte: before - after });
    else if (after > 0) unchanged.push({ roleKey, seniority, fte: after });
  });

  return { added, removed, unchanged };
}
