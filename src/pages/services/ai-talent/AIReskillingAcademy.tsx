import { Link } from "react-router-dom";
import { Section, InBrief, AnswerBlock, PointOfView, ResponsiveTable } from "@/components/ai-gcc";
import { AiTalentPageLayout, ReskillingLifecycleFlow } from "@/components/ai-talent";
import { AI_TALENT_CONTEXT_LINKS, AI_TALENT_PAGE_BY_KEY } from "@/data/aiTalent";

const FLOW = [
  { label: "Assessment", detail: "Current skills, codebase familiarity and the AI work the team will actually do, assessed with the same bar used for external hires." },
  { label: "Capability gap", detail: "The specific gap between each engineer and the target role, not a generic curriculum." },
  { label: "Role conversion", detail: "A named target role per engineer with the ownership it carries." },
  { label: "Learning path", detail: "Practitioner-led, role-specific and short. Concepts only as far as the project needs them." },
  { label: "Practical project", detail: "A real system in your environment, with evaluation, deployment and observability requirements." },
  { label: "Technical validation", detail: "The same senior technical round external candidates go through. Passing it is the graduation criterion." },
  { label: "Internal deployment", detail: "The engineer takes ownership of the role, with follow-up support while the first production work lands." },
];

const CONVERSIONS: string[][] = [
  ["Backend Engineer", "GenAI Application Engineer", "Context engineering, retrieval, evaluation, structured outputs, cost and latency, LLM observability."],
  ["Data Engineer", "AI Data Engineer", "Document ingestion and parsing, embeddings and vector infrastructure, evaluation datasets, feature pipelines."],
  ["DevOps Engineer", "MLOps / AI Platform Engineer", "Model and prompt lifecycle, evaluation gates in CI/CD, serving, monitoring, GPU scheduling, AI FinOps."],
  ["ML Engineer", "GenAI / Agentic AI Engineer", "Foundation model adaptation, RAG, tool calling, agent orchestration, permissions, tracing, task-success evaluation."],
  ["QA Engineer", "AI Evaluation Engineer", "Evaluation set design, LLM-as-judge calibration, regression suites for prompts and retrieval, red teaming."],
  ["Architect", "AI / Agentic Systems Architect", "Model strategy, retrieval and agent architecture, governance integration, security, cost and platform reuse."],
];

const FAQ = [
  { question: "Should we hire AI talent or reskill existing engineers?", answer: "Both, deliberately. Hire externally for roles that need proven production AI ownership today. Convert engineers you already trust for roles where domain knowledge, codebase familiarity and retention matter more than AI tenure. The academy exists because the second group is larger than most companies think." },
  { question: "How is this different from corporate AI training?", answer: "It ends in a validated role conversion, not a certificate. Each engineer has a named target role, a real project in your environment and the same senior technical round external candidates face. Engineers who do not pass are not presented as converted." },
  { question: "Which conversions work best?", answer: "Backend to GenAI application engineer, data engineer to AI data engineer and DevOps to MLOps or AI platform engineer convert most reliably, because the target role is mostly the engineer's existing discipline applied to AI workloads. ML engineer to agentic AI engineer and QA to AI evaluation engineer are strong when the person already works near the systems." },
  { question: "How long does a conversion take?", answer: "It depends on the starting point, the target role and how much time the engineer can spend on the practical project. NeoIntelli scopes each cohort against those factors rather than quoting a fixed program length." },
  { question: "Can the academy run inside a GCC?", answer: `Yes. It is most often used by GCCs and Micro GCCs that need to grow AI capability faster than the market supplies it. ${AI_TALENT_CONTEXT_LINKS.talentManagement.name} covers the capability-development side of a GCC's workforce plan.` },
];

