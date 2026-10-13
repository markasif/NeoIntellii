import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, ShieldCheck, Award, Scale } from "lucide-react";
import { AiGccPageLayout, Section, InBrief, CapabilityGrid, AnswerBlock, AiGovernanceLifecycleFlow, SplitValuePointOfView } from "@/components/ai-gcc";
import { AI_GCC_PAGE_BY_KEY } from "@/data/aiGcc";
import { aiGccBookingUrl } from "@/lib/aiGccCta";

const PAGE = AI_GCC_PAGE_BY_KEY.governance;

const FLOW = [
  { label: "Inventory", detail: "Every model, application and agent recorded with owner, purpose and data." },
  { label: "Classify", detail: "Use-case risk tier by impact, autonomy, data sensitivity and regulatory exposure." },
  { label: "Control", detail: "Policies and technical controls proportionate to the tier." },
  { label: "Approve", detail: "Documented sign-off with evidence, inside the delivery pipeline." },
  { label: "Monitor", detail: "Evaluation, drift, incidents and agent behaviour in production." },
  { label: "Evidence", detail: "Audit-ready records for boards, auditors and regulators." },
];

const CAPABILITIES = [
  { title: "AI system inventory", body: "A living register of models, LLM applications and agents: owner, purpose, data, third-party components and current status. Governance starts with knowing what exists." },
  { title: "Use-case risk classification", body: "A tiering method that weighs impact on people, degree of autonomy, data sensitivity and regulatory exposure, so controls are proportionate rather than uniform." },
  { title: "Policy and controls", body: "AI policy, control mapping and the technical controls that enforce them in the platform: access, evaluation gates, logging, human oversight and retention." },
  { title: "Model governance", body: "Documentation, validation, approval, monitoring and retirement for models, integrated with the MLOps lifecycle rather than run as a parallel review." },
  { title: "Agent governance", body: "Permissions, scope, tool allow-lists, tracing, kill switches and escalation rules for agents, with evidence of what each agent did and why." },
  { title: "Evaluation and red teaming", body: "Task, safety and robustness evaluation sets, adversarial testing for the risks that matter to the use case, and calibrated human review." },
  { title: "Third-party AI risk", body: "Assessment of foundation model providers, APIs and embedded AI in vendor software: terms, data handling, change notice and fallback." },
  { title: "AI incident management", body: "Definitions, detection, response, root cause and disclosure paths for AI incidents, connected to the enterprise's existing incident process." },
  { title: "Board and audit reporting", body: "Reporting that shows the portfolio, its risk profile, control status and open issues in the form boards, auditors and regulators expect." },
];

const FRAMEWORKS = [
  {
    title: "EU AI Act",
    body: "Alignment and readiness support for obligations that may apply to systems serving the EU, including risk classification and documentation.",
    icon: Globe,
    isTall: true,
  },
  {
    title: "India Digital Personal Data Protection Act, 2023",
    body: "Control mapping for personal data used in training, retrieval and inference, together with the applicable DPDP Rules.",
    icon: ShieldCheck,
    isTall: false,
  },
  {
    title: "ISO/IEC 42001",
    body: "AI management system structure where the client wants a certifiable governance framework.",
    icon: Award,
    isTall: false,
  },
  {
    title: "Applicable industry regulations",
    body: "Sector rules in financial services, healthcare and other regulated industries, mapped with the client's compliance function.",
    icon: Scale,
    isTall: true,
  },
];

const FAQ = [
  {
    question: "What is AI governance for a GCC?",
    answer: "The operating process that keeps AI systems and agents inventoried, risk-classified, controlled, approved, monitored and evidenced, so the GCC can ship quickly and answer for what it ships.",
  },
  {
    question: "Can governance slow delivery down?",
    answer: "It does when it runs as a separate review process. It does not when classification, controls and evidence are generated inside the delivery pipeline. That is the design principle on every engagement.",
  },
  {
    question: "Do you guarantee regulatory compliance?",
    answer: "No. NeoIntelli provides technology and governance advisory, control mapping and readiness support. Whether a system complies with a law is a determination for the client's legal and compliance advisers.",
  },
  {
    question: "How are agents governed differently from models?",
    answer: "Agents act, so governance covers permissions, tool scope, tracing of each step, human escalation and kill switches, in addition to the evaluation and documentation applied to models.",
  },
  {
    question: "Can NeoIntelli operate AI governance as a service?",
    answer: "Yes. Under Managed and Build-Operate-Transfer engagements NeoIntelli can run the inventory, classification, evaluation and reporting process and transfer it with the rest of the operating model.",
  },
];

