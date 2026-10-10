/**
 * GCC Operations & Managed Services section: the single source of truth for
 * its routes, SEO metadata, navigation labels, CTAs, visible FAQ content and
 * Service schema. Shared files (src/lib/seo.ts, src/lib/pageMeta.ts, the
 * navigation and footer) spread from here so the section can be added with a
 * one-line change in each and so visible content and structured data cannot
 * drift apart.
 */

export type GccOpsPageKey =
  | "overview"
  | "people"
  | "workforce"
  | "workplace"
  | "performance"
  | "governance"
  | "bot"
  | "scale";

export interface GccOpsPage {
  key: GccOpsPageKey;
  path: string;
  /** Global navigation label (concise). */
  navLabel: string;
  /** Section sub-navigation label (shortest form). */
  subnavLabel: string;
  /** Footer label. */
  footerLabel: string;
  /** Breadcrumb and related-card name. Kept under 32 characters. */
  shortName: string;
  /** Capability card title on the section overview. */
  cardTitle: string;
  /** One-line summary for cards, related links and the offer catalogue. */
  summary: string;
  /** SEO title. */
  title: string;
  /** Meta description. */
  description: string;
  /** Visible H1. */
  h1: string;
  keywords: string[];
  /** Primary CTA label for the page. */
  ctaLabel: string;
  /** Lead context passed to analytics on CTA clicks. */
  serviceInterest: string;
  /** schema.org Service naming. */
  serviceName: string;
  serviceType: string;
}

export const GCC_OPERATIONS_BASE = "/services/gcc-operations";

/**
 * Cross-pillar destinations used throughout the section. The AI Talent and
 * AI Engineering pillars are being built in parallel; if their canonical URLs
 * change, update them here and every page in this section follows.
 */
export const PILLAR_LINKS = {
  gccSetupHub: "/services/gcc",
  gccSetupLaunch: "/services/gcc/setup-launch",
  microGcc: "/services/micro-gcc",
  aiGcc: "/services/ai-gcc",
  responsibleAi: "/services/ai-gcc/responsible-ai",
  aiTalent: "/services/ai-talent",
  aiDataRecruitment: "/services/ai-talent",
  aiEngineering: "/services/ai-engineering",
  processAutomation: "/services/ai-engineering/ai-agents-automation",
  costCalculator: "/gcc-cost-calculator",
  costGuide: "/gcc-india-cost",
  roiEstimator: "/gcc-roi-estimator",
  readiness: "/gcc-readiness-assessment",
  gccFaq: "/gcc-faq",
  gaasArticle: "/blog/gcc-as-a-service-guide",
  bookACall: "/book-a-call",
} as const;

