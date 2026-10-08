/**
 * Single source of truth for the homepage information architecture.
 *
 * The homepage is positioned around one category: AI GCC. The six service
 * pillars below are not six independent offerings, they are the stages of one
 * lifecycle (design, build, operate, scale or transfer), so the lifecycle
 * diagram, the pillar sections, the "why" grid and the engagement model all
 * read the same structure from this file. Every href here is a final canonical
 * destination owned by SERVICE_PILLARS in src/data/serviceNav.ts.
 *
 * CLAIM GOVERNANCE
 * ----------------
 * Nothing in this file states a number, a timeline or a superlative that the
 * codebase cannot evidence. Counters that used to run on the homepage
 * ("30+ GCCs shaped", "100% senior-led", "9-day design phase", "500+
 * consultants", "10 open roles per qualified engineer") were removed rather
 * than restated, matching the policy already set in src/data/gccMarketProof.ts.
 * Add a figure here only with a source and a year.
 */

export interface LifecycleStage {
  key: string;
  label: string;
  /** What the stage decides or produces. One short line. */
  summary: string;
  /** Final canonical destination for the stage, when one exists. */
  href?: string;
}

/** Section 3: the end-to-end AI GCC lifecycle, rendered as an HTML/CSS flow. */
export const AI_GCC_LIFECYCLE: LifecycleStage[] = [
  { key: "strategy", label: "Strategy", summary: "The mandate, business case and operating model the center is built around.", href: "/services/gcc/strategy-business-case" },
  { key: "talent", label: "Talent", summary: "Specialist AI, data and engineering people, technically validated before they reach you.", href: "/services/ai-talent" },
  { key: "ai-engineering", label: "AI Engineering", summary: "Generative, agentic and applied AI engineered into production systems.", href: "/services/ai-engineering" },
  { key: "delivery", label: "Delivery", summary: "Teams that own delivery inside your roadmap, repositories and cadence.", href: "/services/ai-delivery-teams" },
  { key: "gcc-build", label: "GCC Build", summary: "Entity, leadership, workplace, IT and governance brought to a working launch.", href: "/services/gcc/setup-launch" },
  { key: "operate", label: "Operate", summary: "People, workplace, service management, performance and governance, run daily.", href: "/services/gcc-operations" },
  { key: "scale", label: "Scale / Transfer", summary: "New capability, AI transformation, and the path to captive ownership when you want it.", href: "/services/gcc-operations/scale-expansion" },
];

/** Short capability strip directly under the hero. */
export const HERO_CAPABILITY_STRIP = [
  "Strategy",
  "Talent",
  "AI Engineering",
  "Delivery",
  "Operations",
  "BOT",
];

export interface PromotedOffer {
  key: string;
  label: string;
  headline: string;
  copy: string;
  ctaLabel: string;
  href: string;
  /** Analytics event label passed to trackEvent("cta_click", { location }). */
  event: string;
}

/**
 * Section 2. Order is fixed: campaigns already point at these three
 * propositions, so the cards must stay in this sequence and keep pointing at
 * the live organic destinations.
 */
export const PROMOTED_OFFERS: PromotedOffer[] = [
  {
    key: "micro-gcc",
    label: "For AI-first startups & scale-ups",
    headline: "Start with an AI Micro GCC.",
    copy: "Build a dedicated AI engineering capability in India without starting with the overhead of a large traditional GCC. Begin with one focused team and expand as the business grows.",
    ctaLabel: "Explore AI Micro GCC",
    href: "/services/micro-gcc",
    event: "promo_micro_gcc",
  },
  {
    key: "ai-talent",
    label: "Specialized AI talent",
    headline: "Hire AI talent that has already been technically evaluated.",
    copy: "Build your team across GenAI, Agentic AI, machine learning, data engineering, MLOps and AI leadership through specialist sourcing, NeoHireX screening and practitioner-led technical validation.",
    ctaLabel: "Explore AI Talent",
    href: "/services/ai-talent",
    event: "promo_ai_talent",
  },
  {
    key: "cost-calculator",
    label: "Free GCC planning tool",
    headline: "What would your India GCC actually cost?",
    copy: "Model roles, seniority, headcount and city to estimate the fully loaded monthly and annual operating cost of your India team.",
    ctaLabel: "Calculate My GCC Cost",
    href: "/gcc-cost-calculator",
    event: "promo_cost_calculator",
  },
];

