/**
 * Structured content for the GCC Strategy & Setup pillar that more than one
 * place reads: the parallel setup timeline, the qualitative city assessment
 * and NeoIntelli's maturity stages. Kept out of the component files so the
 * components export only components.
 */

/*
 * Parallel setup timeline. Phases are illustrative program stages, not
 * calendar weeks: durations depend on operating model, entity route,
 * leadership market and workplace strategy, and are scoped per program.
 */
export const setupPhases = [
  { key: "lock", label: "Design lock", note: "Mandate, model, city, first roles" },
  { key: "foundation", label: "Foundation", note: "Entity, workspace, IT, policies" },
  { key: "mobilize", label: "Mobilize", note: "Leaders in seat, first cohort hired" },
  { key: "golive", label: "Go-live", note: "First employees, first mandate" },
] as const;

export type SetupPhaseKey = (typeof setupPhases)[number]["key"];

export interface Workstream {
  name: string;
  from: SetupPhaseKey;
  to: SetupPhaseKey;
  summary: string;
}

export const setupWorkstreams: Workstream[] = [
  { name: "Program management", from: "lock", to: "golive", summary: "One integrated plan, dependencies, decision gates, risk register, weekly cadence." },
  { name: "Entity & compliance", from: "lock", to: "mobilize", summary: "Entity route, registrations, employment framework and policies, coordinated with advisers." },
  { name: "Leadership", from: "lock", to: "mobilize", summary: "Center head and first function leads searched and closed before the first cohort." },
  { name: "Talent", from: "foundation", to: "golive", summary: "Role design, sourcing and technical validation for the initial workforce; onboarding sequence." },
  { name: "Workplace", from: "foundation", to: "mobilize", summary: "Office strategy, managed workspace, equipment and facilities readiness." },
  { name: "IT & security", from: "foundation", to: "mobilize", summary: "Identity, devices, connectivity, security baseline, headquarters integration." },
  { name: "HR & payroll readiness", from: "foundation", to: "golive", summary: "Employment workflows, payroll, benefits, policies and onboarding journey." },
  { name: "Governance", from: "lock", to: "golive", summary: "Decision rights, reporting, launch governance and the operating cadence after go-live." },
  { name: "HQ integration", from: "foundation", to: "golive", summary: "Systems, tooling, rituals and reporting lines connected to headquarters teams." },
];


/*
 * City comparison. `unitsFy26` is a sourced figure (India GCC
 * Landscape Report 2026); every Level below is NeoIntelli's assessment from
 * public ecosystem information and its own hiring activity, not a numeric
 * index. The structure is designed so role-level data from the NeoIntelli AI
 * Talent engine can be published against the same columns later without
 * changing the page.
 */
export type Level = "Very High" | "High" | "Medium" | "Emerging";

export interface CityAssessment {
  city: string;
  /**
   * GCC OPERATING UNITS in the city for FY26 (India GCC
   * Landscape Report 2026). Units are sites, not unique parent companies:
   * 2,117 GCCs run 3,728 units nationally. Omitted where the report does not
   * publish a comparable figure for the grouping.
   */
  unitsFy26?: string;
  talentDepth: Level;
  aiDataDepth: Level;
  leadershipDepth: Level;
  costPressure: Level;
  hiringCompetition: Level;
  realEstate: string;
  industryStrengths: string;
  ecosystemMaturity: Level;
  scalePotential: Level;
  bestFitMandate: string;
}

