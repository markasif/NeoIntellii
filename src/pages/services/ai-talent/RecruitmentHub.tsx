import { Link } from "react-router-dom";
import { ArrowRight, Bot, Calendar, CheckCircle2, ChevronRight, FileCheck, Layers, LineChart, Sparkles, Terminal, Users } from "lucide-react";
import { Section, InBrief, AnswerBlock, ResponsiveTable, SplitValuePointOfView } from "@/components/ai-gcc";
import CapabilityGrid from "@/components/gcc-operations/CapabilityGrid";
import { AiTalentPageLayout, ValidationRoadmap } from "@/components/ai-talent";
import { AI_TALENT_CONTEXT_LINKS } from "@/data/aiTalent";

const NEOHIREX_DOES = [
  "Candidate management & pipeline visibility",
  "Role calibration captured with requisition",
  "AI screening & ranking against calibrated role",
  "AI first-round interviews with transcript & assessment",
  "Practitioner validation notes attached to candidate",
  "Audit trail & evaluation context on every shortlist",
];

const OFFER = [
  { title: "Dedicated recruitment POD", body: "Recruiters, sourcing capacity and coordination aligned to your roles, volumes and hiring managers, with a senior account owner.", icon: Users },
  { title: "Talent sourcing", body: "Specialist sourcing across AI, data, platform and engineering talent pools, with named market mapping for scarce roles.", icon: Users },
  { title: "NeoHireX Hiring OS", body: "Candidate management, AI screening and ranking, AI first-round interviews, pipeline visibility and the evaluation record, included for applicable engagements.", icon: Bot },
  { title: "Candidate screening", body: "Role-calibrated screening on NeoHireX followed by recruiter evaluation of fit, availability, compensation and engagement readiness.", icon: CheckCircle2 },
  { title: "AI interview", body: "Structured first-round AI interviews before human interview hours are spent, with the transcript and assessment attached to the candidate.", icon: Sparkles },
  { title: "Technical assessment", body: "Practitioner-led technical validation for AI, data and platform roles, so the shortlist carries evidence of production ownership.", icon: Terminal },
  { title: "Interview scheduling", body: "Coordination across hiring managers, panels and candidates, with the hiring-manager experience treated as part of the service.", icon: Calendar },
  { title: "Offer management", body: "Offer construction support, counter-offer handling, joining follow-up and onboarding coordination.", icon: FileCheck },
  { title: "Recruiting analytics", body: "Pipeline velocity, stage conversion, source effectiveness and time to shortlist, reported by role family.", icon: LineChart },
  { title: "Hiring-manager dashboards", body: "Live view of every open role, its pipeline and the evaluation context for each candidate.", icon: Layers },
  { title: "ATS integration", body: "NeoHireX as the system of record, or a workflow agreed with your existing ATS where it must remain primary.", icon: Terminal },
];

const SCALE_ROWS: string[][] = [
  ["10 hires", "A shared POD with one senior recruiter and technical validation on the specialist roles.", "A first AI or engineering team in India."],
  ["20 to 50 hires", "A dedicated POD, NeoHireX as system of record, weekly hiring-manager cadence.", "A growing product team or a Micro GCC scaling into new capabilities."],
  ["50 to 100+ hires", "Multiple recruiters by role family, sourcing capacity, analytics and a defined SLA per stage.", "GCC ramp-up or a multi-team build."],
];

const FAQ = [
  { question: "What is an AI Recruitment Hub?", answer: "A dedicated recruitment team, NeoHireX Hiring OS and practitioner technical validation run as one operating model for companies hiring 10 to 100+ technical people. It replaces the separate purchase of recruiters, an ATS and technical assessors." },
  { question: "Is this RPO?", answer: "It covers what most buyers mean by RPO: ownership of a defined part of the recruitment function with a dedicated team, technology and reporting. The difference is the technical validation layer and the specialization in AI, data and platform roles." },
  { question: "Can the hub hire non-AI roles too?", answer: "Yes. Backend, frontend, platform, product and other technical roles are hired through the same POD. The technical validation round is applied where the role warrants it." },
  { question: "Can we keep our existing ATS?", answer: "Yes. Where your ATS must remain the system of record, the workflow is agreed during discovery. NeoHireX still runs screening, ranking and AI interviews and hands the evaluation record across." },
  { question: "What happens when the hub has built the team?", answer: `The engagement can scale down to specialist hiring, continue as ongoing capacity, or expand into an AI Micro GCC where NeoIntelli also runs people operations, workspace, IT and infrastructure around the team. ${AI_TALENT_CONTEXT_LINKS.microGcc.name} describes that model.` },
];

