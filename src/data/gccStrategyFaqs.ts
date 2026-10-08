/**
 * Visible FAQ content for the GCC Strategy & Setup pillar.
 *
 * One source for the on-page FAQ sections and for the JSON-LD the parent page
 * emits, so structured data can never drift from what a visitor reads. Every
 * question here exists because a buyer asks it; the lists are deliberately
 * short and do not repeat across pages.
 */
export interface GccFaq {
  q: string;
  a: string;
}

export const gccOverviewFaqs: GccFaq[] = [
  {
    q: "What is a Global Capability Center (GCC)?",
    a: "A Global Capability Center is a dedicated capability organization that a global company establishes to own strategic functions such as engineering, product, AI, data, finance or operations in another country, most often India. Unlike outsourcing, a GCC is designed around long-term enterprise ownership of talent, knowledge, intellectual property and capability, although a GCC partner may provide operational support in the early years.",
  },
  {
    q: "Should my company build a GCC in India?",
    a: "A GCC usually makes sense when the work is strategic, long term, IP-sensitive, data- or talent-intensive, and depends on organizational knowledge that the enterprise wants to keep in-house. It is less appropriate for short-term, fluctuating or commodity work where a vendor-owned outcome is acceptable. NeoIntelli treats this as an ownership decision first: what capability does the enterprise want to own?",
  },
  {
    q: "What is the difference between a GCC and outsourcing?",
    a: "In outsourcing, a vendor owns the team, the process and typically the outcome, under a contract. In a GCC the enterprise owns the team, the knowledge and the IP, and carries the management responsibility. Outsourcing is usually faster to start and easier to exit. A GCC compounds capability over time and is the stronger model for work that is core to the business.",
  },
  {
    q: "What is the difference between a GCC and a BOT model?",
    a: "Build-Operate-Transfer (BOT) is one way to reach a GCC. A partner builds and operates the center under its own entity or the client's, then transfers people, contracts and operations to the client at an agreed milestone. A captive GCC is owned by the enterprise from day one. BOT typically reduces initial operating complexity in exchange for a defined transfer path; the right choice depends on how much local operating capability the enterprise has today.",
  },
  {
    q: "What should be decided before the first hire?",
    a: "Five decisions: the mandate (what India will own), the operating model (captive, assisted, managed, BOT, EOR-first or hybrid), the location (which talent ecosystem supports the mandate), the workforce (which leaders and skills are needed first) and the ownership path (what a partner operates initially and what moves in-house over time).",
  },
  {
    q: "How long does it take to launch a GCC in India?",
    a: "It depends on the scope. A strategy and readiness phase, a pilot team launch, entity and workplace readiness, a full operating launch and steady-state scale are different milestones with different timelines. NeoIntelli scopes each one for a specific mandate rather than quoting a universal launch time, and runs setup workstreams in parallel so the critical path is as short as the entity, leadership and workspace lead times allow.",
  },
  {
    q: "Can NeoIntelli help an existing GCC, not only a new one?",
    a: "Yes. GCC Modernization & Transformation redesigns an existing center around a larger mandate, stronger ownership, AI and data capability and measurable enterprise value.",
  },
  {
    q: "What is an AI Micro GCC?",
    a: "An AI Micro GCC is NeoIntelli's lean starting model: one senior-led squad in India, built on an operating model that can scale into a full GCC. It suits startups, scale-ups, mid-market and PE-backed companies and first-time India entrants who want ownership without a Fortune-500 launch.",
  },
];

