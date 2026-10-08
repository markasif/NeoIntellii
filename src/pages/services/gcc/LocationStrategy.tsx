"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  MapPin,
  Building,
  Users,
  Cpu,
  ShieldCheck,
  Landmark,
  Sparkles,
  Bot,
  Database,
  Activity,
  Server,
  Code,
  Cloud,
  Layers,
  Compass,
  Award,
  type LucideIcon,
} from "lucide-react";
import {
  GccStrategyHero,
  GccStrategySubnav,
  GccStrategyPageLayout,
  SourceNote,
  LocationDecisionMatrix,
  ResponsiveMatrix,
  RelatedGccServices,
  GccStrategyCTA,
} from "@/components/gcc-strategy";
import InBrief from "@/components/ai-gcc/InBrief";
import Section from "@/components/ai-gcc/Section";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import OutcomeCardGrid from "@/components/shared/OutcomeCardGrid";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import { gccLocationFaqs } from "@/data/gccStrategyFaqs";
import { STATE_GCC_POLICIES, STATE_GCC_POLICIES_NOTE } from "@/data/gccPolicy";
import { bookACallUrl } from "@/lib/constants";
import {
  GCC_STRATEGY_ROUTES as R,
  GCC_STRATEGY_PILLAR_LABEL,
  AI_PILLAR_LINKS,
  GCC_TOOL_LINKS,
  blueprintRequestUrl,
  type GccLeadContext,
} from "@/lib/gccStrategyRoutes";

const leadContext: GccLeadContext = {
  source_page: R.location,
  service_interest: "GCC Location Strategy",
  cta_name: "Compare GCC Locations",
};

const criteriaGroups: Array<{
  title: string;
  badge: string;
  image: string;
  alt: string;
  aspect: string;
  items: string[];
}> = [
  {
    title: "Talent",
    badge: "TALENT LENS",
    image: "/images/gcc-operations/gcc-ops-people.jpg",
    alt: "GCC talent availability and AI data talent depth",
    aspect: "aspect-[4/5]",
    items: [
      "Talent availability for the role mix",
      "AI/ML talent depth",
      "Data engineering talent",
      "GenAI and Agentic AI skills",
      "Product talent",
      "Leadership talent",
      "Domain expertise for the industry",
    ],
  },
  {
    title: "Market dynamics",
    badge: "MARKET LENS",
    image: "/images/gcc-operations/gcc-ops-workforce.jpg",
    alt: "GCC compensation levels and market dynamics",
    aspect: "aspect-[4/3]",
    items: [
      "Compensation levels",
      "Attrition patterns",
      "Hiring competition for the same roles",
      "Office economics and supply",
    ],
  },
  {
    title: "Ecosystem and infrastructure",
    badge: "ECOSYSTEM LENS",
    image: "/images/gcc-operations/gcc-ops-workplace.jpg",
    alt: "Indian GCC city ecosystem and infrastructure",
    aspect: "aspect-[4/5]",
    items: [
      "Infrastructure and commute",
      "Airport and global access",
      "Time-zone operating model",
      "Universities and research",
      "Startup ecosystem",
      "GCC ecosystem density",
    ],
  },
  {
    title: "Policy and resilience",
    badge: "POLICY LENS",
    image: "/images/gcc-operations/gcc-ops-governance.jpg",
    alt: "State GCC incentives and regulatory compliance",
    aspect: "aspect-[4/3]",
    items: [
      "State incentives, where eligible",
      "Regulatory environment",
      "Resilience and business continuity",
      "Scale potential over five years",
    ],
  },
];

const plannedMeasuresCol1 = [
  "AI candidates by city",
  "Compensation ranges by seniority",
  "Time to shortlist",
  "MLOps scarcity",
  "Seniority mix",
];

const plannedMeasuresCol2 = [
  "Qualified candidates per 100 applicants",
  "Offer acceptance",
  "GenAI talent depth",
  "Data engineering depth",
];