export default function RecruitmentHub() {
  return (
    <AiTalentPageLayout
      pageKey="hub"
      hero={{
        eyebrow: "AI Talent · AI Recruitment Hub + NeoHireX",
        title: "Your AI Recruitment Hub in India",
        description: "Your recruitment team, hiring technology and AI technical validation in one operating model. For companies hiring 10, 20, 50 or 100+ technical people: a dedicated recruitment POD, NeoHireX Hiring OS and practitioner-led assessment.",
        secondaryCta: { label: AI_TALENT_CONTEXT_LINKS.neohirexDemo.anchor, href: AI_TALENT_CONTEXT_LINKS.neohirexDemo.path },
        trustStrip: [
          "Dedicated Recruitment POD Model",
          "NeoHireX Hiring OS System of Record",
          "SLA-Guaranteed Shortlist Pipeline",
          "10 to 100+ Scale Technical Capacity",
        ],
      }}
      cta={{
        title: "Plan your AI Recruitment Hub.",
        description: "Tell us the roles, the volume over the next year and how hiring runs today. We will size the POD, show you NeoHireX and define the stage SLAs.",
        secondary: { label: AI_TALENT_CONTEXT_LINKS.microGcc.anchor, href: AI_TALENT_CONTEXT_LINKS.microGcc.path },
      }}
      related={[{ page: "overview" }, { page: "genai" }, { page: "leadership" }, { context: "contractStaffing" }, { context: "microGcc" }]}
    >
      <InBrief>
        The AI Recruitment Hub is NeoIntelli's managed hiring model for companies recruiting 10 to 100+ technical people in India. A dedicated recruitment POD sources and engages candidates, NeoHireX Hiring OS runs screening, ranking, AI first-round interviews, pipeline management and the evaluation record, and practicing engineers validate AI, data and platform candidates before the shortlist. Hiring managers get dashboards and analytics; your team keeps the final interviews and the decision.
      </InBrief>

      <Section
        id="what-the-hub-includes"
        eyebrow="WHAT THE HUB INCLUDES"
        title="Recruiters, Hiring OS and technical validation, run as one service."
        width="wide"
        align="center"
        lead="Eleven operational capabilities operating as a unified talent acquisition engine in India. A dedicated recruitment POD, NeoHireX Hiring OS, and practitioner-led engineering validation."
      >
        <CapabilityGrid
          variant="workstreams"
          items={OFFER}
          rowPattern={[4, 4, 3]}
        />
      </Section>

      <Section
        id="neohirex"
        eyebrow="NEOHIREX HIRING OS"
        title="This is where the Hiring OS earns its place."
        width="wide"
        align="center"
        lead="NeoHireX is NeoIntelli's own AI hiring platform, not a licensed ATS with an AI badge. In the hub it is the system of record for every role, candidate, interview and evaluation."
      >
        <SplitValuePointOfView
          description="In the hub, NeoHireX acts as the system of record for every role, candidate, interview and evaluation. AI screening, dynamic ranking and first-round interviews narrow the pool and capture evidence, while your team retains full hiring authority."
          pillsTitle="What NeoHireX does in the hub"
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
          imageSrc="/images/ai-talent/neohirex-hiring-os.webp"
          imageAlt="NeoHireX AI Hiring OS Workflow"
          ourViewText="Powered by our own Hiring OS. Validated by AI practitioners. That combination is the difference between a faster resume pipeline and a better shortlist. It does not make the final hiring decision — your hiring managers decide."
        />
      </Section>

      <Section id="scale" eyebrow="Sized to the plan" title="10, 20, 50 or 100+ hires." tone="muted" width="wide">
        <ResponsiveTable caption="AI Recruitment Hub sizing by hiring volume" headers={["Volume", "Hub shape", "Typical situation"]} rows={SCALE_ROWS} />
      </Section>

      <Section id="how-we-validate" eyebrow="We interview. You hire." title="Every role in the hub runs the same flow." width="wide">
        <ValidationRoadmap />
      </Section>

      <Section id="hub-questions" eyebrow="Buyer questions" title="Questions about the AI Recruitment Hub and RPO in India." tone="muted" width="narrow">
        <AnswerBlock items={FAQ} />
      </Section>
    </AiTalentPageLayout>
  );
}
