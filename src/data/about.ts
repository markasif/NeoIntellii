/**
 * About page content.
 *
 * The FAQs live here rather than inside the page because `buildFaqSchema`
 * in src/lib/seo.ts emits FAQPage markup for /about from the same array.
 * Two copies would eventually disagree, and structured data that answers a
 * question the page does not visibly answer is exactly the kind of claim we
 * do not want to make.
 *
 * Everything on this page is written to be verifiable. No client counts, no
 * delivery metrics, no named logos: what the page describes is how we work
 * and what a client keeps control of, stated as capability rather than as
 * results we cannot evidence here.
 */

export type AboutFaq = { q: string; a: string };

/** The three capabilities NeoIntelli brings together under one engagement. */
export const ABOUT_PILLARS = [
 {
  title: "AI & Engineering",
  desc: "Production AI, generative and agentic AI, machine learning, data engineering, MLOps, AI infrastructure and product engineering.",
  href: "/services/ai-engineering",
 },
 {
  title: "Talent",
  desc: "Specialist AI, data and engineering hiring, supported by technology-assisted screening and practitioner-led technical validation.",
  href: "/services/ai-talent",
 },
 {
  title: "GCC Operations",
  desc: "Strategy, operating model, entity coordination, workplace, IT, people operations, governance, performance management and transition.",
  href: "/services/gcc-operations",
 },
] as const;

/** The lifecycle, from the first business case to a capability the client owns. */
export const ABOUT_LIFECYCLE = [
 {
  num: "01",
  title: "Strategy",
  desc: "Define why the India center should exist and what it should own.",
  items: ["Mandate", "Business case", "Location strategy", "Operating model", "Workforce plan", "Governance model"],
  href: "/services/gcc/strategy-business-case",
 },
 {
  num: "02",
  title: "Talent",
  desc: "Build the specialist capability the mandate calls for. Hiring can be supported through NeoHireX and practitioner-led technical validation, so client interview time is spent on stronger candidates.",
  items: ["AI & ML", "Generative AI", "Agentic AI", "Data engineering", "MLOps & platform engineering", "Product engineering", "Technical leadership"],
  href: "/services/ai-talent",
 },
 {
  num: "03",
  title: "AI Engineering",
  desc: "Turn AI opportunities into production capability rather than prototypes.",
  items: ["Use-case engineering", "Data foundations", "GenAI applications", "AI agents", "Machine learning", "Evaluation & observability", "MLOps and AgentOps", "Responsible AI"],
  href: "/services/ai-engineering",
 },
 {
  num: "04",
  title: "Delivery",
  desc: "Deploy teams that work inside your engineering environment: your roadmap, your repositories, your release cadence, your product priorities.",
  items: ["Dedicated AI engineering teams", "AI delivery pods", "Forward-deployed engineers", "Team transfer"],
  href: "/services/ai-delivery-teams",
 },
 {
  num: "05",
  title: "GCC Build",
  desc: "Create the environment around the team.",
  items: ["Entity and operating setup", "Workplace", "IT and security", "HR and payroll coordination", "Cloud and AI infrastructure", "Leadership and governance"],
  href: "/services/gcc/setup-launch",
 },
 {
  num: "06",
  title: "Operate",
  desc: "Run the India operating layer while your leadership retains control of the mandate.",
  items: ["People operations", "Workforce management", "Workplace and IT", "Service management", "Performance", "Governance and compliance coordination"],
  href: "/services/gcc-operations",
 },
 {
  num: "07",
  title: "Scale or Transfer",
  desc: "Grow the capability as the business evolves. Add functions, add leadership, expand AI capability, transform an existing center, or move toward Build-Operate-Transfer and captive ownership.",
  items: ["Scale and expansion", "Existing GCC transformation", "Build-Operate-Transfer", "Transition to captive"],
  href: "/services/gcc-operations/bot-transition",
 },
] as const;

/** What we do differently, stated as approach rather than as outcome. */
export const ABOUT_DIFFERENTIATORS = [
 {
  num: "01",
  title: "Hiring is part of a GCC. It is not the GCC.",
  desc: "We are not trying to be another staffing company. Talent is connected to the mandate, the engineering work, the technology environment, the operating model and the governance the team will work within. That changes the conversation from how many engineers do you need, to what capability should your India center own.",
 },
 {
  num: "02",
  title: "AI is part of the operating model, not a service added later.",
  desc: "Many organizations build a conventional offshore center and try to add AI capability afterwards. We work the other way around. When AI is part of the mandate, the center is designed around the data, talent, infrastructure, platforms, engineering practices and governance that putting AI into production actually requires. That is what we mean by an AI GCC.",
 },
 {
  num: "03",
  title: "Senior involvement where the decisions compound.",
  desc: "The wrong location affects hiring. The wrong workforce mix affects cost. The wrong operating model affects accountability. The wrong architecture affects AI deployment. The wrong governance model slows everything that follows. Our approach is to keep experienced operators and practitioners involved in the decisions that define the center, not only in the first sales conversation.",
 },
 {
  num: "04",
  title: "Technology supports the operating model.",
  desc: "Important GCC processes should be measurable and increasingly technology-enabled. Our talent workflows can use NeoHireX, our AI-enabled hiring platform, to support resume screening, candidate ranking and early-stage evaluation. Across AI engineering and GCC operations we apply the same principle: automate what should be automated, instrument what should be measured, and keep important decisions accountable to people.",
 },
] as const;