export type PillarAsideKind = "definition" | "flow" | "models" | "statement";

export interface PillarAside {
  kind: PillarAsideKind;
  title: string;
  /** definition / statement */
  body?: string[];
  /** flow: ordered steps rendered as a connected sequence */
  steps?: string[];
  /** models: named engagement models, each linking to its own page */
  models?: { name: string; summary: string; href: string }[];
}

export interface ServicePillarSection {
  key: string;
  /** Anchor id, also used as the section landmark label. */
  id: string;
  eyebrow: string;
  /** The H2. Kept to the pillar name so the category reads cleanly. */
  name: string;
  headline: string;
  body: string;
  /** 3 to 5 capabilities. Deep detail stays on the child pages. */
  capabilities: string[];
  ctaLabel: string;
  href: string;
  event: string;
  /** Optional second, contextual link. Never "learn more". */
  secondary?: { label: string; href: string };
  aside: PillarAside;
}

/**
 * Sections 4 to 9. AI GCC is first and carries the flagship treatment; the
 * remaining five are the layers it is assembled from.
 */
export const SERVICE_PILLAR_SECTIONS: ServicePillarSection[] = [
  {
    key: "ai-gcc",
    id: "ai-gcc",
    eyebrow: "Flagship service",
    name: "AI GCC",
    headline: "Build an India capability center designed around AI from day one.",
    body: "An AI GCC is designed backwards from the AI and data work it is meant to own. Strategy, specialist talent, data foundations, generative and agentic AI, MLOps, AI infrastructure and governance are set as one operating model rather than added to a delivery center afterwards.",
    capabilities: [
      "AI strategy and the mandate the center owns",
      "Specialist AI, data and platform talent",
      "Data foundations, GenAI and Agentic AI in production",
      "MLOps, AI infrastructure and AI governance",
      "The operating model that holds it together",
    ],
    ctaLabel: "Explore AI GCC",
    href: "/services/ai-gcc",
    event: "service_ai_gcc",
    secondary: { label: "Already operate a GCC? Transform it for AI", href: "/services/gcc/modernization-transformation" },
    aside: {
      kind: "definition",
      title: "What is an AI GCC?",
      body: [
        "An AI GCC is a Global Capability Center designed around AI, data and engineering capability as part of its core operating model.",
        "It combines specialist talent, data and AI platforms, production engineering, model and agent operations, governance and enterprise ownership inside a dedicated capability center rather than treating AI as a separate innovation project.",
      ],
    },
  },
  {
    key: "ai-talent",
    id: "ai-talent",
    eyebrow: "Build the team",
    name: "AI Talent",
    headline: "Hire AI specialists your technical team does not need to screen from zero.",
    body: "Specialist sourcing across the AI and data disciplines, with NeoHireX carrying the screening and practicing AI engineers carrying the technical validation. Your engineers spend interview time choosing between credible candidates instead of filtering the pipeline.",
    capabilities: [
      "GenAI and Agentic AI",
      "Machine learning and data science",
      "Data engineering",
      "MLOps and AI platform",
      "AI leadership and executive search",
    ],
    ctaLabel: "Explore AI Talent",
    href: "/services/ai-talent",
    event: "service_ai_talent",
    secondary: { label: "See how NeoHireX supports hiring at scale", href: "/services/ai-talent/recruitment-hub" },
    aside: {
      kind: "flow",
      title: "How a shortlist is built",
      steps: ["Source", "NeoHireX screen", "AI first round", "Senior technical validation", "Qualified shortlist"],
    },
  },
  {
    key: "ai-engineering",
    id: "ai-engineering",
    eyebrow: "Build the AI",
    name: "AI Engineering",
    headline: "Take AI from proof of value to production.",
    body: "AI prototypes are easy. Production AI is not. Getting there needs data, software engineering, integration, evaluation, observability, security, operations and unit economics treated as one engineering problem rather than a demo that has to be hardened later.",
    capabilities: [
      "Generative and Agentic AI",
      "Applied AI and machine learning",
      "AI data engineering",
      "AI product engineering",
      "AI agents, automation and evaluation",
      "MLOps, LLMOps and AgentOps",
    ],
    ctaLabel: "Explore AI Engineering",
    href: "/services/ai-engineering",
    event: "service_ai_engineering",
    aside: {
      kind: "statement",
      title: "AI prototypes are easy. Production AI is not.",
      body: [
        "What separates the two is rarely the model. It is the data it runs on, the systems it integrates with, the evaluation that proves it works, the observability that catches it when it stops, the security and governance around it, and the cost per outcome once real traffic arrives.",
      ],
    },
  },
  {
    key: "ai-delivery-teams",
    id: "ai-delivery-teams",
    eyebrow: "Deploy the team",
    name: "AI Delivery Teams",
    headline: "Deploy an AI team that owns delivery.",
    body: "AI Talent is how you hire people. AI Delivery Teams is how you deploy execution capability: a senior-led team working inside your roadmap, repositories and release cadence, accountable for the outcome rather than for supplying CVs.",
    capabilities: [
      "Work inside your roadmap and repositories",
      "Senior-led, accountable for the delivered outcome",
      "Scale the team up or down against the roadmap",
      "A defined path to transferring the team to you",
    ],
    ctaLabel: "Explore AI Delivery Teams",
    href: "/services/ai-delivery-teams",
    event: "service_ai_delivery",
    aside: {
      kind: "models",
      title: "Four engagement models",
      models: [
        { name: "Dedicated AI Engineering Team", summary: "A stable team on your ongoing AI roadmap.", href: "/services/ai-delivery-teams/dedicated-ai-engineering-team" },
        { name: "AI Delivery Pod", summary: "A cross-functional squad on one production outcome.", href: "/services/ai-delivery-teams/ai-delivery-pod" },
        { name: "Forward-Deployed AI Engineers", summary: "Embedded where the production problem lives.", href: "/services/ai-delivery-teams/forward-deployed-ai-engineers" },
        { name: "AI Team Build & Transfer", summary: "Deliver now, own the capability later.", href: "/services/ai-delivery-teams/ai-team-transfer" },
      ],
    },
  },
  {
    key: "gcc-strategy",
    id: "gcc-strategy-setup",
    eyebrow: "Design & launch the center",
    name: "GCC Strategy & Setup",
    headline: "Design the GCC around the mandate, not the headcount.",
    body: "A GCC is an ownership decision before it is a location decision. What the center is meant to own determines the operating model, the city, the workforce plan and the launch sequence, so the mandate is settled first and the build follows from it.",
    capabilities: [
      "Business case and mandate",
      "Operating model and governance design",
      "Location strategy and workforce plan",
      "Entity, workplace, IT and launch",
      "Modernization of an existing center",
    ],
    ctaLabel: "Explore GCC Strategy & Setup",
    href: "/services/gcc",
    event: "service_gcc_strategy",
    secondary: { label: "Start with the GCC business case", href: "/services/gcc/strategy-business-case" },
    aside: {
      kind: "statement",
      title: "A GCC is an ownership decision before it is a location decision.",
      body: [
        "Deciding what the center owns settles almost everything downstream: which roles you hire, which city can supply them, how the work is governed, and whether the end state is a managed center or a captive one.",
      ],
    },
  },
  {
    key: "gcc-operations",
    id: "gcc-operations",
    eyebrow: "Run & scale the center",
    name: "GCC Operations",
    headline: "Operate the local GCC systems while your leadership owns the mandate.",
    body: "The local operating layer runs day to day: people and HR, workforce, workplace and IT, service management, performance, governance and compliance coordination. Your leadership keeps the mandate and the delivery agenda.",
    capabilities: [
      "People, HR and workforce operations",
      "Workplace, IT and security",
      "Service management and performance",
      "Governance and compliance coordination",
      "BOT, transition and scale",
    ],
    ctaLabel: "Explore GCC Operations",
    href: "/services/gcc-operations",
    event: "service_gcc_operations",
    secondary: { label: "See how BOT and transition works", href: "/services/gcc-operations/bot-transition" },
    aside: {
      kind: "flow",
      title: "An optional ownership path",
      steps: ["Managed", "Stabilize", "Scale", "BOT", "Captive"],
      body: ["Not every center follows this sequence. It exists so that a managed start does not close off captive ownership later."],
    },
  },
];

