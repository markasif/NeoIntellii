/**
 * The decision pack as a real PDF.
 *
 * Text, not a screenshot: the tables are drawn as text so the pack is
 * searchable, selectable and readable by a screen reader, and every page
 * carries a running header and a page number so a printed copy still says what
 * it is and where it came from.
 *
 * jsPDF is imported dynamically inside `exportPdf`, so neither it nor its
 * table plugin is in the bundle that has to produce the first estimate on a
 * phone. If the import or the render fails, the caller falls back to the
 * printable HTML view - there is always a way to get the pack out.
 *
 * Length follows the case. A pack with no baseline and three answered
 * readiness questions is short; one with a full comparison and a launch plan
 * is longer. Nothing is padded to reach a page count.
 */

import { CATEGORY_LABELS, CATEGORY_UNIT_LABELS } from "./defaults";
import { cityLabel } from "./cities";
import { formatMoney } from "./currency";
import { roleLabel, seniorityLabel } from "./roles";
import { SEVERITY_LABELS } from "./risk";
import { STATUS_LABELS } from "./policy";
import { WORKSTREAM_LABELS } from "./launchPlan";
import type { LaunchPlan } from "./launchPlan";
import type { CurrencyCode, PolicyRecord, ResultSnapshot, RiskItem, SurfacedPolicy } from "./types";

export interface PackInput {
  snapshot: ResultSnapshot;
  risks: RiskItem[];
  policies: SurfacedPolicy[];
  plan: LaunchPlan;
  displayCurrency: CurrencyCode;
  /** Converts a compute-currency figure into the display currency. */
  toDisplay: (value: number) => number | null;
}

const MARGIN = 42;

