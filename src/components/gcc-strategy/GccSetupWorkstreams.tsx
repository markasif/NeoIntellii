import { setupPhases, setupWorkstreams, type SetupPhaseKey } from "@/data/gccStrategyContent";

const phaseIndex = (key: SetupPhaseKey) => setupPhases.findIndex((p) => p.key === key);

export default function GccSetupWorkstreams({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      {/* Wide screens: comparison table matching the approved NeoIntelli ResponsiveTable system */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#D2DCF0] bg-white shadow-[0_4px_24px_rgba(13,48,108,0.05)]">
        <table className="w-full text-left text-sm border-collapse min-w-[760px] table-fixed">
          <caption className="sr-only">Setup workstreams by phase</caption>
          <colgroup>
            <col className="w-[230px]" />
            <col className="w-1/4" />
            <col className="w-1/4" />
            <col className="w-1/4" />
            <col className="w-1/4" />
          </colgroup>
          <thead className="bg-[#0D244D] text-white">
            <tr>
              <th
                scope="col"
                className="p-4 sm:p-5 font-bold text-xs sm:text-[13px] tracking-wide uppercase font-mono align-middle first:rounded-tl-2xl"
              >
                Workstream
              </th>
              {setupPhases.map((p, idx) => (
                <th
                  key={p.key}
                  scope="col"
                  className={`p-4 sm:p-5 text-center align-middle border-l border-white/10 ${
                    idx === setupPhases.length - 1 ? "last:rounded-tr-2xl" : ""
                  }`}
                >
                  <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider font-mono text-white">
                    {p.label}
                  </span>
                  <span className="block text-2xs text-[#C5D7F0] font-normal normal-case mt-1 tracking-normal font-sans">
                    {p.note}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D2DCF0]/60">
            {setupWorkstreams.map((w, rowIndex) => {
              const startColumn = phaseIndex(w.from) + 1;
              const endColumn = phaseIndex(w.to) + 2;
              const rowBg = rowIndex % 2 === 0 ? "bg-white" : "bg-[#F7FAFD]";
              const fromLabel = setupPhases[phaseIndex(w.from)].label;
              const toLabel = setupPhases[phaseIndex(w.to)].label;

              return (
                <tr
                  key={w.name}
                  className={`transition-colors hover:bg-[#F0F6FC] ${rowBg}`}
                >
                  <th
                    scope="row"
                    className="p-4 sm:p-5 text-[#0D306C] font-bold text-xs sm:text-[13.5px] align-middle font-manrope border-r border-[#D2DCF0]/60"
                  >
                    {w.name}
                  </th>
                  <td colSpan={4} className="relative p-2.5 sm:p-3.5 align-middle">
                    {/* Vertical grid guidelines aligning with columns */}
                    <div className="absolute inset-0 grid grid-cols-4 pointer-events-none divide-x divide-[#D2DCF0]/35" />

                    {/* Gantt pill in rich amber style */}
                    <div className="relative z-10 grid grid-cols-4 gap-x-2.5 sm:gap-x-3 w-full">
                      <div
                        className="h-8 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-500/25 to-amber-600/20 border border-amber-500/40 flex items-center px-3.5 shadow-2xs hover:border-amber-600/60 hover:shadow-xs transition-all cursor-default group/bar"
                        style={{ gridColumn: `${startColumn} / ${endColumn}` }}
                        title={w.summary}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0 mr-2" />
                        <span className="text-xs text-[#92400E] font-semibold truncate font-manrope">
                          {fromLabel}
                          {w.from !== w.to ? ` → ${toLabel}` : ""}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Small screens: stacked cards matching NeoIntelli responsive table mobile design */}
      <ol className="md:hidden space-y-3.5" aria-label="Setup workstreams by phase">
        {setupWorkstreams.map((w) => {
          const fromLabel = setupPhases[phaseIndex(w.from)].label;
          const toLabel = setupPhases[phaseIndex(w.to)].label;
          const phaseSpan = w.from === w.to ? fromLabel : `${fromLabel} → ${toLabel}`;
          return (
            <li
              key={w.name}
              className="rounded-2xl border border-[#D2DCF0] bg-white p-5 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-3 border-b border-[#D2DCF0]/60 pb-3">
                <h3 className="text-base font-bold font-manrope text-[#0D306C] leading-snug">
                  {w.name}
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-2xs sm:text-xs font-semibold text-[#92400E] shrink-0 font-manrope">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                  {phaseSpan}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#505D74] mt-3 leading-relaxed font-normal">
                {w.summary}
              </p>
            </li>
          );
        })}
      </ol>

      <p className="text-xs sm:text-[13px] text-[#505D74] mt-4 max-w-6xl leading-relaxed font-normal">
        Phases are illustrative program stages, not guaranteed dates. Their length depends on the operating model, the entity
        route, the leadership market for the roles required and the workplace strategy, and is scoped per program.
      </p>
    </div>
  );
}
