"use client";

import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  X,
  Target,
  TrendingUp,
  Layers,
  MapPin,
  Users,
  Building2,
  Rocket,
  RefreshCw,
  Landmark,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import {
  GccStrategyHero,
  GccStrategySubnav,
  GccStrategyPageLayout,
  SourceNote,
  GccModelComparison,
  RelatedGccServices,
  GccStrategyCTA,
  FiveCardHeroGrid,
} from "@/components/gcc-strategy";
import InBrief from "@/components/ai-gcc/InBrief";
import SmoothLineReveal from "@/components/gcc-operations/SmoothLineReveal";
import CountingNumber from "@/components/shared/CountingNumber";
import Section from "@/components/ai-gcc/Section";
import PointOfView from "@/components/ai-gcc/PointOfView";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import SlottedStepNumber from "@/components/gcc-operations/SlottedStepNumber";
import BuyerPathCards from "@/components/ai-gcc/BuyerPathCards";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import PillTagList from "@/components/shared/PillTagList";
import { gccOverviewFaqs } from "@/data/gccStrategyFaqs";
import { gccMarketProof } from "@/data/gccMarketProof";
import { gccMarketStats } from "@/data/gccMarketStats";
import { GCC_POLICY_HIGHLIGHTS } from "@/data/gccPolicy";
import { bookACallUrl } from "@/lib/constants";
import {
  GCC_STRATEGY_ROUTES as R,
  GCC_STRATEGY_PILLAR_LABEL,
  GCC_OPERATIONS_LINKS,
  AI_PILLAR_LINKS,
  GCC_TOOL_LINKS,
  blueprintRequestUrl,
  type GccLeadContext,
} from "@/lib/gccStrategyRoutes";

const leadContext: GccLeadContext = {
  source_page: R.overview,
  service_interest: "GCC Strategy",
  cta_name: "Plan My GCC",
};

const decisionToLaunch = [
  { label: "Mandate", note: "What India will own", href: `${R.strategy}#mandate`, icon: Target },
  { label: "Business case", note: "Multi-year economics", href: `${R.strategy}#business-case`, icon: TrendingUp },
  { label: "Operating model", note: "Captive, BOT, managed, EOR", href: `${R.strategy}#entry-model`, icon: Layers },
  { label: "Location", note: "City around the mandate", href: R.location, icon: MapPin },
  { label: "Workforce", note: "Leaders and skills first", href: `${R.setup}#leadership-talent`, icon: Users },
  { label: "Foundation", note: "Entity, workplace, IT", href: `${R.setup}#workstreams`, icon: Building2 },
  { label: "Launch", note: "First employees, first mandate", href: `${R.setup}#day-one`, icon: Rocket },
  { label: "Operate & scale", note: "GCC Operations", href: GCC_OPERATIONS_LINKS.overview.href, external: true, icon: RefreshCw },
];

const fiveDecisions = [
  {
    n: "01",
    title: "DECISION 1: MANDATE",
    q: "What will India own?",
    body: "The capabilities, decisions and outcomes the center is accountable for, and what stays at headquarters.",
    href: `${R.strategy}#mandate`,
    anchor: "Define the mandate on the table",
    tone: "blue" as const,
  },
  {
    n: "02",
    title: "DECISION 2: OPERATING MODEL",
    q: "Captive, assisted setup, managed, BOT, EOR - first or hybrid?",
    body: "How much ownership on day one, how much operating responsibility to carry, and what transfers later.",
    href: `${R.strategy}#entry-model`,
    anchor: "Compare entry models",
    tone: "amber" as const,
  },
  {
    n: "03",
    title: "DECISION 3: LOCATION",
    q: "Which talent ecosystem supports the mandate?",
    body: "Role-level talent depth, leadership availability, attrition and ecosystem fit, not cost per seat alone.",
    href: R.location,
    anchor: "Choose the city with logic",
    tone: "navy" as const,
  },
  {
    n: "04",
    title: "DECISION 4: WORKFORCE",
    q: "Which leaders and skills are required first?",
    body: "The leadership spine, the first squad, the seniority mix and the hiring sequence that makes the mandate real.",
    href: `${R.setup}#leadership-talent`,
    anchor: "See leadership and talent plan",
    tone: "blue" as const,
  },
  {
    n: "05",
    title: "DECISION 5: OWNERSHIP PATH",
    q: "What should NeoIntelli operate initially and what should ultimately move in-house?",
    body: "The transfer plan for people, processes and platforms so the center ends up owned, not merely staffed.",
    href: GCC_OPERATIONS_LINKS.botTransition.href,
    anchor: "Read about BOT and transfer",
    tone: "amber" as const,
  },
];

