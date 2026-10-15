import {
  Sliders,
  Compass,
  UserCheck,
  ClipboardCheck,
  Handshake,
  Clock,
  CircleDollarSign,
  Zap,
  TrendingUp,
  Award,
} from "lucide-react";
import RecruitmentPageLayout from "@/components/recruitment/RecruitmentPageLayout";
import Section from "@/components/ui/Section";
import StatementSection from "@/components/shared/StatementSection";
import InteractiveNumberCards from "@/components/shared/InteractiveNumberCards";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import DeliverablesList from "@/components/ai-gcc/DeliverablesList";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import IndustryChallengesGrid from "@/components/shared/IndustryChallengesGrid";
import RecruitmentRealityCardGrid, {
  RECRUITMENT_INDUSTRIES,
} from "@/components/recruitment/RecruitmentRealityCardGrid";

const deliverables = [
  { title: "Embedded recruiter pod", desc: "Senior recruiters, sourcers, coordinators and a pod lead - sized to your req volume and skill mix." },
  { title: "ATS & tech stack integration", desc: "We work inside your existing ATS - commercial or in-house - so all data stays with you." },
  { title: "Sourcing operations", desc: "Outbound research, AI-screened pipelines, candidate experience scripts and offer-management playbooks." },
  { title: "Hiring manager enablement", desc: "Intake templates, scorecards, interviewer training and feedback rituals to drive consistent decisions." },
  { title: "Employer branding support", desc: "Careers page copy, employer-review and professional-network presence, campaign launch and content calendar." },
  { title: "Weekly metrics rituals", desc: "Time-to-fill, pipeline coverage, source-of-hire, offer-to-join, cost-per-hire - reviewed in a weekly business review." },
];

const approach = [
  {
    id: "01",
    title: "Discovery",
    desc: "Hiring plan, current state, ATS, tech stack, success metrics and pod sizing locked in 2 weeks.",
    icon: Sliders,
    tag: "2-Week Plan",
  },
  {
    id: "02",
    title: "Design",
    desc: "Pod composition, operating model, SLAs, weekly rituals, comp benchmarks and KPI dashboard agreed.",
    icon: Compass,
    tag: "Pod Composition",
  },
  {
    id: "03",
    title: "Onboard",
    desc: "Recruiters trained on your stack and roles, hiring managers re-briefed, tooling and access provisioned.",
    icon: UserCheck,
    tag: "Tooling & Training",
  },
  {
    id: "04",
    title: "Run",
    desc: "Pod produces hires from week 5. Weekly business review, monthly steering committee, quarterly capability deep-dive.",
    icon: ClipboardCheck,
    tag: "Hires from Wk 5",
  },
  {
    id: "05",
    title: "Scale / Transfer",
    desc: "Flex pod up or down with demand. Optional knowledge transfer to your in-house team at the end of the engagement.",
    icon: Handshake,
    tag: "Flex & Transfer",
  },
];

const structure = [
  { title: "Priced on capability", desc: "We price on pod capability plus a smaller success component, so hard-to-fill roles get the same attention as easy ones." },
  { title: "Hiring-manager rituals included", desc: "Intake templates, scorecards, interviewer training and feedback rituals are part of the engagement - we rebuild the workflow, not just staff it." },
  { title: "Live pipeline reporting", desc: "You get live dashboards on pipeline, time-to-fill, source-of-hire and offer-to-join, reviewed together every week." },
  { title: "Quarterly flex built in", desc: "Our engagements carry quarterly flex on pod size, so you can ramp the team up or down as your roadmap changes." },
];

const successMetrics = [
  {
    text: "Cost-per-hire tracked and reported against your own baseline each quarter",
    icon: CircleDollarSign,
  },
  {
    text: "Pipeline velocity tracked through embedded outbound sourcing",
    icon: Zap,
  },
  {
    text: "Time-to-fill reduction of 30-50% across roles",
    icon: Clock,
  },
  {
    text: "Offer-to-join ratio above 90% via structured closing",
    icon: TrendingUp,
  },
  {
    text: "Hiring manager NPS above 60 within 90 days of pod live",
    icon: Award,
  },
  {
    text: "Quarterly flex on pod size to match hiring plan changes",
    icon: Sliders,
  },
];



const engagementModels = [
  "End-to-end RPO - full ownership of permanent hiring across functions and locations",
  "Selective RPO - own a specific function (engineering, AI, sales) or skill family",
  "Project RPO - 3 to 12 month surge hiring for product launches, GCC ramp-up or M&A integration",
  "GCC RPO - dedicated pod for India GCC build-out, including leadership and tech hires",
  "Hybrid (RPO + perm) - blend embedded pod with retained search for senior roles",
  "Talent ops only - back-office recruiting operations without sourcing ownership",
];

