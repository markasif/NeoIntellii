import { ChevronRight } from "lucide-react";
import { trackFaqOpen } from "./tracking";

/**
 * The accordion used by both the "what happens when something goes wrong"
 * section and the FAQ.
 *
 * Native <details>, so it works without JavaScript, is keyboard operable and is
 * open to in-page search on the browsers that support it. `group` is the sole
 * hover-independent mechanism for the chevron, so nothing on this component
 * depends on a pointer.
 */

export type QuestionAnswer = {
  q: string;
  a: string;
};

export default function Accordion({
  items,
  group,
  columns = 1,
}: {
  items: QuestionAnswer[];
  /** Analytics label distinguishing the two accordions on the page. */
  group: string;
  columns?: 1 | 2;
}) {
  return (
    <div className={columns === 2 ? "grid gap-3 md:grid-cols-2" : "space-y-3"}>
      {items.map((item) => (
        <details
          key={item.q}
          className="group h-fit rounded-2xl border border-black/[0.06] bg-white"
          onToggle={(event) => {
            if (event.currentTarget.open) trackFaqOpen(item.q, group);
          }}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-semibold text-[#101c4a] md:text-base">
            {item.q}
            <ChevronRight
              className="h-4 w-4 shrink-0 text-[#f97316] transition-transform duration-300 group-open:rotate-90"
              aria-hidden="true"
            />
          </summary>
          <div className="-mt-1 px-5 pb-5">
            <p className="text-sm leading-relaxed text-[#2a3556]">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
