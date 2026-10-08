import { Check, ShieldCheck } from "lucide-react";

// An illustrative NeoHireX validation summary. It is labelled "Sample" and uses
// no real candidate, employer or outcome data - the point is to show what a
// buyer receives at the end of the four stages, not to claim a result.

const SKILLS = [
  { label: "RAG architecture", filled: 4 },
  { label: "Agent orchestration", filled: 5 },
  { label: "MLOps & data pipelines", filled: 3 },
  { label: "Production ownership", filled: 4 },
];

const STAGES = [
  "NeoHireX AI screening",
  "AI first-round interview",
  "Senior AI engineer round",
  "20-year expert sign-off",
];

const SEGMENTS = [0, 1, 2, 3, 4];

export default function ScorecardMock() {
  return (
    <figure className="m-0 rounded-2xl bg-white border border-black/[0.06] shadow-[0_2px_10px_rgba(10,31,82,0.05),0_18px_50px_-20px_rgba(10,31,82,0.18)] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 md:px-6 py-4 border-b border-[#dbe7f6] bg-[#f2f7fd]">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-lg bg-[#0b57bd] flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-white" aria-hidden="true" />
          </span>
          <span className="text-sm text-[#14205c] font-semibold">NeoHireX validation summary</span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-white border border-black/[0.06] text-2xs text-[#5a6785] shrink-0">Sample</span>
      </div>

      <div className="px-5 md:px-6 py-5">
        <div className="flex items-center gap-3.5 mb-6">
          <span className="w-11 h-11 rounded-full bg-[#f2f7fd] flex items-center justify-center text-[#14205c] text-sm font-semibold">
            A
          </span>
          <div>
            <p className="text-sm text-[#14205c] font-semibold">Candidate A</p>
            <p className="text-xs text-[#5a6785]">GenAI Engineer &middot; India / remote</p>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {SKILLS.map((skill) => (
            <li key={skill.label} className="flex items-center gap-4">
              <span className="text-xs text-[#2b3557] flex-1">{skill.label}</span>
              <span className="flex items-center gap-1 shrink-0" aria-hidden="true">
                {SEGMENTS.map((segment) => (
                  <span
                    key={segment}
                    className="h-1.5 w-5 rounded-full bg-[#e8f0fa]"
                    style={segment < skill.filled ? { backgroundColor: "#0084b4" } : undefined}
                  />
                ))}
              </span>
            </li>
          ))}
        </ul>

        <ul className="space-y-2 mb-6">
          {STAGES.map((stage) => (
            <li key={stage} className="flex items-center gap-2.5 text-xs text-[#2b3557]">
              <span className="w-4 h-4 rounded-full bg-[#e6f4fa] flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-[#0084b4]" aria-hidden="true" />
              </span>
              {stage}
            </li>
          ))}
        </ul>

        <div className="rounded-xl bg-[#e6f4fa] px-4 py-3 flex items-center gap-2.5">
          <Check className="w-4 h-4 text-[#0084b4] shrink-0" aria-hidden="true" />
          <p className="text-xs text-[#00708f] font-semibold">Validated - ready to hire</p>
        </div>
      </div>

      <figcaption className="sr-only">
        Illustration of a NeoIntelli validation summary: a candidate scored on RAG architecture, agent
        orchestration, MLOps and production ownership, with all four validation stages passed.
      </figcaption>
    </figure>
  );
}
