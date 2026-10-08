import { Section, InBrief, AnswerBlock, PointOfView } from "@/components/ai-gcc";
import { AiTalentPageLayout, RoleMatrix, ValidationRoadmap } from "@/components/ai-talent";
import { AI_TALENT_CONTEXT_LINKS, type RoleGroup } from "@/data/aiTalent";

const GROUPS: RoleGroup[] = [
  {
    name: "Machine learning engineering",
    intro: "Engineers who take a model from data to a monitored production system. The evaluation covers the whole lifecycle, not the modelling step alone.",
    roles: [
      {
        title: "Machine Learning Engineer",
        owns: "Model development, the feature and data pipeline it depends on, training and evaluation, productionization, inference and monitoring, with software engineering discipline throughout.",
        signals: ["A model they trained that is still serving traffic, and what happened when it drifted", "Feature pipelines they built or debugged, not only consumed", "Evaluation beyond a single offline metric: slices, baselines, online checks", "Inference constraints they solved: latency, batch vs real time, cost"],
        falsePositives: ["Kaggle or course projects listed as production experience", "Framework lists with no system attached", "Team-level outcomes claimed as personal ownership"],
        evaluation: ["Walk through one system end to end: data, model, deployment, monitoring", "Trade-off questions on feature freshness, retraining cadence, serving", "Code and design review on a realistic problem", "Reference-style questions on what broke and who fixed it"],
      },
      {
        title: "AI Engineer / Applied ML Engineer",
        owns: "Applying existing models and APIs to product problems: integration, evaluation, data handling and the engineering around the model rather than novel model research.",
        signals: ["Shipped features where the model is one component of a larger system", "Evaluation sets they built for the product task", "Clear reasoning about when to use an API, a fine-tune or classical ML"],
        falsePositives: ["Demo apps that call an API with no evaluation or error handling", "Titles inflated from software engineer to AI engineer without AI ownership"],
        evaluation: ["Product-scenario design exercise with cost and quality constraints", "Review of an evaluation approach they designed", "Engineering fundamentals: APIs, data handling, testing"],
      },
      {
        title: "Deep Learning Engineer",
        owns: "Designing, training and optimizing neural networks for vision, language, speech or multimodal tasks, including data, compute and inference efficiency.",
        signals: ["Training runs they owned on real hardware, with the failures", "Architecture or training changes that measurably improved a result", "Quantization, distillation or serving optimizations in production"],
        falsePositives: ["Paper reimplementations presented as original work", "GPU experience limited to notebooks on shared clusters"],
        evaluation: ["Deep dive on one training project: data, architecture, compute, outcome", "Debugging scenario for a failing or unstable run", "Inference efficiency discussion tied to a serving target"],
      },
    ],
  },
  {
    name: "Specialist AI engineering",
    intro: "Domain-specific AI practitioners across language, vision and applied research systems.",
    roles: [
      {
        title: "NLP Engineer",
        owns: "Language systems: classification, extraction, search, summarization and conversational components, increasingly built on LLMs but still needing evaluation and data rigor.",
        signals: ["Production text systems with measured precision and recall", "Domain data handling: annotation, cleaning, evaluation set design", "Judgment on when an LLM replaces or complements a classical pipeline"],
        falsePositives: ["Chatbot demos with no evaluation", "Library familiarity without a deployed system"],
        evaluation: ["Design exercise on a real language task with quality targets", "Evaluation dataset design discussion", "Review of an error analysis they ran"],
      },
      {
        title: "Computer Vision Engineer",
        owns: "Image and video systems from data collection and labelling through model training, deployment on cloud or edge, and monitoring in the field.",
        signals: ["Deployed vision models with field performance numbers they can explain", "Data pipeline and labelling strategy ownership", "Edge or latency constraints solved in production"],
        falsePositives: ["Pretrained-model demos on public datasets only", "No experience with domain shift between lab and field"],
        evaluation: ["End-to-end walkthrough of a deployed vision system", "Domain-shift and data-quality scenario", "Optimization discussion for the target hardware"],
      },
      {
        title: "AI Research Engineer",
        owns: "Bridging research and product: reproducing and adapting methods, running rigorous experiments and turning results into engineering the product team can use.",
        signals: ["Experiments designed with controls and ablations", "Research results that reached a product", "Clean, reproducible experimental code"],
        falsePositives: ["Publication count without product impact where product impact is the role", "Research framed as engineering or vice versa"],
        evaluation: ["Discussion of an experiment they designed and what it changed", "Code review focused on reproducibility", "Assessment of how they communicate results to engineers"],
      },
    ],
  },
  {
    name: "Data science and architecture",
    intro: "Strategic analytical models, experimental methodology and enterprise AI architecture.",
    roles: [
      {
        title: "Data Scientist",
        owns: "Turning business questions into analysis, experiments and models with decisions attached: statistics, experimentation, modelling and clear communication of uncertainty.",
        signals: ["Analyses that changed a decision, with the decision named", "Experiment design and interpretation with caveats", "Models handed to engineering with a plan for production"],
        falsePositives: ["Dashboards described as data science", "Modelling with no statistical reasoning behind the choices"],
        evaluation: ["Case exercise from question to recommendation", "Statistics and experimentation fundamentals", "Communication of uncertainty to a non-technical stakeholder"],
      },
      {
        title: "AI Solutions Architect",
        owns: "System boundaries, integration patterns, model and vendor selection, scalability, security and cost for enterprise AI solutions, and the technical guidance of the team building them.",
        signals: ["Architectures in production with the trade-offs they made explicit", "Security, residency and cost handled as design inputs", "Experience guiding engineers, not only drawing diagrams"],
        falsePositives: ["Reference architectures copied from vendors", "Architecture experience without production accountability"],
        evaluation: ["Architecture review of a real scenario with constraints", "Deep questions on decisions they made and would now change", "Assessment of technical leadership behaviour"],
      },
    ],
  },
];