export interface StartingPoint {
  key: string;
  label: string;
  name: string;
  copy: string;
  audience: string[];
  ctaLabel: string;
  href: string;
  event: string;
}

/** Section 10: three starting points, no more. */
export const GCC_STARTING_POINTS: StartingPoint[] = [
  {
    key: "start-smaller",
    label: "Start smaller",
    name: "AI Micro GCC",
    copy: "One focused India team, built and validated first, with room to grow into a larger center.",
    audience: ["Startups and scale-ups", "Mid-market", "A first India capability"],
    ctaLabel: "Start with AI Micro GCC",
    href: "/services/micro-gcc",
    event: "journey_micro_gcc",
  },
  {
    key: "build-new",
    label: "Build a new center",
    name: "AI GCC",
    copy: "A capability center designed around AI, data and engineering from the first business case onward.",
    audience: ["Strategic AI, data and engineering capability", "A larger mandate", "Long-term enterprise ownership"],
    ctaLabel: "Plan My AI GCC",
    href: "/services/ai-gcc",
    event: "journey_ai_gcc",
  },
  {
    key: "transform",
    label: "Transform an existing center",
    name: "GCC Modernization",
    copy: "Move an existing center to a higher-value mandate with AI, data and product ownership inside it.",
    audience: ["An existing GCC", "AI transformation", "Product and platform ownership"],
    ctaLabel: "Modernize My GCC",
    href: "/services/gcc/modernization-transformation",
    event: "journey_modernization",
  },
];

