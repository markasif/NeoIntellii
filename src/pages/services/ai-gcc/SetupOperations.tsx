import { Link } from "react-router-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  MapPin,
  UserCheck,
  Users,
  Building2,
  ShieldCheck,
  Cpu,
  Layers,
  Scale,
  Share2,
} from "lucide-react";
import { AiGccPageLayout, Section, InBrief, AnswerBlock, ResponsiveTable, SplitValuePointOfView } from "@/components/ai-gcc";
import CapabilityGrid from "@/components/gcc-operations/CapabilityGrid";
import { AI_GCC_CONTEXT_LINKS, AI_GCC_PAGE_BY_KEY } from "@/data/aiGcc";
import { aiGccBookingUrl } from "@/lib/aiGccCta";

const PAGE = AI_GCC_PAGE_BY_KEY.setup;

const WORKSTREAMS = [
  { title: "Mandate and operating model", body: "The written mandate, decision rights, delivery cadence and HQ interfaces from AI advisory become the operating charter the center runs on.", icon: FileText },
  { title: "Entity and location coordination", body: "Captive entity, EOR-first or managed launch, city selection and the sequencing of registrations, banking and statutory setup with your advisers.", icon: MapPin },
  { title: "Hiring OS + Recruitment Hub", body: "Role calibration, sourcing, NeoHireX screening and AI first-round interviews, senior technical validation, client interviews, offers and onboarding.", icon: UserCheck },
  { title: "HR, payroll and people operations", body: "Employment support, onboarding, payroll coordination, benefits, HR policy, engagement, learning, performance support and retention after the hire.", icon: Users },
  { title: "Workspace", body: "Managed or leased workspace sized to the squad, with growth options, access control and the physical security a regulated client expects.", icon: Building2 },
  { title: "IT and security", body: "Identity, endpoints, zero-trust baseline, connectivity to HQ, service tooling and the data-handling controls that follow your policies.", icon: ShieldCheck },
  { title: "Cloud and GPU", body: "Developer environments, cloud accounts, reserved or dedicated GPU where the workload justifies it, storage, networking and AI FinOps.", icon: Cpu },
  { title: "AI platform", body: "Data platform, model access, RAG and agent infrastructure, MLOps, LLMOps and AgentOps tooling shared across squads.", icon: Layers },
  { title: "Governance", body: "AI inventory, risk classification, controls, evaluation and audit evidence integrated into delivery rather than run beside it.", icon: Scale },
  { title: "BOT and captive transition", body: "Milestones, knowledge transfer, contract and asset handover planned from the start so the move to your entity is an event, not a project.", icon: Share2 },
];

const RESPONSIBILITY_ROWS: string[][] = [
  ["Product roadmap", "Advises on sequencing and feasibility; runs delivery cadence", "Owns priorities, scope and release decisions"],
  ["Hiring", "Runs the Hiring OS flow, screening, validation and offers", "Sets the bar, interviews, makes the final hiring decision"],
  ["HR", "Runs people operations, payroll coordination, benefits and engagement", "Sets policy, compensation philosophy and performance expectations"],
  ["Infrastructure", "Provisions and operates workspace, IT, cloud and GPU environments", "Approves architecture, security policy and spend"],
  ["AI architecture", "Proposes and implements platform, MLOps and AgentOps patterns", "Approves architecture and owns design decisions"],
  ["Data access", "Implements access controls and residency requirements", "Owns data, grants access, defines classification"],
  ["IP", "Assigns work product to the client under the engagement contract", "Owns product, models, prompts, data and work product"],
  ["Budget", "Provides open cost visibility and forecasts", "Approves budget and spend"],
  ["Governance", "Operates the AI governance process and evidence trail", "Owns policy, risk appetite and sign-off"],
  ["Transfer", "Executes BOT or captive transition against agreed milestones", "Decides timing and receives the team, processes and assets"],
];

const ROLES = [
  "AI Engineering Lead",
  "AI/ML Engineer",
  "GenAI Engineer",
  "Agentic AI Engineer",
  "Data Engineer",
  "MLOps / AI Platform Engineer",
  "Backend Engineer",
  "Product Owner",
  "AI Governance",
  "Domain SME",
];

const COMPUTE = ["Development", "Training", "Fine-tuning", "Inference", "Cloud", "Reserved GPU", "Dedicated GPU", "Storage", "Network", "Security", "AI FinOps"];

