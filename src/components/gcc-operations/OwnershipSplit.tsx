import type { ReactNode } from "react";
import { CheckCircle2, Shield } from "lucide-react";

interface Column {
  eyebrow?: string;
  title: string;
  items: string[];
  tone?: "client" | "partner";
}

interface OwnershipSplitProps {
  left: Column;
  right: Column;
  note?: ReactNode;
}

/** Two-column responsibility split: what the client keeps, what NeoIntelli can operate. */
export default function OwnershipSplit({ left, right, note }: OwnershipSplitProps) {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Client Column */}
        <div className="rounded-2xl bg-white/95 backdrop-blur-sm border border-[#0D306C]/15 p-6 sm:p-8 shadow-[0_4px_24px_rgba(13,48,108,0.05)] hover:border-[#0D306C]/25 transition-all duration-300">
          <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#008EC4] mb-2.5">
            {left.eyebrow ?? "Retained"}
          </span>
          <h3 className="text-[#0D306C] font-extrabold text-xl sm:text-2xl mb-5">{left.title}</h3>
          <ul className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-1">
            {left.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[#2B3D66]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0D306C]" aria-hidden="true" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* NeoIntelli Partner Column */}
        <div className="rounded-2xl bg-white/95 backdrop-blur-sm border border-[#169DC8]/30 p-6 sm:p-8 shadow-[0_4px_24px_rgba(22,157,200,0.08)] ring-1 ring-[#169DC8]/20 hover:border-[#169DC8]/50 transition-all duration-300">
          <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#008EC4] mb-2.5">
            {right.eyebrow ?? "Operated or supported"}
          </span>
          <h3 className="text-[#0D306C] font-extrabold text-xl sm:text-2xl mb-5">{right.title}</h3>
          <ul className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-1">
            {right.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[#2B3D66]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00A3E0]" aria-hidden="true" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {note && <div className="mt-5">{note}</div>}
    </div>
  );
}
