import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Bot, Cpu, Database, Award, Layers, GraduationCap, Users } from "lucide-react";
import { Section, InBrief, AnswerBlock, ResponsiveTable, SplitValuePointOfView } from "@/components/ai-gcc";
import { AiTalentPageLayout, HiringPathCards, ValidationRoadmap, SpecialistHiringMosaic, talentBookingUrl } from "@/components/ai-talent";
import { AI_TALENT_CONTEXT_LINKS, AI_TALENT_PAGES, AI_TALENT_PAGE_BY_KEY } from "@/data/aiTalent";

const P = AI_TALENT_PAGE_BY_KEY;

const PATHS = [
  { title: "One critical hire", tagline: "Hard-to-find specialist.", body: "A single GenAI, agentic AI, ML, data or platform role where a wrong hire costs a quarter. Full validation flow, one shortlist.", cta: { label: "Discuss a specialist hire", href: talentBookingUrl("overview", "Discuss a specialist hire") } },
  { title: "Build an AI team", tagline: "Multiple complementary roles.", body: "The first AI squad: lead, engineers, data and platform roles calibrated against the architecture they will build, hired in the right sequence.", cta: { label: "Plan an AI team", href: talentBookingUrl("overview", "Plan an AI team") } },
  { title: "Run an AI Recruitment Hub", tagline: "Dedicated recruiting capacity powered by NeoHireX.", body: "A recruitment POD, NeoHireX Hiring OS and practitioner validation for 10 to 100+ technical hires.", cta: { label: P.hub.anchor, href: P.hub.path } },
  { title: "Build an AI GCC", tagline: "Recruitment expands into the complete India operating model.", body: "When one hire becomes ten, the engagement becomes an AI Micro GCC: people operations, workspace, IT, infrastructure and governance around the team.", cta: { label: AI_TALENT_CONTEXT_LINKS.microGcc.anchor, href: AI_TALENT_CONTEXT_LINKS.microGcc.path }, highlight: true },
];

const NEOHIREX_DOES = [
  "Role-calibrated candidate screening",
  "Automated technical profile calibration",
  "AI first-round video interviews",
  "Dynamic competency ranking",
  "Pipeline velocity management",
  "Deep audit trail & evaluation context",
];

const BRIDGE_STAGES = [
  {
    stage: "STAGE 01",
    title: "AI Talent",
    desc: "Hire technically validated specialists, one at a time or as a team.",
    image: "/images/solution_ai_talent.jpg",
    imageAlt: "AI Talent Technical Assessment and Validation",
    items: [
      "Role-calibrated specialist sourcing",
      "NeoHireX screening & AI first-round",
      "Practitioner technical validation",
      "Full evaluation evidence pack",
    ],
  },
  {
    stage: "STAGE 02",
    title: "AI Micro GCC",
    desc: "Turn the first team into a dedicated India capability with people operations, workspace, IT and infrastructure.",
    image: "/images/solution_micro_gcc.jpg",
    imageAlt: "AI Micro GCC Dedicated Delivery Pod",
    items: [
      "Dedicated 5-to-30 person AI squad",
      "Local HR & people operations",
      "Zero-trust IT, hardware & workspaces",
      "Clear pathway to client captive entity",
    ],
  },
  {
    stage: "STAGE 03",
    title: "AI GCC",
    desc: "Scale into a capability center with AI engineering, AgentOps, governance and a path to ownership.",
    image: "/images/mosaic_ai_gcc.jpg",
    imageAlt: "Enterprise AI Global Capability Center",
    items: [
      "Autonomous enterprise AI delivery",
      "Production MLOps, LLMOps & AgentOps",
      "AI governance, risk & security",
      "Full BOT transfer or captive model",
    ],
  },
];

const ENGAGEMENT_ROWS: string[][] = [
  ["Permanent AI hiring", "A specialist role or a team hired directly into your organization or GCC.", "Most AI, ML, data, platform and leadership roles."],
  ["Contract and contract-to-hire", "Specialist capability for a defined project or period, with conversion to permanent where wanted.", "Evaluation builds, fixed-scope AI projects, capacity while a permanent search runs."],
  ["AI Recruitment Hub", "A dedicated recruitment POD on NeoHireX with technical validation built in.", "10 to 100+ technical hires over a year."],
  ["AI Micro GCC", "Hiring plus the operating model around the team, with a path to your own entity.", "A first India AI squad you intend to keep and grow."],
];

