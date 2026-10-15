import ResponsiveMatrix from "./ResponsiveMatrix";

const columns = [
  "Ownership",
  "Speed to start",
  "Operating responsibility",
  "Entity",
  "Talent control",
  "IP",
  "Management overhead",
  "Transferability",
];

const rows = [
  {
    label: "Captive / wholly owned GCC",
    cells: [
      "Enterprise owns from day one",
      "Slowest: entity, leadership and workplace lead times apply",
      "Enterprise, commonly with partner support early on",
      "Own Indian entity required",
      "Full",
      "Held by the enterprise",
      "Highest",
      "Not applicable; already owned",
    ],
  },
  {
    label: "Assisted build-out / GCC-as-a-Service",
    cells: [
      "Enterprise owns; partner runs setup and often early operations",
      "Faster than unaided captive",
      "Shared, depending on contract",
      "Usually the enterprise's entity",
      "High",
      "Typically assigned to the enterprise",
      "Medium",
      "Operating layer moves in-house over time",
    ],
  },
  {
    label: "Build-Operate-Transfer (BOT)",
    cells: [
      "Partner initially; enterprise after transfer",
      "Fast: partner entity and processes already exist",
      "Partner until transfer",
      "Partner entity first, enterprise entity at transfer, depending on contract",
      "Shared until transfer",
      "Typically assigned to the enterprise by contract",
      "Low initially, rises at transfer",
      "Defined transfer milestone",
    ],
  },
  {
    label: "Managed GCC",
    cells: [
      "Enterprise owns the mandate; partner runs operations",
      "Fast",
      "Partner",
      "Either, depending on contract",
      "High on direction, lower on employment",
      "Typically assigned to the enterprise",
      "Low",
      "Commonly convertible by agreement",
    ],
  },
  {
    label: "EOR-first entry",
    cells: [
      "Enterprise directs; EOR is the legal employer",
      "Fastest for a small team",
      "EOR for employment, enterprise for work",
      "None required initially",
      "Medium: day-to-day direction, not employment",
      "Needs explicit assignment terms",
      "Low",
      "People convert to the enterprise's entity later",
    ],
  },
  {
    label: "AI Micro GCC",
    cells: [
      "Enterprise owns the squad and the operating model",
      "Fast: one senior-led squad",
      "NeoIntelli operates initially, path to in-house",
      "EOR or partner entity first, own entity as it scales",
      "High",
      "Assigned to the enterprise",
      "Low",
      "Designed to scale into a full GCC",
    ],
    highlight: true,
  },
  {
    label: "Outsourcing",
    cells: [
      "Vendor owns team and process",
      "Fast",
      "Vendor",
      "Vendor's",
      "Low",
      "Contract-dependent; often vendor-held methods",
      "Lowest",
      "Limited; knowledge sits with the vendor",
    ],
  },
];

/** Educational comparison of the common ways to establish capability in India. Practical, not legal, definitions. */
export default function GccModelComparison({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <ResponsiveMatrix
        caption="Comparison of GCC entry models across ownership, speed, operating responsibility, entity, talent control, IP, overhead and transferability"
        rowHeader="Model"
        columns={columns}
        rows={rows}
      />
      <p className="text-xs text-body-muted mt-4 max-w-6xl leading-relaxed">
        These are practical descriptions of how each model commonly works, not standardized legal definitions. Ownership,
        IP and transfer terms depend on the specific contract and on advice from qualified legal and tax advisers.
      </p>
    </div>
  );
}
