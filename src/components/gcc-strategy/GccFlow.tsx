import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";

export interface FlowStep {
  label: string;
  note?: string;
  href?: string;
  /** Marks the step that belongs to a different pillar (rendered muted). */
  external?: boolean;
}

interface GccFlowProps {
  steps: FlowStep[];
  ariaLabel: string;
  /** Horizontal on large screens, vertical below. */
  horizontal?: boolean;
  className?: string;
}

/**
 * A step-by-step flow (MANDATE -> OPERATING MODEL -> ... ) built from plain
 * HTML so the sequence is readable without the arrows: it is an ordered list.
 */
export default function GccFlow({ steps, ariaLabel, horizontal = true, className = "" }: GccFlowProps) {
  const layout = horizontal ? "lg:flex-row lg:items-stretch" : "";
  return (
    <ol aria-label={ariaLabel} className={`flex flex-col ${layout} gap-2 lg:gap-1.5 ${className}`}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        const card = (
          <div
            className={`h-full rounded-xl border px-4 py-3.5 text-center ${
              step.external
                ? "border-dashed border-black/20 bg-white text-body"
                : "border-black/10 bg-white text-heading"
            } ${step.href ? "transition-colors hover:border-[#0a93bd]/50 hover:bg-[#0a93bd]/[0.05]" : ""}`}
          >
            <span className="block text-2xs tracking-[0.16em] uppercase font-medium">{step.label}</span>
            {step.note && <span className="mt-1 block text-2xs text-body-muted normal-case tracking-normal">{step.note}</span>}
          </div>
        );
        return (
          <li key={step.label} className={`flex flex-col ${horizontal ? "lg:flex-row lg:flex-1" : ""} items-stretch gap-2 lg:gap-1.5 min-w-0`}>
            <div className="flex-1 min-w-0">
              {step.href ? (
                <Link to={step.href} className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a93bd]">
                  {card}
                </Link>
              ) : (
                card
              )}
            </div>
            {!last && (
              <span aria-hidden className="flex items-center justify-center text-body-muted shrink-0">
                <ArrowDown className={`w-4 h-4 ${horizontal ? "lg:hidden" : ""}`} />
                {horizontal && <ArrowRight className="w-4 h-4 hidden lg:block" />}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
