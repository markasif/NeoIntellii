import type { ReactNode } from "react";
import { Info } from "lucide-react";

export const LEGAL_VALIDATION_NOTE =
  "Legal, tax and regulatory interpretations should be validated with qualified advisers. NeoIntelli can coordinate the operating implementation of agreed requirements.";

export const SCOPE_NOTE =
  "Exact responsibilities are defined in the engagement operating model and contract.";

interface SourceNoteProps {
  label?: string;
  children: ReactNode;
  className?: string;
  theme?: "light" | "dark";
}

/**
 * Compact, sleek advisory note bar:
 * - Low vertical footprint
 * - Preserves exact label ("Note:") and content
 * - Clean subtle border and soft background
 */
export default function SourceNote({
  label = "Note",
  children,
  className = "",
  theme = "light",
}: SourceNoteProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={`relative rounded-lg border transition-all duration-200 ${
        isDark
          ? "bg-[#0A224E]/40 border-white/10 text-slate-300"
          : "bg-white/60 backdrop-blur-xs border-[#D2DCF0]/80 text-[#505D74]"
      } py-2.5 px-3.5 sm:px-4 flex items-start sm:items-center gap-2.5 max-w-6xl mx-auto text-xs leading-relaxed ${className}`}
    >
      <Info className={`w-3.5 h-3.5 shrink-0 mt-0.5 sm:mt-0 ${isDark ? "text-[#38BDF8]" : "text-[#169DC8]"}`} />
      <p className="flex-1">
        <span className={`font-semibold ${isDark ? "text-white" : "text-[#0D306C]"}`}>{label}: </span>
        {children}
      </p>
    </div>
  );
}