export const cityAssessments: CityAssessment[] = [
  {
    city: "Bengaluru",
    unitsFy26: "1,080+",
    talentDepth: "Very High",
    aiDataDepth: "Very High",
    leadershipDepth: "Very High",
    costPressure: "Very High",
    hiringCompetition: "Very High",
    realEstate: "Highest rents among Indian hubs; deep managed-office supply",
    industryStrengths: "Product and platform engineering, AI/ML, SaaS, deep tech, R&D",
    ecosystemMaturity: "Very High",
    scalePotential: "Very High",
    bestFitMandate: "Senior AI, product and platform engineering; AI leadership; research-adjacent work",
  },
  {
    city: "Hyderabad",
    unitsFy26: "515+",
    talentDepth: "Very High",
    aiDataDepth: "High",
    leadershipDepth: "High",
    costPressure: "High",
    hiringCompetition: "High",
    realEstate: "Large Grade-A supply; generally below Bengaluru",
    industryStrengths: "Engineering, data platforms, life sciences and pharma, BFSI, large-scale GCC campuses",
    ecosystemMaturity: "Very High",
    scalePotential: "Very High",
    bestFitMandate: "Multi-function centers at scale; data platforms; life sciences; engineering with growth headroom",
  },
  {
    city: "Pune",
    unitsFy26: "475+",
    talentDepth: "High",
    aiDataDepth: "High",
    leadershipDepth: "Medium",
    costPressure: "Medium",
    hiringCompetition: "High",
    realEstate: "Moderate; strong IT-park and suburban supply",
    industryStrengths: "Engineering R&D, automotive, manufacturing, BFSI, product engineering",
    ecosystemMaturity: "High",
    scalePotential: "High",
    bestFitMandate: "Engineering and product squads; automotive and industrial; BFSI technology",
  },
  {
    city: "Chennai",
    unitsFy26: "405+",
    talentDepth: "High",
    aiDataDepth: "Medium",
    leadershipDepth: "Medium",
    costPressure: "Medium",
    hiringCompetition: "Medium",
    realEstate: "Moderate; lower than Bengaluru and Hyderabad",
    industryStrengths: "Automotive, manufacturing, industrial engineering, BFSI operations, healthcare",
    ecosystemMaturity: "High",
    scalePotential: "High",
    bestFitMandate: "Engineering for industrial and automotive domains; BFSI and healthcare operations; stable delivery teams",
  },
  {
    city: "NCR (Delhi, Gurugram, Noida)",
    unitsFy26: "490+",
    talentDepth: "High",
    aiDataDepth: "Medium",
    leadershipDepth: "High",
    costPressure: "High",
    hiringCompetition: "High",
    realEstate: "Wide range; Gurugram premium, Noida moderate",
    industryStrengths: "BFSI, consulting, shared services, analytics, sales and customer operations",
    ecosystemMaturity: "High",
    scalePotential: "High",
    bestFitMandate: "Finance, analytics and shared-services centers; leadership near enterprise and consulting talent",
  },
  {
    city: "Mumbai",
    unitsFy26: "375+",
    talentDepth: "Medium",
    aiDataDepth: "Medium",
    leadershipDepth: "High",
    costPressure: "Very High",
    hiringCompetition: "High",
    realEstate: "Highest in India for prime locations",
    industryStrengths: "BFSI headquarters, capital markets, media, fintech",
    ecosystemMaturity: "High",
    scalePotential: "Medium",
    bestFitMandate: "Capital-markets and BFSI capability that needs proximity to India financial leadership",
  },
  {
    city: "Tier-2 and emerging hubs",
    talentDepth: "Medium",
    aiDataDepth: "Emerging",
    leadershipDepth: "Emerging",
    costPressure: "Medium",
    hiringCompetition: "Medium",
    realEstate: "Lowest; supply varies widely by city",
    industryStrengths: "Operations, support, mid-level engineering; varies by hub (for example Coimbatore, Kochi, Ahmedabad, Jaipur, Indore, Bhubaneswar)",
    ecosystemMaturity: "Emerging",
    scalePotential: "Medium",
    bestFitMandate: "Scale spokes for operations and mid-level engineering under a Tier-1 anchor; not senior AI or leadership hiring",
  },
];


/* NeoIntelli's four-stage view of GCC maturity. Its own lens, not an industry standard. */
export const maturityStages = [
  { name: "Execution Center", desc: "Executes defined tasks and tickets. Value is measured as cost and throughput." },
  { name: "Capability Center", desc: "Owns services end to end with its own leadership and quality standards." },
  { name: "Ownership Hub", desc: "Owns products or platforms, influences roadmaps and holds real decision rights." },
  { name: "AI-Enabled Value Center", desc: "Owns AI and data capability that changes how the enterprise operates and competes." },
];