export const gccStrategyFaqs: GccFaq[] = [
  {
    q: "What is a GCC strategy?",
    a: "A GCC strategy defines why a Global Capability Center should exist, which capabilities it should own, how it should be structured and governed, where it should operate and what value the parent company expects from it over several years. It precedes entity setup, hiring and real estate decisions.",
  },
  {
    q: "How do you build a GCC business case?",
    a: "Start from the mandate, not the headcount. Establish the baseline cost and outcome of the work today, model the target operating model, one-time setup investment, multi-year operating cost, leadership and talent ramp, and the capability and ownership value the center creates. Add risk, scenario and sensitivity analysis, then present decision gates and success metrics a board can approve against.",
  },
  {
    q: "When does a GCC make financial sense?",
    a: "Typically when the work is durable enough for a multi-year view, large enough that leadership and setup costs are absorbed, and valuable enough that ownership of talent, knowledge and IP matters more than the flexibility of a vendor contract. Savings alone rarely justify a GCC; capability ownership and execution speed usually do.",
  },
  {
    q: "GCC vs outsourcing: which is better?",
    a: "Neither is universally better. Outsourcing fits short-term, fluctuating or commodity work where a vendor-owned outcome is acceptable. A GCC fits strategic, IP-sensitive, data-intensive and talent-intensive work that the enterprise wants to own and improve over time.",
  },
  {
    q: "GCC vs EOR: what is the difference?",
    a: "An Employer of Record (EOR) lets a company employ people in India without its own entity; the EOR is the legal employer. It is a fast entry route for a small pilot team. A GCC is a capability organization with its own operating model and, usually, its own entity. Many companies start EOR-first and convert to a captive entity once the mandate is proven.",
  },
  {
    q: "What should a GCC own?",
    a: "Capabilities that are strategic, knowledge-heavy and improved by continuity: product and platform engineering, AI and data, core operations, finance and analytics functions, and domain expertise the enterprise cannot buy as a commodity. Work that is transactional or temporary is usually better placed with a vendor.",
  },
  {
    q: "How large should a GCC be?",
    a: "As large as the mandate requires and no larger. Size follows from the capabilities the center owns and the leadership span that can be managed well. Many centers start with one senior-led squad or a leadership spine and scale as ownership expands, rather than committing to a headcount target up front.",
  },
  {
    q: "How do you calculate GCC ROI?",
    a: "Compare the multi-year fully loaded cost of the GCC, including one-time setup, leadership, operating support and transition, with the baseline cost and outcome of the same work today, then add the value of capability ownership, execution speed and risk reduction. Present the result as scenarios with sensitivity to hiring pace, attrition and scope, not as a single number.",
  },
  {
    q: "What should a GCC board proposal include?",
    a: "Executive rationale, mandate, operating-model recommendation, location shortlist, workforce blueprint, multi-year financial model, risk register, governance model, launch roadmap, decision gates, success metrics and the ownership path.",
  },
  {
    q: "How many years should the business case cover?",
    a: "Long enough to show the center at steady state, which usually means at least three years and often five. Year one carries setup and ramp costs; the value of ownership shows in years two and three, so a one-year view systematically understates the case.",
  },
];

