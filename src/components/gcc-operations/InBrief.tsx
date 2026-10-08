import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

/**
 * The answer-engine summary passage: 50 to 100 words placed early on each
 * page, explaining what the service is, who needs it, what it solves and how
 * NeoIntelli approaches it. Elevated home page card styling.
 */
export default function InBrief({ children }: { children: ReactNode }) {
  return (
    <section id="in-brief" aria-labelledby="in-brief-heading" className="scroll-mt-32 px-4 sm:px-6 lg:px-8 py-6 md:py-8 bg-transparent">
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md p-6 sm:p-8 md:p-10">
        <h2 id="in-brief-heading" className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#008EC4] mb-2">
          IN BRIEF
        </h2>
        <div className="w-10 sm:w-12 h-[3px] bg-[#DE8017] rounded-full mt-2 mb-4" />
        <p className="text-[#0D306C] text-base md:text-lg leading-relaxed font-normal">{children}</p>
      </div>
    </section>
  );
}
