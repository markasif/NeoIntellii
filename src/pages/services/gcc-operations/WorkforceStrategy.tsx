import React, { useState, useEffect, useRef } from "react";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import OutcomeCardGrid from "@/components/shared/OutcomeCardGrid";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  Users,
  Target,
  TrendingUp,
  ArrowRight,
  Crown,
  CalendarRange,
  Layers,
  Cpu,
  BarChart3,
  MapPin,
  Scale,
  Award,
  UserCheck,
  GraduationCap,
  ArrowLeftRight,
  ShieldCheck,
  LineChart,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import GccOperationsLayout from "@/components/gcc-operations/GccOperationsLayout";
import OpsSection from "@/components/gcc-operations/OpsSection";
import CapabilityGrid from "@/components/gcc-operations/CapabilityGrid";
import InBriefCard from "@/components/gcc-operations/InBriefCard";
import AnswerList from "@/components/gcc-operations/AnswerList";
import FiveCardHeroGrid from "@/components/shared/FiveCardHeroGrid";
import PillFeatureCardGrid from "@/components/shared/PillFeatureCardGrid";
import SourceNote from "@/components/gcc-operations/SourceNote";
import { gccOperationsPage, gccOperationsFaqs, PILLAR_LINKS, GCC_OPERATIONS_BASE } from "@/data/gccOperationsContent";

const page = gccOperationsPage("workforce");
const faqs = gccOperationsFaqs[page.path];
const link = "text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 decoration-[#008EC4]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] rounded-sm";

const capabilities = [
  { title: "Leadership architecture", desc: "The leadership roles, reporting lines, decision rights and profiles the center needs at each stage.", icon: Crown },
  { title: "Workforce planning", desc: "Headcount phased against mandate milestones, hiring capacity and budget, revisited each quarter.", icon: CalendarRange },
  { title: "Role taxonomy", desc: "A consistent set of role definitions and levels that headquarters and the center both recognize.", icon: Layers },
  { title: "Skill architecture", desc: "The skills each role needs now and next, so hiring, development and AI adoption pull in the same direction.", icon: Cpu },
  { title: "Capacity modelling", desc: "What the current team can deliver, where the constraint is, and what the next mandate requires.", icon: BarChart3 },
  { title: "Location talent strategy", desc: "Which roles are realistic in which city, and what that means for the plan and the cost.", icon: MapPin },
  { title: "Compensation benchmarking", desc: "Market positioning by role and level, as an input to the client's compensation decisions.", icon: Scale },
  { title: "Employer value proposition", desc: "A credible reason for experienced candidates to choose this center, specific to India.", icon: Award },
  { title: "Succession planning", desc: "Cover for the center lead and function leads before growth makes the roles harder to fill.", icon: UserCheck },
  { title: "Critical-role planning", desc: "The handful of roles the mandate cannot run without, and the plan for each.", icon: Target },
  { title: "Capability development", desc: "Structured programs that build the skills the market is not selling at the pace the center needs.", icon: GraduationCap },
  { title: "Internal mobility", desc: "Paths between teams and levels so growth does not depend on leaving.", icon: ArrowLeftRight },
  { title: "Retention strategy", desc: "The levers that hold experienced people: managers, growth, ownership, recognition, and pay where it matters.", icon: ShieldCheck },
  { title: "Workforce analytics", desc: "Hiring, attrition, capacity and skills data turned into decisions, with AI-assisted modelling where useful.", icon: LineChart },
];

