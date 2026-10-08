"use client";

import { Link } from "react-router-dom";
import {
  ChevronRight,
  Check,
  Database,
  Server,
  Target,
  GitBranch,
  Rocket,
  CheckCircle2,
  Workflow,
  UserCheck,
  Bot,
  Search,
  Link2,
  Shield,
  Monitor,
  AlertTriangle,
  Users,
  BookOpen,
} from "lucide-react";
import {
  AiDeliveryTeamsPageLayout,
  AiDeliveryTeamsHero,
  AiDeliveryTeamsCTA,
  RelatedAiDeliveryServices,
} from "@/components/ai-delivery-teams";
import AiDeliveryTeamsSubnav from "@/components/shared/AiDeliveryTeamsSubnav";
import InBrief from "@/components/ai-gcc/InBrief";
import Section from "@/components/ai-gcc/Section";
import ResponsiveTable from "@/components/ai-gcc/ResponsiveTable";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import SmoothLineReveal from "@/components/gcc-operations/SmoothLineReveal";
import DeliverablesList from "@/components/ai-gcc/DeliverablesList";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import CapabilityGrid from "@/components/gcc-operations/CapabilityGrid";
import AmberChecklist from "@/components/shared/AmberChecklist";
import {
  AI_DELIVERY_TEAMS,
  AI_ENGINEERING_LINKS,
  ECOSYSTEM_LINKS,
  SERVICE_INTEREST,
  ctaHref,
} from "@/lib/aiDeliveryTeams";

const PATH = AI_DELIVERY_TEAMS.fde;
const primaryCta = ctaHref({ service: SERVICE_INTEREST.fde, cta: "Discuss Forward-Deployed Engineering", source: PATH });

const proximity = [
  { text: "Business workflow", icon: Workflow },
  { text: "The people who will use it", icon: Users },
  { text: "The data as it actually is", icon: Database },
  { text: "Repositories and code standards", icon: GitBranch },
  { text: "APIs and internal services", icon: Link2 },
  { text: "Identity, permissions and security constraints", icon: Shield },
  { text: "Production systems and environments", icon: Server },
  { text: "Deployment and release process", icon: Rocket },
  { text: "The success metric the work is judged on", icon: Target },
];

const responsibilities = [
  { title: "Scope the production use case", desc: "Turn an ambition into something that can be built, evaluated and operated.", icon: Target },
  { title: "Map the workflow", desc: "Understand what people do today, where the AI fits, and what has to change around it.", icon: Workflow },
  { title: "Integrate enterprise systems", desc: "Connect to the systems of record that make the output actionable rather than informational.", icon: Server },
  { title: "Connect data", desc: "Get to the real data, at the real quality, through an approved route.", icon: Database },
  { title: "Implement agents", desc: "Build the orchestration, tool use and control logic the workflow requires.", icon: Bot },
  { title: "Implement retrieval", desc: "Design and tune retrieval so the system answers from the right context.", icon: Search },
  { title: "Connect tools and APIs", desc: "Wire the actions the system is allowed to take, with the right guardrails.", icon: Link2 },
  { title: "Handle authentication", desc: "Identity and permissions so the AI sees only what the user is entitled to see.", icon: Shield },
  { title: "Build evaluation", desc: "Create the test sets and harnesses that make quality measurable in this context.", icon: CheckCircle2 },
  { title: "Deploy", desc: "Ship into production under your release process and controls.", icon: Rocket },
  { title: "Observe", desc: "Instrument inputs, outputs, cost, latency and failures so behaviour is visible.", icon: Monitor },
  { title: "Resolve production edge cases", desc: "The long tail that only appears once real users arrive.", icon: AlertTriangle },
  { title: "Support rollout", desc: "Work with the business through adoption, not just go-live.", icon: Users },
  { title: "Transfer knowledge", desc: "Leave documentation, runbooks and people who can operate it.", icon: BookOpen },
];

const notAnFde = [
  { label: "A contractor renamed", desc: "Someone assigned to tickets, without access to the workflow, the data or the deployment path, is a contractor whatever the title says." },
  { label: "A staff augmentation engineer", desc: "Working under your leads on scoped tasks is a valid model. It is not forward-deployed engineering." },
  { label: "A solutions consultant", desc: "Advising on architecture and building slides is useful work. It is not the same as owning the production result." },
];

