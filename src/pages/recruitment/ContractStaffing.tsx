import {
  Sliders,
  Compass,
  UserCheck,
  ClipboardCheck,
  Handshake,
  Clock,
  FileCheck2,
  TrendingUp,
  ArrowRightLeft,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import RecruitmentPageLayout from "@/components/recruitment/RecruitmentPageLayout";
import Section from "@/components/ui/Section";
import StatementSection from "@/components/shared/StatementSection";
import InteractiveNumberCards from "@/components/shared/InteractiveNumberCards";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import DeliverablesList from "@/components/ai-gcc/DeliverablesList";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import RecruitmentRealityCardGrid, {
  RECRUITMENT_INDUSTRIES,
} from "@/components/recruitment/RecruitmentRealityCardGrid";

const deliverables = [
  { title: "Niche & high-skill sourcing", desc: "AI, data, cloud, security, SAP, salesforce and product engineering contractors - sourced from our active and passive networks." },
  { title: "Payroll on our books", desc: "Candidates employed by NeoIntelli, paid on the 1st, with full payslips, Form 16 and exit settlements." },
  { title: "Full statutory compliance", desc: "PF, ESI, PT, LWF, gratuity, bonus and labour welfare - filed monthly with state-wise registrations." },
  { title: "Asset & access management", desc: "Laptop provisioning, software licensing, ID cards and access tooling - optional add-on." },
  { title: "Contract-to-hire conversion", desc: "Convert any contractor to permanent at any time with a transparent conversion fee structure." },
  { title: "Compliance dashboard", desc: "Real-time view of headcount, billing, statutory filings and contract end-dates by location." },
];

const approach = [
  {
    id: "01",
    title: "Role Intake",
    desc: "Skill brief, location, billing model (hourly/monthly), contract length and conversion intent captured in one form.",
    icon: Sliders,
    tag: "Intake Brief",
  },
  {
    id: "02",
    title: "Sourcing",
    desc: "AI-shortlisted candidates from our active pool plus targeted outreach - first profiles within 48 hours.",
    icon: Compass,
    tag: "48-Hour TAT",
  },
  {
    id: "03",
    title: "Screening",
    desc: "Recruiter screen, technical assessment and client interview coordinated through one window.",
    icon: UserCheck,
    tag: "Technical Screen",
  },
  {
    id: "04",
    title: "Onboarding",
    desc: "Offer rollout, BGV, asset issue, statutory registration and joining within 14 days of selection.",
    icon: ClipboardCheck,
    tag: "14-Day Onboarding",
  },
  {
    id: "05",
    title: "Run & Report",
    desc: "Monthly invoicing, compliance reporting, performance check-ins and conversion or extension management.",
    icon: Handshake,
    tag: "Compliance & Reporting",
  },
];

const commitments = [
  { title: "Full statutory compliance", desc: "PF, ESI, PT and LWF deposited in full with state-specific filings, and a digital audit trail you can inspect at any time." },
  { title: "A committed onboarding TAT", desc: "We commit to a 14-day onboarding turnaround and report our actual performance against it every month." },
  { title: "Line-item billing", desc: "Markup, statutory and reimbursable components billed as separate line items, so your finance team can audit every invoice." },
  { title: "Flexible conversion terms", desc: "Our MSA includes contract-to-hire conversion at a transparent, pre-agreed fee - no restrictive no-hire clauses." },
];

const successMetrics = [
  {
    text: "Median onboarding TAT under 14 days",
    icon: Clock,
  },
  {
    text: "100% statutory filings on or before due date",
    icon: FileCheck2,
  },
  {
    text: "Headcount, attrition and renewal trends by skill and city",
    icon: TrendingUp,
  },
  {
    text: "Conversion ratio of C2H roles to permanent",
    icon: ArrowRightLeft,
  },
  {
    text: "Issue resolution turnaround on payroll, leave and reimbursement queries",
    icon: Headphones,
  },
  {
    text: "Quarterly compliance audit summary with zero open items",
    icon: ShieldCheck,
  },
];



const faqs = [
  { q: "What does your contract staffing service include?", a: "Full statutory compliance on our own payroll, a 14-day onboarding SLA, AI-led sourcing for niche skills, transparent line-item billing, a digital compliance dashboard and a dedicated account team on every engagement." },
  { q: "Are contractors on your payroll?", a: "Yes. All contractors are employed by NeoIntelli with full statutory benefits - PF, ESI, PT, LWF, gratuity and bonus where applicable." },
  { q: "Can we convert a contractor to permanent?", a: "Yes - C2H conversion is supported at any point with a transparent, pre-agreed conversion fee structure." },
  { q: "How is contract staffing billed?", a: "A markup on cost-to-company, plus statutory contributions and agreed pass-throughs, billed as transparent line items. The markup moves with skill scarcity, contract length and headcount, so contact us for pricing - agreed in the MSA." },
  { q: "What is your minimum engagement?", a: "3 months minimum for contract roles, 6 months minimum for C2H. No minimum headcount commitment." },
  { q: "Do you cover PAN India?", a: "Yes. We are registered for PF, PT and LWF across all major states - Karnataka, Telangana, Maharashtra, Tamil Nadu, Delhi NCR, Gujarat, West Bengal and others on request." },
  { q: "How do you handle a contractor exit?", a: "Standard 30-day notice on both sides, full and final settlement within 30 days of last working day, Form 16 and relieving letter issued digitally." },
  { q: "Can you provide laptops and access tooling?", a: "Yes - asset provisioning is an optional add-on with pre-imaged laptops shipped to the contractor's location and managed remotely." },
];

const relatedLinks = [
  { name: "Permanent Recruitment", href: "/recruitment/permanent" },
  { name: "Executive Search", href: "/recruitment/executive-search" },
  { name: "RPO Services", href: "/recruitment/rpo" },
  { name: "AI Delivery Teams", href: "/services/ai-delivery-teams" },
  { name: "Dedicated AI Team", href: "/services/ai-delivery-teams/dedicated-ai-engineering-team" },
];

export default function ContractStaffing() {
  return (
    <RecruitmentPageLayout
      pageKey="contract-staffing"
      pageTitle="Contract Staffing India | C2H, Temp & Payroll | NeoIntelli"
      metaDescription="Contract staffing, contract-to-hire (C2H) and temporary staffing across India. Compliant payroll on our books, full PF, ESI, PT and LWF management, MSA-backed engagements."
      hero={{
        eyebrow: "Recruitment · Contract Staffing",
        title: "Contract Staffing & C2H in India",
        description:
          "Compliant contract, contract-to-hire and temporary staffing - candidates on our payroll, full statutory compliance, MSA-backed engagements and pan-India coverage.",
        trustStrip: [
          "14 days median onboarding TAT",
          "100% statutory compliance",
          "6 cities pan-India payroll",
          "C2H - convert anytime",
        ],
      }}
      cta={{
        title: "Need contract talent in 14 days?",
        description:
          "Share your skill brief - we'll send shortlisted profiles within 48 hours with a compliance-ready onboarding plan.",
        secondary: { label: "See Permanent Recruitment", href: "/recruitment/permanent" },
      }}
      related={relatedLinks}
    >
      {/* 1. Statement */}
      <StatementSection eyebrow="Overview">
        {`Contract staffing done right means zero compliance risk and zero ramp friction. We take payroll, statutory filings, asset and access management off your plate so your delivery managers focus on outcomes - not invoices and PF challans.`}
      </StatementSection>

      {/* 2. Why it matters */}
      <Section
        id="why-it-matters"
        eyebrow="Why it matters"
        title="Why specialist contract staffing matters"
        width="regular"
        align="center"
      >
        <div className="space-y-6 text-[#505D74] text-sm sm:text-base leading-relaxed max-w-4xl mx-auto text-left">
          <p>
            Contract staffing at scale turns on three things: how quickly someone can actually start, whether the shortlist matches a genuinely niche skill, and whether statutory filings are visible and current. We build the service around those three.
          </p>
          <p>
            NeoIntelli runs contract staffing as a tech-led service - AI-screened pipelines for niche skills, a 14-day onboarding SLA, a digital compliance dashboard and a single point of contact for every account.
          </p>
        </div>
      </Section>

      {/* 3. Deliverables */}
      <Section
        id="deliverables"
        eyebrow="Deliverables"
        title="What we deliver"
        width="wide"
        align="center"
      >
        <CapabilitiesSection
          columns={3}
          items={deliverables.map((d) => ({ title: d.title, desc: d.desc }))}
        />
      </Section>

      {/* 4. Approach */}
      <Section
        id="approach"
        eyebrow="Process"
        title="How we onboard a contract role"
        width="wide"
        align="center"
      >
        <UniversalLifecycle steps={approach} theme="light" tagStyle="status" />
      </Section>

      {/* 5. Commitments */}
      <Section
        id="commitments"
        eyebrow="Commitments"
        title="What we commit to on every contract engagement"
        width="wide"
        align="center"
      >
        <InteractiveNumberCards
          columns={4}
          items={commitments.map((c) => ({ title: c.title, desc: c.desc }))}
        />
      </Section>

      {/* 6. Success metrics */}
      <Section
        id="success-metrics"
        eyebrow="Reporting"
        title="Success metrics we report on monthly"
        width="regular"
        align="center"
      >
        <DeliverablesList items={successMetrics} iconBadge="hexagon" />
      </Section>

      {/* 7. Industries */}
      <Section
        id="industries"
        eyebrow="Industries"
        title="Industries we staff for"
        width="wide"
        align="center"
      >
        <RecruitmentRealityCardGrid items={RECRUITMENT_INDUSTRIES} />
      </Section>

      {/* 8. FAQs */}
      <Section
        id="faqs"
        eyebrow="Clarifications"
        title="Frequently asked questions"
        width="regular"
        align="center"
      >
        <AnswerBlock items={faqs.map((f) => ({ question: f.q, answer: f.a }))} level={3} />
      </Section>
    </RecruitmentPageLayout>
  );
}