const FAQ = [
  { question: "What does an AI recruitment agency do?", answer: "It finds, evaluates and helps you hire people who build and operate AI systems: GenAI and agentic AI engineers, ML engineers, data engineers and scientists, MLOps and AI platform engineers and AI leaders. NeoIntelli adds practitioner-led technical validation so the shortlist carries evidence, not just resumes." },
  { question: "How do you identify candidates who have actually shipped production AI?", answer: "By asking about ownership rather than exposure: what they built, which part they owned, whether it left the prototype stage, how it was evaluated, deployed, monitored and paid for. Practicing engineers run that conversation, and NeoHireX records the evidence with the shortlist.", detail: ["Framework names on a resume are a starting point, not proof. Each specialist page lists the resume signals that mislead for its roles."] },
  { question: "What should an AI team hire first?", answer: "Usually the person who can define what the team owns: an AI engineering lead or Head of AI. Then the engineers closest to the first use case, then data and platform roles as the workload demands.", detail: [`${P.leadership.name} covers the leadership hire. ${AI_TALENT_CONTEXT_LINKS.aiGcc.name} covers the operating environment around the team.`] },
  { question: "What does an AI GCC's first team look like?", answer: "Commonly an AI engineering lead, two to four AI or GenAI engineers, a data engineer and an MLOps or platform engineer, with product ownership from HQ. Composition depends on the mandate.", detail: [`See ${AI_TALENT_CONTEXT_LINKS.aiGccSetup.name} for the team topology and the operating model around it.`] },
  { question: "Should we hire AI talent or reskill existing engineers?", answer: "Both, deliberately. Hire for the roles that need proven production AI ownership now, and convert adjacent engineers you already trust for the roles where domain knowledge and codebase familiarity matter more than AI tenure.", detail: [`${P.academy.name} runs the conversion with the same technical validation used for external hires.`] },
  { question: "Permanent AI hiring vs contract AI talent?", answer: "Permanent for roles that own a system over time. Contract or contract-to-hire for fixed-scope work, evaluation builds or capacity while a permanent search runs. Both use the same validation flow." },
  { question: "Does NeoHireX make the hiring decision?", answer: "No. NeoHireX screens, ranks, runs first-round AI interviews and keeps the evaluation record. Practicing engineers validate. Your team runs the final interviews and decides." },
  { question: "Is NeoHireX a separate purchase?", answer: "For applicable NeoIntelli recruitment engagements it is included in the service, so you do not need a separate ATS subscription to run the NeoIntelli workflow. Where your own ATS must remain the system of record, the workflow is agreed during discovery." },
];

const SPECIALIST_ICONS: Record<string, React.ElementType> = {
  aiml: Users,
  genai: Bot,
  data: Database,
  mlops: Cpu,
  leadership: Award,
  hub: Layers,
  academy: GraduationCap,
};

