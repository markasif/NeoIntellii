/**
 * Readiness: six dimensions, two questions each.
 *
 * The questions are written to work for a funded pre-revenue company as well
 * as an established one, which is why none of them asks about revenue. Revenue
 * is a poor first discriminator: a Series A company with a board mandate, two
 * years of runway and a named owner is more ready than a profitable one with
 * none of those.
 *
 * Two things are reported separately and must never be collapsed:
 *
 *   - Coverage: how much of the assessment has actually been answered.
 *   - Maturity: what the answers say about the state of each dimension.
 *
 * A high average across ten answered questions does not make a company ready
 * when the budget owner is missing, so three answers are gates rather than
 * scores: no budget owner, no accountable sponsor, and unresolved data access
 * that the work requires. Any of those, or any unanswered question, and the
 * result cannot be "Ready" - whatever the average says.
 */

import type { ReadinessAnswer } from "./types";

export const READINESS_RULES_VERSION = "readiness-rules-1.0.0";

export type DimensionKey =
  | "mandate"
  | "sponsorship"
  | "funding"
  | "india-leadership"
  | "data-platform"
  | "governance";

export interface ReadinessQuestion {
  id: string;
  dimension: DimensionKey;
  question: string;
  /** Why this question is being asked, in one line. */
  why: string;
  /** True when a "not in place" answer is a gate rather than a gap. */
  gate?: boolean;
  /** Shown under a gate answer, explaining what it blocks. */
  gateNote?: string;
}

export interface ReadinessDimension {
  key: DimensionKey;
  label: string;
  description: string;
}

export const READINESS_DIMENSIONS: ReadinessDimension[] = [
  { key: "mandate", label: "Mandate and success measures", description: "What this team is for, and how you will know it worked" },
  { key: "sponsorship", label: "Sponsor and decision rights", description: "Who is accountable, and what they can decide alone" },
  { key: "funding", label: "Funding horizon and ramp budget", description: "How long the money lasts and what it covers" },
  { key: "india-leadership", label: "India leadership and hiring ownership", description: "Who leads on the ground and who owns hiring" },
  { key: "data-platform", label: "Data, platform and security readiness", description: "Whether the team can actually get to the work" },
  { key: "governance", label: "Legal, IP and operating governance", description: "The structure the team operates inside" },
];

export const READINESS_QUESTIONS: ReadinessQuestion[] = [
  {
    id: "mandate-scope",
    dimension: "mandate",
    question: "Is there a written statement of what this team will own?",
    why: "A team without a written mandate inherits whatever HQ has least time for, which is rarely what justified the investment.",
  },
  {
    id: "mandate-measures",
    dimension: "mandate",
    question: "Have you agreed how you will judge whether it worked, twelve months in?",
    why: "Measures agreed after the fact are always the measures the team happened to meet.",
  },
  {
    id: "sponsor-named",
    dimension: "sponsorship",
    question: "Is there a named executive accountable for this centre?",
    why: "Not a supporter or a stakeholder - the person whose problem it is when it goes wrong.",
    gate: true,
    gateNote: "Without an accountable sponsor this cannot be assessed as ready, whatever the other answers say.",
  },
  {
    id: "sponsor-decisions",
    dimension: "sponsorship",
    question: "Can that person approve hiring and spend without a further approval round?",
    why: "Decision rights, not seniority, are what determine how fast a first team gets built.",
  },
  {
    id: "funding-owner",
    dimension: "funding",
    question: "Is there a named budget owner for the first twelve months?",
    why: "Somebody has to be able to say yes to an invoice.",
    gate: true,
    gateNote: "Without a budget owner this cannot be assessed as ready.",
  },
  {
    id: "funding-ramp",
    dimension: "funding",
    question: "Does the budget cover the ramp - recruitment, setup and the months before the team is fully productive?",
    why: "The steady-state run rate is not the hard part. The ramp is.",
  },
  {
    id: "india-lead",
    dimension: "india-leadership",
    question: "Do you know who will lead the team on the ground, or how you will find them?",
    why: "A first team without a local lead runs on the HQ sponsor's calendar, which does not scale past a few people.",
  },
  {
    id: "hiring-owner",
    dimension: "india-leadership",
    question: "Is it clear who owns hiring - your team, a partner, or both?",
    why: "Shared hiring ownership with no named decision-maker is the most common cause of a slow first wave.",
  },
  {
    id: "data-access",
    dimension: "data-platform",
    question: "Is it resolved whether the India team can access the data and systems the work needs?",
    why: "The answer decides both the launch sequence and the privacy work, and it is usually the longest lead time in the plan.",
    gate: true,
    gateNote: "Unresolved access to data the work requires is a gate: the first delivery cannot be planned around it.",
  },
  {
    id: "platform-environment",
    dimension: "data-platform",
    question: "Can a new engineer in India get a working development environment in their first week?",
    why: "If the answer is no at HQ, it will not be yes eight thousand kilometres away.",
  },
  {
    id: "ip-assignment",
    dimension: "governance",
    question: "Is it settled how IP created in India is assigned to the group?",
    why: "This is a contract question and it does not answer itself, whichever employment arrangement you use.",
  },
  {
    id: "operating-governance",
    dimension: "governance",
    question: "Is there an agreed operating rhythm - who reviews what, and how often?",
    why: "Distance amplifies whatever governance you already have, including none.",
  },
];