// 8 Stages of Workforce Model (Matching Home Page GCCLifecycle undulating sine wave)
const modelStages = [
  {
    id: "01",
    name: "Mandate",
    description: "What the center is accountable for.",
    tag: "constraint" as const,
    tagLabel: "Step 01",
    tagSub: "Accountability",
    icon: Target,
    isHigh: true,
    x: 90,
    y: 110,
  },
  {
    id: "02",
    name: "Capability",
    description: "What it must be able to do.",
    tag: "architecture" as const,
    tagLabel: "Step 02",
    tagSub: "Competency",
    icon: Cpu,
    isHigh: false,
    x: 270,
    y: 240,
  },
  {
    id: "03",
    name: "Role",
    description: "Who does it, at what level.",
    tag: "architecture" as const,
    tagLabel: "Step 03",
    tagSub: "Taxonomy",
    icon: Users,
    isHigh: true,
    x: 450,
    y: 110,
  },
  {
    id: "04",
    name: "Skill",
    description: "What skills each role needs.",
    tag: "architecture" as const,
    tagLabel: "Step 04",
    tagSub: "Curriculum",
    icon: Layers,
    isHigh: false,
    x: 630,
    y: 240,
  },
  {
    id: "05",
    name: "Headcount",
    description: "How many, in what order.",
    tag: "planning" as const,
    tagLabel: "Step 05",
    tagSub: "Phasing",
    icon: BarChart3,
    isHigh: true,
    x: 810,
    y: 110,
  },
  {
    id: "06",
    name: "Location",
    description: "Which city has the talent.",
    tag: "planning" as const,
    tagLabel: "Step 06",
    tagSub: "Talent Market",
    icon: MapPin,
    isHigh: false,
    x: 990,
    y: 240,
  },
  {
    id: "07",
    name: "Hiring",
    description: "Sourcing and validation by AI Talent.",
    tag: "execution" as const,
    tagLabel: "Step 07",
    tagSub: "AI Talent",
    icon: UserCheck,
    isHigh: true,
    x: 1170,
    y: 110,
  },
  {
    id: "08",
    name: "Succession",
    description: "Coverage as the center grows.",
    tag: "governance" as const,
    tagLabel: "Step 08",
    tagSub: "Durability",
    icon: RefreshCw,
    isHigh: false,
    x: 1350,
    y: 240,
  },
];

/**
 * Workforce Model Lifecycle Component
 * Consolidated via UniversalLifecycle (variant="workforce-model", 8 stages)
 */
function WorkforceModelLifecycle() {
  return (
    <UniversalLifecycle
      stages={modelStages}
      variant="workforce-model"
      id="workforce-model-cycle"
    />
  );
}

const system = [
  {
    n: "01",
    title: "PART 1: ROLE & SKILL",
    q: "How do India levels calibrate to HQ bands?",
    body: "Levels, definitions, progression criteria and required skills, calibrated to the India market and aligned to headquarters bands.",
    href: "#capabilities",
    anchor: "Explore Role Taxonomy",
    tone: "blue" as const,
  },
  {
    n: "02",
    title: "PART 2: COMPENSATION",
    q: "What structure attracts and holds top talent?",
    body: "Market-referenced bands, variable design, retention mechanisms and annual review cadence.",
    href: "#capabilities",
    anchor: "See Compensation Benchmarks",
    tone: "amber" as const,
  },
  {
    n: "03",
    title: "PART 3: LEADERSHIP",
    q: "Which leaders anchor the center first?",
    body: "Center leadership, function heads, engineering managers and technical leads: profiles, hiring triggers and reporting.",
    href: "#capabilities",
    anchor: "View Leadership Architecture",
    tone: "navy" as const,
  },
  {
    n: "04",
    title: "PART 4: WORKFORCE PLAN",
    q: "How does headcount phase across 12 months?",
    body: "Rolling 12-month headcount, cost and capability plan by function and level, updated quarterly against delivery.",
    href: "#workforce-model",
    anchor: "See the Workforce Model",
    tone: "blue" as const,
  },
  {
    n: "05",
    title: "PART 5: RETENTION & SUCCESSION",
    q: "How do you protect critical capabilities?",
    body: "Flight-risk identification, key-person cover, promotion paths and internal mobility before attrition forces external replacement.",
    href: "#pitfalls",
    anchor: "Review Succession & Risks",
    tone: "amber" as const,
  },
];

interface PitfallItem {
  title: string;
  desc: string;
  badge: string;
  image: string;
  alt: string;
  aspect: string;
  points: string[];
  action: string;
  href: string;
}