const fdeVsSolutions = [
  { dimension: "Typical purpose", se: "Support discovery, solution design and evaluation", fde: "Get a working system into production in the client environment" },
  { dimension: "Main output", se: "Solution design, demonstrations, technical guidance", fde: "Production code, integrations, evaluation and deployment" },
  { dimension: "Relationship to the codebase", se: "Prototypes and reference implementations", fde: "Production code in the client's repositories, where agreed" },
  { dimension: "Workflow involvement", se: "Understands the workflow to design for it", fde: "Changes what happens in the workflow" },
  { dimension: "After go-live", se: "Usually hands over", fde: "Observes, resolves edge cases, supports rollout" },
];

const fdeVsPod = [
  { dimension: "Unit", fde: "One or a few deeply embedded specialists", pod: "A cross-functional team" },
  { dimension: "Bounded by", fde: "The production problem", pod: "A written charter and acceptance criteria" },
  { dimension: "Best where", fde: "Ambiguity and integration complexity dominate", pod: "The outcome can be defined and accepted" },
  { dimension: "Working environment", fde: "Inside the client's product, systems and workflow", pod: "Inside the client's delivery system" },
  { dimension: "Typical trigger", fde: "A pilot exists but will not reach production", pod: "A new outcome needs building end to end" },
];

const readinessQuestions = [
  "Does the AI work on data that represents production, not a curated sample?",
  "Is evaluation defined, and does someone own the result?",
  "Are permissions and identity clear for every system the AI touches?",
  "Are the integrations production-ready, or demo-ready?",
  "Are the failure modes known, and is behaviour on failure defined?",
  "Is human escalation defined for the cases the system should not decide?",
  "Is observability available for inputs, outputs, cost and latency?",
  "Is the cost per request or task understood at expected volume?",
  "Is rollback possible without losing data or state?",
  "Is operating ownership clear once the system is live?",
];

const measurement = [
  { title: "Time from pilot to production", desc: "Whether the thing that already worked in a notebook is now serving users." },
  { title: "Integrations completed and stable", desc: "Not connected once, but running without manual intervention." },
  { title: "Evaluation results in production", desc: "Quality measured on real traffic, not only on the test set." },
  { title: "Edge cases resolved", desc: "The long tail closing over time rather than accumulating." },
  { title: "Adoption in the workflow", desc: "Whether the intended users chose to keep using it." },
  { title: "Operational readiness", desc: "Whether your team can run it without the engineer in the room." },
];