const FAQ = [
  { question: "AI Engineer vs ML Engineer: what is the difference?", answer: "An ML engineer trains, deploys and monitors models. An AI engineer applies models, often through APIs or foundation models, inside products, with the emphasis on integration, evaluation and engineering. The titles overlap in the market, so NeoIntelli calibrates the role to what the person will own, not the title." },
  { question: "Data Scientist vs ML Engineer?", answer: "A data scientist answers business questions with analysis, experiments and models and communicates decisions. An ML engineer builds and operates models as production software. Many teams need one of each before they need two of either." },
  { question: "How do you assess a machine learning engineer?", answer: "Against the lifecycle: model development, feature and data pipeline understanding, training and evaluation, productionization, inference, monitoring and software engineering. Practicing engineers run the technical round and record the evidence in NeoHireX with the shortlist." },
  { question: "Can you hire an AI/ML engineer into our own entity, or only into a GCC?", answer: "Either. Permanent hires go directly into your organization or GCC. Where you do not yet have an India entity, the hire can start under a managed or EOR-first model and move later." },
  { question: "How is this different from a generalist technology recruiter?", answer: "Specialist sourcing, role calibration by AI practitioners and a technical validation round before the shortlist. A generalist recruiter forwards resumes that match keywords. This service forwards candidates whose production ownership has been checked." },
];

export default function AIMLRecruitment() {
  return (
    <AiTalentPageLayout
      pageKey="aiml"
      hero={{
        eyebrow: "AI Talent · AI & ML Recruitment",
        title: "AI & Machine Learning Recruitment in India",
        description: "Hire AI engineers, machine learning engineers, deep learning, NLP and computer vision specialists, research engineers, data scientists and AI solution architects, each assessed on what they have owned in production rather than on the frameworks on their resume.",
        secondaryCta: { label: "See how we validate", href: "#how-we-validate" },
        trustStrip: [
          "Senior ML Practitioner Reviewers",
          "Production System Walkthroughs",
          "NeoHireX Technical Evaluation Pack",
          "India AI Talent Pool",
        ],
      }}
      cta={{
        title: "Discuss an AI or ML hire.",
        description: "Tell us the system the person will own and the seniority you need. We will calibrate the role, show you the evaluation plan and start sourcing.",
        secondary: { label: AI_TALENT_CONTEXT_LINKS.aiGccGenai.anchor, href: AI_TALENT_CONTEXT_LINKS.aiGccGenai.path },
      }}
      related={[{ page: "overview" }, { page: "genai" }, { page: "data" }, { page: "mlops" }, { page: "leadership" }]}
    >
      <InBrief>
        AI & ML recruitment at NeoIntelli covers AI engineers, machine learning engineers, applied and deep learning engineers, NLP and computer vision engineers, AI research engineers, data scientists and AI solution architects in India. Specialist recruiters source, NeoHireX screens and runs first-round AI interviews, and practicing ML engineers assess model development, data pipelines, training and evaluation, productionization, inference and monitoring before you see a shortlist. You make the final decision.
      </InBrief>

      <Section id="role-profiles" eyebrow="Role profiles" title="What each role owns, and how we tell ownership from exposure." tone="muted" width="wide" lead="Job titles in AI are unreliable. These profiles describe the work, the evidence that someone has done it, and the resume patterns that look like evidence but are not.">
        <RoleMatrix groups={GROUPS} />
      </Section>

      <Section id="how-we-validate" eyebrow="We interview. You hire." title="The validation flow behind every AI/ML shortlist." width="wide" lead="Every shortlist comes with senior engineering review notes, scenario design evaluations, and drift handling verification.">
        <ValidationRoadmap />
        <div className="mt-8 max-w-6xl mx-auto">
          <PointOfView>
            A model in a notebook is a skill. A model in production with a monitoring story is a track record. We hire for the second.
          </PointOfView>
        </div>
      </Section>

      <Section id="aiml-questions" eyebrow="Buyer questions" title="Questions about AI and ML recruitment in India." tone="muted" width="narrow">
        <AnswerBlock items={FAQ} />
      </Section>
    </AiTalentPageLayout>
  );
}
