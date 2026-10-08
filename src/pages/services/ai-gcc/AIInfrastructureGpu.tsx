import { Link } from "react-router-dom";
import { AiGccPageLayout, Section, InBrief, CapabilityGrid, AnswerBlock, AdvisoryProcessFlow, GpuComputeComparison, SplitValuePointOfView } from "@/components/ai-gcc";
import { AI_GCC_CONTEXT_LINKS, AI_GCC_PAGE_BY_KEY } from "@/data/aiGcc";
import { aiGccBookingUrl } from "@/lib/aiGccCta";

const PAGE = AI_GCC_PAGE_BY_KEY.infrastructure;

const FLOW = [
  { label: "Development", detail: "Developer environments, model and API access, vector infrastructure, experiment tracking." },
  { label: "Training and fine-tuning", detail: "GPU capacity planning, pipelines, storage, checkpoint management." },
  { label: "Inference", detail: "Serving, autoscaling, model gateways, observability, security." },
];

const ENVIRONMENTS = ["Cloud on-demand", "Cloud reserved", "Dedicated GPU", "Hybrid"];

const DECISION_FACTORS = ["Model size", "Training vs inference", "Fine-tuning", "Utilization", "Latency", "Data sensitivity", "Residency", "Concurrency", "Budget", "Existing cloud architecture", "Engineering workflow"];

const CAPABILITIES = [
  { title: "Workload and capacity planning", body: "Model the development, training, fine-tuning and inference demand of the actual use-case portfolio, with utilization assumptions the finance team can challenge." },
  { title: "GPU sourcing strategy", body: "Cloud on-demand, cloud reserved, dedicated or hybrid, chosen per workload. Where dedicated capacity is justified, NeoIntelli sources it from providers; NeoIntelli does not operate its own GPU data centers." },
  { title: "Development environments", body: "Standardized AI developer environments with model and API access, vector stores, notebooks, experiment tracking and secrets handled properly." },
  { title: "Training and fine-tuning", body: "Distributed training and fine-tuning pipelines, data loading, checkpointing, artifact management and cost tracking per run." },
  { title: "Inference", body: "Serving stacks for models and agents, autoscaling, model gateways with routing and fallbacks, latency budgets and capacity reservations where needed." },
  { title: "Storage and network", body: "Object and high-throughput storage for datasets and checkpoints, and the network design that keeps GPUs fed and data inside its residency boundary." },
  { title: "MLOps integration", body: "Infrastructure exposed through the MLOps, LLMOps and AgentOps layer, so deployment, evaluation and observability do not depend on which environment a workload runs in." },
  { title: "AI FinOps", body: "Cost per training run, per model and per task, utilization dashboards, reservation management and the reviews that stop idle GPUs from becoming a line item nobody owns." },
  { title: "Security", body: "Identity and access for compute, isolation for sensitive workloads, secrets and key management, and controls aligned to the client's security policy and residency needs." },
];

const FAQ = [
  {
    question: "Does an AI GCC need dedicated GPUs?",
    answer: "Not automatically. Most first squads run on cloud on-demand or reserved capacity. Dedicated GPUs make sense when utilization is sustained and high, when data isolation or residency demands it, or when latency-sensitive inference cannot tolerate shared capacity.",
    detail: ["Dedicated GPUs are not automatically cheaper than cloud GPUs. Utilization determines the economics. A dedicated cluster that idles half the time is more expensive than the cloud it replaced."],
  },
  {
    question: "Does NeoIntelli own GPU data centers?",
    answer: "No. NeoIntelli designs, sources, provisions and operates infrastructure across cloud providers and specialist GPU providers. Where dedicated capacity is justified it is sourced and operated for you, not sold from NeoIntelli-owned facilities.",
  },
  {
    question: "How is GPU cost estimated?",
    answer: "From the workload: model sizes, training and fine-tuning runs, inference volume and latency, and the utilization you can realistically sustain. NeoIntelli does not quote fixed GPU prices on this page because they change by provider, region, accelerator and commitment.",
  },
  {
    question: "Can inference run in India while training runs elsewhere?",
    answer: "Yes, and it is a common pattern. Residency, latency and cost decide where each stage runs. Hybrid designs keep the base load reserved or dedicated and the bursts elastic.",
  },
  {
    question: "How does infrastructure connect to MLOps and AgentOps?",
    answer: "Compute is exposed through the production operating layer, so a model or agent is deployed, evaluated and observed the same way whether it runs on cloud, reserved or dedicated capacity.",
  },
];