export async function exportPdf(input: PackInput): Promise<void> {
  const [{ jsPDF }, autoTableModule] = await Promise.all([import("jspdf"), import("jspdf-autotable")]);
  const autoTable = (autoTableModule as { default: (doc: unknown, options: unknown) => void }).default;

  const { snapshot, risks, policies, plan, displayCurrency, toDisplay } = input;
  const money = (value: number | null | undefined): string => {
    if (value == null) return "Not available";
    const converted = toDisplay(value);
    return converted == null ? "Not available" : formatMoney(converted, displayCurrency);
  };

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = MARGIN;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - MARGIN - 24) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const heading = (text: string, size = 15) => {
    ensureSpace(size + 18);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);
    doc.setTextColor(30, 30, 50);
    doc.text(text, MARGIN, y);
    y += size + 8;
  };

  const paragraph = (text: string, size = 9.5) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    doc.setTextColor(60, 65, 85);
    const lines = doc.splitTextToSize(text, pageWidth - MARGIN * 2) as string[];
    lines.forEach((line) => {
      ensureSpace(size + 4);
      doc.text(line, MARGIN, y);
      y += size + 3.5;
    });
    y += 6;
  };

  const bullets = (items: string[], size = 9) => {
    items.forEach((item) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(size);
      doc.setTextColor(60, 65, 85);
      const lines = doc.splitTextToSize(item, pageWidth - MARGIN * 2 - 14) as string[];
      lines.forEach((line, index) => {
        ensureSpace(size + 4);
        doc.text(index === 0 ? "•" : " ", MARGIN, y);
        doc.text(line, MARGIN + 12, y);
        y += size + 3;
      });
      y += 2;
    });
    y += 4;
  };

  const table = (head: string[], body: (string | number)[][]) => {
    ensureSpace(60);
    autoTable(doc, {
      head: [head],
      body,
      startY: y,
      margin: { left: MARGIN, right: MARGIN },
      styles: { font: "helvetica", fontSize: 8.5, cellPadding: 5, textColor: [60, 65, 85], lineColor: [225, 228, 235], lineWidth: 0.5 },
      headStyles: { fillColor: [244, 246, 250], textColor: [30, 30, 50], fontStyle: "bold" },
      // Repeat the header on every page a long table spills onto.
      showHead: "everyPage",
      theme: "grid",
    });
    y = ((doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable?.finalY ?? y) + 18;
  };

  /* ------------------------------------------------------------- cover */

  doc.setFont("helvetica", "bold");
  doc.setFontSize(21);
  doc.setTextColor(30, 30, 50);
  doc.text("India GCC decision pack", MARGIN, y);
  y += 28;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 96, 116);
  doc.text(
    `${snapshot.reviewState === "practitioner-reviewed" ? "Practitioner reviewed" : "Planning estimate"} · Case ${snapshot.caseId} · Generated ${snapshot.computedAt.slice(0, 10)}`,
    MARGIN,
    y,
  );
  y += 24;

  paragraph(
    snapshot.reviewState === "practitioner-reviewed"
      ? "This pack has been reviewed by a NeoIntelli practitioner."
      : "This is automated output. It is labelled a planning estimate because no NeoIntelli practitioner has reviewed it. Ask for a review and the label changes only once one has actually happened.",
  );

  /* -------------------------------------------------- 1. decision summary */

  heading("1. Decision summary");
  const cost = snapshot.cost;
  const economics = snapshot.economics;
  table(
    ["Figure", "Value", "What it means"],
    [
      ["First-year cash", money(cost.firstYearCash), "Twelve actual months including the ramp, plus one-time costs"],
      ["Steady-state monthly", money(cost.steadyStateMonthly), "Run rate once every seat is filled"],
      ["Steady-state annual", money(cost.steadyStateAnnual), "Twelve times the run rate above"],
      ["One-time costs", money(cost.oneTimeTotal), "Recruitment, equipment, setup and transition"],
      [
        "Payback",
        economics.paybackMonth != null
          ? `Month ${economics.paybackMonth}`
          : economics.paybackState === "no-initial-deficit"
            ? "No initial deficit in this model"
            : economics.paybackState === "not-recovered-in-horizon"
              ? "Not recovered inside 60 months"
              : "Not available - no baseline",
        "First month the cumulative difference turns non-negative after a deficit",
      ],
      [
        "ROI",
        economics.roiPercent != null ? `${Math.round(economics.roiPercent)}%` : "Not available",
        economics.roiUnavailableReason ?? "Cumulative net benefit over the separately identified transition investment",
      ],
    ],
  );

  /* --------------------------------------------- 2. objective and baseline */

  heading("2. Objective and baseline", 13);
  paragraph(economics.differenceLabel);
  if (economics.baselineCashMonthly == null) {
    paragraph(
      "No baseline was entered, so this pack contains no savings figure, no ROI and no payback. The India cost stands on its own; the other side of the comparison is missing and only you have it.",
    );
  }

  /* ---------------------------------------------- 3. team and hiring waves */

  heading("3. Team and hiring waves", 13);
  if (snapshot.profile.team.length === 0) {
    paragraph("No team has been configured.");
  } else {
    table(
      ["Role", "Seniority", "FTE", "Starts", "Basis of figure"],
      snapshot.profile.team.map((row) => [
        roleLabel(row.roleKey),
        seniorityLabel(row.seniority),
        String(row.fte),
        `Month ${row.startMonth}`,
        row.overrideAnnual != null ? "Your figure" : "NeoIntelli planning band",
      ]),
    );
  }

  /* ------------------------------------------------------ 4. cost detail */

  heading("4. Cost detail", 13);
  table(
    ["Line", "Charged on", "Steady month", "First year", "Basis"],
    cost.lineItems.map((item) => [
      CATEGORY_LABELS[item.category],
      CATEGORY_UNIT_LABELS[item.category],
      item.coveredByBundle ? "In the fee" : money(item.steadyStateMonthly),
      item.coveredByBundle ? "In the fee" : money(item.firstYear),
      item.basis,
    ]),
  );

  /* ------------------------------------------------- 5. monthly cash flow */

  heading("5. Cash flow", 13);
  paragraph(
    "The full monthly schedule is in the CSV export. These are the checkpoints, and they are the same numbers - both come from one snapshot.",
  );
  const checkpoints = [1, 3, 6, 12, 24, 36, 48, 60].filter((month) => month <= cost.indiaCashMonthly.length);
  table(
    ["Month", "India cash", "Baseline", "Cumulative difference", "Headcount"],
    checkpoints.map((month) => [
      String(month),
      money(cost.indiaCashMonthly[month - 1]),
      economics.baselineCashMonthly ? money(economics.baselineCashMonthly[month - 1]) : "No baseline",
      economics.cumulativeDifference ? money(economics.cumulativeDifference[month - 1]) : "Not available",
      (cost.headcountMonthly[month - 1] ?? 0).toFixed(1),
    ]),
  );

  /* -------------------------------------------------- 6. entry and policy */

  if (policies.length > 0) {
    heading("6. Country and policy considerations", 13);
    paragraph(
      "Every consideration below is modelled at zero value. A deduction is not a cash grant, provisions do not stack automatically, and none of these is a finding that you qualify for anything.",
    );
    table(
      ["Consideration", "Status", "What decides it"],
      policies.map((entry: SurfacedPolicy) => [
        `${entry.record.title} (${entry.record.jurisdiction})`,
        STATUS_LABELS[entry.status],
        (entry.record as PolicyRecord).missingFacts.slice(0, 2).join("; ") || "-",
      ]),
    );
  }

  /* ------------------------------------------------- 7. readiness and risk */

  if (risks.length > 0) {
    heading("7. Risks", 13);
    table(
      ["Risk", "Severity", "What to do", "Owner"],
      risks.map((risk) => [risk.title, SEVERITY_LABELS[risk.severity], risk.mitigation, risk.suggestedOwner]),
    );
  }

  /* ------------------------------------------------------ 8. launch plan */

  heading("8. Launch tasks", 13);
  paragraph(plan.note);
  table(
    ["Task", "Workstream", "Owner", "Days"],
    plan.tasks.map((task) => [task.title, WORKSTREAM_LABELS[task.workstream], task.ownerRole, `${task.startDay}-${task.endDay}`]),
  );

  /* -------------------------------------------- 9. open questions, always */

  heading("9. Unresolved questions", 13);
  if (snapshot.openQuestions.length === 0) {
    paragraph("None recorded.");
  } else {
    paragraph("These are the things this pack cannot answer. Read them before you act on anything above.");
    bullets(snapshot.openQuestions);
  }

  if (cost.exclusions.length > 0) {
    heading("10. Excluded from every figure", 13);
    bullets(cost.exclusions);
  }

  /* ----------------------------------------------- 11. assumptions, sources */

  heading("11. Assumptions", 13);
  table(
    ["Assumption", "Value", "Unit", "Basis", "Why"],
    snapshot.assumptions.map((assumption) => [
      assumption.label,
      assumption.descriptive
        ? "-"
        : assumption.low != null && assumption.high != null
          ? `${assumption.value} (${assumption.low}-${assumption.high})`
          : String(assumption.value),
      assumption.unit,
      assumption.basis,
      assumption.confidenceRationale,
    ]),
  );

  if (snapshot.sources.length > 0) {
    heading("12. Sources", 13);
    table(
      ["Source", "Publisher", "As of", "Coverage"],
      snapshot.sources.map((source) => [source.title, source.publisher, source.asOf, source.coverageNote ?? "-"]),
    );
  }

  heading("13. About these figures", 13);
  paragraph(
    `City: ${cityLabel(snapshot.scenario.cityOverride ?? snapshot.profile.city)}. Currency: ${displayCurrency}. FX quote dated ${snapshot.fxQuoteDate}, ${
      snapshot.scenario.fx.origin === "user-entered" ? "entered by you" : "a NeoIntelli planning default rather than a live rate"
    }. Model ${snapshot.modelVersion}, data ${snapshot.dataVersion}, input hash ${snapshot.inputHash}.`,
  );
  paragraph(
    "This pack is a planning aid. It is not tax, legal, employment or immigration advice, and nothing in it is a determination of eligibility for any scheme, treatment or arrangement.",
  );

  /* ------------------------------------------------ running header/footer */

  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(140, 146, 165);
    doc.text(`NeoIntelli GCC Decision Lab · Case ${snapshot.caseId} · Planning estimate`, MARGIN, MARGIN - 18);
    doc.text(`Page ${page} of ${pageCount}`, pageWidth - MARGIN, pageHeight - MARGIN + 16, { align: "right" });
    doc.text(snapshot.computedAt.slice(0, 10), MARGIN, pageHeight - MARGIN + 16);
  }

  doc.save(`neointelli-gcc-decision-pack-${snapshot.caseId}.pdf`);
}
