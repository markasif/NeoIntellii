import { ChevronRight } from "lucide-react";

export type FlowTag = "operates" | "supports" | "client" | "joint";

export interface FlowStep {
  label: string;
  note?: string;
  tag?: FlowTag;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  label: string;
  /** Explain the tag legend under the diagram. */
  legend?: boolean;
}

const TAG_LABEL: Record<FlowTag, string> = {
  operates: "NeoIntelli operates",
  supports: "NeoIntelli supports",
  client: "Client owns",
  joint: "Joint",
};

const TAG_CLASS: Record<FlowTag, string> = {
  operates: "bg-[#008EC4] text-white font-semibold shadow-xs",
  supports: "bg-[#169DC8]/15 text-[#0D306C] border border-[#169DC8]/30 font-semibold",
  client: "bg-[#0D306C]/10 text-[#0D306C] border border-[#0D306C]/20 font-semibold",
  joint: "bg-white text-[#2B3D66] border border-[#D2DCF0] font-semibold",
};

/**
 * A step-by-step flow rendered as an ordered list of cards. Order is carried
 * by the numbering, so the diagram stays understandable when the cards wrap
 * on narrow screens. All text is real HTML.
 */
export default function FlowDiagram({ steps, label, legend = false }: FlowDiagramProps) {
  const tagsUsed = Array.from(new Set(steps.map((step) => step.tag).filter(Boolean))) as FlowTag[];
  return (
    <div>
      <ol
        aria-label={label}
        className="grid gap-3 sm:gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}
      >
        {steps.map((step, index) => (
          <li
            key={step.label}
            className="relative flex flex-col rounded-2xl bg-white/95 backdrop-blur-sm border border-[#0D306C]/10 shadow-[0_4px_24px_rgba(13,48,108,0.05)] hover:shadow-[0_8px_28px_rgba(13,48,108,0.08)] hover:border-[#169DC8]/35 transition-all duration-300 p-4 sm:p-5 pr-6"
          >
            <span
              className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0D306C]/5 border border-[#0D306C]/15 text-2xs font-mono font-bold text-[#008EC4]"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[#0D306C] font-extrabold text-sm sm:text-base leading-snug">
              {step.label}
            </span>
            {step.note && (
              <span className="mt-1.5 text-[#505D74] text-xs leading-relaxed">
                {step.note}
              </span>
            )}
            {step.tag && (
              <span className={`mt-3 inline-flex w-fit rounded-full px-2.5 py-1 text-2xs leading-none ${TAG_CLASS[step.tag]}`}>
                {TAG_LABEL[step.tag]}
              </span>
            )}
            {index < steps.length - 1 && (
              <ChevronRight className="absolute right-2 top-5 h-4 w-4 text-[#008EC4]/40" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
      {legend && tagsUsed.length > 0 && (
        <p className="mt-4 flex flex-wrap gap-2 text-2xs text-[#505D74]">
          {tagsUsed.map((tag) => (
            <span key={tag} className={`rounded-full px-2.5 py-1 leading-none ${TAG_CLASS[tag]}`}>{TAG_LABEL[tag]}</span>
          ))}
        </p>
      )}
    </div>
  );
}