const faqs = [
  { q: "How does your RPO model work?", a: "Lean, senior-weighted pods that stand up in 30 days, quarterly flex on pod size, and AI and tech tooling built for India-based engineering, AI and product hiring." },
  { q: "Do you work in our ATS?", a: "Yes. We work inside whichever ATS you already run - any major commercial platform or an in-house tool - so all candidate data stays with you." },
  { q: "What is the minimum engagement?", a: "6 months for selective or project RPO, 12 months for end-to-end RPO, with quarterly pod-size flex." },
  { q: "How quickly can a pod start producing hires?", a: "Onboarding in 30 days. First placements typically in week 5 to 6 of pod going live." },
  { q: "What is the pricing model?", a: "A monthly capability fee for the pod (recruiters, sourcers, coordinators, pod lead), plus a smaller success component per hire, with transparent line-item billing. The fee moves with pod size, req volume and skill mix, so contact us for pricing - confirmed in the MSA." },
  { q: "Can the engagement scale up or down?", a: "Yes - pod size is reviewed quarterly and adjusted to your hiring plan with a 30-day notice." },
  { q: "Do you handle leadership hiring inside RPO?", a: "Strong individual contributor and people-manager hires - yes. CXO and board-level searches we run through our retained executive search practice as a separate workstream." },
];

const relatedLinks = [
  { name: "Permanent Recruitment", href: "/recruitment/permanent" },
  { name: "Contract Staffing", href: "/recruitment/contract-staffing" },
  { name: "Executive Search", href: "/recruitment/executive-search" },
  { name: "GCC Setup & Launch", href: "/services/gcc/setup-launch" },
  { name: "AI Delivery Teams", href: "/services/ai-delivery-teams" },
];

export default function Rpo() {
  return (
    <RecruitmentPageLayout
      pageKey="rpo"
      pageTitle="RPO Services India | Recruitment Process Outsourcing | NeoIntelli"
      metaDescription="End-to-end and project-based RPO (Recruitment Process Outsourcing) services in India. Embedded recruiters, talent operations, employer branding and scalable hiring pods."
      hero={{
        eyebrow: "Recruitment · RPO",
        title: "Recruitment Process Outsourcing (RPO) in India",
        description:
          "Embedded recruiter pods, talent operations and managed hiring programmes that scale with your roadmap - end-to-end or project-based.",
        trustStrip: [
          "Embedded recruiters in your workflow",
          "Weekly metrics and business review",
          "End-to-end or project-based",
          "30-day pod stand-up",
        ],
      }}
      cta={{
        title: "Considering RPO for your hiring plan?",
        description:
          "Share your hiring plan - we'll come back with a pod design, SLA framework and 90-day stand-up plan.",
        secondary: { label: "See Permanent Recruitment", href: "/recruitment/permanent" },
      }}
      related={relatedLinks}
    >
      <StatementSection eyebrow="Overview">
        {`RPO works when it is run like a product team - not a vendor desk. We embed senior recruiters, talent ops, sourcers and coordinators into your hiring workflow, run weekly metrics rituals and own the outcome - cost, quality and time-to-hire.`}
      </StatementSection>

      <Section id="why-it-matters" eyebrow="Why it matters" title="When RPO is the right model" width="regular" align="center">
        <div className="space-y-6 text-[#505D74] text-sm sm:text-base leading-relaxed max-w-6xl mx-auto text-left">
          <p>
            When hiring volume is high, skills are scarce, or you need to scale and de-scale quickly, in-house TA capacity is usually the constraint. RPO gives you embedded recruiters who behave like your team but flex with demand.
          </p>
          <p>
            NeoIntelli runs lean, senior-weighted pods with strong digital tooling. Onboarding takes 30 days, and a pod typically produces its first placements in week 5 to 6.
          </p>
        </div>
      </Section>

      <Section id="deliverables" eyebrow="Deliverables" title="What an RPO pod delivers" width="wide" align="center">
        <CapabilitiesSection columns={3} items={deliverables.map((d) => ({ title: d.title, desc: d.desc }))} />
      </Section>

      <Section id="approach" eyebrow="Process" title="How we stand up an RPO engagement" width="wide" align="center">
        <UniversalLifecycle steps={approach} theme="light" tagStyle="status" />
      </Section>

      <Section id="structure" eyebrow="Engagement design" title="How we structure an RPO engagement" width="wide" align="center">
        <InteractiveNumberCards columns={4} items={structure.map((s) => ({ title: s.title, desc: s.desc }))} />
      </Section>

      <Section id="success-metrics" eyebrow="Reporting" title="Outcomes you can expect" width="regular" align="center">
        <DeliverablesList items={successMetrics} iconBadge="hexagon" />
      </Section>

      <Section id="industries" eyebrow="Industries" title="Industries where we run RPO" width="wide" align="center">
        <RecruitmentRealityCardGrid items={RECRUITMENT_INDUSTRIES} />
      </Section>

      <Section
        id="models"
        eyebrow="Models"
        title="RPO engagement models"
        theme="navy"
        width="wide"
        align="center"
        wavesOnMobile
      >
        <IndustryChallengesGrid items={engagementModels} />
      </Section>

      <Section id="faqs" eyebrow="Clarifications" title="Frequently asked questions" width="regular" align="center">
        <AnswerBlock items={faqs.map((f) => ({ question: f.q, answer: f.a }))} level={3} />
      </Section>
    </RecruitmentPageLayout>
  );
}
