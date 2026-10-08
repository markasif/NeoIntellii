/**
 * External references cited on the AI Engineering pages. Every claim that
 * leans on outside work renders through SourceNote with publisher, title,
 * year and URL. Statistics are deliberately absent: the section makes no
 * quantitative promises, so there are none to source.
 */
export interface ReferenceSource {
  id: string;
  statement: string;
  publisher: string;
  title: string;
  year: string;
  url: string;
  context: string;
}

export const AI_ENGINEERING_SOURCES: Record<string, ReferenceSource> = {
  hiddenTechDebt: {
    id: "hiddenTechDebt",
    statement:
      "In real-world machine learning systems the model code is a small part of the whole; the surrounding data, configuration, serving and monitoring infrastructure is where most of the engineering and most of the long-term cost sits.",
    publisher: "Sculley et al., NeurIPS",
    title: "Hidden Technical Debt in Machine Learning Systems",
    year: "2015",
    url: "https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems",
    context: "A widely cited research paper from Google engineers. The point holds for GenAI and agent systems as much as for classical ML.",
  },
  rulesOfMl: {
    id: "rulesOfMl",
    statement:
      "Google's Rules of Machine Learning opens with the advice not to be afraid to launch a product without machine learning, and to start with heuristics when the data and the problem do not yet justify a model.",
    publisher: "Google Developers",
    title: "Rules of Machine Learning: Best Practices for ML Engineering",
    year: "undated guide",
    url: "https://developers.google.com/machine-learning/guides/rules-of-ml",
    context: "Practitioner guidance rather than a study. It supports the view that the simplest system that solves the problem should be tried first.",
  },
  nistAiRmf: {
    id: "nistAiRmf",
    statement:
      "The NIST AI Risk Management Framework organises AI risk work into four functions: Govern, Map, Measure and Manage, with measurement treated as an ongoing activity rather than a one-off test.",
    publisher: "National Institute of Standards and Technology",
    title: "AI Risk Management Framework (AI RMF 1.0)",
    year: "2023",
    url: "https://www.nist.gov/itl/ai-risk-management-framework",
    context: "A voluntary framework. NeoIntelli uses its structure as a reference when shaping evaluation and monitoring plans; it does not certify compliance with it.",
  },
  mcp: {
    id: "mcp",
    statement:
      "The Model Context Protocol (MCP) is an open standard, introduced by Anthropic in November 2024, for connecting AI applications to tools and data sources through a common client-server interface.",
    publisher: "Model Context Protocol project",
    title: "Model Context Protocol specification and documentation",
    year: "2024",
    url: "https://modelcontextprotocol.io/",
    context: "Referenced as a definition. Whether MCP is the right integration layer for a given system is a design decision, not a default.",
  },
};