const FAQ = [
  {
    question: "How do you build an AI GCC in India?",
    answer: "Decide the mandate and ownership model, then run entity, workspace, IT, hiring and infrastructure as parallel workstreams. Leadership is hired first, the squad follows through the Hiring OS, and the AI platform is ready before the engineers arrive.",
    detail: ["The sequence is the same for a first squad of 8 and for a multi-capability center. The scale of each workstream changes; the dependencies do not."],
  },
  {
    question: "Can NeoIntelli operate the GCC for us?",
    answer: "Yes. Under the Managed GCC and Build-Operate-Transfer models NeoIntelli operates the environment around your team: hiring, people operations, workspace, IT, infrastructure operations and platform engineering as agreed, under your direction.",
  },
  {
    question: "Can we start without an India entity?",
    answer: "Yes. EOR-first and Managed launches let you hire before an Indian entity exists. Whether that is the right structure for you depends on your legal, tax and regulatory position, which your advisers confirm.",
  },
  {
    question: "Can the team transfer to our own entity later?",
    answer: "Yes. Transfer is designed in from day one with milestones and terms in the engagement contract, so the team, processes and agreed assets move to your entity when you decide.",
  },
  {
    question: "Who owns the IP?",
    answer: "Work product created for you is assigned to you under the engagement contract. Pre-existing NeoIntelli tooling such as NeoHireX is licensed for the engagement and stays NeoIntelli's.",
    detail: ["Contract terms should be reviewed by your counsel. NeoIntelli does not offer legal advice."],
  },
  {
    question: "How does the AI GCC integrate with the rest of the enterprise?",
    answer: "Through the operating model: shared product ownership with HQ, identity and connectivity into your environment, data access under your classification, and reporting in the metrics HQ already uses.",
  },
];

