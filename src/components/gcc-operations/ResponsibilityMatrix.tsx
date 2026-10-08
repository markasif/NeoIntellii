"use client";

import React from "react";
import { User, Users, FileText } from "lucide-react";

type Owner = "client" | "neointelli" | "joint";

interface MatrixRow {
  area: string;
  owner: Owner;
  note?: string;
}

const ROWS: MatrixRow[] = [
  { area: "GCC strategy", owner: "client" },
  { area: "Budget", owner: "client", note: "Includes operations, operating costs, visibility" },
  { area: "Hiring plan", owner: "joint" },
  { area: "Candidate sourcing", owner: "neointelli", note: "Can be supported by client/partner" },
  { area: "Final hiring decision", owner: "client" },
  { area: "Employment administration", owner: "neointelli" },
  { area: "Payroll coordination", owner: "neointelli" },
  { area: "Benefits administration", owner: "neointelli", note: "Benefits coverage is a client discussion" },
  { area: "Workspace", owner: "neointelli" },
  { area: "Devices", owner: "neointelli", note: "To be client IT / partner standard" },
  { area: "Identity and access", owner: "joint", note: "Client-owned identity platforms, NeoIntelli can guide, recommend and ensure workflows" },
  { area: "Enterprise security policies", owner: "client" },
  { area: "IT support", owner: "neointelli" },
  { area: "Service KPIs", owner: "joint" },
  { area: "Operating reviews", owner: "joint" },
  { area: "Risk register", owner: "joint", note: "Includes operational, client and third-party risks" },
  { area: "Compliance coordination", owner: "neointelli" },
  { area: "Vendor management", owner: "neointelli", note: "Local operating vendors" },
  { area: "Intellectual property", owner: "client" },
  { area: "Data ownership", owner: "client" },
  { area: "BOT planning", owner: "joint" },
  { area: "Employee transfer", owner: "joint" },
];

export default function ResponsibilityMatrix() {
  return (
    <div className="w-full select-none">
      {/* ── TABLE CONTAINER ── */}
      <div className="w-full overflow-x-auto rounded-xl md:rounded-2xl border border-[#D0DFEF] bg-white shadow-sm">
        <table className="w-full text-left border-collapse min-w-[680px]">
          {/* ── TABLE HEADER ── */}
          <thead className="bg-[#EDF3FB]/75 border-b border-[#D0DFEF]">
            <tr className="divide-x divide-[#D0DFEF]/70">
              {/* AREA */}
              <th
                scope="col"
                className="w-[25%] px-4 sm:px-5 py-2.5 sm:py-3 text-left font-bold text-[11px] sm:text-xs uppercase tracking-wider text-[#0D244D]"
              >
                Area
              </th>

              {/* CLIENT */}
              <th
                scope="col"
                className="w-[12%] px-2.5 py-2 sm:py-2.5 text-center font-bold text-[11px] sm:text-xs uppercase tracking-wider text-[#0D244D]"
              >
                <div className="flex flex-col items-center justify-center gap-0.5">
                  <User className="w-3.5 h-3.5 text-[#008EC4]" strokeWidth={2.2} />
                  <span>Client</span>
                </div>
              </th>

              {/* NEOINTELLI */}
              <th
                scope="col"
                className="w-[14%] px-2.5 py-2 sm:py-2.5 text-center font-bold text-[11px] sm:text-xs uppercase tracking-wider text-[#0D244D]"
              >
                <div className="flex flex-col items-center justify-center gap-0.5">
                  <Users className="w-3.5 h-3.5 text-[#008EC4]" strokeWidth={2.2} />
                  <span>NeoIntelli</span>
                </div>
              </th>

              {/* JOINT */}
              <th
                scope="col"
                className="w-[12%] px-2.5 py-2 sm:py-2.5 text-center font-bold text-[11px] sm:text-xs uppercase tracking-wider text-[#0D244D]"
              >
                <div className="flex flex-col items-center justify-center gap-0.5">
                  {/* Two interlocking circles: Client navy & NeoIntelli cyan */}
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="12" r="5.5" stroke="#0D244D" />
                    <circle cx="15" cy="12" r="5.5" stroke="#00A3E0" />
                  </svg>
                  <span>Joint</span>
                </div>
              </th>

              {/* NOTES */}
              <th
                scope="col"
                className="w-[37%] px-4 sm:px-5 py-2.5 sm:py-3 text-left font-bold text-[11px] sm:text-xs uppercase tracking-wider text-[#0D244D]"
              >
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#008EC4]" strokeWidth={2} />
                  <span>Notes</span>
                </div>
              </th>
            </tr>
          </thead>

          {/* ── TABLE BODY ── */}
          <tbody className="divide-y divide-[#E2ECF7]/85 bg-white">
            {ROWS.map((row) => {
              const isClient = row.owner === "client";
              const isNeointelli = row.owner === "neointelli";
              const isJoint = row.owner === "joint";

              return (
                <tr
                  key={row.area}
                  className="hover:bg-[#F5F9FD] transition-colors divide-x divide-[#E2ECF7]/60"
                >
                  {/* AREA */}
                  <td className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-[13px] font-semibold text-[#0D244D]">
                    {row.area}
                  </td>

                  {/* CLIENT */}
                  <td className="px-2.5 py-1.5 sm:py-2 text-center">
                    {isClient ? (
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full bg-[#0D244D] shadow-xs"
                        title="Client owns"
                      />
                    ) : (
                      <span className="text-slate-300 font-light text-xs select-none">-</span>
                    )}
                  </td>

                  {/* NEOINTELLI */}
                  <td className="px-2.5 py-1.5 sm:py-2 text-center">
                    {isNeointelli ? (
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full bg-[#00A3E0] shadow-xs"
                        title="NeoIntelli operates"
                      />
                    ) : (
                      <span className="text-slate-300 font-light text-xs select-none">-</span>
                    )}
                  </td>

                  {/* JOINT */}
                  <td className="px-2.5 py-1.5 sm:py-2 text-center">
                    {isJoint ? (
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#0D244D] to-[#00A3E0] shadow-xs"
                        title="Joint responsibility"
                      />
                    ) : (
                      <span className="text-slate-300 font-light text-xs select-none">-</span>
                    )}
                  </td>

                  {/* NOTES */}
                  <td className="px-4 sm:px-5 py-1.5 sm:py-2 text-[11.5px] sm:text-xs text-[#505D74] leading-snug">
                    {row.note ?? (
                      <span className="text-slate-300 font-light text-xs select-none">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── BOTTOM LEGEND & CONTRACT NOTE ── */}
      <div className="mt-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-2 text-xs text-[#505D74]">
        {/* Left: Legend Dots */}
        <div className="flex items-center gap-4 sm:gap-5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D244D] shrink-0" />
            <span className="font-medium text-[#0D244D]">Client owns</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A3E0] shrink-0" />
            <span className="font-medium text-[#0D244D]">NeoIntelli owns</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#0D244D] to-[#00A3E0] shrink-0 shadow-xs" />
            <span className="font-medium text-[#0D244D]">Joint responsibility</span>
          </div>
        </div>

        {/* Right: Contract Scope Note */}
        <p className="text-[11px] sm:text-xs text-[#505D74] leading-relaxed">
          <span className="font-medium text-[#0D244D]">Note:</span> Exact responsibilities are defined in the engagement operating model and contract.
        </p>
      </div>
    </div>
  );
}