const threeWays = [
  {
    eyebrow: "Start small",
    title: "AI Micro GCC",
    body: "Start with one squad. Build the operating model to scale.",
    who: ["Startups and scale-ups", "Mid-market enterprises", "PE-backed companies", "First India teams"],
    cta: { label: "Explore AI Micro GCC", href: R.microGcc },
  },
  {
    eyebrow: "Build the center",
    title: "Full GCC",
    body: "A larger mandate designed around the capability you want to own, with a coordinated launch program.",
    who: ["Larger or multi-function mandates", "Long-term ownership of talent and IP", "Larger workforce plans", "Regulated or data-sensitive work"],
    cta: { label: "Plan a GCC", href: bookACallUrl("hero") },
  },
  {
    eyebrow: "Already running",
    title: "Modernize an existing GCC",
    body: "Move a center that already operates from delivery capacity to enterprise capability, ownership and AI.",
    who: ["Stagnant or cost-center mandates", "Fragmented AI pilots", "Weak decision rights or HQ trust", "Talent mismatch with the next mandate"],
    cta: { label: "Explore GCC Modernization", href: R.modernization },
  },
];

const parallelWorkstreams = [
  "Strategy & governance",
  "Entity / compliance coordination",
  "Leadership",
  "Talent",
  "Workspace",
  "IT / security",
  "Finance / payroll readiness",
  "Vendor setup",
  "HQ integration",
  "Program management",
];

const aiReadyConsiderations: Array<[string, string]> = [
  ["AI and data talent availability", "Role-level depth for the roles the mandate needs, in the city you choose."],
  ["Data access", "Which enterprise data the center can use, under what controls, from day one."],
  ["Cloud architecture", "Accounts, regions, networking and cost ownership between headquarters and India."],
  ["Security", "Identity, device and data-handling baselines that satisfy the strictest business unit served."],
  ["AI governance", "Who approves models, data use and vendors, and how that changes as the mandate grows."],
  ["MLOps readiness", "Whether models can reach production, be monitored and be retrained without heroics."],
  ["GPU and compute needs", "Where relevant, how training and inference capacity is sourced and budgeted."],
  ["AI product ownership", "Whether India will own AI products and platforms, not only build them for others."],
  ["Upskilling potential", "How existing engineers grow into AI and data roles as the mandate expands."],
];

const pillarPages = [
  {
    label: "Strategy & Business Case",
    href: R.strategy,
    desc: "Should we build a GCC, what should it own, and what is the board-ready case?",
    anchor: "Build the GCC business case",
  },
  {
    label: "Location Strategy",
    href: R.location,
    desc: "Choose the Indian city around the mandate: role-level talent depth, cost, attrition, ecosystem and policy.",
    anchor: "Compare GCC locations in India",
  },
  {
    label: "Setup & Launch",
    href: R.setup,
    desc: "Turn the design into a working center through parallel entity, leadership, talent, workplace, IT and governance workstreams.",
    anchor: "See how NeoIntelli sets up and launches a GCC",
  },
  {
    label: "Modernization & Transformation",
    href: R.modernization,
    desc: "Redesign an existing GCC around ownership, AI and data capability and measurable enterprise value.",
    anchor: "Modernize an existing GCC",
  },
  {
    label: "AI Micro GCC",
    href: R.microGcc,
    desc: "Start with one senior-led squad on an operating model built to scale into a GCC.",
    anchor: "Start with an AI Micro GCC",
  },
];

