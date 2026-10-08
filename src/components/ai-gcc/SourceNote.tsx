import type { ResearchSource } from "@/data/aiGccSources";

/**
 * A cited statistic. Shows the claim with publisher, title, year and the
 * context that qualifies it. Nothing numeric renders on AI GCC pages
 * without passing through this component.
 */
export default function SourceNote({ source, compact = false }: { source: ResearchSource; compact?: boolean }) {
  return (
    <figure className={`rounded-2xl sm:rounded-3xl border border-[#D2DCF0] bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 ${compact ? "p-6" : "p-6 md:p-8"}`}>
      <div className="w-8 h-1 bg-[#169DC8] rounded-full mb-4" />
      <blockquote className="text-[#0D244D] font-display text-lg md:text-xl font-bold leading-snug mb-3">
        &ldquo;{source.statement}&rdquo;
      </blockquote>
      <figcaption className="text-xs text-[#505D74] leading-relaxed pt-3 border-t border-[#E2EDF5]">
        <span className="font-semibold text-[#0D244D]">Source: </span>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#169DC8] hover:text-[#0D306C] underline underline-offset-2 transition-colors font-medium"
        >
          {source.publisher}, {source.title}
        </a>{" "}
        ({source.year}). <span className="text-[#7A889B]">{source.context}</span>
      </figcaption>
    </figure>
  );
}