export const GCC_OPERATIONS_PAGES: GccOpsPage[] = [
  {
    key: "overview",
    path: GCC_OPERATIONS_BASE,
    navLabel: "Overview",
    subnavLabel: "Overview",
    footerLabel: "GCC Operations Overview",
    shortName: "GCC Operations",
    cardTitle: "GCC Operations & Managed Services",
    summary: "One accountable India operating layer around your capability center: people, workforce, workplace and IT, service management, governance and BOT transition.",
    title: "GCC Operations & Managed Services India | NeoIntelli",
    description: "Run and scale your India GCC with managed people operations, workplace and IT, service management, governance, workforce strategy and BOT transition support.",
    h1: "Run and scale your GCC in India.",
    keywords: ["GCC operations India", "GCC managed services India", "GCC operations services India", "managed GCC India", "GCC operating partner India", "GCC-as-a-Service India", "GCC operations partner"],
    ctaLabel: "Discuss My GCC Operations",
    serviceInterest: "GCC Operations",
    serviceName: "GCC Operations & Managed Services in India",
    serviceType: "GCC Operations and Managed Services",
  },
  {
    key: "people",
    path: `${GCC_OPERATIONS_BASE}/people-hr-operations`,
    navLabel: "People & HR Operations",
    subnavLabel: "People & HR",
    footerLabel: "People & HR",
    shortName: "People & HR Operations",
    cardTitle: "People & HR Operations",
    summary: "Onboarding, payroll coordination, benefits, HR administration, engagement and employee lifecycle support for your India GCC.",
    title: "GCC HR & People Operations India | NeoIntelli",
    description: "Run employee operations for your India GCC across onboarding, payroll, benefits, HR administration, engagement, performance and the employee lifecycle.",
    h1: "Run the employee lifecycle without building every local HR function yourself.",
    keywords: ["GCC HR operations India", "GCC people operations India", "HR services for GCC India", "GCC employee operations"],
    ctaLabel: "Discuss My People Operations",
    serviceInterest: "People & HR Operations",
    serviceName: "GCC People & HR Operations in India",
    serviceType: "GCC HR and People Operations",
  },
  {
    key: "workforce",
    path: `${GCC_OPERATIONS_BASE}/workforce-strategy`,
    navLabel: "Workforce Strategy",
    subnavLabel: "Workforce",
    footerLabel: "Workforce Strategy",
    shortName: "Workforce Strategy",
    cardTitle: "Workforce Strategy & Talent Management",
    summary: "Leadership architecture, workforce planning, role and skill design, EVP, succession and retention for a GCC that has to scale.",
    title: "GCC Workforce Strategy & Talent Management | NeoIntelli",
    description: "Design the workforce, leadership, capability and talent model required to scale your India GCC across hiring, retention, succession and workforce planning.",
    h1: "Build the workforce model your GCC needs to scale.",
    keywords: ["GCC workforce strategy", "GCC workforce planning", "GCC talent management India", "GCC workforce management"],
    ctaLabel: "Plan My GCC Workforce",
    serviceInterest: "GCC Workforce Strategy",
    serviceName: "GCC Workforce Strategy & Talent Management",
    serviceType: "GCC Workforce Strategy and Talent Management",
  },
  {
    key: "workplace",
    path: `${GCC_OPERATIONS_BASE}/workplace-it-security`,
    navLabel: "Workplace, IT & Security",
    subnavLabel: "Workplace & IT",
    footerLabel: "Workplace & IT",
    shortName: "Workplace, IT & Security",
    cardTitle: "Workplace, IT & Security",
    summary: "Devices, identity and access, connectivity, collaboration, ITSM, workplace support and security coordination for every GCC employee.",
    title: "GCC Workplace, IT & Security Services India | NeoIntelli",
    description: "Operate secure GCC workplace and IT services across devices, identity, access, collaboration, ITSM, workplace support, connectivity and security coordination.",
    h1: "Give every GCC employee a secure, enterprise-ready workplace.",
    keywords: ["GCC IT operations", "GCC workplace services India", "GCC IT infrastructure", "GCC IT security"],
    ctaLabel: "Review My GCC IT Setup",
    serviceInterest: "GCC Workplace & IT",
    serviceName: "GCC Workplace, IT & Security Operations",
    serviceType: "GCC Workplace and IT Operations",
  },
  {
    key: "performance",
    path: `${GCC_OPERATIONS_BASE}/service-management-performance`,
    navLabel: "Service Management & Performance",
    subnavLabel: "Performance",
    footerLabel: "Performance",
    shortName: "Service Management & Performance",
    cardTitle: "Service Management & Performance",
    summary: "Service catalogue, SLAs, outcome KPIs, operating cadence, automation backlog and continuous improvement for a GCC run on outcomes.",
    title: "GCC Service Management & Performance India | NeoIntelli",
    description: "Improve GCC operations with service catalogs, SLAs, outcome KPIs, operating cadence, automation, continuous improvement and performance reporting.",
    h1: "Run the GCC on outcomes, not activity.",
    keywords: ["GCC service management", "GCC KPIs", "GCC performance management", "GCC operating cadence"],
    ctaLabel: "Review My GCC Operating Model",
    serviceInterest: "GCC Performance",
    serviceName: "GCC Service Management & Performance",
    serviceType: "GCC Service Management and Performance",
  },
  {
    key: "governance",
    path: `${GCC_OPERATIONS_BASE}/governance-compliance`,
    navLabel: "Governance & Compliance",
    subnavLabel: "Governance",
    footerLabel: "Governance",
    shortName: "Governance & Compliance",
    cardTitle: "Governance & Compliance",
    summary: "Decision rights, risk register, controls, board reporting, compliance coordination, vendor risk and audit readiness for your India GCC.",
    title: "GCC Governance & Compliance Services India | NeoIntelli",
    description: "Build operating governance for your India GCC across decision rights, risk, controls, board reporting, compliance coordination, vendor risk and audit readiness.",
    h1: "Keep control, risk and decision rights visible as the GCC scales.",
    keywords: ["GCC governance", "GCC compliance India", "GCC risk management", "GCC audit readiness"],
    ctaLabel: "Review My GCC Governance",
    serviceInterest: "GCC Governance",
    serviceName: "GCC Governance & Compliance Operations",
    serviceType: "GCC Governance and Compliance Coordination",
  },
  {
    key: "bot",
    path: `${GCC_OPERATIONS_BASE}/bot-transition`,
    navLabel: "BOT & Transition",
    subnavLabel: "BOT & Transition",
    footerLabel: "BOT & Transition",
    shortName: "BOT & Transition",
    cardTitle: "BOT & Transition Management",
    summary: "Build-Operate-Transfer designed for transfer from day one: knowledge transfer, employee transition, records, vendors and operating handover.",
    title: "GCC Build-Operate-Transfer India | BOT Services | NeoIntelli",
    description: "Build and operate your India GCC with a planned path to ownership through structured BOT transition, knowledge transfer and operating handover.",
    h1: "Move from partner-operated to client-owned without rebuilding the center.",
    keywords: ["GCC BOT India", "build operate transfer GCC", "BOT model India", "GCC transition"],
    ctaLabel: "Plan My BOT Transition",
    serviceInterest: "BOT Transition",
    serviceName: "GCC Build-Operate-Transfer & Transition",
    serviceType: "GCC Build-Operate-Transfer",
  },
  {
    key: "scale",
    path: `${GCC_OPERATIONS_BASE}/scale-expansion`,
    navLabel: "Scale & Expansion",
    subnavLabel: "Scale",
    footerLabel: "Scale & Expansion",
    shortName: "Scale & Expansion",
    cardTitle: "Scale & Expansion",
    summary: "Mandate expansion, new functions and teams, leadership evolution, second-city assessment, AI enablement and governance redesign without losing operating discipline.",
    title: "Scale & Expand Your GCC in India | NeoIntelli",
    description: "Scale your India GCC across new teams, functions, leadership, locations and AI capabilities while strengthening operations, governance and workforce planning.",
    h1: "Expand the GCC without losing operating discipline.",
    keywords: ["GCC scale India", "scale GCC India", "GCC expansion", "GCC mandate expansion"],
    ctaLabel: "Plan My GCC Expansion",
    serviceInterest: "GCC Expansion",
    serviceName: "GCC Scale & Expansion",
    serviceType: "GCC Scale and Expansion",
  },
];