export default function SetupOperations() {
  return (
    <AiGccPageLayout
      hero={{
        pageKey: "setup",
        eyebrow: "AI GCC in India · Setup & Operations",
        title: "AI GCC setup and operations in India.",
        description: "One operating partner for the whole environment around your India AI team: mandate and operating model, entity and location coordination, Hiring OS and Recruitment Hub, HR and payroll, workspace, IT and security, cloud and GPU, AI platform, governance and the path from managed to captive.",
        primaryCta: { label: PAGE.ctaLabel, href: aiGccBookingUrl({ sourcePage: PAGE.path, serviceInterest: PAGE.serviceInterest, ctaName: PAGE.ctaLabel }) },
        secondaryCta: { label: "Start with an AI Micro GCC", href: AI_GCC_CONTEXT_LINKS.microGcc.path },
      }}
      cta={{
        title: "Plan the setup around the team, not the other way round.",
        description: "Share the mandate, the first roles and your position on entity and ownership. We will lay out the parallel workstreams and what each one needs from you.",
        secondary: { label: AI_GCC_CONTEXT_LINKS.costCalculator.anchor, href: AI_GCC_CONTEXT_LINKS.costCalculator.path },
      }}
      related={[
        { page: "overview" },
        { page: "infrastructure" },
        { context: "aiDataRecruitment" },
        { context: "technologyInfrastructure" },
        { context: "gccAsAService" },
      ]}
    >
      <InBrief>
        AI GCC setup and operations is the work of standing up and running the complete environment around an India AI team. NeoIntelli coordinates entity and location, runs hiring through the NeoHireX Hiring OS and Recruitment Hub, operates HR and payroll, provides workspace, IT and security, provisions cloud and GPU infrastructure, builds the shared AI platform, operates governance and plans the transition to your own entity. The client keeps control of product, architecture, data, budget and governance policy.
      </InBrief>

      <Section id="setup-workstreams" eyebrow="PARALLEL WORKSTREAMS" title="Ten workstreams. One accountable partner." width="wide" align="center" lead="These run in parallel from the decision point. The diagram below is the plan, not a marketing list: each workstream has an owner, a dependency and a definition of done.">
        <CapabilityGrid variant="workstreams" items={WORKSTREAMS} rowPattern={[4, 3, 3]} />
      </Section>

      <Section id="responsibility" eyebrow="RESPONSIBILITY MODEL" title="What NeoIntelli operates. What you control." width="wide" align="center" lead="The table is the short version of the engagement contract. Language is deliberately operational; legal terms live in the agreement.">
        <ResponsiveTable caption="Responsibility split between NeoIntelli and the client" headers={["Area", "NeoIntelli supports", "Client retains control"]} rows={RESPONSIBILITY_ROWS} />
      </Section>

      <Section id="team-topology" eyebrow="AI TEAM TOPOLOGY" title="Roles an AI GCC may need." width="wide" align="center" lead="Team composition depends on the mandate. A retrieval-heavy copilot, an agentic back-office workflow and a data platform build need different mixes. These are the roles most first squads draw from.">
        <SplitValuePointOfView
          description="Team topology in an AI GCC is defined by the mandate, not headcount. Specialist AI and Data roles are calibrated into balanced pods with clear decision rights, squad interfaces and release cadences aligned to HQ."
          pillsTitle="Core Pod Roles"
          pills={ROLES}
          footer={
            <>
              Hiring runs through the dedicated specialist desk on <Link to={AI_GCC_CONTEXT_LINKS.aiDataRecruitment.path} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-2 transition-colors">{AI_GCC_CONTEXT_LINKS.aiDataRecruitment.anchor}</Link> and <Link to={AI_GCC_CONTEXT_LINKS.talentAcquisition.path} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-2 transition-colors">{AI_GCC_CONTEXT_LINKS.talentAcquisition.anchor}</Link>.
            </>
          }
          imageSrc="/images/ai-gcc/advisory/talent-architecture.webp"
          imageAlt="AI Team Topology & Talent Architecture"
          ourViewText="A 10-person AI GCC should not copy the operating model of a 1,000-person GCC. It should be built around calibrated pods that own delivery."
        />
      </Section>

      <Section
        id="compute-in-gcc-design"
        eyebrow="AI INFRASTRUCTURE & GPU"
        title="Compute is part of the GCC design."
        theme="navy"
        width="wide"
        align="center"
        lead="An AI team without the right development, training and inference environment is a hiring cost with no output. Compute is scoped with the mandate, not after the engineers arrive."
        wavesOnMobile
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto text-left mt-6 sm:mt-8">
          {/* Left Side: Pill tags with white border */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {COMPUTE.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/85 bg-white/10 backdrop-blur-xs text-white text-xs sm:text-sm font-semibold hover:bg-white hover:text-[#0D306C] hover:border-white transition-all duration-200 shadow-xs select-none"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Right Side: Explanatory sentence & button */}
          <div className="flex flex-col justify-center gap-6">
            <p className="text-[#C5D7F0] text-sm sm:text-base lg:text-[16.5px] leading-relaxed font-normal">
              Development needs model and API access, vector infrastructure and experiment tracking on day one. Training and fine-tuning need GPU capacity planned against utilization, not against ambition. Inference needs autoscaling, model gateways, observability and cost controls before the first user arrives. Dedicated GPUs are not automatically cheaper than cloud GPUs; utilization determines the economics.
            </p>
            <div>
              <Link
                to={AI_GCC_PAGE_BY_KEY.infrastructure.path}
                className="btn-white"
              >
                <span>{AI_GCC_PAGE_BY_KEY.infrastructure.anchor}</span>
                <ArrowRight className="w-4 h-4 text-[#0D306C]" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section id="people-operations" eyebrow="PEOPLE & HR OPERATIONS" title="Recruitment ends at onboarding. Operations begin there." width="wide" align="center" lead="The post-hire lifecycle is what keeps a scarce AI engineer in the seat. NeoIntelli runs it as part of the operating model.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {[
            {
              title: "Employment and onboarding",
              body: "Employment support under the chosen model, structured onboarding, equipment, access and the first-90-day plan.",
              image: "/images/gcc-operations/gcc-ops-workplace.webp",
              imageAlt: "Employment support and structured onboarding operations",
            },
            {
              title: "Payroll, benefits and HR operations",
              body: "Payroll coordination, statutory benefits, HR policy and the day-to-day queries that otherwise land on your engineering lead.",
              image: "/images/gcc-operations/gcc-ops-performance.webp",
              imageAlt: "Payroll coordination and statutory HR operations",
            },
            {
              title: "Engagement, learning and retention",
              body: "Performance support, learning pathways, engagement measurement, retention planning and clean offboarding when it happens.",
              image: "/images/gcc-operations/gcc-real-bot-handover.webp",
              imageAlt: "Employee engagement, learning pathways, and retention planning",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#D2DCF0]/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden text-left hover:-translate-y-1.5"
            >
              {/* TOP WHITE CONTENT SECTION */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 bg-white">
                <h3 className="text-xl sm:text-2xl lg:text-[22px] font-extrabold text-[#0D306C] tracking-tight leading-[1.25] group-hover:text-[#169DC8] transition-colors mb-2.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13.5px] text-[#505D74] leading-relaxed font-normal">
                  {item.body}
                </p>
              </div>

              {/* BOTTOM MATCHING IMAGE CONTAINER */}
              <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden bg-[#081B3E] flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081B3E]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-[#505D74] text-sm mt-8 text-center">
          <Link to={AI_GCC_CONTEXT_LINKS.peopleOperations.path} className="text-[#169DC8] hover:text-[#0D306C] font-semibold underline underline-offset-2">{AI_GCC_CONTEXT_LINKS.peopleOperations.anchor}</Link> ·{" "}
          <Link to={AI_GCC_CONTEXT_LINKS.operationsExcellence.path} className="text-[#169DC8] hover:text-[#0D306C] font-semibold underline underline-offset-2">{AI_GCC_CONTEXT_LINKS.operationsExcellence.anchor}</Link> ·{" "}
          <Link to={AI_GCC_CONTEXT_LINKS.technologyInfrastructure.path} className="text-[#169DC8] hover:text-[#0D306C] font-semibold underline underline-offset-2">{AI_GCC_CONTEXT_LINKS.technologyInfrastructure.anchor}</Link>
        </p>
      </Section>

      <Section id="setup-questions" eyebrow="BUYER QUESTIONS" title="Questions about AI GCC setup in India." width="narrow" align="center">
        <AnswerBlock items={FAQ} />
      </Section>
    </AiGccPageLayout>
  );
}
