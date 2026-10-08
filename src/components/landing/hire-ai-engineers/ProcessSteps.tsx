import type { LucideIcon } from "lucide-react";
import { HexBadge } from "./Hex";
import { BODY } from "./theme";

export interface ProcessStep {
  icon: LucideIcon;
  step: string;
  title: string;
  body: string;
}

// The four validation stages as numbered gates joined by a dotted rail - the
// "01 / 02 / 03 / 04" treatment from the infographics.
export default function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
      {steps.map(({ icon: Icon, title, body }, index) => (
        <li key={title} className="relative flex flex-col items-center text-center">
          <div className="relative flex items-center justify-center w-full">
            {/* Dotted rail between gates, behind the numbered badge */}
            {index > 0 && (
              <span
                aria-hidden="true"
                className="hidden lg:block absolute top-1/2 right-1/2 w-full border-t-2 border-dotted border-[#0084b4]/45"
              />
            )}
            <span className="relative z-10 w-9 h-9 rounded-full bg-[#0a1f52] text-white text-xs flex items-center justify-center font-semibold">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-5 flex flex-col items-center">
            <HexBadge icon={Icon} tone="blue" size="lg" />
            <h3 className="mt-4 text-sm md:text-base text-[#14205c] font-semibold leading-snug">{title}</h3>
            <p className={`${BODY} mt-2.5 text-sm`}>{body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
