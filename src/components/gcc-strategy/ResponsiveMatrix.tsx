"use client";

import { type ReactNode, type Ref } from "react";

export interface MatrixRow {
  label: string;
  cells: ReactNode[];
  /** Optional emphasis, e.g. the recommended default. */
  highlight?: boolean;
}

export interface ResponsiveMatrixProps {
  caption: string;
  /** First column header (the row label). */
  rowHeader: string;
  columns: string[];
  rows: MatrixRow[];
  /** Renders the mobile card view grouped by column instead of by row. */
  mobileGroupBy?: "row" | "column";
  className?: string;
  /** Custom minimum table width, e.g. "min-w-[1850px]". Defaults to "min-w-[720px]". */
  minTableWidth?: string;
  /** Individual column width / min-width / alignment classes. Index 0 corresponds to rowHeader. */
  colWidths?: string[];
  /** Pins the first column horizontally when scrolling. */
  stickyRowHeader?: boolean;
  /** Optional ref to the desktop horizontal scroll container (for external scroll controls). */
  scrollRef?: Ref<HTMLDivElement>;
}

/**
 * A comparison table matching the approved NeoIntelli ResponsiveTable system.
 * Scrolls inside its container on desktop and stacks into clean cards on mobile.
 */
export default function ResponsiveMatrix({
  caption,
  rowHeader,
  columns,
  rows,
  mobileGroupBy = "row",
  className = "",
  minTableWidth = "min-w-[720px]",
  colWidths,
  stickyRowHeader = false,
  scrollRef,
}: ResponsiveMatrixProps) {
  return (
    <div className={className}>
      <div className="relative">
      <div ref={scrollRef} className="hidden md:block overflow-x-auto scroll-smooth rounded-2xl border border-[#D2DCF0] bg-white shadow-[0_4px_24px_rgba(13,48,108,0.05)]">
        <table className={`w-full text-left text-sm border-collapse ${minTableWidth}`}>
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-[#0D244D] text-white">
            <tr>
              <th
                scope="col"
                className={`p-4 sm:p-5 font-bold text-xs sm:text-[13px] tracking-wide uppercase font-mono align-middle first:rounded-tl-2xl ${
                  colWidths && colWidths[0] ? colWidths[0] : ""
                } ${
                  stickyRowHeader
                    ? "sticky left-0 z-20 bg-[#0D244D] shadow-[2px_0_8px_rgba(0,0,0,0.2)]"
                    : ""
                }`}
              >
                {rowHeader}
              </th>
              {columns.map((col, idx) => (
                <th
                  key={col}
                  scope="col"
                  className={`p-4 sm:p-5 font-bold text-xs sm:text-[13px] tracking-wide uppercase font-mono align-middle ${
                    idx === columns.length - 1 ? "last:rounded-tr-2xl" : ""
                  } ${colWidths && colWidths[idx + 1] ? colWidths[idx + 1] : ""}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D2DCF0]/60">
            {rows.map((row, rowIndex) => {
              const rowBg = row.highlight
                ? "bg-[#00A3E0]/[0.08]"
                : rowIndex % 2 === 0
                  ? "bg-white"
                  : "bg-[#F7FAFD]";

              return (
                <tr
                  key={row.label}
                  className={`transition-colors hover:bg-[#F0F6FC] ${rowBg}`}
                >
                  <th
                    scope="row"
                    className={`p-4 sm:p-5 text-[#0D306C] font-bold text-xs sm:text-[13.5px] align-top font-manrope ${
                      colWidths && colWidths[0] ? colWidths[0] : ""
                    } ${
                      stickyRowHeader
                        ? `sticky left-0 z-10 ${rowBg} shadow-[2px_0_8px_rgba(13,48,108,0.06)]`
                        : ""
                    }`}
                  >
                    {row.label}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td
                      key={i}
                      className={`p-4 sm:p-5 text-[#505D74] text-xs sm:text-[13.5px] align-top leading-relaxed font-normal ${
                        colWidths && colWidths[i + 1] ? colWidths[i + 1] : ""
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>

      <div className="md:hidden space-y-3" role="list" aria-label={caption}>
        {mobileGroupBy === "row"
          ? rows.map((row) => (
              <div
                key={row.label}
                role="listitem"
                className={`rounded-2xl border bg-white/95 p-5 shadow-xs transition-all ${
                  row.highlight
                    ? "border-[#00A3E0] shadow-[0_2px_12px_rgba(0,163,224,0.12)]"
                    : "border-[#D2DCF0]/80"
                }`}
              >
                <p className="text-[#0D306C] font-bold font-manrope text-base mb-3">{row.label}</p>
                <dl className="space-y-2">
                  {columns.map((col, i) => (
                    <div key={col} className="grid grid-cols-[minmax(0,42%)_1fr] gap-3 pt-1 border-t border-[#D2DCF0]/40 first:border-t-0">
                      <dt className="text-xs text-[#505D74] font-medium pt-0.5">{col}</dt>
                      <dd className="text-xs sm:text-sm text-[#2B3D66] leading-relaxed font-normal">{row.cells[i]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))
          : columns.map((col, i) => (
              <div key={col} role="listitem" className="rounded-2xl border border-[#D2DCF0]/80 bg-white/95 p-5 shadow-xs">
                <p className="text-[#0D306C] font-bold font-manrope text-base mb-3">{col}</p>
                <dl className="space-y-2">
                  {rows.map((row) => (
                    <div key={row.label} className="grid grid-cols-[minmax(0,42%)_1fr] gap-3 pt-1 border-t border-[#D2DCF0]/40 first:border-t-0">
                      <dt className="text-xs text-[#505D74] font-medium pt-0.5">{row.label}</dt>
                      <dd className="text-xs sm:text-sm text-[#2B3D66] leading-relaxed font-normal">{row.cells[i]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
      </div>
    </div>
  );
}