import SubServicePage from "@/components/shared/SubServicePage";

export default function ContractStaffing() {
 return (
  <SubServicePage
   pageTitle="Contract Staffing India | C2H, Temp & Payroll | NeoIntelli"
   metaDescription="Contract staffing, contract-to-hire (C2H) and temporary staffing across India. Compliant payroll on our books, full PF, ESI, PT and LWF management, MSA-backed engagements."
   subtitle="Recruitment - Contract Staffing"
   title="Contract Staffing & C2H in India"
   description="Compliant contract, contract-to-hire and temporary staffing - candidates on our payroll, full statutory compliance, MSA-backed engagements and pan-India coverage."
   breadcrumbs={[
    { name: "Home", href: "/" },
    { name: "Capabilities", href: "/services/ai-engineering" },
    { name: "Recruitment", href: "/recruitment" },
    { name: "Contract Staffing" },
   ]}
   intro="Contract staffing done right means zero compliance risk and zero ramp friction."
   introMuted=" We take payroll, statutory filings, asset and access management off your plate so your delivery managers focus on outcomes - not invoices and PF challans."
   metricsBand={[
    { value: "14 days", label: "Median onboarding TAT" },
    { value: "100%", label: "Statutory compliance" },
    { value: "6 cities", label: "Pan-India payroll" },
    { value: "C2H", label: "Convert anytime" },
   ]}
   whyItMatters={{
    title: "Why specialist contract staffing matters",
    paragraphs: [
     "Contract staffing at scale turns on three things: how quickly someone can actually start, whether the shortlist matches a genuinely niche skill, and whether statutory filings are visible and current. We build the service around those three.",
     "NeoIntelli runs contract staffing as a tech-led service - AI-screened pipelines for niche skills, a 14-day onboarding SLA, a digital compliance dashboard and a single point of contact for every account.",
    ],
   }}
   deliverablesTitle="What we deliver"
   deliverables={[
    { title: "Niche & high-skill sourcing", desc: "AI, data, cloud, security, SAP, salesforce and product engineering contractors - sourced from our active and passive networks." },
    { title: "Payroll on our books", desc: "Candidates employed by NeoIntelli, paid on the 1st, with full payslips, Form 16 and exit settlements." },
    { title: "Full statutory compliance", desc: "PF, ESI, PT, LWF, gratuity, bonus and labour welfare - filed monthly with state-wise registrations." },
    { title: "Asset & access management", desc: "Laptop provisioning, software licensing, ID cards and access tooling - optional add-on." },
    { title: "Contract-to-hire conversion", desc: "Convert any contractor to permanent at any time with a transparent conversion fee structure." },
    { title: "Compliance dashboard", desc: "Real-time view of headcount, billing, statutory filings and contract end-dates by location." },
   ]}
   approachTitle="How we onboard a contract role"
   approach={[
    { step: "01", title: "Role intake", desc: "Skill brief, location, billing model (hourly/monthly), contract length and conversion intent captured in one form." },
    { step: "02", title: "Sourcing", desc: "AI-shortlisted candidates from our active pool plus targeted outreach - first profiles within 48 hours." },
    { step: "03", title: "Screening", desc: "Recruiter screen, technical assessment and client interview coordinated through one window." },
    { step: "04", title: "Onboarding", desc: "Offer rollout, BGV, asset issue, statutory registration and joining within 14 days of selection." },
    { step: "05", title: "Run & report", desc: "Monthly invoicing, compliance reporting, performance check-ins and conversion or extension management." },
   ]}
   pitfalls={{
    title: "What we commit to on every contract engagement",
    items: [
     { title: "Full statutory compliance", desc: "PF, ESI, PT and LWF deposited in full with state-specific filings, and a digital audit trail you can inspect at any time." },
     { title: "A committed onboarding TAT", desc: "We commit to a 14-day onboarding turnaround and report our actual performance against it every month." },
     { title: "Line-item billing", desc: "Markup, statutory and reimbursable components billed as separate line items, so your finance team can audit every invoice." },
     { title: "Flexible conversion terms", desc: "Our MSA includes contract-to-hire conversion at a transparent, pre-agreed fee - no restrictive no-hire clauses." },
    ],
   }}
   successMetrics={{
    title: "Success metrics we report on monthly",
    items: [
     "Median onboarding TAT under 14 days",
     "100% statutory filings on or before due date",
     "Headcount, attrition and renewal trends by skill and city",
     "Conversion ratio of C2H roles to permanent",
     "Issue resolution turnaround on payroll, leave and reimbursement queries",
     "Quarterly compliance audit summary with zero open items",
    ],
   }}
   industries={{
    title: "Industries we staff for",
    items: [
     { name: "BFSI", href: "/industries/bfsi-gcc" },
     { name: "Healthcare", href: "/industries/healthcare-gcc" },
     { name: "Technology", href: "/industries/technology-gcc" },
     { name: "Manufacturing", href: "/industries/manufacturing-gcc" },
     { name: "Retail", href: "/industries/retail-gcc" },
     { name: "Private Equity", href: "/industries/private-equity-gcc" },
    ],
   }}
   faqs={[
    { q: "What does your contract staffing service include?", a: "Full statutory compliance on our own payroll, a 14-day onboarding SLA, AI-led sourcing for niche skills, transparent line-item billing, a digital compliance dashboard and a dedicated account team on every engagement." },
    { q: "Are contractors on your payroll?", a: "Yes. All contractors are employed by NeoIntelli with full statutory benefits - PF, ESI, PT, LWF, gratuity and bonus where applicable." },
    { q: "Can we convert a contractor to permanent?", a: "Yes - C2H conversion is supported at any point with a transparent, pre-agreed conversion fee structure." },
    { q: "How is contract staffing billed?", a: "A markup on cost-to-company, plus statutory contributions and agreed pass-throughs, billed as transparent line items. The markup moves with skill scarcity, contract length and headcount, so contact us for pricing - agreed in the MSA." },
    { q: "What is your minimum engagement?", a: "3 months minimum for contract roles, 6 months minimum for C2H. No minimum headcount commitment." },
    { q: "Do you cover PAN India?", a: "Yes. We are registered for PF, PT and LWF across all major states - Karnataka, Telangana, Maharashtra, Tamil Nadu, Delhi NCR, Gujarat, West Bengal and others on request." },
    { q: "How do you handle a contractor exit?", a: "Standard 30-day notice on both sides, full and final settlement within 30 days of last working day, Form 16 and relieving letter issued digitally." },
    { q: "Can you provide laptops and access tooling?", a: "Yes - asset provisioning is an optional add-on with pre-imaged laptops shipped to the contractor's location and managed remotely." },
   ]}
   relatedLinks={[
    { name: "Permanent Recruitment", href: "/recruitment/permanent" },
    { name: "Executive Search", href: "/recruitment/executive-search" },
    { name: "RPO Services", href: "/recruitment/rpo" },
    { name: "AI Delivery Teams", href: "/services/ai-delivery-teams" },
    { name: "Dedicated AI Team", href: "/services/ai-delivery-teams/dedicated-ai-engineering-team" },
   ]}
   ctaTitle="Need contract talent in 14 days?"
   ctaDescription="Share your skill brief - we'll send shortlisted profiles within 48 hours with a compliance-ready onboarding plan."
  />
 );
}