export default function ResponsibleAI() {
  const [hoveredFramework, setHoveredFramework] = useState<number | null>(null);

  return (
    <AiGccPageLayout
      hero={{
        pageKey: "governance",
        eyebrow: "AI GCC in India · AI Governance & Responsible AI",
        title: "Govern AI systems and agents without slowing delivery.",
        description: "AI inventory, risk classification, policy and controls, model and agent governance, evaluation and red teaming, third-party AI risk, incident management and board-ready evidence, built into the way the GCC delivers.",
        primaryCta: { label: PAGE.ctaLabel, href: aiGccBookingUrl({ sourcePage: PAGE.path, serviceInterest: PAGE.serviceInterest, ctaName: PAGE.ctaLabel }) },
        secondaryCta: { label: "Back to AI GCC in India", href: AI_GCC_PAGE_BY_KEY.overview.path },
      }}
      cta={{
        title: "Assess the governance behind your AI portfolio.",
        description: "Share what is in production, what is planned and which regulations you operate under. We will map the inventory, risk tiers, controls and evidence the GCC needs, and where they fit in delivery.",
      }}
      related={[
        { page: "overview" },
        { page: "mlops" },
        { page: "genai" },
        { page: "advisory" },
      ]}
    >
      <InBrief>
        AI governance for a GCC is the operating process that keeps every model, LLM application and agent inventoried, risk-classified, controlled, approved, monitored and evidenced. NeoIntelli establishes the inventory, classification method, policies and technical controls, model and agent governance, evaluation and red teaming, third-party AI risk review, incident management and board and audit reporting, integrated with the GCC's MLOps, LLMOps and AgentOps layer so delivery speed and accountability rise together.
      </InBrief>

      <Section id="governance-flow" eyebrow="OPERATING PROCESS" title="Inventory, classify, control, approve, monitor, evidence." width="wide" align="center" lead="Six steps that run inside delivery. Each one produces a record the next one uses.">
        <AiGovernanceLifecycleFlow />
      </Section>

      <Section id="governance-capabilities" eyebrow="CAPABILITIES" title="What AI governance in the GCC covers." width="wide" align="center">
        <CapabilityGrid items={CAPABILITIES} />
      </Section>

      <Section id="regulatory-alignment" eyebrow="REGULATORY ALIGNMENT" title="Alignment, readiness and control mapping." width="wide" align="center" lead="Governance is designed to support the client's obligations. The terms used here are deliberate: alignment, readiness and control mapping, not certification or guaranteed compliance.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end gap-5 lg:gap-6 pt-2 sm:pt-4 overflow-hidden py-2">
          {FRAMEWORKS.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredFramework === idx;

            // Directional entrance: Card 0 from left, Card 3 from right, Cards 1 & 2 from down
            const initialMotion =
              idx === 0
                ? { opacity: 0, x: -80, y: 0 }
                : idx === 3
                ? { opacity: 0, x: 80, y: 0 }
                : { opacity: 0, x: 0, y: 55 };

            return (
              <motion.div
                key={item.title}
                initial={initialMotion}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.85,
                  delay: idx === 1 || idx === 2 ? 0.15 : 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredFramework(idx)}
                onMouseLeave={() => setHoveredFramework(null)}
                className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 transition-all duration-300 flex flex-col justify-center items-center text-center group cursor-pointer ${
                  item.isTall
                    ? "sm:p-8 lg:p-9 min-h-[380px] sm:min-h-[400px] lg:min-h-[420px]"
                    : "sm:p-7 min-h-[280px] sm:min-h-[300px]"
                } ${
                  isHovered
                    ? "border border-[#16427D]/60 -translate-y-1 shadow-md"
                    : "bg-white/95 backdrop-blur-sm border border-[#0D306C]/10 hover:-translate-y-1 hover:border-[#16427D]/60"
                }`}
              >
                {/* Subtle background circles default state */}
                <div
                  className={`absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-300 ${
                    isHovered ? "opacity-0" : "border border-[#0D306C]/5 opacity-100 group-hover:opacity-0"
                  }`}
                />
                <div
                  className={`absolute -bottom-14 -left-14 w-52 h-52 rounded-full pointer-events-none transition-opacity duration-300 ${
                    isHovered ? "opacity-0" : "border border-[#0D306C]/5 opacity-100 group-hover:opacity-0"
                  }`}
                />

                {/* Hover Navy Blue Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] transition-opacity duration-300 pointer-events-none z-0 ${
                    isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-white/10 pointer-events-none" />
                  <div className="absolute -bottom-14 -left-14 w-52 h-52 rounded-full border border-white/5 pointer-events-none" />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      item.isTall ? "mb-6 sm:mb-8" : "mb-4 sm:mb-5"
                    } ${
                      isHovered
                        ? "bg-white text-[#008EC4] border-2 border-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] scale-105"
                        : "bg-[#EDF3FB] border border-[#C5D7EE] text-[#008EC4] shadow-xs group-hover:bg-white group-hover:text-[#008EC4] group-hover:border-white group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] group-hover:scale-105"
                    }`}
                  >
                    <Icon className="w-7 h-7 text-[#008EC4] stroke-[2.2] transition-colors duration-300" />
                  </div>
                  <h3
                    style={{ color: isHovered ? "#ffffff" : undefined }}
                    className={`font-bold tracking-tight mb-2 sm:mb-3 transition-colors duration-300 ${
                      item.isTall ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                    } ${isHovered ? "!text-white" : "text-[#0D306C] group-hover:!text-white"}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{ color: isHovered ? "#ffffff" : undefined }}
                    className={`leading-relaxed font-normal transition-colors duration-300 ${
                      item.isTall ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                    } ${isHovered ? "!text-white" : "text-[#505D74] group-hover:!text-white"}`}
                  >
                    {item.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 max-w-3xl mx-auto text-center">
          <p className="text-[#505D74] text-xs sm:text-sm leading-relaxed">
            <strong className="text-[#0D244D] font-semibold">NeoIntelli provides technology and governance advisory.</strong>{" "}
            Regulatory and legal interpretations should be validated with the client&apos;s legal and compliance advisers.
          </p>
        </div>
      </Section>

      <Section id="governance-in-delivery" eyebrow="DESIGN PRINCIPLE" title="Governance is a property of the platform." width="wide" align="center">
        <SplitValuePointOfView
          description="Risk classification is captured when a use case is registered. Evaluation gates run in CI. Approvals are recorded with the evidence that justified them. Tracing and monitoring produce the operating record."
          pillsTitle="Governance Controls"
          pills={["Risk classification", "Evaluation gates", "Approval logs", "Tracing", "Monitoring", "Audit evidence"]}
          footer={
            <>
              The result is that <Link to={AI_GCC_PAGE_BY_KEY.mlops.path} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-2 transition-colors">{AI_GCC_PAGE_BY_KEY.mlops.name}</Link> and AI governance are two views of the same system, and board reports are generated automatically.
            </>
          }
          imageSrc="/images/ai-gcc/advisory/responsible-ai.webp"
          imageAlt="AI Governance Operating Model"
          ourViewText="A control that lives in a meeting is applied once. A control that lives in the pipeline is applied every release."
        />
      </Section>

      <Section id="governance-questions" eyebrow="BUYER QUESTIONS" title="Questions about AI governance in a GCC." width="narrow" align="center">
        <AnswerBlock items={FAQ} />
      </Section>
    </AiGccPageLayout>
  );
}