export default function AIInfrastructureGpu() {
  return (
    <AiGccPageLayout
      hero={{
        pageKey: "infrastructure",
        eyebrow: "AI GCC in India · AI Infrastructure & GPU",
        title: "Build the compute layer behind your AI GCC.",
        description: "NeoIntelli helps teams design, source, provision and operate the infrastructure needed for AI development, training, fine-tuning and inference across cloud, reserved and dedicated GPU environments.",
        primaryCta: { label: PAGE.ctaLabel, href: aiGccBookingUrl({ sourcePage: PAGE.path, serviceInterest: PAGE.serviceInterest, ctaName: PAGE.ctaLabel }) },
        secondaryCta: { label: "Back to AI GCC in India", href: AI_GCC_PAGE_BY_KEY.overview.path },
      }}
      cta={{
        title: "Plan the compute around the workload.",
        description: "Tell us what the team will develop, train and serve, and where the data may live. We will come back with a capacity plan, a sourcing strategy and the FinOps model to keep it honest.",
        secondary: { label: AI_GCC_PAGE_BY_KEY.setup.anchor, href: AI_GCC_PAGE_BY_KEY.setup.path },
      }}
      related={[
        { page: "overview" },
        { page: "mlops" },
        { page: "genai" },
        { page: "setup" },
        { context: "technologyInfrastructure" },
      ]}
    >
      <InBrief>
        An AI GCC does not automatically require dedicated GPUs. The right compute model depends on development, training, fine-tuning, inference, utilization, latency, data sensitivity and cost. NeoIntelli plans capacity from the workload, chooses between cloud on-demand, cloud reserved, dedicated and hybrid per stage, provisions developer, training and inference environments, and runs AI FinOps so the GCC's compute spend is visible, allocated and reviewed.
      </InBrief>

      <Section id="start-with-the-workload" eyebrow="DECISION MODEL" title="Start with the workload, not the GPU." width="wide" align="center" lead="The accelerator is the last decision. These factors come first, and they change the answer more than the hardware generation does.">
        <SplitValuePointOfView
          description="Sizing compute to peak demand or choosing hardware before understanding utilization is how AI infrastructure budgets fail. Sourcing models and accelerator choices follow the workload's latency, concurrency, fine-tuning cadence and data residency requirements."
          pillsTitle="Decision Factors"
          pills={DECISION_FACTORS}
          footer={
            <>
              Compute choices integrate with{" "}
              <Link to={AI_GCC_PAGE_BY_KEY.mlops.path} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-2 transition-colors">
                {AI_GCC_PAGE_BY_KEY.mlops.name}
              </Link>{" "}
              for automated scaling and{" "}
              <Link to={AI_GCC_PAGE_BY_KEY.governance.path} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-2 transition-colors">
                {AI_GCC_PAGE_BY_KEY.governance.name}
              </Link>{" "}
              for data residency boundaries.
            </>
          }
          imageSrc="/images/ai-gcc/advisory/platform-compute-direction.jpg"
          imageAlt="AI Platform and Compute Direction"
          ourViewText="Dedicated GPUs are not automatically cheaper than cloud GPUs. Utilization determines the economics."
        />
      </Section>

      <Section id="compute-stages" eyebrow="ARCHITECTURE" title="Development, training and inference across cloud, reserved and dedicated compute." width="wide" align="center" lead="Each stage has a different demand shape. Sizing all three to the peak of one is how compute budgets fail.">
        <AdvisoryProcessFlow steps={FLOW} />
        <div className="mt-4 p-6 sm:p-7 max-w-4xl mx-auto text-center">
          <p className="text-2xs font-mono font-bold tracking-widest uppercase text-[#009BBF] mb-3.5">Runs on</p>
          <ul className="flex flex-wrap justify-center gap-2.5 sm:gap-3 list-none p-0 m-0">
            {ENVIRONMENTS.map((env) => (
              <li
                key={env}
                className="inline-flex items-center px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-[#00A3E0] bg-transparent text-[#0D244D] text-xs sm:text-[13.5px] font-semibold hover:border-[#0D306C] hover:bg-white/40 transition-all duration-200 shadow-xs select-none"
              >
                {env}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="compute-models" eyebrow="COMPUTE MODELS" title="Which compute model fits which workload." width="wide" align="center" lead="No prices here on purpose. Pricing changes by provider, region, accelerator and commitment; the trade-offs do not.">
        <GpuComputeComparison />
      </Section>

      <Section id="infrastructure-capabilities" eyebrow="CAPABILITIES" title="What NeoIntelli designs, sources, provisions and operates." width="wide" align="center">
        <CapabilityGrid items={CAPABILITIES} />
        <p className="text-[#505D74] text-sm sm:text-base leading-relaxed mt-8 max-w-3xl mx-auto text-center">
          Workplace IT, identity and the zero-trust baseline for the center as a whole are covered under{" "}
          <Link to={AI_GCC_CONTEXT_LINKS.technologyInfrastructure.path} className="text-[#169DC8] hover:text-[#0D306C] font-semibold underline underline-offset-2">{AI_GCC_CONTEXT_LINKS.technologyInfrastructure.name}</Link>. This page covers the AI compute layer that sits on top of it.
        </p>
      </Section>

      <Section id="infrastructure-questions" eyebrow="BUYER QUESTIONS" title="Questions about GPU and AI infrastructure for a GCC." width="narrow" align="center">
        <AnswerBlock items={FAQ} />
      </Section>
    </AiGccPageLayout>
  );
}
