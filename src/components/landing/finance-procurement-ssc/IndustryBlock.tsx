import { Check } from "lucide-react";
import { BODY, BODY_LG, EYEBROW, H2, PANEL } from "./theme";
import type { IndustryContent, ReportingVariant } from "./industries";

/**
 * Swappable industry section. It renders one entry from `industries.ts`, so a
 * second vertical is a data change rather than a page change.
 *
 * `reportingVariant` picks the single compliance line the audience cares about:
 * GST, TDS and MCA filings for an Indian group, group reporting for a foreign
 * parent. One shows, never both.
 */
export default function IndustryBlock({
  industry,
  reportingVariant,
}: {
  industry: IndustryContent;
  reportingVariant: ReportingVariant;
}) {
  const [financeHub, ...otherPillars] = industry.pillars;

  return (
    <div className="max-w-6xl mx-auto">
      <p className={`${EYEBROW} text-[#f97316] mb-4`}>{industry.eyebrow}</p>
      <h2 className={`${H2} mb-4 max-w-3xl`}>{industry.heading}</h2>
      <p className={`${BODY_LG} max-w-2xl mb-10`}>{industry.intro}</p>

      <div className="grid md:grid-cols-3 gap-4">
        {[financeHub, ...otherPillars].map((pillar, index) => {
          const Icon = pillar.icon;
          // The reporting line belongs to the finance hub and changes with the
          // audience, so it is spliced in rather than stored in the pillar.
          const points = index === 0
            ? [pillar.points[0], industry.reporting[reportingVariant], ...pillar.points.slice(1)]
            : pillar.points;

          return (
            <div key={pillar.title} className={`${PANEL} p-6 flex flex-col`}>
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1f5fd0]/[0.08] text-[#1f5fd0] mb-4">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="text-[#101c4a] text-lg font-bold mb-4">{pillar.title}</h3>
              <ul className="space-y-2.5">
                {points.map((point) => (
                  <li key={point} className={`${BODY} text-sm flex items-start gap-2.5`}>
                    <Check className="w-3.5 h-3.5 text-[#f97316] mt-1 shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