const answers = [
  {
    question: "What is a Forward-Deployed Engineer?",
    answer: "A Forward-Deployed Engineer is an engineer who works inside a client's environment rather than at a distance from it, building and shipping software in the client's systems and workflow. The term is used differently across organisations, and what it means in practice depends on how much access and ownership the role is given.",
  },
  {
    question: "What is a Forward-Deployed AI Engineer?",
    answer: "A Forward-Deployed AI Engineer is a hands-on engineer who works closely inside a client's product, engineering and business environment to turn AI capability into a production system. The role combines software and AI engineering with integration, workflow understanding and responsibility for getting AI operating under real customer constraints.",
  },
  {
    question: "How is an FDE different from a software engineer?",
    answer: "Most of the engineering skill is the same. The difference is context and scope: an FDE works where the business problem is, takes on ambiguity that has not been specified away, and is accountable for the system working in the client's environment rather than for completing assigned tickets.",
  },
  {
    question: "How is an FDE different from a solutions engineer?",
    answer: "A solutions engineer typically supports technical discovery, pre-sales, solution design and demonstration. An FDE typically goes further into production code, integration, deployment, workflow adaptation and operationalisation. Exact role boundaries vary between organisations, so it is worth agreeing the scope explicitly rather than relying on the title.",
  },
  {
    question: "How is an FDE different from a consultant?",
    answer: "A consultant is usually accountable for advice and design. An FDE is accountable for a working system. Both can be the right choice, and the failure mode is buying one while expecting the other.",
  },
  {
    question: "How is an FDE different from staff augmentation?",
    answer: "Staff augmentation supplies capacity against roles you define and manage. Forward-deployed engineering supplies engineers who take on the ambiguous, integration-heavy part of getting AI into production, with proximity to the workflow and the users as a condition of the model working.",
  },
  {
    question: "FDE or an AI delivery pod?",
    answer: "Use forward-deployed engineers when the model already works and the obstacle is the surrounding system, ambiguity or workflow. Use a pod when a definable outcome needs building end to end by a cross-functional team. They coexist: a pod builds the capability, forward-deployed engineers land it in a difficult environment.",
  },
  {
    question: "Do FDEs write production code?",
    answer: "Yes, that is the point of the model. Where agreed and approved by your security process, they work in your repositories under your review and release standards.",
  },
  {
    question: "When does a company need FDEs?",
    answer: "Usually when a pilot exists and stalls: the demo convinces, but data access, identity, integrations, evaluation, reliability or adoption stop it becoming a system anyone depends on.",
  },
  {
    question: "Why is forward-deployed engineering relevant to Agentic AI?",
    answer: "Agents act. Acting means tools, permissions, systems of record, failure handling and escalation, all of which are specific to your environment. The distance between an agent that demonstrates well and an agent that can be trusted to act is mostly integration and constraint work, done in place.",
  },
  {
    question: "How should FDE performance be measured?",
    answer: "By whether the system reached production and stayed there: integrations stable, evaluation results holding on real traffic, edge cases closing, adoption in the workflow, and your team able to operate it. Not by hours or tickets.",
  },
];

const relatedLinks = [
  { name: "AI Solutions", href: AI_ENGINEERING_LINKS.hub, desc: "Explore AI solution blueprints and engineering capabilities across our practice." },
  { name: "Generative AI", href: AI_ENGINEERING_LINKS.genai, desc: "Enterprise Generative AI, retrieval, agents, and production evaluation." },
  { name: "MLOps & LLMOps", href: AI_ENGINEERING_LINKS.mlops, desc: "Production observability, model lifecycle management, and cost control." },
  { name: "AI Agents & Automation", href: "/services/ai-engineering/ai-agents-automation", desc: "Autonomous agent architectures, tool execution, and guardrails." },
  { name: "Data Engineering", href: AI_ENGINEERING_LINKS.data, desc: "Pipelines, retrieval data foundations, and vector architectures." },
];