const pitfalls: PitfallItem[] = [
  {
    title: "Headcount before architecture",
    desc: "Hiring into vague job descriptions, then reorganizing six months later when the work does not match the titles.",
    badge: "FAILURE MODE 01",
    image: "/images/services/gcc-operations/gcc-ops-workforce.webp",
    alt: "Headcount before architecture in GCC workforce planning",
    aspect: "aspect-[4/3]",
    points: [
      "Vague job specifications",
      "Costly 6-month reorganization",
      "Misaligned talent delivery",
      "Remedy: Role taxonomy first",
    ],
    action: "See Role Taxonomy",
    href: "#capabilities",
  },
  {
    title: "Copying the HQ structure",
    desc: "Mirroring an organization built over twenty years at headquarters instead of designing for what the center actually does.",
    badge: "FAILURE MODE 02",
    image: "/images/services/gcc-operations/gcc-hq-leadership.webp",
    alt: "Copying headquarters structure in India GCC setup",
    aspect: "aspect-[16/10]",
    points: [
      "Duplicated legacy overhead",
      "Excessive reporting tiers",
      "Delayed delivery velocity",
      "Remedy: Mandate-driven pods",
    ],
    action: "See Mandate Model",
    href: "#workforce-model",
  },
  {
    title: "Hiring leadership last",
    desc: "Building a team of 40 individual contributors with no local lead, then expecting a newly hired manager to align them retrospectively.",
    badge: "FAILURE MODE 03",
    image: "/images/services/gcc-operations/gcc-arch-leadership.webp",
    alt: "Hiring leadership last failure pattern in GCC operations",
    aspect: "aspect-[4/3]",
    points: [
      "Leaderless contributor cohorts",
      "Fragmented local culture",
      "Difficult retrospective alignment",
      "Remedy: Anchor leads first",
    ],
    action: "See Leadership Architecture",
    href: "#capabilities",
  },
  {
    title: "Single-city assumption",
    desc: "Assuming one India location fits all disciplines, rather than placing AI, platform and operations where each market is deepest.",
    badge: "FAILURE MODE 04",
    image: "/images/services/gcc-operations/gcc-positioning-tower.webp",
    alt: "Single-city assumption in India GCC location strategy",
    aspect: "aspect-[16/10]",
    points: [
      "Premature city talent saturation",
      "Inflated compensation pressure",
      "Sub-optimal specialized skills",
      "Remedy: Multi-hub location mapping",
    ],
    action: "See Location Strategy",
    href: "#capabilities",
  },
  {
    title: "Over-indexing on junior talent",
    desc: "Building cost leverage by hiring 80% junior engineers, only to discover delivery requires senior technical direction the center does not have.",
    badge: "FAILURE MODE 05",
    image: "/images/services/gcc-operations/gcc-arch-teams.webp",
    alt: "Over-indexing on junior engineers in GCC staffing",
    aspect: "aspect-[4/3]",
    points: [
      "Senior review bottlenecks",
      "Lack of local technical direction",
      "Superficial cost leverage",
      "Remedy: Balanced seniority ratio",
    ],
    action: "See Capacity Modeling",
    href: "#capabilities",
  },
  {
    title: "Ignoring succession until someone leaves",
    desc: "Discovering at 30 days' notice that the technical lead is the only person who understands the deployment pipeline.",
    badge: "FAILURE MODE 06",
    image: "/images/services/gcc-operations/gcc-ops-governance.webp",
    alt: "Ignoring succession and critical role planning",
    aspect: "aspect-[16/10]",
    points: [
      "Single point of knowledge failure",
      "30-day handover panic",
      "Critical capability downtime",
      "Remedy: Continuous key-person cover",
    ],
    action: "See Succession System",
    href: "#workforce-system",
  },
];

const AI_WORKFORCE_CHANGES = [
  {
    title: "New roles",
    desc: "AI engineering, data and platform ownership, evaluation, AI governance and AI product roles that did not exist in the original organization chart.",
    icon: Sparkles,
    isTall: true,
  },
  {
    title: "Productivity assumptions",
    desc: "Plans should reflect AI-assisted work in engineering, support and operations rather than historical role ratios.",
    icon: TrendingUp,
    isTall: false,
  },
  {
    title: "Reskilling paths",
    desc: "A structured path for the existing team to work with AI tools and build AI-enabled products, alongside a small number of external anchors.",
    icon: GraduationCap,
    isTall: true,
  },
];

