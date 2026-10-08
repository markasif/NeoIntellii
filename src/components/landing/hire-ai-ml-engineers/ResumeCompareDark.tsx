import { CheckCircle2, CircleSlash } from "lucide-react";
import { GLASS } from "./theme";

// Dramatises the problem copy: two resumes carrying identical keywords, only
// one of which belongs to an engineer who has shipped. The resume bodies are
// deliberately abstract bars - no invented names, employers or numbers.

const KEYWORDS = ["LLMs", "RAG", "Machine Learning", "Agentic AI"];

const CARDS = [
  {
    label: "Candidate A",
    verdictIcon: CheckCircle2,
    verdict: "Shipped a production agent that survived real traffic",
    accent: "text-[#2dd4f5]",
    verdictBg: "bg-[#2dd4f5]/10 border border-[#2dd4f5]/25",
    ring: "shadow-[0_0_40px_-12px_rgba(45,212,245,0.35)] border-[#2dd4f5]/30",
  },
  {
    label: "Candidate B",
    verdictIcon: CircleSlash,
    verdict: "Followed a tutorial",
    accent: "text-[#f0b45c]",
    verdictBg: "bg-[#f0b45c]/10 border border-[#f0b45c]/25",
    ring: "border-white/10",
  },
];

const BAR_WIDTHS = ["w-full", "w-[86%]", "w-[92%]", "w-[64%]"];

export default function ResumeCompareDark() {
  return (
    <figure className="m-0">
      <div className="grid sm:grid-cols-2 gap-4">
        {CARDS.map((card) => {
          const VerdictIcon = card.verdictIcon;
          return (
            <div key={card.label} className={`${GLASS} ${card.ring} p-5 md:p-6`}>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs text-[#a6adcd]">
                  {card.label.slice(-1)}
                </span>
                <span className="text-sm text-[#f4f6ff] font-semibold">{card.label}</span>
              </div>

              {/* Abstract resume body - the point is that both read the same. */}
              <div className="space-y-2 mb-5" aria-hidden="true">
                {BAR_WIDTHS.map((width, index) => (
                  <div key={index} className={`h-2 rounded-full bg-white/[0.08] ${width}`} />
                ))}
              </div>

              <ul className="flex flex-wrap gap-1.5 mb-5">
                {KEYWORDS.map((keyword) => (
                  <li
                    key={keyword}
                    className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-2xs text-[#a6adcd]"
                  >
                    {keyword}
                  </li>
                ))}
              </ul>

              <div className={`flex items-start gap-2.5 rounded-xl ${card.verdictBg} px-3.5 py-3`}>
                <VerdictIcon className={`w-4 h-4 shrink-0 mt-0.5 ${card.accent}`} aria-hidden="true" />
                <p className={`text-xs leading-snug ${card.accent}`}>{card.verdict}</p>
              </div>
            </div>
          );
        })}
      </div>

      <figcaption className="text-xs text-[#6f77a1] mt-4 text-center">
        Identical keywords. Only one of them has built it. Your senior engineers pay for that difference in interview hours.
      </figcaption>
    </figure>
  );
}
