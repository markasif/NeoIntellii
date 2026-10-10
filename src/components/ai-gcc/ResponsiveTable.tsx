"use client";

import { useRef, type ReactNode } from "react";

interface ResponsiveTableProps {
  caption?: string;
  headers: string[];
  rows: ReactNode[][];
  /** Visually hide the caption while keeping it for assistive tech. */
  hideCaption?: boolean;
}

/**
 * Premium comparison table matching the GCC Operations table system:
 * - Rounded-2xl container with shadow
 * - Rich navy blue thead with white typography
 * - Alternating zebra rows with subtle borders
 * - Accessible table markup
 */
export default function ResponsiveTable({
  headers,
  rows,
}: ResponsiveTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    </div>
  );
}