export default function AIReskillingAcademy() {
  return (
    <AiTalentPageLayout
      pageKey="academy"
      hero={{
        eyebrow: "AI Talent · AI Talent Academy & Reskilling",
        title: "Build AI talent from the engineering team you already have.",
        description: "Convert backend, data, DevOps, ML, QA and architecture engineers into validated GenAI, AI data, MLOps, agentic AI, AI evaluation and AI architecture roles. Assessment, capability gap, role conversion, a real project and the same technical validation external hires face.",
        secondaryCta: { label: "See the conversions", href: "#conversions" },
        trustStrip: [
          "Validated Role Conversion Pass Bar",
          "Production Project in Your Environment",
          "Equal Rigor to External Shortlists",
          "GCC Capability Accelerator",
        ],
      }}
      cta={{
        title: "Discuss AI reskilling for your team.",
        description: "Tell us who is on the team, what they build today and which AI roles you are struggling to hire. We will assess the conversion candidates and propose a cohort plan.",
        secondary: { label: AI_TALENT_PAGE_BY_KEY.genai.anchor, href: AI_TALENT_PAGE_BY_KEY.genai.path },
      }}
      related={[{ page: "overview" }, { page: "genai" }, { page: "mlops" }, { context: "talentManagement" }, { context: "microGcc" }]}
    >
      <InBrief>
        The AI Talent Academy converts engineers a company already employs into validated AI capability. NeoIntelli assesses each engineer against a target role, defines the capability gap, runs a practitioner-led learning path around a real project in the client's environment, and applies the same senior technical validation used for external AI hires before the engineer takes ownership of the role. It is a role-conversion program with a pass bar, not corporate training with a certificate.
      </InBrief>

      <Section id="conversions" eyebrow="Role conversions" title="Six conversions that work, and what each one has to learn." tone="muted" width="wide">
        <ResponsiveTable
          caption="Six role conversions and what each one has to learn"
          headers={["From", "To", "What the learning path covers"]}
          rows={CONVERSIONS}
        />
        <div className="mt-8 max-w-6xl mx-auto">
          <PointOfView>
            AI talent is scarce. The engineers who already know your codebase and your domain are the least scarce AI talent you will ever find.
          </PointOfView>
        </div>
      </Section>

      <Section
        id="how-it-runs"
        eyebrow="HOW IT RUNS"
        title="Assessment to internal deployment, with a pass bar."
        width="wide"
        align="center"
        lead="Seven steps. The technical validation at step six is the same round external candidates go through on every specialist hiring page."
      >
        <ReskillingLifecycleFlow steps={FLOW} />
      </Section>

      <Section id="hire-or-reskill" eyebrow="Answer first" title="Should we hire AI talent or reskill existing engineers?" tone="muted" width="narrow">
        <p className="text-lg sm:text-xl lg:text-[22px] font-bold text-[#DE8017] leading-snug mb-4">
          Both, deliberately. External hires for roles that need proven production AI ownership now. Conversions for roles where domain knowledge, codebase familiarity and retention matter more than AI tenure.
        </p>
        <p className="text-body text-sm sm:text-[15px] leading-relaxed">
          The specialist hiring pages describe the external route:{" "}
          <Link to={AI_TALENT_PAGE_BY_KEY.genai.path} className="font-semibold text-[#077fa4] hover:underline">
            {AI_TALENT_PAGE_BY_KEY.genai.name}
          </Link>
          ,{" "}
          <Link to={AI_TALENT_PAGE_BY_KEY.mlops.path} className="font-semibold text-[#077fa4] hover:underline">
            {AI_TALENT_PAGE_BY_KEY.mlops.name}
          </Link>{" "}
          and{" "}
          <Link to={AI_TALENT_PAGE_BY_KEY.data.path} className="font-semibold text-[#077fa4] hover:underline">
            {AI_TALENT_PAGE_BY_KEY.data.name}
          </Link>
          . The academy is the internal one. Most AI teams end up with both.
        </p>
      </Section>

      <Section id="academy-questions" eyebrow="Buyer questions" title="Questions about AI reskilling and upskilling." width="narrow">
        <AnswerBlock items={FAQ} />
      </Section>
    </AiTalentPageLayout>
  );
}
