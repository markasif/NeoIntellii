import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Section, InBrief, AnswerBlock, SplitValuePointOfView } from "@/components/ai-gcc";
import OutcomeCardGrid from "@/components/shared/OutcomeCardGrid";
import { AiTalentPageLayout, ExecutiveSearchFlow } from "@/components/ai-talent";
import { AI_TALENT_CONTEXT_LINKS } from "@/data/aiTalent";

const ROLES = [
  "Chief AI Officer",
  "Chief Data & AI Officer",
  "VP AI",
  "VP Data",
  "Head of AI",
  "Head of ML",
  "Head of GenAI",
  "AI Engineering Director",
  "AI Platform Director",
  "AI Architect / Distinguished Architect",
  "GCC AI Head",
];

const SEARCH_FLOW = [
  { label: "Mandate definition", detail: "What the leader must own: outcomes, teams, platform, governance, budget, and how success is measured in year one." },
  { label: "Market map", detail: "Named mapping across AI-native companies, GCCs, product companies and research-led organizations, not database matching." },
  { label: "Confidential outreach", detail: "Senior-led conversations with leaders who are not applying anywhere." },
  { label: "Structured assessment", detail: "Leadership, technical judgment and operating track record assessed against the mandate." },
  { label: "Practitioner validation", detail: "NeoIntelli's AI leadership tests technical depth and the ability to define what a team should own." },
  { label: "Shortlist with evidence", detail: "Assessment context, references approach and risks, not a list of names." },
  { label: "Client interviews and decision", detail: "You run the final rounds and decide. NeoIntelli supports offer construction and transition." },
];

interface LeadershipOwnershipItem {
  title: string;
  body: string;
  image: string;
  alt: string;
  action: string;
  href: string;
}

const WHAT_A_HEAD_OF_AI_OWNS: LeadershipOwnershipItem[] = [
  {
    title: "The mandate",
    body: "Which workflows, products and decisions AI will change, ranked by business value, and which it will not.",
    image: "/images/gcc-operations/operating-reality/13-mandates.jpg",
    alt: "The mandate in executive AI leadership",
    action: "Explore Mandate Brief",
    href: "#roles",
  },
  {
    title: "The team",
    body: "Topology, hiring sequence, seniority bar and the evaluation standard every engineer is held to.",
    image: "/images/gcc-operations/workforce-strategy-planning.jpg",
    alt: "AI team topology and hiring sequence",
    action: "See Search Process",
    href: "#search-process",
  },
  {
    title: "The platform",
    body: "Data, models, retrieval, agents, compute posture and the MLOps, LLMOps and AgentOps layer.",
    image: "/images/ai-talent/mlops-platform.jpg",
    alt: "AI platform architecture and operations",
    action: "Review Platform Stance",
    href: "#search-process",
  },
  {
    title: "Governance",
    body: "AI inventory, risk classification, controls and the evidence boards and regulators will ask for.",
    image: "/images/gcc-operations/standards/evidence-audit.jpg",
    alt: "AI governance and compliance controls",
    action: "Examine AI Governance",
    href: "#leadership-questions",
  },
  {
    title: "Value",
    body: "Metrics HQ already reads: cost, cycle time, quality, revenue, risk, adoption. Not model count.",
    image: "/images/gcc-operations/operating-reality/08-reporting.jpg",
    alt: "Executive AI business value metrics",
    action: "Calibrate Value Metrics",
    href: "#roles",
  },
  {
    title: "Relationships",
    body: "Product, security, finance, legal and HQ leadership. The role fails on this axis more often than on the technical one.",
    image: "/images/gcc-operations/operating-reality/11-leadership.jpg",
    alt: "Executive stakeholder and leadership relationships",
    action: "Discuss Leadership Search",
    href: "#cta",
  },
];

const FAQ = [
  { question: "What does a Head of AI need to own?", answer: "The mandate, the team, the platform, governance, value measurement and the relationships with product, security, finance and HQ. A Head of AI who owns only the models is a senior engineer with a bigger title.", detail: ["The search brief defines each of these before outreach starts, so candidates are assessed against the actual job."] },
  { question: "Why hire the leader before the engineers?", answer: "Because the leader defines what the engineers should own. Twenty AI engineers hired against a vague mandate produce twenty pilots. One leader who sets the mandate, the topology and the evaluation bar makes every subsequent hire cheaper and more likely to succeed." },
  { question: "Chief AI Officer vs Head of AI vs AI Engineering Director?", answer: "A Chief AI Officer sets enterprise AI strategy, governance and investment across functions. A Head of AI owns AI outcomes for a business unit, product or GCC and the team delivering them. An AI Engineering Director runs the engineering organization and its delivery, usually under one of the first two." },
  { question: "How is AI leadership search different from technical recruitment?", answer: "Confidential, senior-led outreach to people who are not applying anywhere, assessment against a written mandate, practitioner validation of technical judgment, and support through offer and transition. The validation flow is adapted for the seniority; the standard of evidence is the same." },
  { question: "Can you find a GCC AI head for a new India center?", answer: `Yes. The mandate work overlaps with ${AI_TALENT_CONTEXT_LINKS.aiGccAdvisory.name}, so the search brief and the GCC design are built together rather than in sequence.` },
];

