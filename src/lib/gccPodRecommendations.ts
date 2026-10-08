import { roles, type ComplexityTierKey } from "@/data/gccCostData";

/**
 * Advisory layer for the cost calculator's team step.
 *
 * Reads the pod the visitor has shaped - headcount per role, the seniority
 * tier of every seat, the focus areas ticked per role, and the add-ons - and
 * says what NeoIntelli would say in the first call: where the shape has a
 * gap, and what we would tweak. It never changes the numbers; the price is
 * the visitor's configuration, the advice is ours.
 *
 * Pure and synchronous so it can be unit-tested and rendered on every
 * keystroke. Rules are opinions from building pods, not statistics - keep
 * the copy free of made-up percentages.
 */

export interface PodInput {
  /** Role key -> headcount. */
  teamCounts: Record<string, number>;
  /** Role key -> seniority tier index per seat (0 junior .. 3 lead). */
  seniorityBreakdown: Record<string, number[]>;
  /** Role key -> focus-area keys the visitor ticked. */
  specializations: Record<string, string[]>;
  complexityTier: ComplexityTierKey;
  includeSME: boolean;
}

export type RecommendationKind = "gap" | "tip";

export interface Recommendation {
  id: string;
  kind: RecommendationKind;
  /** Short imperative headline: "Add a Product Owner". */
  title: string;
  /** One or two sentences of why. */
  detail: string;
  /** Set when the note belongs under one role's card. */
  roleKey?: string;
}

const LEAD = 3;
const SENIOR = 2;

const count = (input: PodInput, key: string) => input.teamCounts[key] || 0;
const seats = (input: PodInput, key: string) => input.seniorityBreakdown[key] ?? [];
const has = (input: PodInput, key: string, spec: string) => (input.specializations[key] ?? []).includes(spec);
const roleLabel = (key: string) => roles.find((r) => r.key === key)?.label ?? key;

/** Focus areas that flag deep-tech work, across every active role. */
export function deepTechSignals(input: PodInput): string[] {
  const hits: string[] = [];
  for (const role of roles) {
    if (count(input, role.key) === 0) continue;
    for (const spec of role.specializations) {
      if (spec.deepTech && has(input, role.key, spec.key)) hits.push(spec.label);
    }
  }
  return hits;
}

/** The complexity tier the ticked focus areas point at. */
export function suggestedComplexityTier(input: PodInput): ComplexityTierKey {
  return deepTechSignals(input).length > 0 ? "deep" : "standard";
}