/** Section 11: the six pillars restated as one connected operating partner. */
export const WHY_CAPABILITIES = [
  { name: "Strategy", summary: "Decide what the center should own.", href: "/services/gcc/strategy-business-case" },
  { name: "Talent", summary: "Find and validate specialist people.", href: "/services/ai-talent" },
  { name: "Engineering", summary: "Build production AI capability.", href: "/services/ai-engineering" },
  { name: "Delivery", summary: "Deploy execution capacity.", href: "/services/ai-delivery-teams" },
  { name: "Setup", summary: "Launch the GCC.", href: "/services/gcc/setup-launch" },
  { name: "Operations", summary: "Run and scale the center.", href: "/services/gcc-operations" },
];

/** Section 11, second half. Differentiators, none of them a superlative. */
export const WHY_DIFFERENTIATORS = [
  "Senior involvement in the decisions that set the model, not only at the pitch",
  "AI and data specialization rather than general offshore delivery",
  "NeoHireX-supported hiring with practitioner-led technical validation",
  "Production AI engineering capability, not advisory alone",
  "AI delivery teams that own outcomes inside your cadence",
  "The option to start with an AI Micro GCC and grow from there",
  "Integrated GCC operations rather than a hand-off to a third party",
  "Capability transfer designed in, including a BOT path to captive ownership",
];

/** Section 12: the decision toolkit. All three tools already exist. */
export const GCC_TOOLKIT = [
  { name: "GCC Cost Calculator", question: "What will it cost?", copy: "Model roles, seniority, headcount and city for a fully loaded monthly and annual estimate.", ctaLabel: "Calculate Cost", href: "/gcc-cost-calculator", event: "toolkit_cost_calculator" },
  { name: "GCC ROI Estimator", question: "When does the model pay back?", copy: "Compare current spend against an India model to see break-even and multi-year effect.", ctaLabel: "Estimate ROI", href: "/gcc-roi-estimator", event: "toolkit_roi_estimator" },
  { name: "GCC Readiness Assessment", question: "Are you ready to build?", copy: "A short structured assessment that returns a readiness view and a recommended next step.", ctaLabel: "Assess Readiness", href: "/gcc-readiness-assessment", event: "toolkit_readiness" },
];

