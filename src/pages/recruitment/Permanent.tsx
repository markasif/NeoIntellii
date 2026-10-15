import { Link } from "react-router-dom";
import RecruitmentPageLayout from "@/components/recruitment/RecruitmentPageLayout";
import Section from "@/components/ui/Section";
import StatementSection from "@/components/shared/StatementSection";
import {
  Target,
  Layers,
  Lock,
  CheckCircle2,
  BadgeCheck,
  Clock,
  Sliders,
  Compass,
  UserCheck,
  ClipboardCheck,
  Handshake,
  CalendarCheck,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Code2,
  Database,
  ClipboardList,
  Network,
  Calculator,
} from "lucide-react";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import InteractiveNumberCards from "@/components/shared/InteractiveNumberCards";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import DeliverablesList from "@/components/ai-gcc/DeliverablesList";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import RecruitmentRealityCardGrid, {
  RECRUITMENT_INDUSTRIES,
} from "@/components/recruitment/RecruitmentRealityCardGrid";

const deliverables = [
  {
    title: "Mandate kickoff & calibration",
    desc: "Role brief, scorecard, target company list, comp band and interview panel locked in week one.",
    icon: Target,
  },
  {
    title: "Market mapping",
    desc: "Named long-list across competitor and adjacent companies with current title, tenure and reachability.",
    icon: Layers,
  },
  {
    title: "Confidential outreach",
    desc: "Recruiter-led outbound across professional networks, referrals and our private network - no public job ads unless you want them.",
    icon: Lock,
  },
  {
    title: "Structured assessment",
    desc: "Technical screens, case studies and behavioural interviews mapped to your scorecard.",
    icon: CheckCircle2,
  },
  {
    title: "Offer management & closing",
    desc: "Comp benchmarking, counter-offer handling, reference checks and joining support.",
    icon: BadgeCheck,
  },
  {
    title: "Post-join check-ins",
    desc: "30-60-90 day check-ins with candidate and hiring manager, plus 90-day replacement guarantee.",
    icon: Clock,
  },
];

const approach = [
  {
    id: "01",
    title: "Calibrate",
    desc: "Detailed intake with the hiring manager, scorecard, must-haves vs nice-to-haves, comp band and target companies.",
    icon: Sliders,
    tag: "Scorecard Intake",
  },
  {
    id: "02",
    title: "Map",
    desc: "Build a named long-list of 80-150 candidates across competitor and adjacent firms in your priority cities.",
    icon: Compass,
    tag: "80-150 Market Map",
  },
  {
    id: "03",
    title: "Engage",
    desc: "Confidential outreach, qualifying conversations and recruiter-led screening to a shortlist of 4 to 6.",
    icon: UserCheck,
    tag: "Direct Outreach",
  },
  {
    id: "04",
    title: "Assess & Present",
    desc: "Structured assessment, written shortlist with rationale, and panel interview coordination.",
    icon: ClipboardCheck,
    tag: "Calibrated Shortlist",
  },
  {
    id: "05",
    title: "Close & Onboard",
    desc: "Comp negotiation, reference checks, offer rollout, BGV coordination and joining follow-through.",
    icon: Handshake,
    tag: "90-Day Guarantee",
  },
];

const pitfalls = [
  { title: "Over-reliance on inbound applications", desc: "Many of the strongest candidates for a senior role are not actively applying. Without outbound mapping, you only see the ones who are." },
  { title: "Unclear scorecards", desc: "Roles defined as JDs - not scorecards - lead to inconsistent interview signal and weak hiring decisions." },
  { title: "Slow loops", desc: "Interview cycles longer than 3 weeks lose top candidates to faster competitors, especially in tech and AI." },
  { title: "Comp benchmarking from old data", desc: "India comp bands have shifted sharply in AI, data and product engineering - using 12-month-old benchmarks costs you offers." },
];

const successMetrics = [
  {
    text: "Calibrated shortlist within 7-10 business days of mandate signoff",
    icon: CalendarCheck,
  },
  {
    text: "Median time-to-offer of 21 days for mid-to-senior roles",
    icon: Clock,
  },
  {
    text: "Offer-to-join ratio above 90% via structured closing",
    icon: TrendingUp,
  },
  {
    text: "First-year retention above 85% on hires we place",
    icon: UserCheck,
  },
  {
    text: "Transparent weekly tracker with pipeline metrics and feedback loops",
    icon: BarChart3,
  },
  {
    text: "90-day replacement guarantee on every permanent hire",
    icon: ShieldCheck,
  },
];



const roleCoverage = [
  { icon: Code2, text: "Software engineers (backend, frontend, full-stack, mobile, platform)" },
  { icon: Database, text: "Data engineers, ML engineers, AI/GenAI engineers, MLOps and data scientists" },
  { icon: ClipboardList, text: "Product managers, design leads, technical program managers" },
  { icon: Network, text: "Architects (enterprise, solution, cloud, data, security)" },
  { icon: Calculator, text: "Finance, accounting, FP&A, internal audit and risk" },
  { icon: TrendingUp, text: "Sales, business development, customer success and revenue operations" },
];