export default function ForwardDeployedAiEngineers() {
  return (
    <AiDeliveryTeamsPageLayout>
      {/* 1. Hero */}
      <AiDeliveryTeamsHero
        eyebrow="Forward-Deployed AI Engineering"
        title="Embed AI engineers where the production problem lives."
        description="Engineers who work inside your repositories, systems and workflows to integrate, productionise and scale Generative and Agentic AI, where the difficult part is no longer the model."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services/gcc" },
          { name: "AI Delivery Teams", href: AI_DELIVERY_TEAMS.parent },
          { name: "Forward-Deployed AI Engineers" },
        ]}
        primaryCta={{ label: "Discuss Forward-Deployed Engineering", href: primaryCta }}
        secondaryCta={{ label: "FDE, pod or solutions engineer", href: "#fde-vs" }}
        contextualLink={{
          textPrefix: "Cross-functional team instead?",
          linkLabel: "Explore AI Delivery Pod",
          href: AI_DELIVERY_TEAMS.pod,
        }}
      />

      {/* 2. Subnav */}
      <AiDeliveryTeamsSubnav />

      <main id="ai-delivery-content" className="scroll-mt-32">
        {/* 3. In Brief */}
        <InBrief>
          Forward-deployed AI engineering places engineers inside your product, engineering and business environment to turn AI capability into a production system. It suits organisations whose pilot works but will not land, usually because of data access, identity, integration, evaluation or adoption. The engineer works in your systems and workflow rather than beside them. Unlike a consultant, the deliverable is a running system; unlike staff augmentation, the ambiguity is part of the job.
        </InBrief>

        {/* 4. Definition */}
        <Section
          id="definition"
          eyebrow="AI DELIVERY TEAM"
          title="What is a Forward-Deployed AI Engineer?"
          width="regular"
          align="center"
        >
          <SmoothLineReveal className="max-w-5xl mx-auto text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal space-y-6 sm:space-y-7 text-left">
            <p>
              A Forward-Deployed AI Engineer is a hands-on engineer who works closely inside a client's product, engineering and business environment to turn AI capability into a production system. The role combines software and AI engineering with integration, workflow understanding and responsibility for getting AI operating under real customer constraints.
            </p>
            <p>
              The role exists because a growing share of enterprise AI difficulty is not model difficulty. It is the distance between a capability that works in a controlled setting and a system that works where the business actually operates.
            </p>
          </SmoothLineReveal>
        </Section>

        {/* 5. Point of View / Why now */}
        <Section
          id="point-of-view"
          eyebrow="POINT OF VIEW"
          title="Why the model is getting attention."
          width="regular"
          align="center"
        >
          <SmoothLineReveal className="max-w-5xl mx-auto text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal space-y-6 sm:space-y-7 text-left">
            <p>
              Enterprise AI is moving from experimentation toward embedded production deployment. As it does, the constraint moves too. Demonstrating the model stops being the hard part; integrating it into real systems and workflows becomes the hard part.
            </p>
            <p>
              Forward-deployed engineering is particularly useful in exactly that situation. It is not a replacement for consulting, for product engineering or for internal teams, and claims that it makes those obsolete are not worth taking seriously.
            </p>
            <p>
              It is a staffing and accountability model matched to a specific class of problem: high ambiguity, high integration complexity, and a production target that has already been missed once.
            </p>
          </SmoothLineReveal>
        </Section>

        {/* 6. Proximity */}
        <Section
          id="proximity"
          eyebrow="PROXIMITY"
          title="Do not rename contractors as FDEs."
          lead="The label is being applied loosely across the market. A credible forward-deployed engineer needs proximity to all of the following, or the model does not do what it claims to do."
          width="wide"
          align="center"
        >
          <DeliverablesList items={proximity} />

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mt-10">
            {notAnFde.map((item) => (
              <div
                key={item.label}
                className= "border border-[#D2DCF0]/80 bg-[#051641] p-6 shadow-xs flex flex-col hover:border-[#169DC8]/40 hover:shadow-sm transition-all"
              >
                <p className="text-2xs uppercase tracking-[0.16em] text-[#F19326] font-mono font-bold mb-3">Not an FDE</p>
                <h3 className="text-white font-bold font-manrope text-base mb-2">{item.label}</h3>
                <p className="text-white text-xs sm:text-sm leading-relaxed font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 7. Journey Visual (Where the work happens) */}
        <Section
          id="where-work-happens"
          eyebrow="WORKFLOW"
          title="Where the work happens."
          lead="The model starts from the real environment rather than from a specification of it. That is the whole difference."
          theme="navy"
          width="wide"
        >
          <UniversalLifecycle
            theme="navy"
            variant="navy"
            steps={[
              { name: "Real workflow", icon: Workflow },
              { name: "Real data", icon: Database },
              { name: "Real systems", icon: Server },
              { name: "FDE", icon: Target },
              { name: "Integration", icon: GitBranch },
              { name: "Production", icon: Rocket },
              { name: "Measured outcome", icon: CheckCircle2 },
            ]}
          />
        </Section>

        {/* 8. Responsibilities */}
        <Section
          id="responsibilities"
          eyebrow="RESPONSIBILITIES"
          title="What the work actually involves."
          lead="Not every engagement includes all of this. The list is what forward-deployed AI engineering can cover once the environment is open to it."
          width="wide"
          align="center"
        >
          <CapabilityGrid
            variant="ai"
            rowPattern={[5, 5, 4]}
            items={responsibilities.map((r) => ({
              title: r.title,
              desc: r.desc,
              icon: r.icon,
            }))}
          />
        </Section>

        {/* 9. Comparisons */}
        <Section
          id="fde-vs"
          eyebrow="COMPARISON"
          title="FDE, solutions engineer, or pod?"
          lead="Role definitions vary between organisations, so treat these as the common pattern rather than a standard. Agree the scope explicitly in any engagement."
          width="wide"
        >
          <div className="max-w-5xl mx-auto space-y-12">
            <div>
              <h3 className="text-[#0D306C] font-manrope font-bold text-lg sm:text-xl mb-4">
                Forward-deployed engineer and solutions engineer
              </h3>
              <ResponsiveTable
                caption="How a forward-deployed AI engineer typically differs from a solutions engineer"
                headers={["Dimension", "Solutions engineer", "Forward-deployed AI engineer"]}
                rows={fdeVsSolutions.map((row) => [row.dimension, row.se, row.fde])}
              />
            </div>

            <div>
              <h3 className="text-[#0D306C] font-manrope font-bold text-lg sm:text-xl mb-4">
                Forward-deployed engineer and AI delivery pod
              </h3>
              <ResponsiveTable
                caption="How forward-deployed AI engineers differ from an AI delivery pod"
                headers={["Dimension", "Forward-deployed engineers", "AI delivery pod"]}
                rows={fdeVsPod.map((row) => [row.dimension, row.fde, row.pod])}
              />
              <p className="text-[#505D74] text-sm leading-relaxed mt-6 max-w-3xl">
                The two often run together. A pod builds the capability against a charter; forward-deployed engineers land it in an environment where integration, permissions and workflow change are the real work.{" "}
                <Link to={AI_DELIVERY_TEAMS.pod} className="text-[#008EC4] font-semibold hover:underline inline-flex items-center gap-1">
                  See the AI Delivery Pod model <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </p>
            </div>
          </div>
        </Section>

        {/* 10. Production Readiness Checklist */}
        <Section
          id="readiness"
          eyebrow="CHECKLIST"
          title="Is the pilot actually ready for production?"
          lead="Ten questions. Each no is a scope item for the engagement rather than a verdict on the pilot."
          width="wide"
        >
          <AmberChecklist items={readinessQuestions} />
        </Section>

        {/* 11. Measurement */}
        <CapabilitiesSection
          id="measurement"
          eyebrow="MEASUREMENT"
          title="How to measure a forward-deployed engineer."
          lead="Not by hours, tickets or utilisation. The role exists to close a gap, and the gap is measurable."
          items={measurement.map((m) => ({
            title: m.title,
            desc: m.desc,
          }))}
          columns={3}
        />

        {/* 12. Access, Security and IP */}
        <Section
          id="access-security-ip"
          eyebrow="SECURITY & IP"
          title="Access, security and IP."
          width="regular"
          align="center"
        >
          <SmoothLineReveal className="max-w-5xl mx-auto text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal space-y-6 sm:space-y-7 text-left">
            <p>
              This model depends on access, which makes the access model part of the engagement design rather than an afterthought. Access is granted by you, on least privilege, through your approval process. Secrets management, environment isolation and the scope of production access follow your security standards and are defined before delivery begins.
            </p>
            <p>
              Client-specific deliverables, NeoIntelli pre-existing IP, reuse rights and assignment terms are defined in the engagement agreement before delivery begins. Where you expect full assignment of deliverables, that is written into the agreement.
            </p>
          </SmoothLineReveal>
        </Section>

        {/* 13. FAQs */}
        <Section
          id="faqs"
          eyebrow="FAQS"
          title="Questions buyers actually ask."
          width="regular"
        >
          <AnswerBlock items={answers} level={3} />
        </Section>

        {/* 14. CTA */}
        <AiDeliveryTeamsCTA
          serviceInterest="Forward-Deployed AI Engineers"
          title="Tell us where the pilot stopped."
          description="Describe what works today, what it is meant to do in production, and what has blocked it. We will tell you whether forward-deployed engineering is the right answer, or whether something else is."
          primaryCta={{ label: "Discuss Forward-Deployed Engineering", href: primaryCta }}
          secondaryCta={{ label: "Explore AI Micro GCC", href: ECOSYSTEM_LINKS.microGcc }}
        />

        {/* 15. Connected Ecosystem */}
        <RelatedAiDeliveryServices links={relatedLinks} />
      </main>
    </AiDeliveryTeamsPageLayout>
  );
}