export const gccLocationFaqs: GccFaq[] = [
  {
    q: "Which is the best city for a GCC in India?",
    a: "There is no single best city. The right location depends on the roles the center will own. Bengaluru has the deepest technology and AI talent market, Hyderabad combines strong engineering with life-sciences and large-scale GCC presence, Pune is strong in engineering, automotive and BFSI, Chennai in manufacturing, automotive, BFSI operations and healthcare, and NCR in BFSI, consulting and shared services. Match the city to the mandate and role mix.",
  },
  {
    q: "Bengaluru vs Hyderabad for a GCC?",
    a: "Bengaluru offers the broadest and deepest AI, product and platform talent pool, with correspondingly higher compensation and hiring competition. Hyderabad offers strong engineering and data talent, a large established GCC base, and generally lower cost pressure. For a senior AI or product mandate Bengaluru is usually the safer talent bet; for scale operations or life sciences Hyderabad is often the better fit.",
  },
  {
    q: "Which Indian city has the strongest AI talent?",
    a: "Bengaluru has the largest concentration of AI, machine learning and platform engineering talent and the most active startup and research ecosystem. Hyderabad and Pune have strong, growing AI and data engineering pools. A generic IT talent index is not enough for an AI mandate; NeoIntelli evaluates depth at the role level, from AI leadership to MLOps and GenAI engineers.",
  },
  {
    q: "Is Pune good for a GCC?",
    a: "Yes, for engineering, automotive, manufacturing and BFSI mandates in particular. Pune has a strong engineering talent base, comparatively moderate cost pressure and a mature GCC ecosystem. Very senior AI leadership can be scarcer than in Bengaluru.",
  },
  {
    q: "Is Chennai good for an engineering GCC?",
    a: "Chennai works well for automotive, manufacturing, industrial engineering, BFSI operations and healthcare mandates, with a stable talent market and moderate cost. Its GenAI and platform talent pool is smaller than Bengaluru's, which matters for AI-heavy mandates.",
  },
  {
    q: "Should a GCC use a Tier-2 city?",
    a: "Tier-2 and emerging hubs can offer lower cost and attrition for operations and mid-level engineering work. They are less suited to senior AI, product and leadership hiring, where the talent pool is thin. A common pattern is a Tier-1 anchor for leadership and specialist roles with a Tier-2 spoke for scale.",
  },
  {
    q: "Should a company use one GCC location or multiple?",
    a: "Start with one hub unless the mandate clearly needs two distinct talent markets or business-continuity coverage. A second location multiplies leadership, workplace and compliance overhead. Add it once the first center is stable and the case for a second talent pool is proven.",
  },
  {
    q: "What factors matter more than salary cost?",
    a: "Role-level talent depth, leadership availability, attrition and hiring competition, ecosystem maturity, infrastructure and global access, and the ability to scale the mandate over several years. Cost per seat is a real input but a poor primary criterion.",
  },
  {
    q: "How does location affect attrition?",
    a: "Attrition is driven by hiring competition, compensation pressure and the density of alternative employers for a given role. Cities with the deepest talent markets also have the most competition, so retention design, compensation philosophy and career paths matter as much as the city choice.",
  },
  {
    q: "How do state GCC incentives affect location selection?",
    a: "Several Indian states have published GCC-specific policies that may offer capital, rent, employment-linked or training support, subject to eligibility. Incentives can improve the economics of a shortlisted city but should not select the city. Talent fit comes first; incentives are validated with specialist tax and legal advisers before they enter the business case.",
  },
];

export const gccSetupFaqs: GccFaq[] = [
  {
    q: "How do you set up a GCC in India?",
    a: "Convert the approved mandate and business case into one integrated program: coordinate entity and compliance setup, hire the leadership spine, mobilize the initial workforce, ready the workspace, IT and security baseline, stand up people processes and payroll, integrate with headquarters and govern the launch through decision gates. Run these workstreams in parallel against one dependency plan rather than sequentially.",
  },
  {
    q: "How long does GCC setup take?",
    a: "It depends on the operating model, the entity route, the leadership market for the roles required and the workplace strategy. A pilot team under an EOR or managed model can start well before an entity and permanent office are ready; a full operating launch of a captive center takes longer because entity registration, leadership hiring and workspace readiness have their own lead times. NeoIntelli scopes the milestones for each program rather than quoting one universal number.",
  },
  {
    q: "What should happen first in a GCC setup?",
    a: "Lock the design decisions that everything else depends on: mandate, operating model, location and the first leadership roles. Once those are fixed, entity coordination, leadership search, workspace and IT readiness can all start at the same time.",
  },
  {
    q: "Do you need an India legal entity to set up a GCC?",
    a: "A captive GCC ultimately needs an Indian entity, most commonly a private limited company. It is not always needed on day one: a team can start under an Employer of Record or a partner-operated model while the entity is being established. Entity structure and tax matters should be validated by qualified legal and tax advisers.",
  },
  {
    q: "Can hiring begin before entity setup finishes?",
    a: "Yes. Leadership search and initial hiring can run in parallel with entity coordination, with employment through an EOR or partner entity as a bridge, then transferred once the entity, payroll and statutory registrations are live.",
  },
  {
    q: "What must be ready before the first hire joins?",
    a: "Employment setup and payroll, workspace and access, a device, identity and security baseline, policies, a manager and a defined role, data and system access, a support route, an escalation path and an initial objective. Missing any one of these turns a first day into a waiting day.",
  },
  {
    q: "When should GCC leadership be hired?",
    a: "As early as the mandate allows. The center head and first function leads shape hiring, culture and the operating rhythm; senior searches also have long lead times in India. Leadership should be in seat before the first cohort, not after.",
  },
  {
    q: "How should a GCC setup program be governed?",
    a: "With one accountable program lead, one integrated plan, explicit decision rights between headquarters and India, a risk register, weekly cadence and decision gates at readiness, pilot launch and full operating launch.",
  },
  {
    q: "Can a company start a GCC through EOR?",
    a: "Yes. An EOR-first entry employs the first people in India without an entity. It suits small pilot teams and companies that want to prove the mandate before committing to a captive structure. The operating model should define when and how the team converts to the company's own entity.",
  },
  {
    q: "How does setup transition into managed GCC operations?",
    a: "Go-live hands the center to a defined operating layer: people and HR operations, workplace, IT and security, service management and governance. NeoIntelli's GCC Operations services run that layer and, where agreed, transfer it in-house over time.",
  },
];

