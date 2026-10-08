/**
 * The risk register.
 *
 * An ordered list, not a radar chart. A radar chart of five made-up scores
 * looks like analysis and carries none, and the thing a reader actually needs
 * from a risk is what triggered it, what would change it, and who should own
 * it - none of which fits on an axis.
 *
 * There are no probabilities here and no percentile claims. Severity is a
 * three-step ordering with a written rationale, derived from rules over the
 * profile, and every entry names the evidence it is missing.
 */

import { assessReadiness } from "./readiness";
import { findCity } from "./cities";
import { roleLabel } from "./roles";
import { hasMembership } from "./countries";
import type { CostResult, EconomicsResult, Profile, RiskItem, Scenario } from "./types";

export const RISK_RULES_VERSION = "risk-rules-1.0.0";

const SEVERITY_ORDER: Record<RiskItem["severity"], number> = { critical: 0, significant: 1, watch: 2 };

export function buildRiskRegister(
  profile: Profile,
  scenario: Scenario,
  cost: CostResult,
  economics: EconomicsResult,
): RiskItem[] {
  const risks: RiskItem[] = [];
  const push = (risk: RiskItem) => risks.push(risk);

  /* --------------------------------------------------- role concentration */

  const activeRoles = new Map<string, number>();
  profile.team.forEach((row) => activeRoles.set(row.roleKey, (activeRoles.get(row.roleKey) ?? 0) + row.fte));
  const totalFte = Array.from(activeRoles.values()).reduce((sum, value) => sum + value, 0);
  const singletons = Array.from(activeRoles.entries()).filter(([, fte]) => fte <= 1);

  if (totalFte > 0 && singletons.length > 0) {
    push({
      id: "role-concentration",
      title: `${singletons.length} capability(ies) rest on a single person`,
      category: "role-concentration",
      severity: singletons.length >= 3 ? "significant" : "watch",
      trigger: `${singletons.map(([key]) => roleLabel(key)).join(", ")} at 1 FTE or less.`,
      severityRationale:
        "A single-person capability has no cover for leave, illness or resignation. At this team size that is normal; it becomes serious when the capability is on the critical path.",
      missingEvidence: ["Which of these capabilities is on the delivery critical path"],
      mitigation: "Decide for each one whether HQ can cover it, whether it can be shared, or whether it needs a second seat in the second wave.",
      suggestedOwner: "Delivery lead",
      phase: "first-90-days",
    });
  }

  const seniorityMix = profile.team.filter((row) => row.seniority === "junior" || row.seniority === "mid");
  if (totalFte >= 4 && seniorityMix.length === profile.team.length) {
    push({
      id: "no-senior-anchor",
      title: "No senior or lead seat in the team",
      category: "role-concentration",
      severity: "critical",
      trigger: "Every seat is junior or mid-level.",
      severityRationale:
        "A team of this size at this distance with nobody who can make a technical call needs HQ to make every one of them. That dependency is what usually breaks first.",
      missingEvidence: ["Whether an HQ engineer will be embedded to cover this"],
      mitigation: "Add a senior or lead seat to the first wave, or name the HQ engineer who will hold that role and how much of their week it will take.",
      suggestedOwner: "HQ engineering lead",
      phase: "before-launch",
    });
  }

  /* ---------------------------------------------------- hiring dependency */

  const firstWave = profile.team.filter((row) => row.startMonth <= 3).length;
  if (firstWave >= 5) {
    push({
      id: "hiring-concentration",
      title: `${firstWave} hires planned in the first three months`,
      category: "hiring-dependency",
      severity: firstWave >= 8 ? "significant" : "watch",
      trigger: `${firstWave} seats start in months 1-3.`,
      severityRationale:
        "Hiring several specialist roles at once concentrates the risk into one window. If it slips, everything downstream slips with it, and the cost model has no way to know how long it will take.",
      missingEvidence: ["Actual time-to-hire for these roles in this city - this model publishes none"],
      mitigation: "Sequence the first wave so that a slip in one role does not block the others, and agree what happens if a role is still open at month 4.",
      suggestedOwner: "Hiring owner",
      phase: "before-launch",
    });
  }

  if (cost.unfilledFteMonths > 3) {
    push({
      id: "capacity-gap",
      title: `${cost.unfilledFteMonths.toFixed(0)} FTE-months of planned capacity are unfilled`,
      category: "hiring-dependency",
      severity: cost.unfilledFteMonths > 12 ? "significant" : "watch",
      trigger: "A hiring delay or modelled attrition leaves planned seats empty.",
      severityRationale:
        "Lower spend from an unfilled seat is not a saving. The work that seat was for does not happen, and the plan behind it still assumes it did.",
      missingEvidence: ["Which delivery milestones depend on the unfilled seats"],
      mitigation: "Re-plan the milestones against the delayed schedule, or restore the original start dates.",
      suggestedOwner: "Delivery lead",
      phase: "first-90-days",
    });
  }

  /* ----------------------------------------------------------- budget, FX */

  if (profile.displayCurrency !== "INR") {
    push({
      id: "fx-exposure",
      title: `Costs are incurred in rupees and read in ${profile.displayCurrency}`,
      category: "budget-fx",
      severity: "watch",
      trigger: `Display currency is ${profile.displayCurrency}; the team is paid in India.`,
      severityRationale:
        "A rate move changes the reported cost without anything about the team changing. The quotes in this model are planning defaults dated " +
        `${scenario.fx.quoteDate}, not a live feed.`,
      missingEvidence: ["Your own treasury rate or hedging position"],
      mitigation: "Enter your own rate, and run the FX stress test in the Compare area before taking a number to a board.",
      suggestedOwner: "Finance",
      phase: "ongoing",
    });
  }

  if (cost.exclusions.length >= 3) {
    push({
      id: "budget-incomplete",
      title: `${cost.exclusions.length} cost lines are not budgeted`,
      category: "budget-fx",
      severity: cost.exclusions.length >= 5 ? "significant" : "watch",
      trigger: "Cost lines with no figure entered and no approved default.",
      severityRationale:
        "The total is a partial cost, and it is the kind of partial that gets quoted as if it were complete. Recruitment, setup and compute are the lines most often left out and most often material.",
      missingEvidence: cost.exclusions.slice(0, 4),
      mitigation: "Enter a figure for each excluded line, even a rough one, before this number is used to make a decision.",
      suggestedOwner: "Finance",
      phase: "before-launch",
    });
  }

  if (economics.paybackState === "not-recovered-in-horizon") {
    push({
      id: "no-payback",
      title: "The initial deficit is not recovered inside the horizon",
      category: "budget-fx",
      severity: "significant",
      trigger: "Cumulative difference stays negative for the full modelled period.",
      severityRationale:
        "On these inputs, the case does not pay back. That may be right - a capability case is not only a cost case - but it should be stated rather than discovered later.",
      missingEvidence: ["Whether the case rests on capability rather than cost"],
      mitigation: "Either re-examine the baseline and scope, or make the non-cost case explicitly.",
      suggestedOwner: "Sponsor",
      phase: "before-launch",
    });
  }

  /* ------------------------------------------------------------------ data */

  const remote = profile.privacy.indiaRemoteAccess;
  const regulatedData =
    profile.privacy.dataOriginMarkets.some((code) => hasMembership(code, "gdpr-applicable") || hasMembership(code, "uk-gdpr")) ||
    profile.privacy.regulatedActivities.length > 0;

  if (remote === "unknown") {
    push({
      id: "data-access-unknown",
      title: "It is not established whether the India team would access personal data",
      category: "data",
      severity: "significant",
      trigger: "The remote-access question is unanswered.",
      severityRationale:
        "This one answer sets both the privacy workload and the launch sequence. Leaving it open means the 90-day plan is built on a guess.",
      missingEvidence: ["Which systems the team needs", "Whether those systems hold personal data"],
      mitigation: "Answer it in the Prepare area. If the answer is yes, the access controls and review come before the first delivery task, not after.",
      suggestedOwner: "Data protection owner",
      phase: "before-launch",
    });
  } else if (remote === "yes" && regulatedData) {
    push({
      id: "cross-border-access",
      title: "India-based staff would access personal data from a regulated market",
      category: "data",
      severity: "critical",
      trigger: "Remote access confirmed, with data originating in a market that regulates transfers.",
      severityRationale:
        "Remote access is capable of being a transfer in its own right. The mechanism, the assessment and the receiving entity all have to be settled before access is granted, and each has a lead time.",
      missingEvidence: ["The receiving legal entity", "The transfer mechanism", "Whether a transfer assessment is needed"],
      mitigation: "Get a data protection review before the first access request, and sequence the launch plan behind it.",
      suggestedOwner: "Data protection adviser",
      phase: "before-launch",
    });
  }

  /* -------------------------------------------------------- AI governance */

  const hasAiRoles = profile.team.some((row) => row.roleKey === "ai" || row.roleKey === "ml");
  const hasQa = profile.team.some((row) => row.roleKey === "qa");
  if (hasAiRoles && !hasQa) {
    push({
      id: "no-evaluation-capability",
      title: "AI work planned with nobody owning evaluation",
      category: "ai-governance",
      severity: "significant",
      trigger: "AI or ML seats in the team, and no QA or evaluation seat.",
      severityRationale:
        "Without someone owning evaluation, the only measure of whether a model works is whether it looked right in a demo. That is how a system reaches production untested.",
      missingEvidence: ["Whether HQ owns evaluation and has capacity for it"],
      mitigation: "Add an evaluation seat, or name the HQ owner and the suite they will maintain.",
      suggestedOwner: "AI lead",
      phase: "before-launch",
    });
  }

  if (scenario.aiCompute.mode === "not-budgeted" && hasAiRoles) {
    push({
      id: "compute-unbudgeted",
      title: "AI and cloud consumption is unbudgeted for an AI team",
      category: "ai-governance",
      severity: "watch",
      trigger: "AI or ML seats with compute set to not budgeted.",
      severityRationale:
        "For training or high-volume inference, compute can be a material part of the run rate. Unbudgeted, it becomes a surprise rather than a decision.",
      missingEvidence: ["Expected training and inference volumes"],
      mitigation: "Enter a monthly budget or the structured GPU and API figures in the Team & cost area.",
      suggestedOwner: "AI lead",
      phase: "before-launch",
    });
  }

  /* ------------------------------------------------- vendor and transfer */

  if (scenario.engagement === "neointelli-managed" && profile.ownership === "transfer-later") {
    push({
      id: "transfer-terms",
      title: "A transfer is intended but its terms are not modelled",
      category: "vendor-transfer",
      severity: "significant",
      trigger: "Managed engagement with an intent to transfer later.",
      severityRationale:
        "Transfer is where these arrangements most often go wrong, and it goes wrong at the start - in what the contract does not say - rather than at the end.",
      missingEvidence: ["Transfer trigger", "Transfer cost and who bears it", "Whether employment terms and tenure survive", "Whether contracts, assets and IP are assignable"],
      mitigation: "Settle the transfer terms in writing before the first hire. This model attaches no default timeline, fee or tenure outcome to a transfer.",
      suggestedOwner: "Legal",
      phase: "before-launch",
    });
  }

  /* -------------------------------------------------------- HQ oversight */

  const readiness = assessReadiness(profile.readiness);
  readiness.openGates.forEach((gate) => {
    push({
      id: `readiness-gate-${gate.questionId}`,
      title: gate.question,
      category: "hq-oversight",
      severity: "critical",
      trigger: `Readiness gate answered "${gate.answer}".`,
      severityRationale: gate.note,
      missingEvidence: gate.answer === "unanswered" ? ["This question has not been answered"] : [],
      mitigation: "Resolve this before committing to a start date. It blocks a readiness verdict on its own.",
      suggestedOwner: "Sponsor",
      phase: "before-launch",
    });
  });

  const city = findCity(profile.city);
  if (city && !city.neoIntelliPresence && scenario.engagement === "neointelli-managed") {
    push({
      id: "delivery-footprint",
      title: `A managed arrangement in ${city.label} would be arranged, not existing`,
      category: "vendor-transfer",
      severity: "watch",
      trigger: `Managed engagement selected with ${city.label} as the location.`,
      severityRationale: city.presenceNote,
      missingEvidence: ["What a managed arrangement in this city would actually involve"],
      mitigation: "Confirm what on-the-ground presence a managed arrangement here would have before relying on it.",
      suggestedOwner: "Sponsor",
      phase: "before-launch",
    });
  }

  return risks.sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
}

export const SEVERITY_LABELS: Record<RiskItem["severity"], string> = {
  critical: "Critical",
  significant: "Significant",
  watch: "Watch",
};

export const REGISTER_NOTE =
  "Severity is an ordering with a written rationale, not a probability. This register contains no likelihood percentages and no percentile claims, because nothing in this model measures either.";