export default function GCCServices() {
  const hasMarketStats = gccMarketProof.stats.length > 0;

  return (
    <GccStrategyPageLayout>
      {/* 1. Hero */}
      <GccStrategyHero
        eyebrow="GCC Strategy & Setup · India"
        title="Design and launch the right GCC in India."
        description="NeoIntelli helps global companies move from GCC idea to operating center through business-case design, operating-model decisions, location strategy, workforce planning and coordinated launch execution. Start with an AI Micro GCC or build a larger captive model around the capability you need to own."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Services", href: R.overview }, { name: GCC_STRATEGY_PILLAR_LABEL }]}
        primaryCta={{ label: "Plan My GCC", href: bookACallUrl("hero") }}
        secondaryCta={{ label: "Explore AI Micro GCC", href: R.microGcc }}
        contextualLink={{ label: "Already operate a GCC? Explore GCC Modernization", href: R.modernization }}
        leadContext={leadContext}
      />

      {/* 2. Subnav */}
      <GccStrategySubnav />

      <main id="gcc-strategy-content" className="scroll-mt-32">
        {/* 3. In Brief */}
        <InBrief>
          GCC Strategy &amp; Setup is NeoIntelli&apos;s senior-led program for deciding, designing and launching a Global Capability
          Center in India. It takes a company from the GCC decision and business case through operating-model choice, location
          strategy, workforce planning and a coordinated launch, so the center is designed around the capability the enterprise
          wants to own rather than a headcount target. Running the center after launch belongs to NeoIntelli&apos;s GCC Operations
          services.
        </InBrief>

        {/* 4. Market Context */}
        <Section
          id="market-context"
          eyebrow="MARKET REALITY"
          title="Why the India GCC decision has changed"
          width="wide"
        >
          <div className="max-w-5xl mx-auto bg-transparent">
            {hasMarketStats ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 sm:mb-10">
                  {gccMarketProof.stats.map((stat) => (
                    <div key={stat.label} className="border-r border-[#D2DCF0]/50 pr-4 last:border-r-0">
                      <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-manrope text-[#0D306C] tracking-tight">
                        <CountingNumber value={stat.value} />
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-[#008EC4] mt-1.5 font-manrope">{stat.label}</p>
                      {stat.context && <p className="text-2xs sm:text-xs text-[#505D74] mt-1 font-normal leading-relaxed">{stat.context}</p>}
                    </div>
                  ))}
                </div>
                <SmoothLineReveal className="text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed space-y-4 mb-8 font-normal text-left">
                  <p>
                    India&apos;s GCC ecosystem now includes {gccMarketStats.gccCountLabel} GCCs operating across{" "}
                    {gccMarketStats.unitCountLabel} units, with {gccMarketStats.workforceLabel} professionals and{" "}
                    {gccMarketStats.revenueLabel} in {gccMarketStats.period} revenue. The bigger shift, however, is not the number of
                    centers. It is the mandate they now own.
                  </p>
                  <p>
                    That is why the first GCC question is no longer &ldquo;how many people can we hire cheaply?&rdquo; but &ldquo;what
                    capability do we want to own?&rdquo; The center you design around that answer looks different in leadership,
                    location, operating model and cost from one designed around a headcount target.
                  </p>
                </SmoothLineReveal>
              </>
            ) : (
              <SmoothLineReveal className="text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed space-y-4 mb-8 font-normal text-left">
                <p>
                  India is the world&apos;s largest Global Capability Center market by number of centers and by people employed in them,
                  and the mandate of a typical center has moved from cost-driven support work toward engineering, product, data and
                  AI ownership. The market keeps growing, and so does competition for senior talent in the main hubs.
                </p>
                <p>
                  That shift is why the first GCC question is no longer &ldquo;how many people can we hire cheaply?&rdquo; but &ldquo;what
                  capability do we want to own?&rdquo; The center you design around that answer looks different in leadership, location,
                  operating model and cost from one designed around a headcount target.
                </p>
              </SmoothLineReveal>
            )}
            <SourceNote
              source={gccMarketProof.source}
              year={hasMarketStats ? gccMarketProof.year : undefined}
              lastChecked={gccMarketProof.lastChecked}
              note={
                hasMarketStats
                  ? "Figures are quoted from the report edition named; context is NeoIntelli's."
                  : "Market figures are published on this page only when they can be quoted from the current edition of the report with the year shown; none are quoted here today."
              }
            />
          </div>
        </Section>

        {/* 5. What is a GCC */}
        <Section
          id="what-is-a-gcc"
          eyebrow="DEFINITION"
          title="What is a Global Capability Center?"
          width="regular"
          align="center"
        >
          <SmoothLineReveal className="max-w-5xl mx-auto text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal space-y-6 sm:space-y-7 text-left">
            <p>
              A Global Capability Center (GCC) is a dedicated capability organization established by a global company to own
              strategic functions such as engineering, product, AI, data, finance or operations, most often in India. Unlike
              traditional outsourcing, a GCC is designed around long-term enterprise ownership of talent, knowledge, intellectual
              property and capability, although operational support may initially be provided by a GCC partner.
            </p>
            <p>
              The name has changed over time (captive center, global in-house center, GCC), but the idea is stable: the company,
              not a vendor, employs the people, sets the standards and keeps what they learn. That is what makes a GCC different
              from a contract. A vendor sells capacity and outcomes; a GCC builds an organization that gets better at the
              company&apos;s own problems every year.
            </p>
            <p>
              A modern GCC can be small. One senior-led squad with a clear charter, an owned operating model and a path to scale
              is a GCC in every way that matters. It can also be a multi-function center with hundreds of people. What defines it
              is ownership of the mandate, not the size of the office.
            </p>
            <p>
              The operating model is a choice. Some companies own everything from day one. Others use an assisted build-out,
              a Build-Operate-Transfer arrangement, a managed model or an Employer-of-Record entry, and take on more of the
              operating layer as the center matures. NeoIntelli&apos;s role is to help decide which path fits, design the center
              around the mandate and run the launch as one program.
            </p>
          </SmoothLineReveal>
        </Section>

        {/* 6. Should we build a GCC */}
        <Section
          id="is-a-gcc-right"
          eyebrow="FIT EVALUATION"
          title="Is a GCC the right model for your company?"
          lead="A GCC is not always the better answer. It is usually the better answer when the work is something the enterprise wants to own for years. The lists below are the criteria NeoIntelli uses in the first conversation."
          width="wide"
        >
          <div className="grid md:grid-cols-2 gap-8 items-stretch w-full">
            {/* When it makes sense - Navy Blue Card matching AI Engineering design */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] border border-[#16427D]/60 p-6 sm:p-8 text-white shadow-lg shadow-[#081B3E]/15 flex flex-col justify-between">
              {/* Ambient cyan glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#169DC8]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#169DC8]/20 border border-[#169DC8]/40 text-[#38BDF8] shrink-0">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </span>
                  <h3 className="text-white font-bold font-manrope text-lg sm:text-xl tracking-tight leading-snug">
                    A GCC is more likely to make sense when the work is
                  </h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 text-xs sm:text-sm text-slate-300 list-none pl-0">
                  {[
                    "Strategic",
                    "Long term",
                    "IP-sensitive",
                    "Data-intensive",
                    "Talent-intensive",
                    "Product or platform oriented",
                    "Core to business differentiation",
                    "Dependent on organizational knowledge",
                    "Requires direct leadership ownership",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] shrink-0" />
                      <span className="font-medium text-slate-100">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* When less appropriate - Transparent Card matching AI Engineering design */}
            <div className="bg-transparent p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 border border-rose-200 text-rose-500 shrink-0">
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </span>
                  <h3 className="text-[#0D306C] font-bold font-manrope text-lg sm:text-xl tracking-tight leading-snug">
                    A GCC may be less appropriate when
                  </h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-[#505D74] list-none pl-0 mb-6">
                  {[
                    "The work is short term",
                    "Scope fluctuates dramatically",
                    "The capability is a commodity",
                    "The requirement is temporary",
                    "A vendor-owned outcome is acceptable",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                      <span className="font-normal text-[#2B3D66]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs sm:text-[13px] text-[#505D74] leading-relaxed pt-4 border-t border-[#D2DCF0]/60 font-normal">
                In these cases outsourcing, staff augmentation or a vendor-run service is often the right decision, and NeoIntelli
                will say so. See{" "}
                <Link to={GCC_TOOL_LINKS.gccVsOutsourcing.href} className="text-[#008EC4] font-semibold hover:text-[#0D306C] underline underline-offset-2 transition-colors">
                  the GCC vs outsourcing comparison
                </Link>{" "}
                for the trade-offs in detail.
              </p>
            </div>
          </div>

          {/* Signature Viewpoint inside the same section with tight, cohesive spacing */}
          <div id="ownership-viewpoint" className="mt-6 sm:mt-8 w-full">
            <PointOfView className="w-full">
              <p className="mb-4">
                A GCC is an ownership decision before it is a location decision.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-sm sm:text-base font-normal text-white/80 leading-relaxed font-sans mt-4">
                <p>
                  The first question is not &ldquo;how many people can we hire cheaply?&rdquo; It is &ldquo;what capability does the enterprise
                  want to own?&rdquo; Once that is answered, the operating model, the city, the leadership and the cost model tend to follow.
                  Answered in the wrong order, the same decisions have to be remade in year two.
                </p>
                <p>
                  Two rules follow from it. Design the center around the mandate, not the headcount. And build for year three, not only
                  day one: the leadership spine, the operating model and the location should still fit when the center is twice its
                  launch size.
                </p>
              </div>
            </PointOfView>
          </div>
        </Section>

        {/* 8. Five Decisions */}
        <Section
          id="five-decisions"
          eyebrow="DECISION MILESTONES"
          title="Five decisions to make before the first hire."
          lead="Everything in setup depends on these five. Locking them early is what allows the entity, leadership, talent and workplace workstreams to run at the same time instead of one after another."
          width="wide"
          align="center"
        >
          <FiveCardHeroGrid
            items={fiveDecisions.map((step) => ({
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
        </Section>

        {/* 9. Model Comparison */}
        <Section
          id="gcc-models"
          eyebrow="OPERATING MODELS"
          title="Which GCC model should you start with?"
          lead="The models differ in who owns what, how fast they start and how much operating responsibility the enterprise carries."
          width="wide"
        >
          <GccModelComparison />
          <p className="text-xs sm:text-sm text-[#505D74] mt-8 max-w-3xl mx-auto text-center leading-relaxed">
            For the decision criteria behind each model (control, complexity, speed, transfer path, cost structure and long-term
            suitability), see{" "}
            <Link to={`${R.strategy}#entry-model`} className="text-[#008EC4] font-semibold hover:text-[#0D306C] underline underline-offset-2">
              the entry-model section of Strategy &amp; Business Case
            </Link>
            .
          </p>
        </Section>

        {/* 10. Three Ways to Start */}
        <Section
          id="three-ways"
          eyebrow="ENTRY PATHS"
          title="Choose the starting model that fits the company you are today."
          lead="The growth path is the same in every case: Micro GCC to GCC to GCC Operations to higher ownership. Where you enter it depends on the mandate and the company."
          width="wide"
        >
          <BuyerPathCards
            paths={threeWays.map((w) => ({
              title: w.title,
              tagline: w.eyebrow,
              bestFor: [w.body],
              includes: w.who,
              cta: w.cta,
            }))}
          />
        </Section>

        {/* 11. Decision to Launch Flow */}
        <Section
          id="decision-to-launch"
          eyebrow="LIFECYCLE"
          title="GCC Decision to Launch"
          lead="The NeoIntelli GCC design framework in one line. The first seven stages are this section's work; the last belongs to GCC Operations, which runs and scales the center after launch."
          theme="navy"
          width="wide"
          wavesOnMobile
        >
          <UniversalLifecycle
            theme="navy"
            steps={decisionToLaunch.map((d) => ({
              title: d.label,
              desc: d.note,
              icon: d.icon,
            }))}
          />
        </Section>

        {/* 12. Parallel Workstreams */}
        <Section
          id="parallel"
          eyebrow="EXECUTION CADENCE"
          title="Build the GCC in parallel, not sequentially."
          width="wide"
          align="center"
        >
          <div className="max-w-5xl mx-auto">
            {/* Full-width narrative text */}
            <div className="max-w-5xl mx-auto space-y-4 text-sm sm:text-base text-[#505D74] leading-relaxed font-normal text-center mb-8 sm:mb-10">
              <p>
                Most slow GCC launches are slow because each workstream waits for the one before it: the entity before the
                leadership search, the office before the hiring, the policies before the payroll. Once the five design decisions
                are locked, most of these can progress at the same time against one dependency plan.
              </p>
              <p>
                NeoIntelli runs setup as one program with one accountable lead, so the critical path is only as long as the true
                lead times (entity registration, senior searches, workspace readiness) and not the sum of every workstream. How
                long that is depends on the operating model and the mandate, which is why we scope milestones per program rather
                than promise a universal launch time.
              </p>
            </div>

            {/* Workstreams that run together in transparent PillFeature design */}
            <div className="max-w-4xl mx-auto mb-8 sm:mb-10 text-center">
              <p className="text-2xs font-mono font-bold uppercase tracking-[0.2em] text-[#008EC4] mb-4">
                Workstreams that run together
              </p>
              <PillTagList items={parallelWorkstreams} size="md" />
            </div>

            {/* Centered CTA button in btn-gradient */}
            <div className="flex justify-center">
              <Link
                to={`${R.setup}#workstreams`}
                className="btn-gradient-primary inline-flex items-center gap-2 text-xs sm:text-sm px-6 py-3 font-semibold shadow-md group"
              >
                <span>See the parallel setup timeline in Setup &amp; Launch</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Section>

        {/* 13. AI-Ready by Design */}
        <CapabilitiesSection
          id="ai-ready"
          eyebrow="AI READINESS"
          title="Design today's GCC for tomorrow's AI mandate."
          lead="Not every GCC is an AI GCC, but almost every GCC will be asked to own AI and data work within a few years. Setup decisions made without that in mind are expensive to reverse."
          items={aiReadyConsiderations.map(([title, copy]) => ({
            title,
            desc: copy,
          }))}
          columns={3}
        />

        {/* 14. India Policy Context */}
        <Section
          id="policy-support"
          eyebrow="POLICY FRAMEWORK"
          title="Policy support without building the case around subsidies."
          lead="India combines a mature foreign-investment framework with export-services mechanisms and a growing set of state-level GCC programs. These can improve GCC economics, but eligibility depends on activity, entity structure, location and current policy conditions."
          width="wide"
          align="center"
        >
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center w-full max-w-6xl mx-auto list-none pl-0">
            {GCC_POLICY_HIGHLIGHTS.map((p, index) => {
              const policyIcons = [Landmark, ShieldCheck, Cpu, Building2];
              const PolicyIcon = policyIcons[index] || Landmark;

              return (
                <li
                  key={p.title}
                  className="flex flex-col items-center justify-between text-center bg-transparent border-0 shadow-none p-3 sm:p-4 group"
                >
                  <div className="flex flex-col items-center w-full">
                    <SlottedStepNumber index={index} />

                    <h3 className="text-[#0D306C] font-extrabold text-sm sm:text-base uppercase tracking-wider mb-2.5 group-hover:text-[#008EC4] transition-colors font-manrope">
                      {p.title}
                    </h3>

                    <p className="text-[#505D74] text-xs sm:text-[13.5px] leading-relaxed font-normal mb-6">
                      {p.body}
                    </p>
                  </div>

                  {/* Bottom Icon */}
                  <div className="mt-auto text-[#0D306C] group-hover:text-[#008EC4] group-hover:scale-110 transition-all duration-300">
                    <PolicyIcon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Callout sentence and action buttons */}
          <div className="mt-10 sm:mt-12 max-w-4xl mx-auto text-center">
            <p className="text-sm sm:text-base font-semibold text-[#0D306C] max-w-3xl mx-auto mb-6 leading-relaxed">
              Government incentives are treated as validated upside, not as the reason to choose a location or justify a GCC.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Link
                to={R.location}
                className="btn-gradient-primary inline-flex items-center gap-2 text-xs sm:text-sm px-6 py-3 font-semibold shadow-md group"
              >
                <span>Explore GCC Location Strategy</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                to={R.setup}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#D2DCF0] bg-white hover:border-[#008EC4] text-[#0D306C] hover:text-[#008EC4] text-xs sm:text-sm font-semibold transition-all duration-200 shadow-2xs hover:shadow-xs group"
              >
                <span>Plan GCC Setup &amp; Launch</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-[#008EC4]" aria-hidden="true" />
              </Link>
            </div>

            <SourceNote
              source="DPIIT Consolidated FDI Policy; CBIC, Integrated Goods and Services Tax Act; Software Technology Parks of India, STP Scheme; respective state government GCC policy notifications"
              lastChecked="Sep 2026"
              note="Eligibility under each framework is activity-, entity- and location-specific and is validated with qualified advisers during an engagement."
            />
          </div>
        </Section>

        {/* 15. The GCC Strategy & Setup Services */}
        <Section
          id="pillar-pages"
          eyebrow="PILLAR SERVICES"
          title="The GCC Strategy &amp; Setup services"
          lead="Four services that own one stage each of the decision journey, plus the lean way in. Every page answers its own question and hands over to the next."
          width="wide"
          align="center"
        >
          <FiveCardHeroGrid
            items={pillarPages.map((pillar, index) => {
              const tones: Array<"blue" | "amber" | "navy"> = ["blue", "amber", "navy", "blue", "amber"];
              return {
                n: index + 1,
                title: pillar.label,
                body: pillar.desc,
                cta: {
                  label: pillar.anchor,
                  href: pillar.href,
                },
                tone: tones[index],
              };
            })}
          />
        </Section>

        {/* 16. FAQs */}
        <Section
          id="faqs"
          eyebrow="FAQS"
          title="GCC strategy and setup: questions buyers ask first"
          width="regular"
        >
          <AnswerBlock items={gccOverviewFaqs.map((f) => ({ question: f.q, answer: f.a }))} level={3} />
        </Section>

        {/* 17. Contextual CTA */}
        <GccStrategyCTA
          title="Plan the GCC around the capability you want to own."
          description="A 30-minute working session with a NeoIntelli GCC strategy lead: mandate, operating model, city, first hires and what a coordinated launch would look like for your company."
          primary={{ label: "Plan My GCC", href: bookACallUrl("footer_cta") }}
          secondary={{ label: "Request the GCC Blueprint", href: blueprintRequestUrl({ ...leadContext, cta_name: "Request the GCC Blueprint" }) }}
          leadContext={leadContext}
          footnote="Senior-led from the first conversation. No slide-deck-only engagements."
        />

        {/* 18. Related Services */}
        <RelatedGccServices
          variant="overview"
          title="Continue the GCC decision journey"
          primary={pillarPages.map((p) => ({ label: p.label, href: p.href, desc: p.desc, anchor: p.anchor }))}
          secondaryTitle="After launch, and alongside it"
          secondary={[
            { label: GCC_OPERATIONS_LINKS.overview.label, href: GCC_OPERATIONS_LINKS.overview.href, anchor: "Run and scale the center with GCC Operations" },
            { label: AI_PILLAR_LINKS.aiGcc.label, href: AI_PILLAR_LINKS.aiGcc.href, anchor: "Build an AI-focused capability center" },
            { label: AI_PILLAR_LINKS.aiTalent.label, href: AI_PILLAR_LINKS.aiTalent.href, anchor: "Hire the AI and data team with AI Talent" },
            { label: AI_PILLAR_LINKS.aiEngineering.label, href: AI_PILLAR_LINKS.aiEngineering.href, anchor: "Build the AI with AI Engineering" },
            { label: GCC_TOOL_LINKS.costCalculator.label, href: GCC_TOOL_LINKS.costCalculator.href, anchor: "Estimate GCC cost with the calculator" },
            { label: GCC_TOOL_LINKS.readiness.label, href: GCC_TOOL_LINKS.readiness.href, anchor: "Check GCC readiness" },
          ]}
        />
      </main>
    </GccStrategyPageLayout>
  );
}