export default function AITalentOverview() {
  return (
    <AiTalentPageLayout
      pageKey="overview"
      hero={{
        eyebrow: "AI Talent · India",
        title: "AI, ML & Data Talent Services in India",
        description: "Build the AI team your product or GCC actually needs. NeoIntelli recruits and technically validates GenAI, Agentic AI, ML, Data, MLOps and AI Platform talent using NeoHireX plus practitioner-led assessment. From one specialist hire to a complete AI team.",
        secondaryCta: { label: "See How We Validate AI Talent", href: "#how-we-validate" },
        trustStrip: [
          "Senior Practitioner Technical Review",
          "NeoHireX AI Hiring OS Included",
          "From 1 Specialist to 100+ Pod",
          "Zero Resume Inflation Guarantee",
        ],
      }}
      cta={{
        title: "Hire the people. Then build the environment around them.",
        description: "Tell us the roles, the architecture they will work on and your timeline. We will come back with a calibrated hiring plan and what the validation flow looks like for each role.",
        secondary: { label: AI_TALENT_CONTEXT_LINKS.microGcc.anchor, href: AI_TALENT_CONTEXT_LINKS.microGcc.path },
      }}
      related={[{ page: "genai" }, { page: "mlops" }, { page: "hub" }, { context: "microGcc" }, { context: "aiGcc" }]}
    >
      <InBrief>
        NeoIntelli's AI Talent services recruit and technically validate AI, ML, GenAI, agentic AI, data, MLOps, AI platform and AI leadership talent in India. Specialist recruiters source; the NeoHireX Hiring OS screens, ranks and runs first-round AI interviews; practicing AI and data engineers validate technical depth and production ownership. You receive a qualified shortlist with evaluation context and make the hiring decision. When one hire becomes a team, the engagement can grow into an AI Micro GCC or AI GCC.
      </InBrief>

      <Section
        id="ways-to-engage"
        eyebrow="Four ways to engage"
        title="From one critical hire to an AI capability center."
        width="wide"
        align="center"
        lead="The validation flow is the same at every scale. What changes is how much of the operating environment NeoIntelli runs around the people."
      >
        <HiringPathCards paths={PATHS} buttonVariant="white-to-cyan" />
      </Section>

      <Section id="how-we-validate" eyebrow="We interview. You hire." title="Eight steps between a role and a decision." width="wide" lead="This flow is the architecture behind every specialist page. Every candidate on a NeoIntelli shortlist has been through it.">
        <ValidationRoadmap />
      </Section>

      <Section id="specialist-hiring" width="wide">
        <SpecialistHiringMosaic
          eyebrow="Specialist hiring"
          title="One page per role family, because the evaluation differs."
          lead="A GenAI engineer, an MLOps engineer and a data scientist are assessed on different evidence. Each page explains what the role owns, the production signals we look for, the resume signals that mislead and how we evaluate."
        />
      </Section>

      <Section id="neohirex" eyebrow="NEOHIREX HIRING OS" title="Powered by our own Hiring OS. Validated by AI practitioners." width="wide" align="center" lead="AI-powered recruitment is a claim anyone can make. What matters is what the platform does, what it records and what it is not allowed to decide.">
        <SplitValuePointOfView
          description="Screening, ranking and first-round interviews narrow the pool and record evidence. Practicing engineers validate. Your team decides."
          pillsTitle="What NeoHireX does"
          pills={NEOHIREX_DOES}
          footer={
            <>
              NeoHireX is NeoIntelli&apos;s proprietary AI hiring platform, included in applicable recruitment engagements.{" "}
              <a href={AI_TALENT_CONTEXT_LINKS.neohirex.path} target="_blank" rel="noopener noreferrer" className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-2 transition-colors">
                {AI_TALENT_CONTEXT_LINKS.neohirex.anchor}
              </a>{" "}
              or{" "}
              <Link to={AI_TALENT_CONTEXT_LINKS.neohirexDemo.path} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-2 transition-colors">
                {AI_TALENT_CONTEXT_LINKS.neohirexDemo.anchor}
              </Link>.
            </>
          }
          imageSrc="/images/ai-talent/neohirex-hiring-os.jpg"
          imageAlt="NeoHireX AI Hiring OS Workflow"
          ourViewText="AI talent is scarce. Poor screening makes that scarcity even more expensive. A larger database does not fix a weak evaluation."
        />
      </Section>

      <Section id="engagement-models" eyebrow="Engagement models" title="Permanent, contract, hub or GCC." tone="muted" width="wide">
        <ResponsiveTable caption="AI talent engagement models" headers={["Model", "What it is", "Fits when"]} rows={ENGAGEMENT_ROWS} />
        <p className="text-body text-sm mt-6 text-center max-w-5xl mx-auto">
          Contract and contract-to-hire engagements run through <Link to={AI_TALENT_CONTEXT_LINKS.contractStaffing.path} className="text-[#077fa4] font-semibold hover:underline">{AI_TALENT_CONTEXT_LINKS.contractStaffing.name}</Link>. Post-hire people operations for a GCC are covered under <Link to={AI_TALENT_CONTEXT_LINKS.peopleOperations.path} className="text-[#077fa4] font-semibold hover:underline">{AI_TALENT_CONTEXT_LINKS.peopleOperations.name}</Link>.
        </p>
      </Section>

      <Section
        id="talent-to-gcc"
        eyebrow="THE BRIDGE"
        title="Hire the people. Build the operating environment around them."
        width="wide"
        align="center"
        lead="Recruitment expands into the complete India operating model when one hire becomes a team."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {BRIDGE_STAGES.map((stage, idx) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#D2DCF0]/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 text-left"
            >
              {/* TOP WHITE CONTENT SECTION */}
              <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1 bg-white">
                {/* Category Eyebrow in uppercase vibrant blue */}
                <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#169DC8] mb-1.5 sm:mb-2 font-mono">
                  {stage.stage}
                </span>

                {/* Main Title */}
                <h3 className="text-xl sm:text-2xl lg:text-[23px] font-extrabold text-[#0D306C] tracking-tight leading-[1.25] group-hover:text-[#169DC8] transition-colors mb-2">
                  {stage.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13.5px] text-[#505D74] leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              {/* BOTTOM IMAGE CONTAINER (Flush with bottom rounded corners) */}
              <div className="relative h-48 sm:h-56 lg:h-60 overflow-hidden bg-[#081B3E] flex-shrink-0">
                <img
                  src={stage.image}
                  alt={stage.imageAlt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081B3E]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <Link
            to={AI_TALENT_CONTEXT_LINKS.aiGcc.path}
            className="btn-gradient-primary inline-flex items-center gap-2"
          >
            <span>{AI_TALENT_CONTEXT_LINKS.aiGcc.anchor}</span>
            <ArrowRight className="w-4 h-4 text-white" aria-hidden />
          </Link>
          <Link
            to={AI_TALENT_CONTEXT_LINKS.microGcc.path}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#0D306C]/25 bg-white text-[#0D306C] text-sm font-semibold transition-all duration-200 shadow-xs"
          >
            <span>{AI_TALENT_CONTEXT_LINKS.microGcc.anchor}</span>
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </Section>

      <Section id="ai-talent-questions" eyebrow="Buyer questions" title="Questions buyers ask before hiring AI talent in India." tone="muted" width="narrow">
        <AnswerBlock items={FAQ} />
      </Section>
    </AiTalentPageLayout>
  );
}
