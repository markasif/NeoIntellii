"use client";

import { Link } from "react-router-dom";
import {
  ChevronRight,
  Code2,
  ShieldCheck,
  Users,
  UserPlus,
  Compass,
  TrendingUp,
  GraduationCap,
  Heart,
  LogOut,
  Target,
  Building2,
  Cpu,
  Scale,
  FileText,
  Search,
  GitBranch,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  AiDeliveryTeamsPageLayout,
  AiDeliveryTeamsHero,
  AiDeliveryTeamsCTA,
  RelatedAiDeliveryServices,
  DecisionFrameworkGrid,
} from "@/components/ai-delivery-teams";
import AiDeliveryTeamsSubnav from "@/components/shared/AiDeliveryTeamsSubnav";
import InBrief from "@/components/ai-gcc/InBrief";
import Section from "@/components/ai-gcc/Section";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import HexagonArcLifecycle, {
  type HexagonLifecycleStage,
} from "@/components/shared/HexagonArcLifecycle";
import AmberChecklist from "@/components/shared/AmberChecklist";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import SmoothLineReveal from "@/components/gcc-operations/SmoothLineReveal";
import {
  AI_DELIVERY_TEAMS,
  AI_ENGINEERING_LINKS,
  ECOSYSTEM_LINKS,
  SERVICE_INTEREST,
  ctaHref,
} from "@/lib/aiDeliveryTeams";

const PATH = AI_DELIVERY_TEAMS.transfer;
const primaryCta = ctaHref({ service: SERVICE_INTEREST.transfer, cta: "Plan My AI Team Transfer", source: PATH });

const stages = [
  { step: "Build", detail: "A NeoIntelli delivery team executes against the roadmap or the outcome, so progress does not wait on hiring.", icon: Code2 },
  { step: "Stabilise", detail: "Production architecture, evaluation, observability and operating practices mature to the point where they can be handed to someone else.", icon: ShieldCheck },
  { step: "Recruit", detail: "Permanent roles are defined and filled where you want internal ownership. NeoIntelli can recruit and technically validate them.", icon: UserPlus },
  { step: "Pair", detail: "Your engineers work alongside the delivery team on real work, not on a training environment.", icon: Users },
  { step: "Shadow", detail: "Your team follows operation, incidents and release, learning how the system behaves rather than how it was described.", icon: Compass },
  { step: "Reverse shadow", detail: "Your team leads the work and the delivery team supports. This is where readiness becomes visible.", icon: TrendingUp },
  { step: "Transfer", detail: "Ownership moves when the readiness checklist is satisfied, not when a date arrives.", icon: Heart },
  { step: "Scale", detail: "The internal team continues alone, grows into a Micro GCC, or becomes part of a broader AI GCC.", icon: Target },
];

const destinationStages: HexagonLifecycleStage[] = [
  {
    id: "01",
    name: "Delivery team",
    description: "Immediate roadmap execution",
    icon: Code2,
    href: "#why",
  },
  {
    id: "02",
    name: "Stabilise",
    description: "Production & evaluation maturity",
    icon: ShieldCheck,
    href: "#not-bot",
  },
  {
    id: "03",
    name: "Recruit",
    description: "Define & validate permanent roles",
    icon: UserPlus,
    href: "#recruiting-team",
  },
  {
    id: "04",
    name: "Pair",
    description: "Engineers work on real production",
    icon: Users,
    href: "#stages",
  },
  {
    id: "05",
    name: "Shadow",
    description: "Observe operations & incidents",
    icon: Compass,
    href: "#stages",
  },
  {
    id: "06",
    name: "Reverse shadow",
    description: "Your team leads, ours supports",
    icon: TrendingUp,
    href: "#transfer-readiness",
  },
  {
    id: "07",
    name: "Transfer",
    description: "Handover verified on checklist",
    icon: LogOut,
    href: "#transfer-readiness",
  },
  {
    id: "08",
    name: "Ownership",
    description: "Internal team leads & scales",
    icon: CheckCircle2,
    href: "#recruiting-team",
  },
];

