import { CheckCircle2, CircleSlash } from "lucide-react";

// Dramatises the problem copy: two resumes carrying identical keywords, only
// one of which belongs to an engineer who has shipped. The resume bodies are
// deliberately abstract bars - no invented names, employers or numbers.

const KEYWORDS = ["LLMs", "RAG", "Machine Learning", "Agentic AI"];

const CARDS = [
  {
    label: "Candidate A",
    verdictIcon: CheckCircle2,
    verdict: "Shipped a production agent that survived real traffic",
    accent: "text-[#00708f]",
    verdictBg: "bg-[#e6f4fa]",
    ring: "ring-[#0084b4]/15",
  },
  {
    label: "Candidate B",
    verdictIcon: CircleSlash,
    verdict: "Followed a tutorial",
    accent: "text-[#8a6320]",
    verdictBg: "bg-[#fdf4e3]",
    ring: "ring-[#dbe7f6]/60",
  },
];

const BAR_WIDTHS = ["w-full", "w-[86%]", "w-[92%]", "w-[64%]"];

export default function ResumeCompare() {
  return (
    <figure className="m-0">
      <div className="grid sm:grid-cols-2 gap-4">
        {CARDS.map((card) => {
          const VerdictIcon = card.verdictIcon;
          return (
            <div
              key={card.label}
              className={`rounded-2xl bg-white border border-black/[0.06] ring-4 ${card.ring} p-6 md:p-6`}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 rounded-full bg-[#f2f7fd] flex items-center justify-center text-xs text-[#5a6785]">
                  {card.label.slice(-1)}
                </span>
                <span className="text-sm text-[#14205c] font-semibold">{card.label}</span>
              </div>

              {/* Abstract resume body - the point is that both read the same. */}
              <div className="space-y-2 mb-5" aria-hidden="true">
                {BAR_WIDTHS.map((width, index) => (
                  <div key={index} className={`h-2 rounded-full bg-[#e8f0fa] ${width}`} />
                ))}
              </div>

              <ul className="flex flex-wrap gap-1.5 mb-5">
                {KEYWORDS.map((keyword) => (
                  <li
                    key={keyword}
                    className="px-2.5 py-1 rounded-full bg-[#f2f7fd] border border-[#dbe7f6] text-2xs text-[#5a6785]"
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

      <figcaption className="text-xs text-[#5a6785] mt-4 text-center">
        Identical keywords. Only one of them has built it. Your senior engineers pay for that difference in interview hours.
      </figcaption>
    </figure>
  );
}
