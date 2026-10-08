import { Code2, FileCheck2, ShieldCheck, Sparkles, Users2 } from "lucide-react";
import { GLASS, GRADIENT_TEXT } from "./theme";

// The hero graphic: the four validation gates joined by shimmering beams,
// carrying the exact gate labels and caption of the original PipelineVisual
// on /lp/hire-ai-engineers - only the visual treatment differs. Beams reuse
// the existing `animate-shimmer` keyframe, so the figure is CSS-only and
// SSR-safe.

const GATES = [
  { icon: FileCheck2, label: "AI Shortlisting" },
  { icon: Code2, label: "Senior Tech Rounds" },
  { icon: ShieldCheck, label: "Expert Validation" },
  { icon: Users2, label: "Ready to Decide" },
];

function Beam({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-full ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-white/10" />
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          backgroundImage: "linear-gradient(90deg, transparent 20%, #2dd4f5 50%, transparent 80%)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
}

export default function ValidationPipeline() {
  return (
    <figure className={`${GLASS} m-0 relative overflow-hidden p-6 md:p-8`}>
      {/* Ambient glow inside the panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[70%] h-48 rounded-full bg-[#4d7cfe]/20 blur-[90px]"
      />

      <ol className="relative flex flex-col md:flex-row items-stretch md:items-center gap-5 md:gap-3">
        {GATES.map(({ icon: Icon, label }, index) => (
          <li key={label} className="contents">
            {index > 0 && (
              <>
                <Beam className="hidden md:block flex-1 h-0.5 self-center" />
                <Beam className="md:hidden w-0.5 h-6 mx-auto" />
              </>
            )}
            <div className="flex md:flex-col items-center gap-3.5 md:gap-3 md:flex-1">
              <span className="shrink-0 rounded-2xl p-px bg-gradient-to-br from-[#8b5cf6]/70 via-[#4d7cfe]/40 to-[#2dd4f5]/70">
                <span className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-[15px] bg-[#0a0d1c]">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#8fd8ff]" aria-hidden="true" />
                </span>
              </span>
              <span className="text-2xs md:text-xs tracking-[0.16em] uppercase text-white font-semibold leading-snug md:text-center">
                {label}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="relative mt-8 md:mt-9 flex justify-center">
        <div className="inline-flex items-start gap-3.5 rounded-2xl border border-[#2dd4f5]/25 bg-[#0a0d1c]/80 px-5 py-4 backdrop-blur-sm">
          <span className="inline-flex w-10 h-10 shrink-0 p-px rounded-xl bg-gradient-to-br from-[#8b5cf6]/60 via-[#4d7cfe]/30 to-[#2dd4f5]/60">
            <span className="flex items-center justify-center w-full h-full rounded-[11px] bg-[#0c101f]">
              <Sparkles className="w-4 h-4 text-[#8fd8ff]" aria-hidden="true" />
            </span>
          </span>
          <p className="text-white text-xs md:text-sm leading-snug text-left">
            You receive just 1-2 profiles.
            <br className="hidden sm:block" />{" "}
            <span className={`${GRADIENT_TEXT} font-semibold`}>Already interviewed. Ready to decide.</span>
          </p>
        </div>
      </div>

      <figcaption className="sr-only">
        Diagram of the NeoIntelli validation pipeline: AI shortlisting, senior tech rounds and expert
        validation leave you ready to decide - you receive just 1-2 already-interviewed profiles.
      </figcaption>
    </figure>
  );
}