export const GCC_OPERATIONS_CHILD_PAGES = GCC_OPERATIONS_PAGES.filter((page) => page.key !== "overview");

export const gccOperationsPage = (key: GccOpsPageKey): GccOpsPage =>
  GCC_OPERATIONS_PAGES.find((page) => page.key === key)!;

export const gccOperationsPageByPath = (path: string): GccOpsPage | undefined =>
  GCC_OPERATIONS_PAGES.find((page) => page.path === path);

/** Route SEO entries, spread into ROUTE_SEO in src/lib/seo.ts. */
export const gccOperationsRouteSeo = GCC_OPERATIONS_PAGES.map((page) => ({
  path: page.path,
  title: page.title,
  description: page.description,
  keywords: page.keywords,
}));

/** Paths, spread into PRERENDER_ROUTES in src/lib/seo.ts. */
export const gccOperationsPaths = GCC_OPERATIONS_PAGES.map((page) => page.path);

/** Short names and summaries, spread into pageMeta in src/lib/pageMeta.ts. */
export const gccOperationsPageMeta: Record<string, { title: string; description: string }> = Object.fromEntries(
  GCC_OPERATIONS_PAGES.map((page) => [page.path, { title: page.shortName, description: page.summary }]),
);

/**
 * Legacy Services routes that this section replaces. Each maps to a single
 * final canonical URL (no chains). Mirrored in next.config.mjs, which cannot
 * import TypeScript; the section test asserts the two stay in step.
 */
export const GCC_OPERATIONS_REDIRECTS: Array<{ from: string; to: string }> = [
  { from: "/gcc-operating-model", to: GCC_OPERATIONS_BASE },
  { from: "/services/gcc/operations-excellence", to: `${GCC_OPERATIONS_BASE}/service-management-performance` },
  { from: "/services/gcc/talent-management", to: `${GCC_OPERATIONS_BASE}/workforce-strategy` },
  { from: "/services/gcc/technology-infrastructure", to: `${GCC_OPERATIONS_BASE}/workplace-it-security` },
  { from: "/services/gcc/compliance-governance", to: `${GCC_OPERATIONS_BASE}/governance-compliance` },
];

export interface GccOpsFaq {
  q: string;
  /** Plain text. Two newlines separate paragraphs when rendered. */
  a: string;
}

const P = {
  overview: GCC_OPERATIONS_BASE,
  people: `${GCC_OPERATIONS_BASE}/people-hr-operations`,
  workforce: `${GCC_OPERATIONS_BASE}/workforce-strategy`,
  workplace: `${GCC_OPERATIONS_BASE}/workplace-it-security`,
  performance: `${GCC_OPERATIONS_BASE}/service-management-performance`,
  governance: `${GCC_OPERATIONS_BASE}/governance-compliance`,
  bot: `${GCC_OPERATIONS_BASE}/bot-transition`,
  scale: `${GCC_OPERATIONS_BASE}/scale-expansion`,
};

/**
 * Visible question-and-answer content per page. Every entry is rendered on
 * the page as an H3 with its answer, and the same entries feed the FAQPage
 * schema in src/lib/seo.ts, so structured data always matches what a reader
 * sees. Answers lead with the answer, then explain.
 */