export const gccModernizationFaqs: GccFaq[] = [
  {
    q: "What is GCC modernization?",
    a: "GCC modernization redesigns an existing Global Capability Center around higher-value capability, stronger ownership and measurable enterprise outcomes. It can include mandate expansion, operating-model redesign, AI and data capability, workforce change, product or platform ownership, governance and automation.",
  },
  {
    q: "When should a GCC be transformed?",
    a: "When the mandate has stagnated, the center is seen as a cost center, headquarters trust is weak, attrition is high, AI pilots are fragmented, decision rights are slow or the value story is unclear. Any of these is a signal; several together mean the operating model no longer fits the enterprise's needs.",
  },
  {
    q: "How do you move a GCC beyond cost arbitrage?",
    a: "Give it something to own. Move from task execution to service ownership, then to product or platform ownership, with decision rights, leadership and metrics to match. Cost stays relevant but stops being the reason the center exists.",
  },
  {
    q: "How can a GCC become a product engineering center?",
    a: "By owning products or platforms end to end: roadmap influence, engineering leadership in India, product management capability, platform ownership and success metrics tied to product outcomes rather than tickets closed. This usually requires changes to talent mix, governance and how headquarters delegates decisions.",
  },
  {
    q: "How can a GCC become AI-ready?",
    a: "Build the data foundation, establish MLOps and AI governance, hire or upskill AI and data engineering talent, and give the center ownership of at least one AI product or platform. When AI becomes central to the mandate, the work becomes an AI GCC program.",
  },
  {
    q: "What is GCC maturity?",
    a: "GCC maturity describes how much of the enterprise's capability, decision-making and value a center owns. NeoIntelli uses a four-stage view: Execution Center, Capability Center, Ownership Hub and AI-Enabled Value Center. It is NeoIntelli's own lens, not an industry standard.",
  },
  {
    q: "How do you measure GCC value?",
    a: "Beyond cost: capability owned, products or platforms delivered, decision rights exercised in India, time to outcome, quality and reliability, talent retention and development, and the share of enterprise priorities the center leads. Measurement should be agreed with headquarters before transformation begins.",
  },
  {
    q: "How do GCCs gain larger global mandates?",
    a: "By earning trust through reliable ownership of a smaller mandate, building leadership depth that headquarters recognizes, and presenting a clear value story. Mandate expansion follows demonstrated ownership, not headcount growth.",
  },
  {
    q: "How should GCC talent change for AI?",
    a: "Toward AI and data engineering, MLOps, AI platform and product roles, with upskilling for existing engineers and a leadership layer that can own AI outcomes. Not every role changes, but the mix and the seniority profile usually do.",
  },
  {
    q: "Does GCC transformation require more headcount?",
    a: "Not necessarily. The next stage of maturity is usually more ownership, not more people. Many transformations rebalance the workforce toward higher-value roles and automate manual work before adding headcount.",
  },
];