const readiness = [
  "Architecture is understood by the people who will own it",
  "Repositories and documentation are current",
  "Runbooks exist and have been used",
  "Deployment is understood end to end",
  "Production access has been transitioned",
  "Evaluation is understood and can be re-run",
  "Observability is understood and monitored by the receiving team",
  "The incident process is understood and has been exercised",
  "Dependencies are documented, including the fragile ones",
  "Security ownership is clear and assigned",
  "Client engineers have paired on real work",
  "Reverse shadowing has been completed",
  "Support transition after handover is agreed",
];

const notBot = [
  { title: "Knowledge", included: true, desc: "How the system works, why it is built that way, and what to watch." },
  { title: "Code ownership", included: true, desc: "Repositories, deployment and configuration, per the engagement agreement." },
  { title: "Operating procedures", included: true, desc: "Runbooks, incident process, evaluation and release practice." },
  { title: "Client team pairing", included: true, desc: "Your engineers inside the work, then leading it." },
  { title: "Responsibility handoff", included: true, desc: "A defined point where your team owns the outcome." },
  { title: "Entity transfer", included: false, desc: "Transferring a legal entity is a GCC matter, not an engineering handover." },
  { title: "Employment transfer", included: false, desc: "Moving employment relationships is a separate commercial and legal arrangement." },
  { title: "Office transfer", included: false, desc: "Premises and facilities are not part of an engineering capability transfer." },
  { title: "Legal or business transfer", included: false, desc: "Build-operate-transfer at entity level is a distinct engagement." },
];

const answers = [
  {
    question: "What is AI team build and transfer?",
    answer: "An engagement designed so a NeoIntelli delivery team executes now while knowledge, documentation and operating practice move progressively to your people, ending with your team owning the capability. Delivery and transfer run together rather than in sequence.",
  },
  {
    question: "How is this different from GCC build-operate-transfer?",
    answer: "AI team transfer is an engineering capability transfer: knowledge, code ownership, operating procedures, pairing and responsibility. GCC build-operate-transfer additionally involves entity, employment, premises and the legal and commercial transfer of an operation. They are separate engagements and should not be assumed to come together.",
  },
  {
    question: "Can an external AI team become our permanent capability?",
    answer: "The capability can, and the people can where you choose to recruit them. What transfers by default is the system, the practice and the knowledge. Employment arrangements for specific individuals are a separate commercial conversation.",
  },
  {
    question: "How does AI knowledge transfer actually work?",
    answer: "Through documentation and architecture decision records kept current during delivery, runbooks written by the people who operate the system, pairing on real work, shared reviews, shadowing, and reverse shadowing where your team leads and the delivery team supports.",
  },
  {
    question: "When should transfer begin?",
    answer: "Design for it at the start and begin the practice as soon as you have people to receive it. Transfer attempted only at the end of an engagement usually fails, because the knowledge was never written down while it was fresh.",
  },
  {
    question: "Can NeoIntelli hire the permanent team?",
    answer: "Yes. NeoIntelli can recruit and technically validate the permanent roles you want to own internally, and NeoHireX supports screening, ranking and structured evaluation during that process.",
  },
  {
    question: "Can the team become an AI Micro GCC?",
    answer: "Where the intent is a long-term India capability of your own, the engagement can be structured so the delivery practice carries into a Micro GCC and, later, a broader AI GCC.",
  },
  {
    question: "Who supports production after transfer?",
    answer: "That is agreed before handover. Options range from a clean cut-over to a defined support period with your team leading and NeoIntelli available. The choice is written into the transition plan rather than left open.",
  },
];

const relatedLinks = [
  { name: "Micro GCC", href: ECOSYSTEM_LINKS.microGcc, desc: "A lean India capability of your own, from 8 to 50 people." },
  { name: "AI Talent", href: ECOSYSTEM_LINKS.talent, desc: "Recruit and technically validate permanent roles for internal teams." },
  { name: "GCC as a Service", href: "/gcc-as-a-service", desc: "Turnkey GCC infrastructure, operations, facilities and compliance in India." },
  { name: "AI Solutions", href: AI_ENGINEERING_LINKS.hub, desc: "Explore enterprise AI engineering capabilities and service blueprints." },
  { name: "GCC Services", href: "/services/gcc", desc: "Strategy, business cases, location selection and setup execution for GCCs." },
];

