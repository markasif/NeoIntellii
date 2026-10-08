import { Check } from "lucide-react";

export interface ChecklistItem {
  title: string;
  desc?: string;
}

interface ChecklistProps {
  items: Array<string | ChecklistItem>;
  columns?: 1 | 2;
  label?: string;
  theme?: "light" | "navy";
}

/** Accessible checklist: an unordered list with check marks that are decorative. */
export default function Checklist({ items, columns = 2, label, theme = "light" }: ChecklistProps) {
  const isNavy = theme === "navy";

  return (
    <ul aria-label={label} className={`grid gap-3 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
      {items.map((item) => {
        const entry = typeof item === "string" ? { title: item } : item;
        return (
          <li
            key={entry.title}
            className={`flex items-start gap-3.5 rounded-2xl backdrop-blur-sm border p-4 transition-all duration-200 ${
              isNavy
                ? "bg-white/[0.08] border-white/15 hover:border-[#38BDF8]/40 shadow-none"
                : "bg-white/95 border-[#0D306C]/10 hover:border-[#169DC8]/30 shadow-[0_2px_12px_rgba(13,48,108,0.04)]"
            }`}
          >
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                isNavy
                  ? "bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/30"
                  : "bg-[#169DC8]/10 text-[#008EC4] border-[#169DC8]/20"
              }`}
              aria-hidden="true"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>
              <span className={`block font-bold text-sm ${isNavy ? "text-white" : "text-[#0D306C]"}`}>
                {entry.title}
              </span>
              {entry.desc && (
                <span className={`block text-xs sm:text-sm leading-relaxed mt-1 ${isNavy ? "text-[#C5D7F0]" : "text-[#505D74]"}`}>
                  {entry.desc}
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
