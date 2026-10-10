"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

interface ResponsiveTableProps {
  caption: string;
  headers: string[];
  rows: ReactNode[][];
  /** Visually hide the caption while keeping it for assistive tech. */
  hideCaption?: boolean;
}

/** Tracks whether a horizontally scrollable element can scroll left/right. */
function useTableScrollEdges(target: RefObject<HTMLDivElement | null>) {
  const [edges, setEdges] = useState({ left: false, right: false });
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const update = () =>
      setEdges({
        left: el.scrollLeft > 4,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
      });
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [target]);
  return edges;
}

/**
 * Premium comparison table matching the GCC Operations table system:
 * - Rounded-2xl container with shadow
 * - Rich navy blue thead with white typography
 * - Alternating zebra rows with subtle borders
 * - Accessible table markup
 * - Left/right scroll edge indicators when the table overflows
 */
export default function ResponsiveTable({
  caption,
  headers,
  rows,
  hideCaption = true,
}: ResponsiveTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { left, right } = useTableScrollEdges(scrollRef);

  return (
    <div className="relative max-w-6xl mx-auto">
      <div
        ref={scrollRef}
        className="overflow-x-auto rounded-2xl border border-[#D2DCF0] bg-white shadow-[0_4px_24px_rgba(13,48,108,0.05)] max-w-6xl mx-auto"
      >
        <table className="w-full text-left min-w-[720px] border-collapse">

          <thead className="bg-[#0D244D] text-white">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={header || idx}
                  scope="col"
                  className="p-4 sm:p-5 font-bold text-xs sm:text-[13px] tracking-wide uppercase font-mono align-middle first:rounded-tl-2xl last:rounded-tr-2xl"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D2DCF0]/60">
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`transition-colors hover:bg-[#F0F6FC] ${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-[#F7FAFD]"
                }`}
              >
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <th
                      key={cellIndex}
                      scope="row"
                      className="p-4 sm:p-5 text-[#0D306C] font-bold text-xs sm:text-[13.5px] align-middle"
                    >
                      {cell}
                    </th>
                  ) : (
                    <td
                      key={cellIndex}
                      className="p-4 sm:p-5 text-[#505D74] text-xs sm:text-[13px] leading-relaxed align-middle font-normal"
                    >
                      {cell}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 w-5 sm:w-8 transition-opacity duration-300 ${left ? "opacity-100" : "opacity-0"}`}
        style={{ background: "linear-gradient(to right, rgba(13,48,108,0.18), rgba(13,48,108,0))" }}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 w-5 sm:w-8 transition-opacity duration-300 ${right ? "opacity-100" : "opacity-0"}`}
        style={{ background: "linear-gradient(to left, rgba(13,48,108,0.18), rgba(13,48,108,0))" }}
      />
    </div>
  );
}