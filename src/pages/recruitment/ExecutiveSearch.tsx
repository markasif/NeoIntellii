import {
  Sliders,
  Compass,
  Lock,
  ClipboardCheck,
  UserCheck,
  Handshake,
  Users,
  Clock,
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
import IndustryChallengesGrid from "@/components/shared/IndustryChallengesGrid";
import RecruitmentRealityCardGrid, {
  RECRUITMENT_INDUSTRIES,
} from "@/components/recruitment/RecruitmentRealityCardGrid";

const deliverables = [
  { title: "Mandate brief & success profile", desc: "Co-created role specification, success profile, scorecard and target company map - signed off in week one." },
  { title: "Mapped-market research", desc: "Comprehensive long-list of 80-120 leaders across target companies, with current title, tenure, comp band and reachability." },
  { title: "Confidential approach", desc: "Senior-consultant-led outreach with a calibrated narrative - no client name in market until shortlist stage." },
  { title: "Structured assessment", desc: "Behavioural interviews, leadership psychometrics and case-based deep-dives aligned to the success profile." },
  { title: "360-degree referencing", desc: "Multi-level references across managers, peers and reports - on the record and back-channel." },
  { title: "Offer & onboarding support", desc: "Comp benchmarking, counter-offer management, joining narrative and 90-day onboarding check-ins." },
];

const approach = [
  {
    id: "01",
    title: "Define",
    desc: "Detailed brief with the chair, CEO or hiring sponsor - role context, success profile, scorecard, target companies and timeline.",
    icon: Sliders,
    tag: "CXO Brief",
  },
  {
    id: "02",
    title: "Research",
    desc: "Mapped market across target and adjacent companies - long-list of 80-120 leaders with full profiling.",
    icon: Compass,
    tag: "80-120 Leaders",
  },
  {
    id: "03",
    title: "Approach",
    desc: "Calibrated outreach by senior consultants, qualifying conversations and confidential narrative.",
    icon: Lock,
    tag: "Confidential Reach",
  },
  {
    id: "04",
    title: "Assess",
    desc: "Structured behavioural interviews, psychometrics, case discussions and on-the-record references.",
    icon: ClipboardCheck,
    tag: "360° Assessment",
  },
  {
    id: "05",
    title: "Present",
    desc: "Written shortlist of 3 to 5 with full assessment, references and comp positioning - panel interviews coordinated.",
    icon: UserCheck,
    tag: "Dossier of 3-5",
  },
  {
    id: "06",
    title: "Close",
    desc: "Offer negotiation, counter-offer management, joining support and 90-day onboarding check-ins.",
    icon: Handshake,
    tag: "12-Month Guarantee",
  },
];

const pitfalls = [
  { title: "Hiring on resume, not scorecard", desc: "Leadership impact is contextual. A CTO who scaled a 200-person team may struggle at 20 - and vice versa. We assess against your context, not their last title." },
  { title: "Skipping back-channel references", desc: "On-the-record references are curated. The decisive signal comes from back-channel references via the consultant's own network." },
  { title: "Comp without total-rewards view", desc: "Cash, ESOP, joining bonus, retention pool and exit clauses all decide whether a leader joins and stays. We benchmark the full package." },
  { title: "Underestimating counter-offers", desc: "Counter-offers often surface in the final week of a process. Without a structured closing plan, strong candidates are lost at the buzzer." },
];

const successMetrics = [
  {
    text: "Mapped market and long-list within 14 days of mandate signoff",
    icon: Compass,
  },
  {
    text: "Calibrated shortlist of 3 to 5 within 30 days",
    icon: Users,
  },
  {
    text: "Median search closure under 45 days",
    icon: Clock,
  },
  {
    text: "100% confidentiality maintained through shortlist stage",
    icon: Lock,
  },
  {
    text: "12-month replacement guarantee on every retained search",
    icon: ShieldCheck,
  },
  {
    text: "Quarterly check-ins with the hired leader for the first year",
    icon: UserCheck,
  },
];



const rolesSearched = [
  "Board roles - independent directors, audit committee chairs, nomination committee",
  "C-suite - CEO, COO, CFO, CTO, CIO, CHRO, CMO, CDO, CISO",
  "Country and business heads - India MD, country GM, P&L leaders",
  "GCC heads - centre heads, COE leaders, GCC CTO and CHRO",
  "Function heads - Head of Engineering, Head of Product, Head of AI/Data",
  "Private equity portfolio CXOs and value-creation leadership",
];

const faqs = [
  { q: "How does your retained search process work?", a: "Every mandate is led by a senior consultant and runs through mapped-market research, confidential approach, structured assessment and 360-degree referencing. Our median closure is 45 days, fees are retained across three milestones, and every search carries a 12-month replacement guarantee." },
  { q: "What is the fee model?", a: "Retained, with a three-stage milestone structure (engagement, shortlist, joining), charged as a percentage of first-year total compensation. Rates move with mandate complexity, confidentiality and market scarcity, so contact us for pricing - quoted in full, with no hidden costs, before the search begins." },
  { q: "What is your replacement guarantee?", a: "12 months from join date. If the leader leaves voluntarily or is exited for performance, we re-execute the search at no additional fee." },
  { q: "Can you run confidential searches?", a: "Yes - 100% of our retained searches maintain confidentiality through shortlist stage. Client name is shared only with consented shortlisted candidates." },
  { q: "Do you handle India and global mandates?", a: "We focus on India-based roles - including India MD, GCC head and India-based CXO roles for global parent companies." },
  { q: "How long does a typical search take?", a: "30 days to shortlist, 45 days median to signed offer. Complex or highly confidential searches may extend to 60-90 days." },
];

const relatedLinks = [
  { name: "Permanent Recruitment", href: "/recruitment/permanent" },
  { name: "Contract Staffing", href: "/recruitment/contract-staffing" },
  { name: "RPO Services", href: "/recruitment/rpo" },
  { name: "GCC Workforce Strategy", href: "/services/gcc-operations/workforce-strategy" },
];

export default function ExecutiveSearch() {
  return (
    <RecruitmentPageLayout
      pageKey="executive-search"
      pageTitle="Executive Search Firms India | CXO & Leadership Hiring | NeoIntelli"
      metaDescription="Retained executive search for CXO, board and leadership hiring across India. Research-led, confidential mandates with mapped-market shortlists and structured assessment."
      hero={{
        eyebrow: "Recruitment · Executive Search",
        title: "Executive Search & Leadership Hiring in India",
        description:
          "Retained search for CXO, country head, function head and board-level roles - mapped-market research, confidential outreach and structured assessment.",
        trustStrip: [
          "45 days median search closure",
          "100% confidential mandates",
          "12-month replacement guarantee",
          "CXO+ board & C-suite",
        ],
      }}
      cta={{
        title: "Considering a leadership search?",
        description:
          "Speak to a senior consultant - confidentially - about your mandate, success profile and shortlist plan.",
        secondary: { label: "See Permanent Recruitment", href: "/recruitment/permanent" },
      }}
      related={relatedLinks}
    >
      <StatementSection eyebrow="Overview">
        {`A leadership hire is the most expensive decision your organisation makes. We treat it like one - with mapped-market research, structured assessment, deep referencing and a confidential process that protects both client and candidate.`}
      </StatementSection>

      <Section id="why-it-matters" eyebrow="Why it matters" title="Why retained executive search" width="regular" align="center">
        <div className="space-y-6 text-[#505D74] text-sm sm:text-base leading-relaxed max-w-6xl mx-auto text-left">
          <p>
            Leadership roles - CEO, COO, CTO, CFO, country head, business head, function head - are rarely filled through job board postings alone. Top candidates are passive, well-compensated and only move for the right narrative.
          </p>
          <p>
            NeoIntelli's executive search practice runs every mandate as a dedicated retained search led by a senior consultant, with mapped-market research, structured assessment and 360-degree referencing on every search.
          </p>
        </div>
      </Section>

      <Section id="deliverables" eyebrow="Deliverables" title="What we deliver on a retained search" width="wide" align="center">
        <CapabilitiesSection columns={3} items={deliverables.map((d) => ({ title: d.title, desc: d.desc }))} />
      </Section>

      <Section id="approach" eyebrow="Process" title="Our retained search process" width="wide" align="center">
        <UniversalLifecycle steps={approach} theme="light" tagStyle="status" />
      </Section>

      <Section id="pitfalls" eyebrow="What to avoid" title="Leadership-hiring traps to avoid" width="wide" align="center">
        <InteractiveNumberCards columns={4} items={pitfalls.map((p) => ({ title: p.title, desc: p.desc }))} />
      </Section>

      <Section id="success-metrics" eyebrow="Reporting" title="What success looks like" width="regular" align="center">
        <DeliverablesList items={successMetrics} iconBadge="hexagon" />
      </Section>

      <Section id="industries" eyebrow="Sectors" title="Sectors we search for" width="wide" align="center">
        <RecruitmentRealityCardGrid items={RECRUITMENT_INDUSTRIES} />
      </Section>

      <Section
        id="roles"
        eyebrow="Coverage"
        title="Roles we search for"
        theme="navy"
        width="wide"
        align="center"
        wavesOnMobile
      >
        <IndustryChallengesGrid items={rolesSearched} />
      </Section>

      <Section id="faqs" eyebrow="Clarifications" title="Frequently asked questions" width="regular" align="center">
        <AnswerBlock items={faqs.map((f) => ({ question: f.q, answer: f.a }))} level={3} />
      </Section>
    </RecruitmentPageLayout>
  );
}
