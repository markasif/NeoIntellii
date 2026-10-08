import { Check, ShieldCheck } from "lucide-react";
import { GRADIENT_RING } from "./theme";

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

export default function ScorecardMockDark() {
  return (
    <figure className={`${GRADIENT_RING} m-0`}>
      <div className="rounded-[calc(1.5rem-1px)] bg-[#0a0d1c]/95 backdrop-blur-2xl overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 md:px-6 py-4 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#22b8f0] flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-white" aria-hidden="true" />
            </span>
            <span className="text-sm text-[#f4f6ff] font-semibold">NeoHireX validation summary</span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-2xs text-[#6f77a1] shrink-0">Sample</span>
        </div>

        <div className="px-5 md:px-6 py-5">
          <div className="flex items-center gap-3.5 mb-6">
            <span className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#f4f6ff] text-sm font-semibold">
              A
            </span>
            <div>
              <p className="text-sm text-[#f4f6ff] font-semibold">Candidate A</p>
              <p className="text-xs text-[#6f77a1]">GenAI Engineer &middot; India / remote</p>
            </div>
          </div>

          <ul className="space-y-3 mb-6">
            {SKILLS.map((skill) => (
              <li key={skill.label} className="flex items-center gap-4">
                <span className="text-xs text-[#a6adcd] flex-1">{skill.label}</span>
                <span className="flex items-center gap-1 shrink-0" aria-hidden="true">
                  {SEGMENTS.map((segment) => (
                    <span
                      key={segment}
                      className="h-1.5 w-5 rounded-full bg-white/[0.08]"
                      style={
                        segment < skill.filled
                          ? {
                              backgroundImage: "linear-gradient(90deg, #7c5cfc, #22b8f0)",
                              boxShadow: "0 0 8px rgba(45,212,245,0.4)",
                            }
                          : undefined
                      }
                    />
                  ))}
                </span>
              </li>
            ))}
          </ul>

          <ul className="space-y-2 mb-6">
            {STAGES.map((stage) => (
              <li key={stage} className="flex items-center gap-2.5 text-xs text-[#a6adcd]">
                <span className="w-4 h-4 rounded-full bg-[#2dd4f5]/15 border border-[#2dd4f5]/30 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#2dd4f5]" aria-hidden="true" />
                </span>
                {stage}
              </li>
            ))}
          </ul>

          <div className="rounded-xl bg-[#2dd4f5]/10 border border-[#2dd4f5]/25 px-4 py-3 flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#2dd4f5] shrink-0" aria-hidden="true" />
            <p className="text-xs text-[#2dd4f5] font-semibold">Validated - ready to hire</p>
          </div>
        </div>
      </div>

      <figcaption className="sr-only">
        Illustration of a NeoIntelli validation summary: a candidate scored on RAG architecture, agent
        orchestration, MLOps and production ownership, with all four validation stages passed.
      </figcaption>
    </figure>
  );
}