export default function AILeadershipSearch() {
  return (
    <AiTalentPageLayout
      pageKey="leadership"
      hero={{
        eyebrow: "AI Talent · AI Leadership & Executive Search",
        title: "AI Leadership & Executive Search in India",
        description: "Chief AI Officer, Head of AI, VP AI and Data, AI engineering and platform directors, distinguished architects and GCC AI heads. Before you recruit twenty AI engineers, make sure you have the leader capable of defining what those twenty people should own.",
        secondaryCta: { label: "What a Head of AI owns", href: "#what-a-head-of-ai-owns" },
        trustStrip: [
          "Confidential Senior-Led Outreach",
          "Written Mandate & Calibration Before Search",
          "Technical Judgment Validated by AI Leadership",
          "India AI Executive Talent",
        ],
      }}
      cta={{
        title: "Discuss an AI leadership search.",
        description: "Tell us the mandate you have in mind and the organization the leader will inherit. We will write the brief with you, map the market and show you how the assessment works before outreach starts.",
        secondary: { label: AI_TALENT_CONTEXT_LINKS.aiGccAdvisory.anchor, href: AI_TALENT_CONTEXT_LINKS.aiGccAdvisory.path },
      }}
      related={[{ page: "overview" }, { page: "aiml" }, { page: "hub" }, { context: "aiGccAdvisory" }, { context: "aiGcc" }]}
    >
      <InBrief>
        AI leadership and executive search at NeoIntelli covers Chief AI Officer, Chief Data & AI Officer, VP AI, VP Data, Head of AI, ML and GenAI, AI engineering and platform directors, distinguished AI architects and GCC AI heads in India. Searches are senior-led and confidential, run against a written mandate, and validated by NeoIntelli's own AI leadership on technical judgment and the ability to define what a team should own. You run the final interviews and make the decision.
      </InBrief>

      <Section
        id="roles"
        eyebrow="ROLES"
        title="Executive AI leadership positions we map and recruit."
        width="wide"
        align="center"
        lead="Executive search for leadership roles capable of defining mandates, architecting platforms, and steering India-based delivery."
      >
        <SplitValuePointOfView
          description="Executive AI searches are senior-led and confidential. We map and validate candidates against the written mandate on technical judgment, organizational governance, and team ownership."
          pillsTitle="Executive Leadership Roles"
          pills={ROLES}
          imageSrc="/images/ai-talent/ai-leadership.jpg"
          imageAlt="Executive AI Leadership & Advisory"
          ourViewText="Before you recruit twenty AI engineers, make sure you have the leader capable of defining what those twenty people should own."
        />
      </Section>

      <Section
        id="what-a-head-of-ai-owns"
        eyebrow="Answer first"
        title="What does a Head of AI need to own?"
        tone="muted"
        width="wide"
        align="center"
        lead="Six things. A candidate who can speak to fewer than five of them from experience is a senior engineer, not yet a Head of AI."
      >
        <OutcomeCardGrid
          items={WHAT_A_HEAD_OF_AI_OWNS.map((item, idx) => ({
            title: item.title,
            number: `0${idx + 1}.`,
            aspect: idx % 2 === 0 ? "aspect-[16/10]" : "aspect-[16/7]",
            image: item.image,
            alt: item.alt,
            summary: item.body,
            cta: { label: item.action, href: item.href },
          }))}
          columns={3}
          titleSize="md"
          maxWidthClassName="max-w-7xl mx-auto"
          ctaButtonVariant="gradient"
          ctaAfterContent
        />
      </Section>

      <Section id="search-process" eyebrow="HOW THE SEARCH RUNS" title="Mandate first. Market map second. Names last." width="wide" align="center">
        <ExecutiveSearchFlow steps={SEARCH_FLOW} />
        <div className="mt-4 text-[#2B3D66] text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider font-mono text-[#0e92b8] mb-2 justify-center">
            <Sparkles className="w-4 h-4" />
            <span>Integrated AI GCC Advisory Alignment</span>
          </div>
          <p className="text-body text-xs sm:text-sm leading-relaxed text-[#415A77] max-w-3xl mx-auto">
            For a new India center the mandate work is shared with{" "}
            <Link to={AI_TALENT_CONTEXT_LINKS.aiGccAdvisory.path} className="font-semibold text-[#077fa4] hover:underline">
              {AI_TALENT_CONTEXT_LINKS.aiGccAdvisory.name}
            </Link>
            , so the leader is hired against the GCC design rather than before it exists.
          </p>
        </div>
      </Section>

      <Section id="leadership-questions" eyebrow="Buyer questions" title="Questions about AI executive search in India." width="narrow">
        <AnswerBlock items={FAQ} />
      </Section>
    </AiTalentPageLayout>
  );
}