/** Section 13: Design, Build, Operate, Scale or Transfer. */
export const ENGAGEMENT_PHASES = [
  { step: "01", title: "Design", items: ["Mandate", "Business case", "Operating model", "Location", "Roadmap"] },
  // "Technology foundation" was the name of a retired service category, so the
  // deliverable is named for what it is instead: the platform and
  // infrastructure layer the center runs on.
  { step: "02", title: "Build", items: ["Talent", "Leadership", "AI engineering", "Entity and workplace", "Platform and infrastructure"] },
  { step: "03", title: "Operate", items: ["People", "IT", "Service management", "Governance", "Performance"] },
  { step: "04", title: "Scale or Transfer", items: ["New capability", "AI transformation", "Leadership", "BOT", "Captive ownership"] },
];

/** Section 14: industries, positioned around the mandate the GCC would own. */
export const HOME_INDUSTRIES = [
  { title: "Financial Services", mandate: "Risk, fraud and payments analytics, regulatory reporting and secure data platforms.", href: "/industries/bfsi-gcc" },
  { title: "Healthcare & Life Sciences", mandate: "Clinical, regulatory and R&D data work under stricter handling and audit requirements.", href: "/industries/healthcare-gcc" },
  { title: "Manufacturing", mandate: "Industry 4.0, supply chain and digital engineering close to the production system.", href: "/industries/manufacturing-gcc" },
  { title: "Retail & Consumer", mandate: "Demand forecasting, personalization and supply chain optimization at commerce scale.", href: "/industries/retail-gcc" },
  { title: "Software & SaaS", mandate: "Product, platform and AI engineering owned end to end by the center.", href: "/industries/technology-gcc" },
  { title: "Private Equity", mandate: "Cross-portfolio capability platforms built once and reused across holdings.", href: "/industries/private-equity-gcc" },
];

/**
 * Section 17. Five to seven questions, answer-first, 50 to 90 words each.
 * These are the visible answers an answer engine should be able to extract;
 * the same set is mirrored into PAGE_FAQS in src/lib/seo.ts.
 */
export const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: "What is an AI GCC?",
    a: "An AI GCC is a Global Capability Center designed around AI, data and engineering capability as part of its core operating model. It combines specialist talent, data and AI platforms, production engineering, model and agent operations, governance and enterprise ownership inside a dedicated capability center, rather than treating AI as a separate innovation project bolted onto a delivery center.",
  },
  {
    q: "How is an AI GCC different from a traditional GCC?",
    a: "A traditional GCC is designed around delivering defined work at scale, and is measured on capacity and cost. An AI GCC is designed around changing how that work is done. Data engineering and model or agent operations are core roles rather than support roles, AI infrastructure is part of the design, and governance has to cover models and agents as well as software.",
  },
  {
    q: "Why build an AI GCC in India?",
    a: "India offers depth across the specific disciplines an AI GCC needs together in one place: AI and machine learning engineering, data engineering, MLOps and platform work, plus the broader software engineering around them. That depth, combined with an established GCC operating environment and workable overlap with US and European hours, is why most global companies evaluate India first for AI capability centers.",
  },
  {
    q: "What is an AI Micro GCC?",
    a: "An AI Micro GCC is a small, dedicated India AI engineering capability that starts with one focused team instead of a full center. It gives you a validated team, your own IP and a working operating model without the overhead of a large traditional GCC, and it is designed so the same structure can expand into a full AI GCC when the business case supports it.",
  },
  {
    q: "How much does an India GCC cost?",
    a: "It depends on the roles, seniority mix, headcount and city, so a single figure is misleading. The GCC Cost Calculator models those variables and returns a fully loaded monthly and annual operating estimate, including the employer costs that salary benchmarks usually leave out. Use it to size a first team or to build the cost case for a full center.",
  },
  {
    q: "Can we start with a small India team and scale later?",
    a: "Yes. Starting with an AI Micro GCC or a single AI delivery team is a common entry point. The point of starting small is to validate the model, the roles and the working rhythm before committing to a larger structure. Designing the operating model properly at the start is what makes the later expansion an extension rather than a rebuild.",
  },
  {
    q: "Can a managed GCC eventually become fully captive?",
    a: "Yes, through a Build-Operate-Transfer path. NeoIntelli can build and operate the center first, then progressively transfer employment, systems, governance and leadership to your own India entity once agreed readiness conditions are met. Not every company wants captive ownership, so the path is optional, but a managed start should never close it off.",
  },
];