export default function WorkforceStrategy() {
  const [hoveredAiCard, setHoveredAiCard] = useState<number | null>(null);

  return (
    <GccOperationsLayout
      page={page}
      eyebrow="Workforce Strategy · GCC Operations"
      heroDescription="Decide what roles the GCC needs, when, where they sit, how they progress and how leadership evolves as the center grows. NeoIntelli designs the workforce model and connects it to the hiring engine, so headcount follows the mandate rather than the other way round."
      secondaryCta={{ label: "See the workforce model", href: "#workforce-model" }}
      contextualLink={{ label: "Need people hired now? Explore AI Talent →", href: PILLAR_LINKS.aiTalent }}
      cta={{
        title: "Plan the workforce the mandate actually needs.",
        description: "A working session on your mandate, current team shape, the roles that matter next and the leadership structure the center will need in twelve months.",
        secondary: { label: "Explore AI Talent for hiring", href: PILLAR_LINKS.aiTalent },
      }}
    >
      <OpsSection id="why" width="wide">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch overflow-hidden">
          {/* LEFT: Positioning Content & 3 Feature Pillars */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left"
          >
            <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-[#008EC4] mb-2.5 sm:mb-3">
              WORKFORCE STRATEGY
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0D244D] tracking-[-0.03em] leading-[1.14] mb-4">
              Headcount is the last number in the plan, not the first.
            </h2>
            <p className="text-[#505D74] font-normal text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
              A GCC that plans from a headcount target hires whoever the market offers, in whatever order requisitions get approved, and discovers a year later that it has a team but not a capability.
            </p>
            <p className="text-[#0D244D] font-bold text-base sm:text-lg tracking-tight mb-4">
              A GCC that plans from the mandate knows which roles matter, which can wait, and what leadership architecture must come first.
            </p>
            <p className="text-[#505D74] text-sm sm:text-base leading-relaxed">
              Workforce Strategy is that planning function, run as part of the operating layer and connected directly to the hiring engine that executes it.
            </p>
          </motion.div>

          {/* RIGHT: In Brief Dark Card matching uploaded design */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col h-full"
          >
            <InBriefCard
              imageSrc="/images/services/gcc-operations/gcc-ops-workforce.webp"
              imageAlt="GCC Workforce Strategy & Leadership Planning"
            >
              Workforce Strategy is the planning function of NeoIntelli&apos;s GCC operating layer. It translates a GCC mandate into capabilities, roles, skills, headcount phasing, location choices, leadership architecture, succession and retention design. It is for leaders who need to scale an India center without hiring reactively or copying the headquarters organization chart. NeoIntelli designs the workforce model with the client&apos;s leadership, tests it against the India talent market, and hands the resulting roles to the hiring engine, where NeoIntelli&apos;s AI Talent practice finds and technically validates the people.
            </InBriefCard>
          </motion.div>
        </div>
      </OpsSection>

      <OpsSection
        id="talent-distinction"
        eyebrow="TALENT &amp; WORKFORCE INTEGRATION"
        title="AI Talent finds and validates people. Workforce Strategy decides what the center needs."
        intro="The two are deliberately separate services with a hard handover between them, so planning is not bent to whoever is easiest to hire."
        align="center"
        width="wide"
      >
        <div className="max-w-6xl mx-auto text-left space-y-10 sm:space-y-12">
          {/* Block 1: AI Talent */}
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0D306C] tracking-tight leading-snug mb-3">
              AI Talent
            </h3>

            <p className="text-[#505D74] text-sm sm:text-base lg:text-[16.5px] leading-relaxed mb-6 font-normal">
              Finds and technically validates people: role calibration, sourcing, NeoHireX screening and ranking, AI-led first-round evaluation, technical validation by practicing engineers, recruiter evaluation and offer coordination.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link to={PILLAR_LINKS.aiTalent} className="btn-white whitespace-nowrap">
                <span>Explore AI Talent</span>
                <ArrowRight className="w-4 h-4 text-[#0D306C] shrink-0" />
              </Link>
              <Link to={PILLAR_LINKS.aiDataRecruitment} className="btn-navy whitespace-nowrap">
                <span>AI &amp; Data recruitment</span>
                <ArrowRight className="w-4 h-4 text-white shrink-0" />
              </Link>
            </div>
          </div>

  

          {/* Block 2: GCC Workforce Strategy */}
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0D306C] tracking-tight leading-snug mb-3">
              GCC Workforce Strategy
            </h3>

            <p className="text-[#505D74] text-sm sm:text-base lg:text-[16.5px] leading-relaxed mb-6 font-normal">
              Decides what the center needs: what roles are required, when they must be mobilized, where squads should sit, how career paths progress, how leadership should evolve, and how the workforce scales with the enterprise mandate.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link to={PILLAR_LINKS.gccSetupLaunch} className="btn-white whitespace-nowrap">
                <span>See Setup &amp; Launch</span>
                <ArrowRight className="w-4 h-4 text-[#0D306C] shrink-0" />
              </Link>
              <a href="#capabilities" className="btn-navy whitespace-nowrap">
                <span>View 14 Capabilities</span>
                <ArrowRight className="w-4 h-4 text-white shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </OpsSection>

      {/* SECTION 3: SCOPE / CAPABILITIES (CapabilityGrid with custom contextual vector illustrations) */}
      <OpsSection
        id="capabilities"
        eyebrow="SCOPE"
        title="What workforce strategy covers."
        intro="Each discipline is a strategic capability NeoIntelli designs with your leadership. Together, they turn your enterprise mandate into an actionable, scalable workforce architecture."
        align="center"
        width="wide"
      >
        <CapabilityGrid variant="workforce" items={capabilities} />
      </OpsSection>

      {/* SECTION 4: THE WORKFORCE MODEL (Redesigned like Homepage GCCLifecycle Sine Wave) */}
      <OpsSection
        id="workforce-model"
        eyebrow="THE WORKFORCE MODEL"
        title="From mandate to succession, in order."
        intro="Each step constrains the next. Skipping to headcount or hiring is how centers end up with the wrong team for the mandate."
        align="center"
        width="wide"
        headerClassName="mx-auto !mb-0"
      >
        <WorkforceModelLifecycle />
      </OpsSection>

      {/* SECTION 5: THE WORKFORCE SYSTEM (FiveCardHeroGrid design matching services/gcc Decision Milestones) */}
      <OpsSection
        id="workforce-system"
        eyebrow="THE WORKFORCE SYSTEM"
        title="The workforce system, in five parts."
        intro="These are the components NeoIntelli designs and, where agreed, operates. They are the durable content of what was previously described as GCC talent management, without the recruitment execution, which belongs to AI Talent."
        width="wide"
        align="center"
      >
        <FiveCardHeroGrid
          items={system.map((step) => ({
            n: step.n,
            title: step.title,
            subtitle: step.q,
            body: step.body,
            cta: {
              label: step.anchor,
              href: step.href,
            },
            tone: step.tone,
          }))}
        />
      </OpsSection>

      {/* SECTION 6: WHERE WORKFORCE PLANS GO WRONG (Outcome Framework Editorial Grid Style) */}
      <OpsSection
        id="pitfalls"
        eyebrow="WORKFORCE PITFALLS"
        title="Where workforce plans go wrong."
        intro="Six predictable failure modes in GCC workforce planning, and how designing role taxonomy, leadership architecture and location strategy upfront prevents them."
        tone="muted"
        width="wide"
        align="center"
      >
        <OutcomeCardGrid
          items={pitfalls.map((item) => ({
            title: item.title,
            badge: item.badge,
            aspect: item.aspect,
            image: item.image,
            alt: item.alt,
            summary: item.desc,
            lists: [{ items: item.points }],
            cta: { label: item.action, href: item.href },
          }))}
          columns={3}
          titleSize="md"
          ctaButtonVariant="gradient"
          ctaAfterContent
          maxWidthClassName="max-w-7xl mx-auto"
        />
      </OpsSection>

      <OpsSection
        id="ai-and-the-workforce"
        eyebrow="WORKFORCE EVOLUTION"
        title="How AI changes the workforce plan."
        intro="AI transforms role definitions, productivity targets, and skills requirements across every level of the organization."
        align="center"
        width="wide"
      >
        {/* Pill feature cards (matches the AI Engineering / GCC Operations card language) */}
        <PillFeatureCardGrid
          items={AI_WORKFORCE_CHANGES.map((item) => ({
            title: item.title,
            desc: item.desc,
          }))}
          className="max-w-6xl mx-auto"
        />

        <p className="mt-10 sm:mt-12 text-center text-sm sm:text-base text-[#505D74] max-w-3xl mx-auto leading-relaxed">
          Building an AI-focused center? See{" "}
          <Link to={PILLAR_LINKS.aiGcc} className={link}>AI GCC</Link>. Hiring specialist AI and data roles? See{" "}
          <Link to={PILLAR_LINKS.aiDataRecruitment} className={link}>AI &amp; Data recruitment</Link>. Running the employee lifecycle once people join? See{" "}
          <Link to={`${GCC_OPERATIONS_BASE}/people-hr-operations`} className={link}>People &amp; HR Operations</Link>.
        </p>
        <SourceNote className="mt-6 text-center">Compensation benchmarks are market inputs for the client&apos;s decisions. NeoIntelli does not set the client&apos;s compensation philosophy or make final hiring decisions.</SourceNote>
      </OpsSection>

      <AnswerList
        id="buyer-questions"
        title="Questions buyers ask about GCC workforce strategy"
        items={faqs}
        tone="muted"
      />
    </GccOperationsLayout>
  );
}