export function buildRecommendations(input: PodInput): Recommendation[] {
  const out: Recommendation[] = [];
  const total = Object.values(input.teamCounts).reduce((a, b) => a + b, 0);
  if (total === 0) return out;

  const ai = count(input, "ai");
  const ml = count(input, "ml");
  const aiMl = ai + ml;
  const devops = count(input, "devops");
  const qa = count(input, "qa");
  const po = count(input, "po");
  const dataeng = count(input, "dataeng");
  const mobile = count(input, "mobile");
  const apiOwners = count(input, "backend") + count(input, "fullstack");

  // --- Pod shape ---------------------------------------------------------

  if (total >= 4 && po === 0) {
    out.push({
      id: "add-po",
      kind: "gap",
      title: "Add a Product Owner as your US/EU bridge",
      detail:
        "A pod this size without a local owner spends its mornings waiting on HQ. One Product Owner keeps the backlog moving in your sleep hours and turns ambiguous stories into work the engineers can start.",
    });
  }

  if (aiMl >= 2 && devops === 0) {
    out.push({
      id: "add-devops",
      kind: "gap",
      title: "Add a Cloud/DevOps seat",
      detail:
        "Agent and model workloads need someone who owns the serving environment, CI/CD and cost. Without it the AI engineers end up doing infra part-time, badly.",
    });
  }

  if (ai > 0 && qa === 0) {
    out.push({
      id: "add-qa-evals",
      kind: "gap",
      title: "Add QA/SDET with LLM-eval experience",
      detail:
        "Agentic systems regress silently - a prompt or model change breaks a flow nobody re-tested. An SDET owning the eval suite is the cheapest insurance in the pod.",
    });
  } else if (ai > 0 && qa > 0 && !has(input, "qa", "llmeval")) {
    out.push({
      id: "qa-llmeval",
      kind: "tip",
      title: "Put LLM eval suites in QA's scope",
      detail: "You have AI engineers and QA - tick LLM eval / regression suites so we staff an SDET who has built one before.",
      roleKey: "qa",
    });
  }

  if (ml > 0 && dataeng === 0) {
    out.push({
      id: "add-dataeng",
      kind: "gap",
      title: "Pair ML with a Data Engineer",
      detail: "Model work without a pipeline owner stalls on data. One Data Engineer keeps training and feature data flowing so ML engineers train models instead of fixing extracts.",
    });
  }

  const gpuWork =
    has(input, "ml", "finetune") || has(input, "ml", "serving") || has(input, "ml", "dl") || has(input, "ml", "cv");
  if (gpuWork && !(devops > 0 && has(input, "devops", "gpu"))) {
    out.push({
      id: "gpu-infra",
      kind: "gap",
      title: "Cover GPU & inference infra",
      detail:
        devops === 0
          ? "Fine-tuning and model serving need GPU infrastructure someone owns. Add a Cloud/DevOps engineer and tick GPU & inference infra."
          : "Your ML focus areas need GPU infrastructure - tick GPU & inference infra under Cloud/DevOps so we hire for it.",
      roleKey: devops > 0 ? "devops" : undefined,
    });
  }

  if (mobile > 0 && apiOwners === 0) {
    out.push({
      id: "mobile-api",
      kind: "gap",
      title: "Give the mobile app an API owner",
      detail: "Mobile engineers need a Backend or Full-Stack seat owning the services they call, or the app blocks on HQ for every endpoint.",
    });
  }

  if (total > 12) {
    out.push({
      id: "split-pods",
      kind: "tip",
      title: "Split into two pods",
      detail: "Above roughly a dozen seats we run two pods, each with its own lead and Product Owner, rather than one large team - coordination cost grows faster than output.",
    });
  }

  // --- Seniority ---------------------------------------------------------

  const allSeats = Object.values(input.seniorityBreakdown).flat();
  if (allSeats.length > 0 && allSeats.every((tier) => tier === 0)) {
    out.push({
      id: "all-junior",
      kind: "gap",
      title: "Add at least one Senior seat",
      detail: "An all-junior pod needs constant HQ oversight, which is the cost you are trying to remove. One Senior per pod is the floor for autonomy.",
    });
  }

  for (const key of ["ai", "ml", "backend", "dataeng"]) {
    const s = seats(input, key);
    if (s.length >= 2 && !s.includes(LEAD)) {
      out.push({
        id: `lead-${key}`,
        kind: "tip",
        title: `Make one ${roleLabel(key)} seat a Staff / Tech Lead`,
        detail: "With two or more seats in a discipline, one of them should own architecture decisions and code review - otherwise every design question travels back to HQ.",
        roleKey: key,
      });
    }
  }

  const poSeats = seats(input, "po");
  if (poSeats.length > 0 && !poSeats.some((tier) => tier >= SENIOR)) {
    out.push({
      id: "po-senior",
      kind: "tip",
      title: "Make the Product Owner a Senior seat",
      detail: "A bridge role only works with someone who has run sprints for a US or European stakeholder before - a mid-level PO becomes a relay, not an owner.",
      roleKey: "po",
    });
  }

  // --- Focus areas -------------------------------------------------------

  if (ai > 0 && (input.specializations.ai ?? []).length === 0) {
    out.push({
      id: "ai-framework",
      kind: "tip",
      title: "Tell us the agent framework",
      detail: "LangGraph, CrewAI and plain tool-calling hire differently. Tick the focus areas so we shortlist engineers who have shipped that stack, not just read about it.",
      roleKey: "ai",
    });
  }

  if (ml > 0 && (input.specializations.ml ?? []).length === 0) {
    out.push({
      id: "ml-focus",
      kind: "tip",
      title: "Tell us the ML focus",
      detail: "Deep learning, NLP and classical forecasting are different hiring pools. Tick what the models actually are so the shortlist matches.",
      roleKey: "ml",
    });
  }

  if (ai > 0 && has(input, "ai", "langgraph") && !has(input, "ai", "guardrails") && !has(input, "ai", "langsmith")) {
    out.push({
      id: "ai-evals",
      kind: "tip",
      title: "Add evals & tracing to the AI scope",
      detail: "Agents built without evals or tracing are hard to trust in production. Tick Evals & guardrails or LangSmith so the engineers we place already work that way.",
      roleKey: "ai",
    });
  }

  // --- Add-ons -----------------------------------------------------------

  const signals = deepTechSignals(input);
  if (signals.length > 0 && input.complexityTier === "standard") {
    out.push({
      id: "complexity-deep",
      kind: "tip",
      title: "Price this as Deep Tech",
      detail: `${signals.slice(0, 3).join(", ")} ${signals.length === 1 ? "is" : "are"} deep-tech work. Switch the complexity tier so the estimate reflects the scarcer profile you are hiring for.`,
    });
  }

  if (aiMl >= 2 && !input.includeSME) {
    out.push({
      id: "add-sme",
      kind: "tip",
      title: "Add the Fractional Principal AI SME",
      detail: "Pods with two or more AI/ML seats benefit most from weekly architecture reviews - design drift gets caught in review instead of in production.",
    });
  }

  return out;
}