const aiRoles: Array<{ title: string; desc: string; icon: LucideIcon; image: string }> = [
  {
    title: "AI leadership",
    desc: "Heads of AI, AI product leaders and principal scientists who can own a mandate, not only deliver against one.",
    icon: Award,
    image: "/images/gcc-operations/operating-reality/11-leadership.jpg",
  },
  {
    title: "ML engineers",
    desc: "Production model builders with software engineering discipline.",
    icon: Cpu,
    image: "/images/ai-mlops.jpg",
  },
  {
    title: "GenAI engineers",
    desc: "LLM application, retrieval and evaluation engineers.",
    icon: Sparkles,
    image: "/images/gcc-operations/operating-reality/04-access.jpg",
  },
  {
    title: "Agentic AI engineers",
    desc: "Engineers building tool-using, multi-step AI systems with guardrails.",
    icon: Bot,
    image: "/images/gcc-operations/operating-reality/14-bot.jpg",
  },
  {
    title: "Data engineers",
    desc: "Pipeline, lakehouse and data-product engineers the rest of the mandate depends on.",
    icon: Database,
    image: "/images/gcc-operations/operating-reality/07-performance.jpg",
  },
  {
    title: "MLOps engineers",
    desc: "The scarcest layer in most cities: deployment, monitoring and lifecycle.",
    icon: Activity,
    image: "/images/gcc-operations/operating-reality/05-devices.jpg",
  },
  {
    title: "AI platform engineers",
    desc: "Shared platform, feature store, model serving and cost control.",
    icon: Server,
    image: "/images/gcc-operations/operating-reality/06-vendors.jpg",
  },
  {
    title: "Product engineers",
    desc: "Full-stack and backend engineers who ship AI features into real products.",
    icon: Code,
    image: "/images/gcc-operations/operating-reality/08-reporting.jpg",
  },
  {
    title: "Cloud and platform talent",
    desc: "Cloud, security and infrastructure engineers who make the rest possible.",
    icon: Cloud,
    image: "/images/gcc-operations/operating-reality/09-risk.jpg",
  },
];

const incentiveCategories: Array<[string, string, string]> = [
  ["Capital and infrastructure support", "Often tied to minimum investment, headcount or location within the state; may be time-bound.", "Included in the case only after specialist validation of eligibility."],
  ["Rent or lease support", "Commonly limited to eligible parks or zones and to a fixed period.", "Modelled as a scenario, never as the base case."],
  ["Employment-linked incentives", "Usually conditional on hiring residents of the state and on sustained headcount.", "Compared against the talent fit first; never used to pick the city."],
  ["Training and skilling support", "May require accredited programs or partnerships.", "Useful for upskilling plans in AI and data roles."],
  ["Stamp duty, registration or utility concessions", "Vary by state and by the nature of the investment.", "Handled with the entity and workplace workstreams."],
];

const statePolicyImages: Record<string, string> = {
  Karnataka: "/images/gcc-operations/gcc-ops-workplace.jpg",
  Gujarat: "/images/gcc-operations/standards/continuity_building.jpg",
  "Uttar Pradesh": "/images/gcc-operations/scope-workspace.jpg",
  Maharashtra: "/images/how_we_work/phase_02_build.jpg",
  "Tamil Nadu": "/images/gcc-operations/gcc-setup-card.jpg",
};

const locationFlow = [
  { label: "Mandate", note: "Define the capabilities India will own", icon: Layers, href: `${R.strategy}#mandate` },
  { label: "Role mix", note: "Identify required seniority and skills", icon: Users, href: "#ai-talent-depth" },
  { label: "Talent depth", note: "Evaluate city depth against roles", icon: Cpu, href: "#location-matrix" },
  { label: "Cost", note: "Benchmark compensation and real estate", icon: Building, href: GCC_TOOL_LINKS.costCalculator.href },
  { label: "Attrition", note: "Assess competition and retention risk", icon: Activity, href: "#criteria" },
  { label: "Ecosystem", note: "Review connectivity and peer GCC density", icon: Compass, href: "#location-matrix" },
  { label: "Infrastructure", note: "Check workspace and airport access", icon: MapPin, href: "#location-matrix" },
  { label: "Policy", note: "Validate state GCC policy eligibility", icon: Landmark, href: "#state-incentives" },
  { label: "City decision", note: "Shortlist city or hub-and-spoke model", icon: Award, href: "#location-matrix" },
];