export const gccOperationsFaqs: Record<string, GccOpsFaq[]> = {
  [P.overview]: [
    { q: "What does a GCC operating partner do?", a: "A GCC operating partner runs agreed local operating functions around a Global Capability Center, such as recruitment operations, HR administration, workplace and IT support, service management, operating reporting, vendor coordination and compliance workflows, while the client retains strategic ownership of the center. The partner is accountable for the operating layer. The client remains accountable for the mandate, product, IP, budget and hiring decisions." },
    { q: "Managed GCC vs captive GCC: what is the difference?", a: "In a managed GCC, a partner operates some or all local operating functions under the client's direction. In a captive GCC, the client's own organization operates those functions directly. Both models can leave the client owning the team, IP and data. The difference is who runs the local scaffolding, not who owns the capability. Many companies start managed and move to captive through a Build-Operate-Transfer arrangement." },
    { q: "What does GCC-as-a-Service include?", a: "GCC-as-a-Service usually bundles the operating functions a center needs into one accountable service: recruitment operations, onboarding, HR administration, payroll and benefits coordination, workplace, IT support, service management, governance cadence and reporting. Depending on the engagement it can also include entity coordination and an interim employment structure during setup. Scope, service levels and ownership are defined in the operating model and the contract." },
    { q: "What should headquarters retain control of?", a: "Headquarters should retain business strategy, the GCC mandate, product roadmap, intellectual property, data ownership, enterprise architecture, budget approval, final hiring decisions and executive governance. These decisions define what the center is for and how it fits the enterprise. An operating partner should make them easier to execute, not take them over." },
    { q: "What can a local GCC partner manage?", a: "A local partner can manage the operating functions that do not need to sit with headquarters to be done well: candidate sourcing and recruitment operations, local onboarding, HR administration, payroll and benefits coordination, workplace support, IT operations coordination, service management, operating reporting, local vendor coordination, compliance workflows and the operating cadence. The exact split is agreed per engagement and recorded in a responsibility matrix." },
    { q: "What is the BOT model?", a: "Build-Operate-Transfer is an arrangement where a partner builds the center, operates the agreed operating layer for a period, and then transfers defined capability into the client's organization. It is designed for companies that want to own the center eventually but do not want to build every local function before the first team is productive. Transfer mechanics depend on the contract and the entity structure." },
    { q: "Can a company start with managed operations and later take over?", a: "Yes. A company can start with a managed operating layer and progressively take direct ownership of functions as its India organization matures. The transition works best when it is planned from the beginning: documented processes, defined ownership, standard tooling and clear commercial terms for transfer. Not every company needs to take over. Some keep managed operations long term by choice." },
    { q: "How should a GCC measure performance?", a: "A GCC should be measured on outcomes such as time to productivity, delivery reliability, quality, cycle time, service level achievement, stakeholder satisfaction, retention, cost per unit of service, automation coverage and mandate expansion. Headcount and hours are inputs, not results. Targets should be agreed per center rather than copied from generic benchmarks." },
    { q: "How can AI improve GCC operations?", a: "AI can improve GCC operations where work is repetitive, document heavy or knowledge intensive: recruitment screening, onboarding assistance, HR and policy knowledge assistants, IT ticket triage, service desk copilots, operational reporting, workforce analytics, anomaly detection, vendor workflow automation, document processing and compliance evidence support. NeoIntelli can design and implement these through its AI Engineering practice. Autonomy should be introduced only where controls justify it." },
  ],
  [P.people]: [
    { q: "What does GCC HR operations include?", a: "GCC HR operations covers the administrative and support work of the employee lifecycle: onboarding administration, employee documentation, payroll coordination, benefits and leave administration, HR helpdesk, policy administration, engagement activity, performance-cycle coordination, learning administration, background verification coordination and offboarding. It does not include global HR strategy, compensation philosophy or leadership decisions, which stay with the client." },
    { q: "Who employs GCC employees?", a: "Employees are usually employed by the client's India entity once it exists. Before the entity is ready, or where the client prefers not to establish one immediately, employees may operate through an agreed interim employment structure. Which structure is appropriate depends on entity status, timelines and legal and tax advice. NeoIntelli coordinates the operating side of whichever structure is agreed." },
    { q: "Can a GCC use EOR before establishing an India entity?", a: "An employer-of-record style arrangement is sometimes used while an India entity is being established, so hiring can start earlier. Whether it is suitable depends on the roles, the duration, the intended end state and advice on employment, tax and permanent-establishment considerations. It should be treated as a transitional step with a planned move to the permanent structure, not as the long-term model for a captive center." },
    { q: "Who manages payroll in a managed GCC?", a: "Payroll is usually processed by a specialist payroll provider or the employing entity's payroll function. NeoIntelli coordinates payroll inputs, calendars, changes and reconciliations, and keeps records aligned with HR data, so payroll runs on time and matches what employees were told. Statutory filings follow the employing entity's obligations and are handled with qualified advisers." },
    { q: "How are benefits handled in an India GCC?", a: "Benefits in an India GCC typically combine statutory contributions with employer-provided cover such as health insurance and allowances. The benefits design is a client decision, often aligned to a global philosophy and adapted to local market practice. NeoIntelli can administer enrolment, changes, renewals and employee queries once the design is agreed." },
    { q: "How do global HR policies work in an India GCC?", a: "Global policies set the standard and local policies apply them within Indian employment practice. In practice this means a local policy set that mirrors global intent on conduct, performance, leave, security and data handling, adapted where local law or market norms require. NeoIntelli can administer the local policy set and route exceptions to the client's HR leadership." },
    { q: "What happens to employee tenure during BOT?", a: "Tenure treatment during a transfer depends on the employment structure, the contract and applicable law. Where employees move from one employer to another, continuity of service, leave balances, benefits and statutory records need to be planned and documented explicitly. NeoIntelli plans employee continuity early in a BOT engagement, but tenure outcomes must be confirmed with legal and tax advisers for the specific structure." },
    { q: "Can employees transfer when a GCC moves to captive?", a: "Employees can usually move into the client's organization as part of a planned transition, subject to the employment structure, consent requirements and applicable law. A good transition covers employment documentation, benefits cutover, payroll timing, communication, manager continuity and records handover. NeoIntelli coordinates the operating plan and works with the client's advisers on the legal mechanics." },
  ],
  [P.workforce]: [
    { q: "How do you build a GCC workforce plan?", a: "Start from the mandate, not from a headcount number. Translate the mandate into capabilities, break capabilities into roles and skills, then phase headcount against delivery milestones and hiring capacity. Add location, leadership and succession assumptions, and test the plan against the talent market before committing budget. Revisit it each quarter as the mandate changes." },
    { q: "What roles should a GCC hire first?", a: "Most centers should hire the leaders and anchor roles that define how the team will work before hiring at volume: the center lead or function lead, a small number of senior practitioners who set technical standards, and the first delivery team around one well-defined mandate. Hiring many mid-level roles before leadership is in place tends to create rework." },
    { q: "How should GCC leadership change as headcount grows?", a: "Early on, one leader can span delivery, people and stakeholder management. As the center grows, those responsibilities separate into function leads, people leadership and an operating lead, with clearer decision rights toward headquarters. The trigger for change is usually span of control and the number of distinct mandates, not a fixed headcount." },
    { q: "How do you reduce offer drop-off?", a: "Reduce the time between interview and offer, keep candidates informed at each stage, make sure the offer is competitive on the elements candidates actually compare, and involve the hiring manager personally before joining. Structured pre-joining engagement matters most for senior and scarce-skill roles. Measuring offer-to-join by role type shows where the problem actually sits." },
    { q: "What is a GCC EVP?", a: "A GCC employer value proposition is the specific reason a candidate should choose this center over other employers: the work, the ownership the team has, the leadership, the growth path and the rewards. It has to be true for the India center specifically. A global EVP copied without local proof points rarely lands with experienced candidates." },
    { q: "How do GCCs manage critical-skill scarcity?", a: "Combine targeted hiring with deliberate capability building: identify the scarce skills the mandate truly depends on, hire a small number of anchors, and develop adjacent talent through structured programs and internal mobility. Where a skill is scarce everywhere, the plan should include timing risk rather than assume the market will supply it on schedule." },
    { q: "How should AI change GCC workforce planning?", a: "AI changes both the work and the roles. Workforce plans should account for productivity gains from AI-assisted work, new roles such as AI engineering, data and platform ownership, evaluation and AI governance, and reskilling paths for existing teams. Planning purely on historical role ratios will overstate some headcount and miss the capabilities the center needs next." },
    { q: "What roles should be hired vs reskilled?", a: "Hire where the skill is new to the organization, urgent and defines standards for others. Reskill where the underlying domain knowledge already exists in the team and the new skill can be learned in months. Most centers do both: a small number of external anchors and a structured reskilling path for the wider team." },
  ],
  [P.workplace]: [
    { q: "What IT infrastructure does a GCC need?", a: "A GCC needs managed devices, identity and access integrated with the enterprise, secure connectivity to headquarters systems, collaboration tools, endpoint protection, a service desk with ITSM processes, monitoring and a basic business continuity arrangement. Deeper platforms such as data and AI infrastructure sit with the engineering functions that own them, not with workplace IT." },
    { q: "Should a GCC use the same identity system as HQ?", a: "In most cases, yes. Using the enterprise identity provider for the GCC keeps access policies, MFA, conditional access and offboarding consistent with the rest of the company. A separate identity system is usually justified only where a regulatory or entity structure requires it, and then it should federate with the enterprise directory." },
    { q: "How should devices be managed?", a: "Devices should be enrolled in enterprise endpoint management from first use, with a defined build, encryption, endpoint protection, patching and remote wipe. Asset records should track every device from procurement to disposal. Whether devices are owned by the client entity or coordinated by the operating partner is an engagement decision. The controls should be the same either way." },
    { q: "What should be ready before the first employees join?", a: "Identity accounts and access groups, devices with the standard build, connectivity to the systems the team will use, collaboration tools, a service desk contact, security awareness onboarding and a workspace that is ready to use. The first cohort should not spend its first week waiting for access." },
    { q: "What IT support should exist locally?", a: "Local support should cover device setup and repair, access requests, first-line troubleshooting in the working time zone, coordination with enterprise IT for anything beyond local scope, and asset handling for joiners and leavers. It should follow the enterprise ITSM process so tickets, changes and incidents are visible to headquarters." },
    { q: "How should access change when an employee joins or leaves?", a: "Access should be granted through a joiner, mover and leaver workflow tied to HR events: role-based access at joining, review and adjustment on role change, and prompt revocation with device recovery at exit. The workflow should produce records that can be reviewed later, because access changes are among the first things an audit will test." },
    { q: "What does zero trust mean for a GCC?", a: "For a GCC, zero trust means access decisions are based on verified identity, device health and context rather than on being inside an office network. In practice: strong identity and MFA, managed devices as a condition of access, least-privilege permissions, segmented access to enterprise systems and monitoring. It is a design direction applied progressively, not a product or a finished state." },
    { q: "How should the GCC connect securely to headquarters?", a: "Through the enterprise's standard secure connectivity pattern, typically identity-aware access to cloud services combined with managed private connectivity where specific systems require it. The pattern should be chosen with the enterprise security team so the GCC is an extension of the existing architecture rather than an exception to it." },
  ],
  [P.performance]: [
    { q: "What is a GCC service catalogue?", a: "A service catalogue is the defined list of services the GCC provides to the enterprise, each with an owner, scope, intake route, service levels and measures. It turns an informal set of teams into accountable services and gives headquarters a clear view of what the center does and how well." },
    { q: "Which KPIs should a GCC track?", a: "Track a small set of outcome measures across delivery, service, talent, value and risk: delivery reliability, quality, cycle time, service level achievement, stakeholder satisfaction, time to productivity, retention, cost per unit of service, automation coverage and risk remediation. A short list of well-chosen measures works better than a long list nobody acts on." },
    { q: "What is the difference between an SLA and a KPI?", a: "An SLA is a commitment about a service, agreed with the people who consume it, such as a response or resolution time. A KPI is a measure used to manage performance and improvement, which may or may not be a commitment. SLAs are what the service promises. KPIs are how the center understands whether it is getting better." },
    { q: "How do you measure GCC maturity?", a: "Measure maturity through what the center owns and delivers rather than through self-assessment alone: the scope of services it is accountable for, delivery reliability, quality, stakeholder trust, its ability to absorb new mandates, the depth of its leadership and its use of automation and AI. A structured maturity review across service, talent, technology, governance and innovation makes the assessment comparable over time." },
    { q: "How do you measure GCC value beyond cost savings?", a: "Value shows up in speed, quality, ownership and capability: faster delivery of enterprise priorities, fewer defects and incidents, functions the center now owns end to end, capabilities the enterprise did not previously have, and risk that is now managed rather than hidden. Cost per unit of service still matters, but it should be presented alongside these outcomes." },
    { q: "How can AI improve GCC productivity?", a: "AI improves productivity where it removes repetitive work and shortens knowledge-intensive tasks: triage, drafting, search, summarization, reporting and first-line support. The gain depends on standardizing the process first. NeoIntelli's approach is to eliminate and standardize before automating, then add assistance and, where justified, controlled agents." },
    { q: "When should a GCC automate a process?", a: "Automate a process when it is stable, repeated often enough to justify the effort, measurable and free of unnecessary steps. Automating an unstable or badly designed process locks in the problem. A short elimination and standardization pass before automation usually produces a better result at lower cost." },
    { q: "How often should GCC performance be reviewed?", a: "Operational measures should be reviewed weekly by service owners, monthly by the center's leadership and quarterly with headquarters as a business review. Targets and the measurement framework itself should be revisited at least annually or when the mandate changes." },
  ],
  [P.governance]: [
    { q: "What governance does a GCC need?", a: "A GCC needs clear decision rights between headquarters and the center, a committee and review cadence, an escalation model, a risk register with owners, a control framework mapped to applicable policies and regulations, vendor risk management, audit readiness and reporting that gives leadership an honest view of performance and risk. The design should match the size and risk profile of the center rather than copy a large enterprise template." },
    { q: "Who should make decisions between HQ and the GCC?", a: "Decisions should sit with whoever holds the accountability and the information to make them well. Headquarters typically retains strategy, mandate, budget, architecture and executive governance. The center's leadership typically owns local delivery, people operations and day-to-day execution within agreed limits. The split should be written down as decision rights and revisited as the center matures." },
    { q: "What should be included in a GCC risk register?", a: "Operational, people, technology, security, data protection, regulatory, vendor, financial and continuity risks, each with an owner, a rating, current controls, planned actions and a review date. AI-related risks belong in the register once the center deploys AI systems. The register is only useful if it is reviewed on a cadence and connected to decisions." },
    { q: "How should a GCC report to headquarters?", a: "Report on a fixed cadence with a consistent structure: delivery and service performance, people metrics, risk and control status, compliance activity, cost, and the decisions or support needed from headquarters. Bad news should be visible early. Reporting that only carries good news loses credibility quickly." },
    { q: "How do GCCs prepare for audits?", a: "By operating controls continuously and keeping evidence as part of normal work, so an audit is a review rather than a scramble. This means named control owners, documented procedures, access and change records, vendor reviews and a simple evidence library. NeoIntelli supports audit readiness and evidence coordination. Certifications and audit opinions are issued by the relevant auditors and certification bodies." },
    { q: "What is vendor risk management?", a: "Vendor risk management is the process of assessing, contracting, monitoring and offboarding third parties the center depends on, in proportion to the risk they carry. It covers due diligence, security and data protection terms, service levels, performance reviews and a plan for exit. For a GCC it typically includes payroll, workspace, IT, background verification and specialist service providers." },
    { q: "How should AI governance connect with GCC governance?", a: "AI governance should be a defined part of the center's governance, not a separate island. GCC operating governance covers decision rights, risk, controls and reporting for the center as a whole. AI governance adds model, data, evaluation and oversight controls for specific AI systems. NeoIntelli's Responsible AI Governance service covers the AI-specific layer and connects it to the center's risk register and reporting." },
    { q: "How do India's Labour Codes affect a GCC?", a: "India's four Labour Codes became effective on 21 November 2025, rationalising 29 central labour laws covering wages, industrial relations, social security and occupational safety and working conditions. A GCC's employment contracts, payroll, benefits, workforce policies and working-condition controls should be designed against that central framework together with the applicable state rules, several of which are still being notified. State-specific requirements such as Shops and Establishments registration continue to apply alongside it. NeoIntelli tracks the changes that affect the center and routes them to the client's advisers; interpretation stays with qualified legal counsel. Source: Ministry of Labour & Employment / Press Information Bureau." },
    { q: "What governance changes when a GCC scales?", a: "Decision rights move closer to the center, committees become more specialized, controls need to be automated rather than manual, vendor and risk portfolios grow, and reporting has to aggregate across functions and locations. Governance that worked for one small team rarely works unchanged for several functions. Plan the redesign before the growth, not after." },
  ],
  [P.bot]: [
    { q: "What is a GCC BOT model?", a: "A Build-Operate-Transfer model is an arrangement where a partner builds the center's team, processes, systems, workspace and controls, operates the agreed operating layer for a period, and then transfers defined capability into the client's organization. The client owns the intended end state from the start. The partner is accountable for getting the center to a transferable condition." },
    { q: "How does Build-Operate-Transfer work in India?", a: "In India, BOT typically involves the partner recruiting and operating the team under an agreed employment and entity structure, running local operations and governance, and then transferring employees, processes, vendors, records and operating control to the client's India entity once readiness criteria are met. The legal mechanics depend on the entity structure, employment arrangements and contract, and should be confirmed with qualified advisers." },
    { q: "When should a company use BOT?", a: "BOT fits when a company wants to own its India center but cannot yet run every local function itself, wants to start before its own organization is ready, or wants to reduce the risk of a first-time build. It fits less well when the company already has a strong India operations team or wants managed operations long term." },
    { q: "How long should the operate stage last?", a: "Long enough for the center to reach stable performance, documented processes, settled leadership and a client organization ready to receive it. That is determined by readiness criteria agreed at the start rather than by a fixed calendar. Ending the operate stage on a date rather than on readiness is the most common cause of a difficult transfer." },
    { q: "What happens to GCC employees during transfer?", a: "Employees move into the client's organization under a planned transition that covers employment documentation, continuity of service where applicable, benefits and payroll cutover, leave balances, statutory records, policy changes, communication and manager continuity. The specific treatment of tenure, benefits and any equity or tax matters depends on the structure and must be confirmed with legal and tax advisers." },
    { q: "Who owns the IP during BOT?", a: "The client should own the intellectual property created by the center throughout the arrangement, not only after transfer. This should be established in the engagement contract and in employment and vendor agreements from day one, with assignment provisions that do not depend on the transfer happening. NeoIntelli does not claim ownership of client IP." },
    { q: "Can the client take over the GCC gradually?", a: "Yes. Transfer can be staged by function, by team or by location, with each stage having its own readiness criteria and cutover plan. Gradual transfer reduces disruption and lets the client's organization build capacity at a sustainable pace. The sequence should be agreed in the transition plan rather than improvised." },
    { q: "BOT vs captive GCC: which is right?", a: "A captive built directly gives the client full control from day one but requires the organization to run every local function immediately. BOT reaches the same end state through a partner-operated period, trading some early control for lower execution risk and a faster start. The right choice depends on how ready the client's own organization is to operate in India." },
    { q: "BOT vs EOR: what is the difference?", a: "An employer-of-record arrangement provides an employment vehicle for a small team, usually with limited operating support and no built-in path to a client-owned center. BOT builds and operates a complete operating layer with transfer as the intended outcome. EOR can be a short first step. BOT is a route to ownership." },
    { q: "BOT vs managed services: what is the difference?", a: "Managed services run agreed operating functions for as long as the client wants them, with no obligation to transfer. BOT includes a planned transfer of capability into the client's organization. The operating layer can look similar during the operate stage. The commercial terms, the documentation standard and the end state are different." },
  ],
  [P.scale]: [
    { q: "How do you scale a GCC?", a: "Scale the mandate first, then the workforce, leadership, systems and governance that the new mandate needs, in that order. Growth that starts with headcount and adds structure later tends to create the complexity headquarters later wants to unwind. A structured expansion plan links each new mandate to the operating capacity required to run it." },
    { q: "When should a GCC add a second location?", a: "Add a second location when the mandate needs a talent pool, resilience or a cost profile the first city cannot provide, and when the operating model can run two sites without duplicating every function. A second city should solve a specific problem. Adding one to signal growth usually adds cost and coordination without adding capability." },
    { q: "How should leadership change as a GCC grows?", a: "Leadership should move from one generalist leader toward a small leadership team with function leads, people leadership and an operating lead, and from headquarters-directed execution toward local decision rights within agreed limits. Succession planning for the center lead and function leads should start before the growth that will make those roles harder to fill." },
    { q: "How do GCCs move from delivery to product ownership?", a: "By taking end-to-end accountability for a defined product, platform or service rather than executing tickets on it: owning the backlog, the roadmap input, quality, reliability and stakeholder relationships. This requires senior product and engineering leadership in the center, clear decision rights with headquarters and a track record that earns the mandate." },
    { q: "Should GCCs hire or reskill for AI?", a: "Both. Hire a small number of AI engineering, data and platform anchors who set standards, and reskill the wider engineering and domain teams to work with AI tools and build AI-enabled products. The balance depends on how much of the AI work is new to the organization. NeoIntelli's AI Talent practice supports the hiring side and AI Engineering supports the capability side." },
    { q: "How should governance change with scale?", a: "Governance should move from a single review with headquarters to a layered structure: service and function reviews inside the center, a center-level operating review and a periodic business review with headquarters. Controls should be automated where possible, and the risk register, vendor portfolio and reporting should aggregate across functions and locations." },
    { q: "How do you expand a GCC without increasing complexity?", a: "Standardize before you multiply. Reuse the same operating model, service catalogue, tooling and governance for each new team rather than letting every function build its own. Add roles and vendors only where a mandate requires them. Review the operating cost and the number of exceptions each quarter." },
    { q: "How do you know whether a GCC is ready for a bigger mandate?", a: "The center is ready when it delivers its current mandate reliably, has leadership capacity to absorb more, has the workforce plan and hiring engine to grow without quality loss, has governance and controls that will hold at the new scale, and can show these things with evidence headquarters trusts. A readiness review before committing to the mandate is cheaper than recovering from one taken too early." },
  ],
};

const AREA_SERVED = ["India", "United Kingdom", "Norway", "Sweden", "Denmark", "Finland"];

/**
 * schema.org Service entities for the section, keyed by path. The parent
 * carries an OfferCatalog of its child services; each child is a Service in
 * its own right. All reference the single NeoIntelli Organization by @id.
 */
export const buildGccOperationsServiceSchemas = (siteUrl: string): Record<string, object> => {
  const organization = { "@id": `${siteUrl}/#organization` };
  const schemas: Record<string, object> = {};
  for (const page of GCC_OPERATIONS_PAGES) {
    const base = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${siteUrl}${page.path}#service`,
      url: `${siteUrl}${page.path}`,
      serviceType: page.serviceType,
      name: page.serviceName,
      description: page.description,
      provider: organization,
      areaServed: AREA_SERVED,
    };
    schemas[page.path] = page.key === "overview"
      ? {
          ...base,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "GCC Operations & Managed Services",
            itemListElement: GCC_OPERATIONS_CHILD_PAGES.map((child) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: child.cardTitle, url: `${siteUrl}${child.path}` },
            })),
          },
        }
      : base;
  }
  return schemas;
};