export const ANSWER_LABELS: Record<ReadinessAnswer, string> = {
  "in-place": "In place",
  partly: "Partly in place",
  "not-in-place": "Not in place",
  "not-sure": "Not sure",
};

/** Maturity weight per answer. Used for the dimension summary, not for a verdict. */
const WEIGHT: Record<ReadinessAnswer, number> = {
  "in-place": 1,
  partly: 0.5,
  "not-in-place": 0,
  "not-sure": 0,
};

export interface DimensionSummary {
  dimension: ReadinessDimension;
  answered: number;
  total: number;
  /** Maturity across the questions that were answered. Null when none were. */
  maturity: number | null;
  /** Gaps in this dimension, in the words of the questions themselves. */
  gaps: string[];
  unanswered: string[];
}

export type ReadinessVerdict = "ready" | "conditional" | "not-ready" | "incomplete";

export interface ReadinessResult {
  dimensions: DimensionSummary[];
  /** Fraction of questions answered. Coverage, never presented as progress towards success. */
  coverage: number;
  answeredCount: number;
  totalCount: number;
  /** Gates that are open. Any one of these blocks a "ready" verdict. */
  openGates: { questionId: string; question: string; note: string; answer: ReadinessAnswer | "unanswered" }[];
  verdict: ReadinessVerdict;
  verdictExplanation: string;
  /**
   * A 0-40 score, retained only for compatibility with the existing readiness
   * assessment. It is published with its rubric and its coverage and is never
   * labelled validated.
   */
  legacyScore: number;
  legacyScoreRubric: string;
}

export const LEGACY_SCORE_RUBRIC =
  "Each of the twelve questions scores 0 for not in place or not sure, 1.67 for partly in place and 3.33 for in place, to a maximum of 40. It is a sum of answers, not a measurement of anything, and it is not valid at all unless coverage is 100%. A high score never overrides an open gate.";

export function assessReadiness(answers: Record<string, ReadinessAnswer>): ReadinessResult {
  const dimensions: DimensionSummary[] = READINESS_DIMENSIONS.map((dimension) => {
    const questions = READINESS_QUESTIONS.filter((question) => question.dimension === dimension.key);
    const answered = questions.filter((question) => answers[question.id] != null);
    const scored = answered.filter((question) => answers[question.id] !== "not-sure");
    const maturity =
      scored.length > 0
        ? scored.reduce((sum, question) => sum + WEIGHT[answers[question.id]], 0) / scored.length
        : null;
    return {
      dimension,
      answered: answered.length,
      total: questions.length,
      maturity,
      gaps: answered
        .filter((question) => answers[question.id] === "not-in-place" || answers[question.id] === "partly")
        .map((question) => question.question),
      unanswered: questions.filter((question) => answers[question.id] == null).map((question) => question.question),
    };
  });

  const answeredCount = READINESS_QUESTIONS.filter((question) => answers[question.id] != null).length;
  const totalCount = READINESS_QUESTIONS.length;
  const coverage = totalCount > 0 ? answeredCount / totalCount : 0;

  const openGates = READINESS_QUESTIONS.filter((question) => question.gate)
    .map((question) => ({ question, answer: answers[question.id] }))
    .filter(({ answer }) => answer == null || answer === "not-in-place" || answer === "not-sure")
    .map(({ question, answer }) => ({
      questionId: question.id,
      question: question.question,
      note: question.gateNote ?? "This is a gate rather than a gap.",
      answer: (answer ?? "unanswered") as ReadinessAnswer | "unanswered",
    }));

  const legacyScore =
    READINESS_QUESTIONS.reduce((sum, question) => {
      const answer = answers[question.id];
      if (answer == null) return sum;
      return sum + WEIGHT[answer] * (40 / totalCount);
    }, 0);

  let verdict: ReadinessVerdict;
  let verdictExplanation: string;

  if (coverage < 1) {
    verdict = "incomplete";
    verdictExplanation = `${answeredCount} of ${totalCount} questions answered. An unanswered question is not a pass: this assessment cannot reach a verdict until all twelve are answered.`;
  } else if (openGates.length > 0) {
    verdict = "not-ready";
    verdictExplanation = `${openGates.length} gate(s) are open. These are not gaps to weigh against strengths elsewhere - each one blocks a launch on its own, and no score elsewhere offsets them.`;
  } else {
    const overall =
      dimensions.filter((entry) => entry.maturity != null).reduce((sum, entry) => sum + (entry.maturity ?? 0), 0) /
      Math.max(1, dimensions.filter((entry) => entry.maturity != null).length);
    if (overall >= 0.8) {
      verdict = "ready";
      verdictExplanation =
        "Every question is answered, no gate is open, and the answers are strong across all six dimensions. This says the questions have good answers today; it is not a prediction that the centre will succeed.";
    } else {
      verdict = "conditional";
      verdictExplanation =
        "Every question is answered and no gate is open, but several dimensions have real gaps. Those gaps are the launch plan's first tasks.";
    }
  }

  return {
    dimensions,
    coverage,
    answeredCount,
    totalCount,
    openGates,
    verdict,
    verdictExplanation,
    legacyScore: Math.round(legacyScore * 10) / 10,
    legacyScoreRubric: LEGACY_SCORE_RUBRIC,
  };
}

export const COVERAGE_NOTE =
  "Coverage counts questions you have answered. It is not a probability of success, and it does not go up because the answers are good.";
