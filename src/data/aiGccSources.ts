/**
 * External research cited on AI GCC pages.
 *
 * Claim governance: a statistic is only published with a visible source, year
 * and context. Numbers that cannot be tied to a named, current source do not
 * belong on these pages. Edit here, not inline, so every citation is auditable.
 *
 * VERIFICATION NOTE: the survey figures below were cross-checked against
 * multiple secondary reports of the survey during the September 2026 content
 * update; the primary page could not be fetched from the build environment.
 * Confirm against the primary source before treating them as final.
 */
export interface ResearchSource {
  id: string;
  /** The claim as it should read on the page. */
  statement: string;
  publisher: string;
  title: string;
  year: string;
  url: string;
  /** What the number measures, so it is not read out of context. */
  context: string;
}

export const AI_GCC_RESEARCH: ResearchSource[] = [
  {
    id: "state-of-ai-2025-adoption",
    statement: "88% of surveyed organizations report using AI in at least one business function.",
    publisher: "Global management consultancy",
    title: "The State of AI: Global Survey 2025",
    year: "2025",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    context: "Self-reported adoption in a global executive survey; use of AI in one function is not the same as scaled, value-generating deployment.",
  },
  {
    id: "state-of-ai-2025-ebit",
    statement: "Only 39% of surveyed organizations report any enterprise-level EBIT impact from AI, and most of those report it at under 5% of EBIT.",
    publisher: "Global management consultancy",
    title: "The State of AI: Global Survey 2025",
    year: "2025",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    context: "Respondent-reported EBIT attribution at the enterprise level; the gap between adoption and profit impact is the point, not the precise figure.",
  },
];

export const getResearch = (id: string) => {
  const source = AI_GCC_RESEARCH.find((entry) => entry.id === id);
  if (!source) throw new Error(`Unknown research source: ${id}`);
  return source;
};