const faqs = [
  { q: "How does your permanent recruitment process work?", a: "We run mandate-led searches with one recruiter per 5-7 active roles, named market mapping and structured assessment against your scorecard - a research-led model rather than a transactional one." },
  { q: "Do you charge a retainer or contingent fee?", a: "Both. Most mid-level roles are contingent, with the fee payable on joining and charged as a percentage of first-year CTC. Senior and confidential mandates are typically retained, across a three-stage milestone structure. Rates depend on role seniority, volume and search difficulty, so contact us for pricing - agreed in the MSA." },
  { q: "What is your replacement guarantee?", a: "90 days from join date. If the hire leaves voluntarily or is let go for performance, we replace at no additional fee." },
  { q: "Which cities do you cover?", a: "Bangalore, Hyderabad, Mumbai, Delhi NCR (Gurgaon and Noida), Pune and Chennai - covering 95% of India's enterprise hiring demand." },
  { q: "Can you handle confidential or backfill mandates?", a: "Yes. Many of our senior searches are confidential where we engage candidates without naming the client until shortlist stage." },
  { q: "How fast can you start?", a: "Mandate kickoff within 48 hours of signoff. First calibrated shortlist within 7-10 business days." },
];

const relatedLinks = [
  { name: "Contract Staffing", href: "/recruitment/contract-staffing" },
  { name: "Executive Search", href: "/recruitment/executive-search" },
  { name: "RPO Services", href: "/recruitment/rpo" },
  { name: "GCC Workforce Strategy", href: "/services/gcc-operations/workforce-strategy" },
  { name: "AI Delivery Teams", href: "/services/ai-delivery-teams" },
];

export default function Permanent() {
  return (
    <RecruitmentPageLayout
      pageKey="permanent"
      pageTitle="Permanent IT Hiring India | Tech & GCC | NeoIntelli"
      metaDescription="Permanent recruitment and direct hire services across India for engineering, AI, product, finance, sales and leadership roles. Mid-to-senior lateral hiring on guaranteed SLAs."
      hero={{
        eyebrow: "Recruitment · Permanent Hiring",
        title: "Permanent Recruitment & Direct Hire in India",
        description:
          "Mid-to-senior lateral hiring across engineering, AI, product, finance, sales and operations - sourced through a research-led process and backed by replacement guarantees.",
        trustStrip: [
          "21 days median time-to-offer",
          "92% offer-to-join ratio",
          "90-day replacement guarantee",
          "6 cities pan-India coverage",
        ],
      }}
      cta={{
        title: "Have an open mandate?",
        description:
          "Share the role brief - we'll come back with a market map and shortlist plan in 48 hours.",
        secondary: { label: "See Contract Staffing", href: "/recruitment/contract-staffing" },
      }}
      related={relatedLinks}
    >
      <StatementSection eyebrow="Overview">
        {`Permanent hiring decides how your team performs for the next 3 to 5 years. We run a research-led mandate process - market mapping, structured interviewing and reference-driven shortlists - so every offer rolled out has a high chance of closing and staying.`}
      </StatementSection>

      <Section id="why-it-matters" eyebrow="Why it matters" title="Why permanent hiring needs a specialist partner" width="regular" align="center">
        <div className="space-y-6 text-[#505D74] text-sm sm:text-base leading-relaxed max-w-6xl mx-auto text-left">
          <p>
            Mid-to-senior mandates need a specific motion: deep market mapping, confidential outreach, structured assessment and a tight closing process. That is what we build every permanent search around.
          </p>
          <p>
            NeoIntelli runs permanent mandates as dedicated research-led searches. Each role gets a mapped market, a named target list and a recruiter who owns it end-to-end, so you see calibrated shortlists in days.
          </p>
        </div>
      </Section>

      <Section id="deliverables" eyebrow="Deliverables" title="What we deliver on every mandate" width="wide" align="center">
        <CapabilitiesSection columns={3} items={deliverables} />
      </Section>

      <Section id="approach" eyebrow="Process" title="Our 5-step search process" width="wide" align="center">
        <UniversalLifecycle steps={approach} theme="light" tagStyle="status" />
      </Section>

      <Section id="pitfalls" eyebrow="What to avoid" title="Common permanent-hiring mistakes we help you avoid" width="wide" align="center">
        <InteractiveNumberCards columns={4} items={pitfalls.map((p) => ({ title: p.title, desc: p.desc }))} />
      </Section>

      <Section id="success-metrics" eyebrow="Reporting" title="What success looks like" width="regular" align="center">
        <DeliverablesList items={successMetrics} iconBadge="hexagon" />
      </Section>

      <Section id="industries" eyebrow="Industries" title="Industries we hire for" width="wide" align="center">
        <RecruitmentRealityCardGrid items={RECRUITMENT_INDUSTRIES} />
      </Section>

      <Section
        id="roles"
        eyebrow="Coverage"
        title="Roles we close for India enterprises"
        width="regular"
        align="center"
      >
        <DeliverablesList items={roleCoverage} iconBadge="hexagon" />
      </Section>

      <Section id="faqs" eyebrow="Clarifications" title="Frequently asked questions" width="regular" align="center">
        <AnswerBlock items={faqs.map((f) => ({ question: f.q, answer: f.a }))} level={3} />
      </Section>
    </RecruitmentPageLayout>
  );
}
