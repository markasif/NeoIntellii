import SubServicePage from "@/components/shared/SubServicePage";

export default function Rpo() {
 return (
  <SubServicePage
   pageTitle="RPO Services India | Recruitment Process Outsourcing | NeoIntelli"
   metaDescription="End-to-end and project-based RPO (Recruitment Process Outsourcing) services in India. Embedded recruiters, talent operations, employer branding and scalable hiring pods."
   subtitle="Recruitment - RPO"
   title="Recruitment Process Outsourcing (RPO) in India"
   description="Embedded recruiter pods, talent operations and managed hiring programmes that scale with your roadmap - end-to-end or project-based."
   breadcrumbs={[
    { name: "Home", href: "/" },
    { name: "Capabilities", href: "/services/ai-engineering" },
    { name: "Recruitment", href: "/recruitment" },
    { name: "RPO" },
   ]}
   intro="RPO works when it is run like a product team - not a vendor desk."
   introMuted=" We embed senior recruiters, talent ops, sourcers and coordinators into your hiring workflow, run weekly metrics rituals and own the outcome - cost, quality and time-to-hire."
   metricsBand={[
    { value: "Embedded", label: "Recruiters in your workflow" },
    { value: "Weekly", label: "Metrics and business review" },
    { value: "End-to-end", label: "Or project-based" },
    { value: "30 days", label: "Pod stand-up" },
   ]}
   whyItMatters={{
    title: "When RPO is the right model",
    paragraphs: [
     "When hiring volume is high, skills are scarce, or you need to scale and de-scale quickly, in-house TA capacity is usually the constraint. RPO gives you embedded recruiters who behave like your team but flex with demand.",
     "NeoIntelli runs lean, senior-weighted pods with strong digital tooling. Onboarding takes 30 days, and a pod typically produces its first placements in week 5 to 6.",
    ],
   }}
   deliverablesTitle="What an RPO pod delivers"
   deliverables={[
    { title: "Embedded recruiter pod", desc: "Senior recruiters, sourcers, coordinators and a pod lead - sized to your req volume and skill mix." },
    { title: "ATS & tech stack integration", desc: "We work inside your existing ATS - commercial or in-house - so all data stays with you." },
    { title: "Sourcing operations", desc: "Outbound research, AI-screened pipelines, candidate experience scripts and offer-management playbooks." },
    { title: "Hiring manager enablement", desc: "Intake templates, scorecards, interviewer training and feedback rituals to drive consistent decisions." },
    { title: "Employer branding support", desc: "Careers page copy, employer-review and professional-network presence, campaign launch and content calendar." },
    { title: "Weekly metrics rituals", desc: "Time-to-fill, pipeline coverage, source-of-hire, offer-to-join, cost-per-hire - reviewed in a weekly business review." },
   ]}
   approachTitle="How we stand up an RPO engagement"
   approach={[
    { step: "01", title: "Discovery", desc: "Hiring plan, current state, ATS, tech stack, success metrics and pod sizing locked in 2 weeks." },
    { step: "02", title: "Design", desc: "Pod composition, operating model, SLAs, weekly rituals, comp benchmarks and KPI dashboard agreed." },
    { step: "03", title: "Onboard", desc: "Recruiters trained on your stack and roles, hiring managers re-briefed, tooling and access provisioned." },
    { step: "04", title: "Run", desc: "Pod produces hires from week 5. Weekly business review, monthly steering committee, quarterly capability deep-dive." },
    { step: "05", title: "Scale or transfer", desc: "Flex pod up or down with demand. Optional knowledge transfer to your in-house team at the end of the engagement." },
   ]}
   pitfalls={{
    title: "How we structure an RPO engagement",
    items: [
     { title: "Priced on capability", desc: "We price on pod capability plus a smaller success component, so hard-to-fill roles get the same attention as easy ones." },
     { title: "Hiring-manager rituals included", desc: "Intake templates, scorecards, interviewer training and feedback rituals are part of the engagement - we rebuild the workflow, not just staff it." },
     { title: "Live pipeline reporting", desc: "You get live dashboards on pipeline, time-to-fill, source-of-hire and offer-to-join, reviewed together every week." },
     { title: "Quarterly flex built in", desc: "Our engagements carry quarterly flex on pod size, so you can ramp the team up or down as your roadmap changes." },
    ],
   }}
   successMetrics={{
    title: "Outcomes you can expect",
    items: [
     "Cost-per-hire tracked and reported against your own baseline each quarter",
     "Pipeline velocity tracked through embedded outbound sourcing",
     "Time-to-fill reduction of 30-50% across roles",
     "Offer-to-join ratio above 90% via structured closing",
     "Hiring manager NPS above 60 within 90 days of pod live",
     "Quarterly flex on pod size to match hiring plan changes",
    ],
   }}
   industries={{
    title: "Industries where we run RPO",
    items: [
     { name: "BFSI", href: "/industries/bfsi-gcc" },
     { name: "Healthcare", href: "/industries/healthcare-gcc" },
     { name: "Technology", href: "/industries/technology-gcc" },
     { name: "Manufacturing", href: "/industries/manufacturing-gcc" },
     { name: "Retail", href: "/industries/retail-gcc" },
     { name: "Private Equity", href: "/industries/private-equity-gcc" },
    ],
   }}
   darkTitle="RPO engagement models"
   darkDescription="Flexible commercial models matched to your scale and timeline."
   darkPoints={[
    "End-to-end RPO - full ownership of permanent hiring across functions and locations",
    "Selective RPO - own a specific function (engineering, AI, sales) or skill family",
    "Project RPO - 3 to 12 month surge hiring for product launches, GCC ramp-up or M&A integration",
    "GCC RPO - dedicated pod for India GCC build-out, including leadership and tech hires",
    "Hybrid (RPO + perm) - blend embedded pod with retained search for senior roles",
    "Talent ops only - back-office recruiting operations without sourcing ownership",
   ]}
   faqs={[
    { q: "How does your RPO model work?", a: "Lean, senior-weighted pods that stand up in 30 days, quarterly flex on pod size, and AI and tech tooling built for India-based engineering, AI and product hiring." },
    { q: "Do you work in our ATS?", a: "Yes. We work inside whichever ATS you already run - any major commercial platform or an in-house tool - so all candidate data stays with you." },
    { q: "What is the minimum engagement?", a: "6 months for selective or project RPO, 12 months for end-to-end RPO, with quarterly pod-size flex." },
    { q: "How quickly can a pod start producing hires?", a: "Onboarding in 30 days. First placements typically in week 5 to 6 of pod going live." },
    { q: "What is the pricing model?", a: "A monthly capability fee for the pod (recruiters, sourcers, coordinators, pod lead), plus a smaller success component per hire, with transparent line-item billing. The fee moves with pod size, req volume and skill mix, so contact us for pricing - confirmed in the MSA." },
    { q: "Can the engagement scale up or down?", a: "Yes - pod size is reviewed quarterly and adjusted to your hiring plan with a 30-day notice." },
    { q: "Do you handle leadership hiring inside RPO?", a: "Strong individual contributor and people-manager hires - yes. CXO and board-level searches we run through our retained executive search practice as a separate workstream." },
   ]}
   relatedLinks={[
    { name: "Permanent Recruitment", href: "/recruitment/permanent" },
    { name: "Contract Staffing", href: "/recruitment/contract-staffing" },
    { name: "Executive Search", href: "/recruitment/executive-search" },
    { name: "GCC Setup & Launch", href: "/services/gcc/setup-launch" },
    { name: "AI Delivery Teams", href: "/services/ai-delivery-teams" },
   ]}
   ctaTitle="Considering RPO for your hiring plan?"
   ctaDescription="Share your hiring plan - we'll come back with a pod design, SLA framework and 90-day stand-up plan."
  />
 );
}