import ResponsiveMatrix from "./ResponsiveMatrix";

const models = ["Outsource", "EOR-first", "AI Micro GCC", "Managed GCC", "BOT", "Captive GCC"];

const dimensions = [
  { label: "Mandate", cells: ["Defined, bounded deliverables", "Small pilot scope", "One squad with a clear charter", "Defined functions, enterprise-directed", "Multi-function center, ownership intended", "Strategic, multi-year ownership"] },
  { label: "Ownership intent", cells: ["Low", "Undecided or testing", "High, scaling over time", "Medium to high", "High, after transfer", "Highest"] },
  { label: "Team size at start", cells: ["Any", "Very small", "One squad", "Small to medium", "Medium", "Medium to large"] },
  { label: "Talent scarcity", cells: ["Vendor's problem", "Enterprise's, without local brand", "Handled by NeoIntelli's AI Talent engine", "Partner-led hiring", "Partner-led, then enterprise", "Enterprise-led, partner-assisted"] },
  { label: "AI / Data intensity", cells: ["Low", "Low to medium", "High by design", "Medium", "Medium to high", "High"] },
  { label: "IP sensitivity", cells: ["Low", "Medium", "High", "Medium to high", "High", "Highest"] },
  { label: "Location", cells: ["Vendor decides", "Single city, EOR coverage", "Chosen around the squad's roles", "Partner's operating cities", "Partner's cities, then enterprise", "Enterprise decision, full evaluation"] },
  { label: "Operating complexity carried", cells: ["None", "Low", "Low initially", "Low", "Low, then full", "Full"] },
  { label: "Investment appetite", cells: ["Opex only", "Minimal", "Modest", "Moderate", "Moderate, transfer cost later", "Highest up front"] },
  { label: "Speed", cells: ["Fast", "Fastest", "Fast", "Fast", "Fast to operate, slower to own", "Slowest"] },
  { label: "Transfer requirement", cells: ["None", "Later conversion to own entity", "Built in", "By agreement", "Contractual milestone", "Not needed"] },
];

/**
 * NeoIntelli GCC Decision Framework: which starting model fits which
 * situation. Qualitative on purpose; a numeric score would imply a precision
 * the underlying judgments do not have.
 */
export default function GccDecisionFramework({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <ResponsiveMatrix
        caption="NeoIntelli GCC Decision Framework: how mandate, ownership, size, talent, AI intensity, IP, location, complexity, investment, speed and transfer requirement map to each entry model"
        rowHeader="Dimension"
        columns={models}
        rows={dimensions}
        mobileGroupBy="column"
      />
      <p className="text-xs text-body-muted mt-4 max-w-4xl mx-auto leading-relaxed text-center">
        How to read it: find the row that describes your situation most strongly, then read across. If most rows point
        to the right-hand columns, plan for ownership. If they point left, a partner-owned outcome may be the better
        decision. NeoIntelli's framework is deliberately qualitative; the weighting is a conversation, not a formula.
      </p>
    </div>
  );
}