/** Entry points, so the page does not imply one starting size fits everyone. */
export const ABOUT_ENTRY_POINTS = [
 {
  name: "AI Micro GCC",
  desc: "For startups, scale-ups and companies that want a focused India capability first. Start with a dedicated AI or engineering team, prove the operating model, expand as the business grows.",
  href: "/services/micro-gcc",
  cta: "Explore Micro GCC",
 },
 {
  name: "AI GCC",
  desc: "For organizations ready to establish a broader strategic capability across AI, data, engineering and related functions under one operating model.",
  href: "/services/ai-gcc",
  cta: "Explore AI GCC",
 },
 {
  name: "Existing GCC transformation",
  desc: "For companies already operating in India that want the center to take on higher-value AI, data, engineering, product or enterprise responsibilities.",
  href: "/services/gcc/modernization-transformation",
  cta: "Explore transformation",
 },
] as const;

/** How we work, written as commitments a client can hold us to. */
export const ABOUT_PRINCIPLES = [
 { t: "Capability before capacity.", d: "We start with what the center needs to accomplish, not with how many people can be placed into it." },
 { t: "Outcomes before activity.", d: "Teams should be accountable for meaningful engineering, operational and business outcomes, not for ticket volume." },
 { t: "AI-ready by design.", d: "Data, AI engineering, infrastructure, evaluation, observability and governance are considered from the beginning rather than retrofitted." },
 { t: "Transparency before dependency.", d: "Clients should understand the economics, the operating model, who is responsible for what, and the transition path." },
 { t: "Governance from day one.", d: "Security, decision rights, access, performance and risk management belong in the design, not in documentation written later." },
 { t: "Build for ownership.", d: "Where the objective is a captive GCC, the operating model should make eventual ownership easier rather than create permanent vendor dependency." },
] as const;

/** What stays with the client, named explicitly rather than implied. */
export const ABOUT_CLIENT_CONTROL = [
 "Product direction",
 "Business priorities",
 "Intellectual property",
 "Technology roadmap",
 "Architecture decisions",
 "Data access",
 "Strategic leadership",
] as const;

/** The planning tools, so the decision can be tested before it is committed to. */
export const ABOUT_TOOLS = [
 { name: "GCC Cost Calculator", desc: "Model the expected cost of an India team by role, seniority and city.", href: "/gcc-cost-calculator", cta: "Calculate GCC cost" },
 { name: "GCC ROI Estimator", desc: "Compare the India model against your current operating structure.", href: "/gcc-roi-estimator", cta: "Estimate GCC ROI" },
 { name: "GCC Readiness Assessment", desc: "Work through whether your organization is ready to build.", href: "/gcc-readiness-assessment", cta: "Assess readiness" },
] as const;

/**
 * Visible FAQs. src/lib/seo.ts renders the same array as FAQPage markup, so
 * the answer a search engine reads is the answer on the page.
 */
export const ABOUT_FAQS: AboutFaq[] = [
 {
  q: "What does NeoIntelli do?",
  a: "NeoIntelli helps global organizations design, build, operate and scale AI-led Global Capability Centers in India, across strategy, specialist talent, AI engineering, delivery, technology foundations, GCC setup, operations and transition.",
 },
 {
  q: "Is NeoIntelli a recruitment company?",
  a: "Recruitment is one capability within NeoIntelli, not the whole model. We connect specialist hiring with AI engineering, GCC setup, operations and long-term capability building.",
 },
 {
  q: "What is an AI GCC?",
  a: "An AI GCC is a Global Capability Center designed around AI, data and engineering capability as part of its core mandate, rather than a traditional offshore center that adds AI later.",
 },
 {
  q: "Can we start with a small team?",
  a: "Yes. An AI Micro GCC can begin with a focused engineering or AI team and expand into a broader India capability as requirements mature.",
 },
 {
  q: "Can NeoIntelli support an existing GCC?",
  a: "Yes. Existing centers can work with NeoIntelli to expand AI capability, specialist talent, engineering capacity, operating maturity and governance.",
 },
 {
  q: "Can the team eventually become our own captive operation?",
  a: "Where that is the objective, the engagement can be structured with a path toward Build-Operate-Transfer or captive ownership. Transition is best considered when the operating model is designed, rather than negotiated only when a client wants to leave a managed model.",
 },
 {
  q: "Can you share client references?",
  a: "We can discuss relevant experience in a working conversation, and client details are shared only with permission. We do not publish named results we cannot evidence.",
 },
 {
  q: "Where is NeoIntelli based?",
  a: "NeoIntelli is headquartered in Bengaluru, India, and supports organizations building capability across India's major technology and talent markets.",
 },
];