export default function LocationStrategy() {
  return (
    <GccStrategyPageLayout>
      {/* 1. Hero */}
      <GccStrategyHero
        eyebrow="GCC Location Strategy"
        title="Choose the city around the mandate, not the postcode."
        description="NeoIntelli evaluates Indian GCC locations at the role level: AI and data talent depth, leadership availability, compensation, attrition, infrastructure, ecosystem, real estate and policy, so the city you choose still fits the center in year three."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: R.overview },
          { name: GCC_STRATEGY_PILLAR_LABEL, href: R.overview },
          { name: "Location Strategy" },
        ]}
        primaryCta={{ label: "Compare GCC Locations", href: bookACallUrl("hero") }}
        secondaryCta={{ label: "See the city comparison", href: "#location-matrix" }}
        contextualLink={{ label: "Mandate not settled yet? Start with Strategy & Business Case", href: R.strategy }}
        leadContext={leadContext}
      />

      {/* 2. Subnav */}
      <GccStrategySubnav />

      <main id="gcc-strategy-content" className="scroll-mt-32">
        {/* 3. In Brief */}
        <InBrief heading="In brief">
          The best GCC location in India depends on the work the center will own. A city that works well for high-volume
          operations may not be the best choice for senior AI, product or platform engineering. NeoIntelli evaluates Bengaluru,
          Hyderabad, Pune, Chennai, NCR, Mumbai and emerging hubs using role-level talent depth, compensation, attrition,
          infrastructure, ecosystem maturity, real estate, policy environment and long-term scaling requirements, and recommends
          one city, or a hub-and-spoke pair, for the mandate.
        </InBrief>

        {/* 4. How NeoIntelli Evaluates a GCC Location (Outcome Framework Style) */}
        <Section
          id="framework"
          eyebrow="EVALUATION CRITERIA"
          title="How NeoIntelli evaluates a GCC location"
          lead="Cost per seat is one input in a much longer list. The evaluation starts from the mandate and the role mix, because a city is only cheap if it can actually staff the roles you need at the seniority you need, and keep them."
          width="wide"
          align="center"
        >
          <div id="criteria" className="scroll-mt-32" />
          <OutcomeCardGrid
            items={criteriaGroups.map((group) => ({
              title: group.title,
              badge: group.badge,
              aspect: group.aspect,
              image: group.image,
              alt: group.alt,
              lists: [{ items: group.items }],
            }))}
            columns={4}
            maxWidthClassName="max-w-7xl mx-auto"
          />
        </Section>

        {/* 5. A generic IT talent index is not enough for an AI GCC (CapabilitiesSection Style) */}
        <CapabilitiesSection
          id="ai-talent-depth"
          eyebrow="TALENT DEPTH"
          title="A generic IT talent index is not enough for an AI GCC."
          lead="Two cities with a similar number of software engineers can differ sharply in the roles an AI or data mandate needs. NeoIntelli assesses availability role by role, using its own AI and data hiring activity as well as public ecosystem information, because that is where location decisions go wrong for AI-heavy centers."
          columns={3}
          items={aiRoles.map((r) => ({
            title: r.title,
            desc: r.desc,
            icon: r.icon,
          }))}
          footer={
            <div className="mt-8 text-center max-w-4xl mx-auto">
              <p className="text-xs sm:text-sm text-[#505D74] leading-relaxed">
                Hiring for these roles is its own discipline.{" "}
                <Link
                  to={AI_PILLAR_LINKS.aiTalent.href}
                  className="text-[#008EC4] font-semibold underline decoration-[#008EC4]/30 hover:decoration-[#008EC4] hover:text-[#0D306C] transition-colors"
                >
                  NeoIntelli&apos;s AI Talent service
                </Link>{" "}
                sources and technically validates AI and data engineers city by city, and when AI is the center&apos;s mandate,{" "}
                <Link
                  to={AI_PILLAR_LINKS.aiGcc.href}
                  className="text-[#008EC4] font-semibold underline decoration-[#008EC4]/30 hover:decoration-[#008EC4] hover:text-[#0D306C] transition-colors"
                >
                  the AI GCC service
                </Link>{" "}
                designs the center around that talent from the start.
              </p>
            </div>
          }
        />

        {/* 6. City Comparison Matrix */}
        <Section
          id="location-matrix"
          eyebrow="CITY COMPARISON"
          title="India GCC city comparison"
          lead="A qualitative comparison of the main hubs against the criteria that decide fit. Every city listed is covered by NeoIntelli's market analysis; where NeoIntelli itself operates is stated separately below the table, because the two are not the same thing."
          width="wide"
          align="center"
        >
          <div className="max-w-7xl mx-auto">
            <LocationDecisionMatrix />
          </div>
        </Section>

        {/* 7. Proprietary Talent Intelligence */}
        <Section
          id="hiring-data"
          eyebrow="PROPRIETARY TALENT INTELLIGENCE"
          title="Role-level hiring data, by city, from NeoIntelli's own talent engine"
          width="regular"
          align="center"
          headerClassName="max-w-5xl"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">
            {/* Left side: narrative sentence */}
            <div className="flex flex-col justify-center text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal text-left pr-0 lg:pr-4">
              <p>
                NeoIntelli&apos;s AI Talent engine records how AI and data hiring actually behaves in each city: how many
                qualified candidates each role attracts, what offers close at, how long a shortlist takes. That data is being
                prepared for publication against the same columns as the comparison above. Until it is published with its
                method and date, this page states only the qualitative assessment.
              </p>
            </div>

            {/* Right side: Navy rectangle div with sharp corners */}
            <div className="relative bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] border border-[#16427D]/60 p-6 sm:p-8 text-white shadow-lg shadow-[#081B3E]/15 flex flex-col justify-between">
              {/* Ambient cyan glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#169DC8]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="pb-3.5 mb-5 border-b border-[#16427D]/70">
                  <span className="block text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#38BDF8]">
                    Planned measures, by city and role
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5">
                  {/* Column 1 */}
                  <ul className="space-y-3.5 list-none pl-0 mb-0">
                    {plannedMeasuresCol1.map((measure) => (
                      <li key={measure} className="flex items-start gap-2.5">
                        <ArrowRight className="w-4 h-4 text-[#38BDF8] mt-0.5 shrink-0" aria-hidden="true" />
                        <span className="text-xs sm:text-[13.5px] font-semibold text-slate-100 leading-snug">
                          {measure}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Column 2 */}
                  <ul className="space-y-3.5 list-none pl-0 mb-0">
                    {plannedMeasuresCol2.map((measure) => (
                      <li key={measure} className="flex items-start gap-2.5">
                        <ArrowRight className="w-4 h-4 text-[#38BDF8] mt-0.5 shrink-0" aria-hidden="true" />
                        <span className="text-xs sm:text-[13.5px] font-semibold text-slate-100 leading-snug">
                          {measure}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 8. State Policies & Incentives */}
        <Section
          id="state-incentives"
          eyebrow="STATE INCENTIVES"
          title="How state GCC policies fit into the decision"
          width="wide"
          align="center"
        >
          {/* Below description in sentences */}
          <div className="max-w-5xl mx-auto text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal space-y-6 sm:space-y-7 text-left mb-8 sm:mb-10">
            <p>
              Several Indian states have published or announced GCC-specific policies since 2024, and the set
              is still changing. Where a company is eligible, these policies may offer support in the categories
              below. They can improve the economics of a shortlisted city. They should not select the city: an
              incentive that pays for a center that cannot hire its roles is a poor trade.
            </p>
            <p>
              NeoIntelli&apos;s position is simple. Talent fit first, incentives second, and no incentive enters the
              business case until qualified tax and legal advisers have confirmed eligibility against the current
              version of the policy. Nothing on this page is a promise that any incentive will be received.
            </p>
          </div>

          {/* Table Design using same component ResponsiveMatrix */}
          <div className="max-w-5xl mx-auto mb-4">
            <ResponsiveMatrix
              caption="State GCC policy incentive categories, eligibility caveats, and NeoIntelli treatment in the business case"
              rowHeader="Incentive category"
              columns={["Typical eligibility caveat", "How NeoIntelli treats it"]}
              rows={incentiveCategories.map(([category, typical, treatment]) => ({
                label: category,
                cells: [typical, treatment],
              }))}
            />
          </div>

          {/* Centered Source Note below table */}
          <p className="text-center text-xs text-[#505D74] leading-relaxed max-w-4xl mx-auto mt-4 mb-12">
            <span className="font-semibold text-[#0D306C]">Source:</span> Official state government policy documents
            for each shortlisted state. Last checked Sep 2026. Policy names, amounts, and conditions are confirmed from
            the current official document for each shortlisted state during the engagement and are not reproduced here,
            because they change. Availability is subject to eligibility and requires specialist tax and legal validation.
          </p>

          {/* Examples of current state GCC frameworks */}
          <div className="max-w-5xl mx-auto mb-10">
            <h4 className="text-lg sm:text-xl font-bold font-manrope text-[#0D306C] mb-5 text-center sm:text-left">
              Examples of current state GCC frameworks
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {STATE_GCC_POLICIES.map((p) => {
                const img = statePolicyImages[p.state] || "/images/gcc-operations/standards/continuity_building.jpg";
                return (
                  <motion.div
                    key={p.state}
                    whileHover={{ y: -3 }}
                    className="group relative rounded-2xl overflow-hidden border border-[#38BDF8]/25 hover:border-[#38BDF8]/55 bg-[#051329] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(22,157,200,0.14)] min-h-[140px]"
                  >
                    {/* Background Image with Editorial Navy Overlay */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                      <img
                        src={img}
                        alt={`${p.state} GCC policy location`}
                        className="w-full h-full object-cover object-center opacity-40 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#051329] via-[#051329]/85 to-[#0A224E]/40" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#051329]/95 via-[#051329]/50 to-transparent" />
                      <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#38BDF8]/10 rounded-full blur-xl pointer-events-none" />
                    </div>

                    {/* Cyan accent bar */}
                    <div className="relative z-10 w-5 h-[2px] bg-[#38BDF8]/60 rounded-full group-hover:w-9 group-hover:bg-[#38BDF8] transition-all duration-300" />

                    {/* State & Policy details */}
                    <div className="relative z-10 mt-3">
                      <h5 className="text-white font-bold text-sm sm:text-base leading-snug tracking-tight font-manrope group-hover:text-white transition-colors">
                        {p.state}
                      </h5>
                      <p className="text-[#C5D7F0] text-xs sm:text-[13px] leading-relaxed font-normal mt-1.5 line-clamp-3">
                        {p.policy}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <p className="text-center text-2xs sm:text-xs text-[#505D74] mt-5 leading-relaxed max-w-3xl mx-auto">
              Policy status checked September 2026. Eligibility, benefit amounts, qualifying investment and employment conditions
              vary by state and are validated from the latest official notification during an engagement.
            </p>
          </div>

          {/* Closing transition sentence with links */}
          <div className="text-center max-w-3xl mx-auto mt-6">
            <p className="text-xs sm:text-sm text-[#0D306C] font-medium leading-relaxed">
              Once a city is shortlisted, the economics are modelled with the{" "}
              <Link
                to={GCC_TOOL_LINKS.costCalculator.href}
                className="text-[#008EC4] font-semibold underline decoration-[#008EC4]/30 hover:decoration-[#008EC4] hover:text-[#0D306C] transition-colors"
              >
                GCC Cost Calculator
              </Link>{" "}
              and the entity, tax and incentive mechanics are worked through in{" "}
              <Link
                to={R.setup}
                className="text-[#008EC4] font-semibold underline decoration-[#008EC4]/30 hover:decoration-[#008EC4] hover:text-[#0D306C] transition-colors"
              >
                Setup & Launch
              </Link>.
            </p>
          </div>
        </Section>
        <Section
          id="flow"
          eyebrow="EVALUATION SEQUENCE"
          title="How we evaluate GCC locations"
          lead="Nine steps from mandate definition to city recommendation. Cost is weighed after talent depth, not before."
          theme="navy"
          width="wide"
          align="center"
        >
          <UniversalLifecycle
            theme="navy"
            steps={locationFlow.map((f) => ({
              title: f.label,
              desc: f.note,
              icon: f.icon,
              href: f.href,
            }))}
          />
        </Section>

        {/* 10. FAQs */}
        <Section
          id="faqs"
          eyebrow="FAQS"
          title="GCC location strategy: questions executives ask"
          lead="Direct answers to location questions from enterprise sponsors evaluating Indian tech and engineering hubs."
          width="regular"
          align="center"
        >
          <AnswerBlock items={gccLocationFaqs.map((f) => ({ question: f.q, answer: f.a }))} level={3} />
        </Section>

        {/* 11. CTA */}
        <GccStrategyCTA
          title="Choose the right Indian city for your mandate."
          description="A working session with NeoIntelli's location lead to evaluate cities against your specific role mix, compensation boundaries and scaling timeline."
          primary={{ label: "Compare GCC Locations", href: bookACallUrl("footer_cta") }}
          secondary={{ label: "Request the GCC Blueprint", href: blueprintRequestUrl({ ...leadContext, cta_name: "Request the GCC Blueprint" }) }}
          leadContext={leadContext}
        />

        {/* 12. Related Services */}
        <RelatedGccServices
          variant="overview"
          title="Continue the GCC decision journey"
          intro="Once the location is chosen, the next step is standing up the parallel workstreams to launch the center."
          primary={[
            { label: "Setup & Launch", href: R.setup, desc: "Turn the location and mandate design into an operating center across parallel workstreams.", anchor: "Plan setup and launch" },
            { label: "Strategy & Business Case", href: R.strategy, desc: "Review mandate boundaries, entry models and the board-ready financial pack.", anchor: "Review the business case" },
            { label: "Modernization & Transformation", href: R.modernization, desc: "Move an existing center to enterprise capability, ownership and AI.", anchor: "Modernize an existing GCC" },
          ]}
          secondaryTitle="Next operational steps"
          secondary={[
            { label: "AI Talent Recruitment Hub", href: "/services/ai-talent/recruitment-hub", anchor: "Hire the initial team" },
            { label: "GCC Operations Overview", href: "/services/gcc-operations", anchor: "Explore ongoing operations" },
            { label: "Cost Calculator", href: GCC_TOOL_LINKS.costCalculator.href, anchor: "Estimate location costs" },
          ]}
        />
      </main>
    </GccStrategyPageLayout>
  );
}