export default function AiTeamTransfer() {
  return (
    <AiDeliveryTeamsPageLayout>
      {/* 1. Hero */}
      <AiDeliveryTeamsHero
        eyebrow="AI Team Build & Transfer · India"
        title="Build the capability now. Transfer ownership when ready."
        description="Start with NeoIntelli AI delivery capability, stabilise production, then progressively transfer knowledge and ownership to your internal team, your Micro GCC or your AI GCC."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services/gcc" },
          { name: "AI Delivery Teams", href: AI_DELIVERY_TEAMS.parent },
          { name: "AI Team Transfer" },
        ]}
        primaryCta={{ label: "Plan My AI Team Transfer", href: primaryCta }}
        secondaryCta={{ label: "See the readiness checklist", href: "#transfer-readiness" }}
        contextualLink={{
          textPrefix: "Looking for an owned center instead?",
          linkLabel: "Explore AI Micro GCC",
          href: ECOSYSTEM_LINKS.microGcc,
        }}
      />

      {/* 2. Subnav */}
      <AiDeliveryTeamsSubnav />

      <main id="ai-delivery-content" className="scroll-mt-32">
        {/* 3. In Brief */}
        <InBrief>
          AI team build and transfer is a delivery engagement designed to end in your ownership. A NeoIntelli team
          executes now, while documentation, pairing, shadowing and reverse shadowing move the capability to your
          people. It suits organisations that need AI in production before an internal team exists. Unlike a pure
          delivery engagement, the handover is designed in from the start; unlike GCC build-operate-transfer, it is an
          engineering capability transfer rather than an entity transfer.
        </InBrief>

        {/* 4. Why - Speed and ownership */}
        <Section
          id="why"
          eyebrow="POINT OF VIEW"
          title="You should not have to choose between speed and ownership."
          width="regular"
          align="center"
        >
          <SmoothLineReveal className="max-w-5xl mx-auto text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal space-y-6 sm:space-y-7 text-left">
            <p>
              The usual trade-off is uncomfortable. Hire first and the roadmap waits out the hiring cycle. Outsource and
              the capability never becomes yours.
            </p>
            <p>
              Build and transfer removes the choice by running both tracks at once. Delivery starts immediately with a
              NeoIntelli team. Recruitment, pairing and knowledge transfer run alongside it, so ownership arrives
              without a gap in progress.
            </p>
            <p>
              It only works if transfer is designed in from the beginning. Handover attempted at the end of a delivery
              engagement is a document exercise, and it is the reason most capability transfers disappoint.
            </p>
          </SmoothLineReveal>
        </Section>

        {/* 5. The Path / Stages */}
        <Section
          id="stages"
          eyebrow="THE PATH"
          title="Build, stabilise, recruit, pair, shadow, reverse shadow, transfer, scale."
          lead="Stages overlap rather than running strictly in series. No fixed transfer month is promised, because readiness depends on your people and your systems as much as on ours."
          width="wide"
        >
          <UniversalLifecycle
            steps={stages.map((s) => ({
              title: s.step,
              desc: s.detail,
              icon: s.icon,
            }))}
          />
        </Section>

        {/* 6. What Transfers and What Does Not */}
        <Section
          id="not-bot"
          eyebrow="SCOPE BOUNDARY"
          title="This is not automatically GCC build-operate-transfer."
          lead="The two are often conflated in sales conversations, and the confusion causes real problems later. AI team transfer moves engineering capability. It does not, by itself, move an entity, employment relationships, premises or a business operation."
          width="wide"
        >
          <DecisionFrameworkGrid
            leftTitle="Included in AI team transfer"
            leftItems={notBot
              .filter((item) => item.included)
              .map((item) => ({
                title: item.title,
                description: item.desc,
              }))}
            rightTitle="Not included by default"
            rightItems={notBot
              .filter((item) => !item.included)
              .map((item) => ({
                title: item.title,
                description: item.desc,
              }))}
            rightFooter={
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                If entity-level build-operate-transfer is what you need,{" "}
                <Link
                  to="/gcc-as-a-service"
                  className="text-[#38BDF8] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  GCC-as-a-Service <ChevronRight className="w-3.5 h-3.5" />
                </Link>{" "}
                covers it as a separate engagement.
              </p>
            }
          />
        </Section>

        {/* 7. Transfer Readiness Checklist */}
        <Section
          id="transfer-readiness"
          eyebrow="CHECKLIST"
          title="Transfer readiness."
          lead="Thirteen conditions. Transfer happens when they are satisfied. Use this to hold any delivery partner to account, including us."
          width="wide"
        >
          <AmberChecklist
            items={readiness}
            iconType="check"
            note="No fixed transfer month is promised. A date set before the work starts is a guess, and treating it as a commitment pushes handover through before the receiving team is ready."
          />
        </Section>

        {/* 8. Where it leads / What you own at the end */}
        <Section
          id="ownership-destination"
          eyebrow="DESTINATION"
          title="What you own at the end."
          lead="Transfer is not the finish line. It is the point where you decide how large the capability should be."
          theme="navy"
          width="wide"
          wavesOnMobile
        >
          <div className="mb-10">
            <HexagonArcLifecycle
              stages={destinationStages}
              centerTitle="OWNERSHIP"
              id="destination-hexagon-lifecycle"
            />
          </div>

          {/* Three destination cards */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto mt-10">
            {[
              { label: "Your internal team", desc: "Permanent engineers owning and operating the capability.", href: ECOSYSTEM_LINKS.talent, icon: Users },
              { label: "AI Micro GCC", desc: "A lean India capability of your own, from 8 to 50 people.", href: ECOSYSTEM_LINKS.microGcc, icon: Building2 },
              { label: "AI GCC", desc: "A complete AI capability centre with its own operating model.", href: ECOSYSTEM_LINKS.aiGcc, icon: Cpu },
            ].map((option) => (
              <Link
                key={option.label}
                to={option.href}
                className="group border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.08] hover:border-[#F19326]/50 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#F19326]/20 border border-[#F19326]/40 flex items-center justify-center text-[#F19326] shrink-0 group-hover:bg-[#F19326]/30 transition-all">
                    <option.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold font-manrope mb-1 group-hover:text-[#F19326] transition-colors">{option.label}</p>
                    <p className="text-[#C5D7F0] text-xs leading-relaxed font-normal">{option.desc}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs text-[#F19326] font-semibold">
                  <span>Explore path</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* 9. Recruiting the permanent team */}
        <Section
          id="recruiting-team"
          eyebrow="RECRUITMENT"
          title="Recruiting the team that receives it."
          width="regular"
          align="center"
        >
          <div className="max-w-6xl mx-auto text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal space-y-6 text-left">
            <p>
              Transfer needs someone to transfer to. Where you want internal ownership, NeoIntelli can recruit and
              technically validate the permanent roles: role calibration against the actual system, AI-assisted
              screening, technical assessment, senior engineering review, and validation against the delivery context.
            </p>
            <p>
              NeoHireX supports candidate screening, ranking and structured evaluation during that process. The people
              are hired by you, onto your payroll, under your terms.
            </p>
            <div className="text-center">
              <Link
                to={ECOSYSTEM_LINKS.talent}
                className="btn-gradient-primary"
              >
                <span>Hire permanent AI talent</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Section>

        {/* 10. FAQs */}
        <Section
          id="faqs"
          eyebrow="FAQS"
          title="Questions buyers actually ask."
          width="regular"
        >
          <AnswerBlock items={answers} level={3} />
        </Section>

        {/* 11. CTA */}
        <AiDeliveryTeamsCTA
          serviceInterest="AI Team Transfer"
          title="Plan the handover before the first sprint."
          description="Tell us what you want to own eventually and who will own it. We will design the delivery engagement backwards from that."
          primaryCta={{ label: "Plan My AI Team Transfer", href: primaryCta }}
          secondaryCta={{ label: "Explore AI Micro GCC", href: ECOSYSTEM_LINKS.microGcc }}
        />

        {/* 12. Connected Ecosystem */}
        <RelatedAiDeliveryServices links={relatedLinks} />
      </main>
    </AiDeliveryTeamsPageLayout>
  );
}
