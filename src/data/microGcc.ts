import {
  Landmark,
  Users,
  Building2,
  Calculator,
  ShieldCheck,
  LineChart,
  Award,
  TrendingUp,
  PhoneCall,
  Compass,
  Boxes,
  Layers,
  Bot,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export interface MicroGccTier {
  name: string;
  tierTag: string;
  tierName: string;
  size: string;
  squadPods: number;
  squadLabel: string;
  image: string;
  imageAlt: string;
  best: string;
  desc: string;
  roles: string;
  timeline: string;
  growthStage: string;
}

export interface MicroGccModel {
  name: string;
  desc: string;
  fit: string;
  neo: string;
  you: string;
  image: string;
  imageAlt: string;
}

export interface SquadRole {
  role: string;
  count: string;
  fn: string;
}

export interface FoundationBlock {
  t: string;
  d: string;
  lead: string;
  image: string;
  icon: LucideIcon;
  items: string[];
  link?: { label: string; href: string };
}

export interface DeploymentPhase {
  step: string;
  headline: string;
  timeline: string;
  desc: string;
  accent: string;
  image: string;
  icon: LucideIcon;
}

export interface BuildArchitecture {
  t: string;
  d: string;
  tag: string;
  badge: string;
  aspect: string;
  image: string;
  alt: string;
  metrics: string[];
  cta: { label: string; href: string };
}

export interface WhyNeoItem {
  id: string;
  t: string;
  d: string;
  ctaText: string;
  href: string;
  image: string;
  icon: LucideIcon;
}

export interface MicroGccFaq {
  q: string;
  a: string;
}

export interface RelatedLinkItem {
  name: string;
  href: string;
  summary: string;
  anchor: string;
  icon: LucideIcon;
}

export const tiers: MicroGccTier[] = [
  {
    name: "Tier 1. Single Squad",
    tierTag: "TIER 01",
    tierName: "Single Squad",
    size: "8 to 10 people",
    squadPods: 1,
    squadLabel: "1 Dedicated Squad",
    image: "/images/micro-gcc/tier-01-single-squad.webp",
    imageAlt: "Single agile squad collaborating in high-tech workspace",
    best: "Startups extending engineering capacity. First India team. Pilot mandates.",
    desc: "A working squad with one lead and 7 to 9 specialists. Engineering, AI and data, product, or cross-functional. Operational in 6 to 8 weeks. Designed to ship outcomes, not absorb tickets.",
    roles: "1 squad lead, 5 to 7 engineers or specialists, 1 to 2 supporting roles (QA, DevOps, design, analyst).",
    timeline: "6 to 8 wks to live",
    growthStage: "Pilot & Foundation",
  },
  {
    name: "Tier 2. Twin Squads",
    tierTag: "TIER 02",
    tierName: "Twin Squads",
    size: "15 to 20 people",
    squadPods: 2,
    squadLabel: "2 Coordinated Squads",
    image: "/images/micro-gcc/tier-02-twin-squads.webp",
    imageAlt: "Twin engineering squads working across collaborative bays",
    best: "SMEs and mid-market companies running two parallel mandates. Product plus platform. Or engineering plus data.",
    desc: "Two coordinated squads with shared leadership and a common operating model. Each squad owns its own delivery. India lead role typically introduced at this tier.",
    roles: "1 India lead, 2 squad leads, 12 to 17 specialists, 1 to 2 enabling roles (compliance, finance, ops).",
    timeline: "8 to 12 wks to live",
    growthStage: "Dual-Track Scale",
  },
  {
    name: "Tier 3. Triple Squad",
    tierTag: "TIER 03",
    tierName: "Triple Squad",
    size: "25 to 30 people",
    squadPods: 3,
    squadLabel: "3 Parallel Squads",
    image: "/images/micro-gcc/tier-03-triple-squad.webp",
    imageAlt: "Triple squad delivery floor with India technical leadership",
    best: "Companies treating India as a real capability hub. Multi-function mandates. Series C and mid-market scale-ups.",
    desc: "Three squads working in parallel, with shared platform, governance, and reporting. India lead becomes a full-time leadership role. Reporting cadence formalised at this tier.",
    roles: "1 India lead, 3 squad leads, 20 to 25 specialists, 2 to 3 enabling roles.",
    timeline: "3 to 4 mos to scale",
    growthStage: "Capability Hub",
  },
  {
    name: "Tier 4. Full Micro GCC",
    tierTag: "TIER 04",
    tierName: "Full Micro GCC",
    size: "40 to 50 people",
    squadPods: 4,
    squadLabel: "4 to 5 Multi-Function Squads",
    image: "/images/micro-gcc/tier-04-full-micro-gcc.webp",
    imageAlt: "Full Micro GCC delivery floor with executive leadership",
    best: "Companies graduating from Micro GCC into a full GCC. Mid-market firms scaling India as a core delivery hub.",
    desc: "Four to five squads, mature governance, dedicated India leadership, full operational independence. Ready to graduate to a traditional GCC operating model when scale demands it.",
    roles: "1 India MD or Head, 4 to 5 squad leads, 32 to 40 specialists, 4 to 5 enabling roles.",
    timeline: "6 to 9 mos steady state",
    growthStage: "Full GCC Graduation",
  },
];

export const models: MicroGccModel[] = [
  {
    name: "Model 1. Fully Owned Micro GCC",
    desc: "You set up your own India entity. You own everything. NeoIntelli designs, launches, and stabilises the operation, then hands it over. Best for companies committed to India as a long-term capability and ready to take on entity-level governance from day one.",
    fit: "Tier 3 and Tier 4 squads. Companies with India experience or mature global ops.",
    neo: "Entity setup, hiring, workspace, technology baseline, governance setup, leadership onboarding, handover.",
    you: "Payroll, compliance, operations, India entity governance (post-handover).",
    image: "/images/micro-gcc/model-01-owned.webp",
    imageAlt: "Fully owned Micro GCC corporate entity setup and governance",
  },
  {
    name: "Model 2. Co-Owned Micro GCC",
    desc: "NeoIntelli holds the operating entity and the compliance backbone. You own the team, the IP, the roadmap, and the day-to-day operating model. We run the back office. You run the work. Best for companies that want India ownership without the entity overhead.",
    fit: "Tier 1, Tier 2, and Tier 3 squads. SMEs and mid-market firms that want to focus on the work, not the paperwork.",
    neo: "Entity, payroll, compliance, workspace, infrastructure, statutory operations.",
    you: "Team, roadmap, IP, performance management, growth plan.",
    image: "/images/micro-gcc/model-02-coowned.webp",
    imageAlt: "Co-owned Micro GCC operational collaboration and shared governance",
  },
  {
    name: "Model 3. Managed Squad",
    desc: "NeoIntelli runs the entire setup. Entity, hiring, workspace, payroll, governance, leadership. You get a dedicated squad working to your charter and roadmap, with full transparency and a path to take ownership when ready. Best for pilot teams or companies new to India.",
    fit: "Tier 1 squads. Pilot mandates. Companies validating India before committing to ownership.",
    neo: "Everything operational and entity-related.",
    you: "Squad charter, roadmap, performance reviews, strategic direction.",
    image: "/images/micro-gcc/model-03-managed.webp",
    imageAlt: "Managed dedicated squad operational environment and delivery team",
  },
];

export const squadRoles: SquadRole[] = [
  { role: "Squad Lead", count: "1", fn: "Owns delivery, governance, and reporting to home leadership" },
  { role: "Senior Engineers or Specialists", count: "2 to 3", fn: "Technical depth, architecture decisions, mentoring" },
  { role: "Mid-level Engineers or Specialists", count: "3 to 4", fn: "Core delivery capacity" },
  { role: "Supporting Role", count: "1 to 2", fn: "QA, DevOps, design, analyst, or domain SME" },
];

export const compareRows: string[][] = [
  ["Team size", "100 to 10,000+", "8 to 50", "Vendor managed", "1 to unlimited"],
  ["Setup time", "6 to 18 months", "6 to 12 weeks", "2 to 4 weeks", "1 to 2 weeks"],
  ["Upfront commitment", "Substantial", "Light to moderate, by tier", "None upfront", "None upfront"],
  ["IP ownership", "Full", "Full", "None", "Full"],
  ["Talent control", "Direct", "Direct", "Vendor controlled", "Direct"],
  ["Squad-based model", "No", "Yes", "No", "No"],
  ["Best for", "Large enterprises, large mandates", "Startups, SMEs, mid-market", "Defined task, variable load", "Pilot teams, fast hiring"],
  ["Long-term flexibility", "High", "High", "Low", "Medium"],
];

export const blocks: FoundationBlock[] = [
  {
    t: "Block 1. Entity and compliance",
    d: "Private limited setup, FEMA, GST, PF, PT, ESI registrations, statutory compliance. Or run on our entity until yours is live.",
    lead: "Coordinated, not improvised.",
    image: "/images/micro-gcc/foundation-01-entity.webp",
    icon: Landmark,
    items: [
      "Private limited setup & legal entity registration",
      "FEMA, GST, PF, PT, and ESI registrations",
      "Comprehensive statutory compliance calendar",
      "Option to run on our entity until yours is live",
    ],
  },
  {
    t: "Block 2. Talent sourcing and hiring",
    d: "Senior-led recruitment for engineering, AI and data, product, design, finance, compliance, and operations roles. 21-day median time-to-offer.",
    lead: "21-day median time-to-offer.",
    image: "/images/micro-gcc/foundation-02-talent.webp",
    icon: Users,
    items: [
      "Engineering, AI, data, and product specialists",
      "Design, finance, compliance, and operations hiring",
      "Multi-stage rigorous technical evaluations",
      "Senior partner-led recruitment throughout",
    ],
    link: { label: "Explore AI Talent service", href: "/services/ai-talent" },
  },
  {
    t: "Block 3. Workspace and infrastructure",
    d: "Co-working, managed office, or independent space depending on tier. Hardware, network, security baseline included.",
    lead: "Sized for the squad tier.",
    image: "/images/micro-gcc/foundation-03-workspace.webp",
    icon: Building2,
    items: [
      "Co-working, managed office, or independent space",
      "High-spec developer workstations and monitors",
      "Enterprise redundant ISP networking",
      "Physical and endpoint security baseline",
    ],
  },
  {
    t: "Block 4. Payroll and statutory operations",
    d: "End-to-end payroll, benefits, statutory filings, audit support. Run through your entity or ours.",
    lead: "Complete back-office coverage.",
    image: "/images/micro-gcc/foundation-04-payroll.webp",
    icon: Calculator,
    items: [
      "End-to-end monthly payroll and tax withholdings",
      "Statutory PF, ESI, gratuity, and insurance filings",
      "Audit support and compliance reporting",
      "Run seamlessly through your entity or ours",
    ],
  },
  {
    t: "Block 5. Technology foundation",
    d: "Identity, access, security posture, productivity tooling, and integration into your home systems.",
    lead: "Seamless home integration.",
    image: "/images/micro-gcc/foundation-05-tech.webp",
    icon: ShieldCheck,
    items: [
      "Cloud IAM, single sign-on, and directory sync",
      "Strict data classification and security posture",
      "Development toolchains and licenses setup",
      "Secure zero-trust connection to headquarters",
    ],
  },
  {
    t: "Block 6. Governance and reporting",
    d: "Weekly squad delivery reviews, monthly operational reviews, quarterly business reviews. KPI dashboards built around your reporting cadence.",
    lead: "Radical delivery transparency.",
    image: "/images/micro-gcc/foundation-06-governance.webp",
    icon: LineChart,
    items: [
      "Weekly squad delivery reviews and sprint updates",
      "Monthly operational performance reviews",
      "Quarterly executive business reviews (QBRs)",
      "KPI dashboards built around your reporting cadence",
    ],
  },
  {
    t: "Block 7. Leadership and account ownership",
    d: "Senior NeoIntelli partner assigned to your account. India lead introduced at Tier 2 and above. One named point of contact throughout.",
    lead: "One named accountable point.",
    image: "/images/micro-gcc/foundation-07-leadership.webp",
    icon: Award,
    items: [
      "Senior NeoIntelli partner assigned to account",
      "India lead introduced at Tier 2 and above",
      "One named point of contact throughout",
      "Direct escalation path to executive management",
    ],
  },
  {
    t: "Block 8. Scale and graduate path",
    d: "Built-in growth plan. Move squads up tiers. Graduate the Micro GCC to a full GCC when scale demands it. No rebuilds.",
    lead: "Zero-rebuild graduation.",
    image: "/images/micro-gcc/foundation-08-graduate.webp",
    icon: TrendingUp,
    items: [
      "Built-in structured growth and headcount plan",
      "Move squads up tiers smoothly as mandates expand",
      "Graduate to a full GCC operating model",
      "Preserve existing team, recruiter bench, and toolchain",
    ],
    link: { label: "What GCC Operations runs after scale", href: "/services/gcc-operations" },
  },
];

export const phases: DeploymentPhase[] = [
  {
    step: "01",
    headline: "Scope and align.",
    timeline: "Week 0 to 1.",
    desc: "30 minute discovery call. Define squad count, function, location, ownership model, and timeline. Output: a scoping brief.",
    accent: "#F19326",
    image: "/images/micro-gcc/phase-01.webp",
    icon: PhoneCall,
  },
  {
    step: "02",
    headline: "Design and decide.",
    timeline: "Week 1 to 3.",
    desc: "Engagement model selection (Fully Owned, Co-Owned, or Managed), city, workspace, compliance setup, and squad composition. Output: a Micro GCC build plan.",
    accent: "#00A3E0",
    image: "/images/micro-gcc/phase-02.webp",
    icon: Compass,
  },
  {
    step: "03",
    headline: "Foundation.",
    timeline: "Week 3 to 6.",
    desc: "Entity registration kicked off in parallel with first leadership hire. Workspace secured. Identity and security baseline configured.",
    accent: "#F19326",
    image: "/images/micro-gcc/phase-03.webp",
    icon: Building2,
  },
  {
    step: "04",
    headline: "Squad live.",
    timeline: "Week 4 to 10.",
    desc: "First squad onboarded. Toolchain, reporting, delivery cadence in place. Squad begins working with home team.",
    accent: "#00A3E0",
    image: "/images/micro-gcc/phase-04.webp",
    icon: Users,
  },
  {
    step: "05",
    headline: "Scale and stabilise.",
    timeline: "Month 3 onwards.",
    desc: "Continued hiring against agreed headcount plan. Monthly governance reviews. Add the next squad when ready.",
    accent: "#F19326",
    image: "/images/micro-gcc/phase-05.webp",
    icon: TrendingUp,
  },
];

export const costRows: string[][] = [
  ["Single Squad (8 to 10)", "Lightest, and none at all on the Managed Squad model", "Lowest of the four tiers", "Entity route, city and whether you run on our entity or your own"],
  ["Twin Squads (15 to 20)", "Light to moderate", "Modest step up from a single squad", "Second squad's function, workspace model and leadership layer"],
  ["Triple Squad (25 to 30)", "Moderate", "Scales with the added squad", "Dedicated workspace, India lead and a broader compliance footprint"],
  ["Full Micro GCC (40 to 50)", "Heaviest of the four, still well short of a traditional GCC build", "Highest of the four tiers", "Own entity, managed office, full governance and leadership bench"],
];

export const costDrivers: string[] = [
  "Engagement model - Fully Owned, Co-Owned or Managed Squad",
  "Squad composition and the seniority mix inside it",
  "City, and the workspace model that city calls for",
  "Whether you run on your own India entity or ours",
  "Hiring pace and the leadership layer you need from day one",
  "Security, compliance and audit requirements specific to your sector",
];

export const cityRows: string[][] = [
  ["Bengaluru", "AI, ML, product engineering, R&D", "Highest", "High (1.0x)", "Densest startup and GCC ecosystem"],
  ["Hyderabad", "Cloud, data engineering, BFSI tech", "High", "Medium (0.85x)", "Strong infrastructure, lower attrition than Bengaluru"],
  ["Pune", "Automotive, embedded, product engineering", "Medium-high", "Medium (0.80x)", "Good talent retention, growing AI presence"],
  ["Chennai", "SaaS, fintech, healthcare tech", "Medium-high", "Medium (0.75x)", "Lower cost, strong tech university pipeline"],
  ["Delhi NCR", "Sales, marketing, content, fintech", "High", "Medium (0.85x)", "Best for non-engineering functions"],
  ["Kochi or Coimbatore", "Remote-first Micro GCCs", "Medium", "Low (0.60x)", "Lower cost, strong for cloud and niche software"],
];

export const builds: BuildArchitecture[] = [
  {
    t: "Single Squad AI and Data Build",
    d: "A US healthcare AI scale-up built a single 8-person squad covering ML engineering and data engineering. Operational in 7 weeks under the Managed Squad model. Now planning Tier 2 expansion.",
    tag: "HEALTHCARE AI SCALE-UP",
    badge: "BUILD 01",
    aspect: "aspect-[4/3]",
    image: "/images/industries/crisp_health.webp",
    alt: "Healthcare AI scale-up data and ML squad in modern technology center",
    metrics: [
      "8-person single squad",
      "Managed Squad model",
      "Operational in 7 weeks",
      "ML & Data engineering",
    ],
    cta: { label: "Discuss AI & Data Squad", href: "/contact" },
  },
  {
    t: "Twin Squads Product Engineering",
    d: "A UK fintech built two squads (18 people total) covering full-stack engineering and DevOps. Co-Owned model. Reached 18 people in 5 months. Now expanding to a third squad.",
    tag: "UK FINTECH",
    badge: "BUILD 02",
    aspect: "aspect-[16/10]",
    image: "/images/industries/crisp_fin.webp",
    alt: "UK fintech product engineering twin squads collaboration in modern executive center",
    metrics: [
      "Twin squads (18 people total)",
      "Co-Owned model",
      "Full scale in 5 months",
      "Full-stack & DevOps",
    ],
    cta: { label: "Discuss Product Engineering Squads", href: "/contact" },
  },
  {
    t: "Triple Squad Cross-Functional",
    d: "A Nordic industrial firm built three squads (28 people) covering engineering, customer success, and compliance. Fully Owned model. Hyderabad for cost and infrastructure stability.",
    tag: "NORDIC INDUSTRIAL",
    badge: "BUILD 03",
    aspect: "aspect-[4/3]",
    image: "/images/industries/crisp_mfg.webp",
    alt: "Nordic industrial enterprise triple squad cross-functional center",
    metrics: [
      "Triple squad (28 people)",
      "Fully Owned model",
      "Hyderabad location strategy",
      "Engineering, CS & Compliance",
    ],
    cta: { label: "Discuss Cross-Functional Build", href: "/contact" },
  },
];

export const whyNeo: WhyNeoItem[] = [
  {
    id: "01",
    t: "Squad-based by design",
    d: "Most providers treat lean GCCs as a downsized enterprise build. We start with the squad as the unit. Then scale tier by tier.",
    ctaText: "Explore squad tiers",
    href: "#tiers",
    image: "/images/micro-gcc/why-01-squad.webp",
    icon: Boxes,
  },
  {
    id: "02",
    t: "Three ownership models",
    d: "Fully Owned, Co-Owned, or Managed. Pick the level of operational involvement you want. Change it later without rebuilding.",
    ctaText: "Compare ownership models",
    href: "#models",
    image: "/images/micro-gcc/why-02-models.webp",
    icon: Layers,
  },
  {
    id: "03",
    t: "AI-first by default",
    d: "Most Micro GCC providers ignore AI capability. We embed AI, ML, and data foundations from the first squad. Because that is where the leverage is.",
    ctaText: "Explore AI capability",
    href: "/services/ai-gcc",
    image: "/images/micro-gcc/why-03-aifirst.webp",
    icon: Bot,
  },
  {
    id: "04",
    t: "Senior-led throughout",
    d: "A senior NeoIntelli partner owns your account from day one, with the India lead introduced at Tier 2. One named point of contact, start to finish.",
    ctaText: "Explore leadership model",
    href: "#phases",
    image: "/images/micro-gcc/why-04-leadership.webp",
    icon: Award,
  },
  {
    id: "05",
    t: "Pan-India footprint",
    d: "Active hiring and operations in six cities. We pick the city your function demands, not where we happen to be.",
    ctaText: "View city footprint",
    href: "#cities",
    image: "/images/micro-gcc/why-05-cities.webp",
    icon: MapPin,
  },
  {
    id: "06",
    t: "Built to graduate",
    d: "A Micro GCC is a starting point. Our playbook moves you tier by tier to a full GCC operating model when scale demands it.",
    ctaText: "Graduation roadmap",
    href: "/services/gcc-operations",
    image: "/images/micro-gcc/why-06-graduate.webp",
    icon: TrendingUp,
  },
];

// Alias for whyNeo matching plan naming
export const whyItems = whyNeo;

export const faqs: MicroGccFaq[] = [
  {
    q: "What is a Micro GCC?",
    a: "A Micro GCC is an India-based captive center built squad by squad, typically 8 to 50 people. It delivers the same control over talent, IP, and operations as a traditional GCC, but at a leaner scale with faster setup and lower upfront cost.",
  },
  {
    q: "What is a squad in a Micro GCC?",
    a: "A squad is the unit of capability. Typically 8 to 10 people with one squad lead and a mix of senior and mid-level specialists. Squads are charter-driven, deliver outcomes, and report into home team leadership. A Micro GCC can start with one squad and scale to four or five squads.",
  },
  {
    q: "What is the difference between Fully Owned, Co-Owned, and Managed Squad models?",
    a: "Fully Owned means you set up your own India entity and own everything end to end. Co-Owned means NeoIntelli holds the entity and back office, you own the team and the work. Managed Squad means NeoIntelli runs everything, you direct the squad's charter and roadmap.",
  },
  {
    q: "How long does it take to launch a Micro GCC?",
    a: "A single squad is operational in 6 to 8 weeks. Twin squads in 3 to 4 months. Triple squad in 4 to 6 months. Full Micro GCC (40 to 50 people) in 6 to 9 months.",
  },
  {
    q: "How much does a Micro GCC cost?",
    a: "It depends on the ownership model, tier, city and squad composition. The Managed Squad model carries no setup commitment at all, a Fully Owned Tier 4 build carries the heaviest, and monthly operating overhead scales with tier. Contact us for pricing and you get it in writing, in a proposal you can accept or reject.",
  },
  {
    q: "Can a Micro GCC scale into a full GCC?",
    a: "Yes. Most Micro GCCs are designed with a graduation path. Once the team crosses 50 to 75 people, the operating model shifts to a full GCC structure without rebuilding entities, vendor relationships, or workflows.",
  },
  {
    q: "Can a startup build a Micro GCC?",
    a: "Yes. Series A and Series B startups are among the fastest-growing buyers of Micro GCC services. A single squad of 8 to 10 engineers is often the first India footprint for a venture-backed company, typically under the Managed Squad or Co-Owned model.",
  },
  {
    q: "Which functions work well in a Micro GCC?",
    a: "Engineering, AI and data, product, design, customer success, finance, compliance, and analytics all work well. Functions that need physical proximity to a specific home market (field sales, in-person customer ops) typically do not.",
  },
  {
    q: "Where should we set up?",
    a: "Bengaluru is the default for AI, ML, and product engineering. Hyderabad offers strong infrastructure and lower attrition. Pune works well for embedded and automotive. Chennai for SaaS and fintech. Delhi NCR for non-engineering functions. The right city depends on the function you are building and the profile you are hiring for.",
  },
  {
    q: "Can we start with one ownership model and switch later?",
    a: "Yes. Many clients start as Managed Squad to validate India quickly, move to Co-Owned once the model is proven, and transition to Fully Owned when scale justifies the overhead. Same team. Same workspace. No rebuild.",
  },
  {
    q: "What does NeoIntelli actually do?",
    a: "We design, launch, and operate the Micro GCC end to end. Entity, hiring, workspace, payroll, technology foundation, governance, and scale path. Single accountable partner. Senior led. Squad-based by design. Built to graduate to full GCC when scale demands it.",
  },
];

// Alias for faqs matching plan naming
export const microGccFaqs = faqs;

export const relatedLinks: RelatedLinkItem[] = [
  {
    name: "GCC Strategy & Setup",
    href: "/services/gcc",
    summary: "Mandate design, location strategy, entity architecture, and operational launch for captive India centers.",
    anchor: "Explore GCC Strategy",
    icon: Compass,
  },
  {
    name: "AI GCC",
    href: "/services/ai-gcc",
    summary: "Design and operate an AI Global Capability Center in India under one unified operating model.",
    anchor: "Explore AI GCC",
    icon: Bot,
  },
  {
    name: "AI Infrastructure & GPU",
    href: "/services/ai-gcc/ai-infrastructure-gpu",
    summary: "GPU capacity planning, reserved and dedicated compute, training pipelines, and AI FinOps.",
    anchor: "Explore AI Infrastructure",
    icon: Layers,
  },
  {
    name: "Recruitment Agency India | Staffing, Search & RPO",
    href: "/recruitment",
    summary: "Executive search, specialized technical staffing, and RPO services powered by NeoHireX.",
    anchor: "Explore Recruitment",
    icon: Users,
  },
  {
    name: "GCC Cost Calculator",
    href: "/gcc-cost-calculator",
    summary: "Interactive role-by-role model to benchmark India captive center costs against US, UK, and Europe.",
    anchor: "Calculate GCC Costs",
    icon: Calculator,
  },
  {
    name: "Talk to Us",
    href: "/contact",
    summary: "Schedule a 30-minute scoping discussion with our senior partners on your India captive roadmap.",
    anchor: "Schedule Scoping Call",
    icon: PhoneCall,
  },
];
