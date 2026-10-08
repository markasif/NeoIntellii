/**
 * CSV export of a result snapshot.
 *
 * A spreadsheet is where a finance reader will actually take this apart, so
 * the export carries the monthly cash flow and every assumption behind it -
 * not a summary of the summary.
 *
 * Two safety rules matter here. Every cell that could have come from a visitor
 * is prefixed when it starts with a formula character, so a scenario label of
 * `=cmd|...` opens as text rather than executing in Excel. And the currency and
 * unit are declared in the file, because a column of bare numbers with no unit
 * is how a monthly figure becomes an annual one in somebody else's model.
 */

import { CATEGORY_LABELS, CATEGORY_UNIT_LABELS } from "./defaults";
import { cityLabel } from "./cities";
import { roleLabel, seniorityLabel } from "./roles";
import { PLANNING_ESTIMATE_NOTE } from "./snapshot";
import type { CurrencyCode, ResultSnapshot } from "./types";

export interface CsvOptions {
  /**
   * Currency to write the figures in. Defaults to the currency the model
   * computed in.
   *
   * The workspace passes the visitor's display currency, so the file matches
   * what was on screen when they clicked - a spreadsheet in a different
   * currency from the page that produced it is a reconciliation problem
   * waiting to happen. The compute currency and the rate used are still
   * written into the header, so nothing is lost.
   */
  currency?: CurrencyCode;
  /** Converts a compute-currency figure into `currency`. */
  convert?: (value: number) => number | null;
}

/**
 * Excel, Sheets and Numbers all treat a leading =, +, - or @ as a formula.
 * A tab or carriage return can smuggle one past a naive check, so those are
 * stripped from the front before the test.
 */
export function escapeCsvCell(value: unknown): string {
  const raw = value == null ? "" : String(value);
  const leading = raw.replace(/^[\t\r\n ]+/, "");
  const dangerous = /^[=+\-@]/.test(leading);
  const text = dangerous ? `'${raw}` : raw;
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

const row = (cells: unknown[]): string => cells.map(escapeCsvCell).join(",");

const round2 = (value: number): number => Math.round(value * 100) / 100;

/**
 * The whole snapshot as one CSV: header block, monthly cash flow, line items,
 * assumptions, sources and open questions.
 */
export function snapshotToCsv(snapshot: ResultSnapshot, options: CsvOptions = {}): string {
  const { cost, economics, profile, scenario } = snapshot;
  const currency = options.currency ?? cost.currency;
  const convertValue = options.convert ?? ((value: number) => value);
  /** Every money figure in the file goes through here. */
  const amount = (value: number): number | string => {
    const converted = convertValue(value);
    return converted == null ? "Not available" : round2(converted);
  };
  const lines: string[] = [];

  lines.push(row(["NeoIntelli GCC Decision Lab - case export"]));
  lines.push(row(["Case ID", snapshot.caseId]));
  lines.push(row(["Generated", snapshot.computedAt]));
  lines.push(row(["Status", snapshot.reviewState === "practitioner-reviewed" ? "Practitioner reviewed" : "Planning estimate"]));
  lines.push(row(["Model version", snapshot.modelVersion]));
  lines.push(row(["Data version", snapshot.dataVersion]));
  lines.push(row(["Input hash", snapshot.inputHash]));
  lines.push(row(["Currency", currency]));
  lines.push(row(["Model computed in", cost.currency]));
  lines.push(row(["FX quote date", snapshot.fxQuoteDate]));
  lines.push(row(["FX origin", scenario.fx.origin === "user-entered" ? "Entered by you" : "NeoIntelli planning default - not a live rate"]));
  lines.push(row(["City", cityLabel(scenario.cityOverride ?? profile.city)]));
  lines.push(row(["Objective", economics.differenceLabel]));
  lines.push(row(["Note", PLANNING_ESTIMATE_NOTE]));
  lines.push("");

  /* ------------------------------------------------------------- headlines */

  lines.push(row(["Headline figures", `Amount (${currency})`, "Unit", "Basis"]));
  lines.push(row(["First-year cash", amount(cost.firstYearCash), "Sum of months 1-12", "Derived result"]));
  lines.push(row(["Steady-state monthly run rate", amount(cost.steadyStateMonthly), "Per month at target team size", "Derived result"]));
  lines.push(row(["Steady-state annual run rate", amount(cost.steadyStateAnnual), "Per year at target team size", "Derived result"]));
  lines.push(row(["One-time costs", amount(cost.oneTimeTotal), "Total across the horizon", "Derived result"]));
  if (cost.steadyStateBand) {
    lines.push(row(["Steady-state planning band, low", amount(cost.steadyStateBand.low), "Per month", "Planning assumption"]));
    lines.push(row(["Steady-state planning band, high", amount(cost.steadyStateBand.high), "Per month", "Planning assumption"]));
  }
  lines.push(row(["Unfilled FTE-months", round2(cost.unfilledFteMonths), "FTE-months of planned capacity not delivered", "Derived result"]));
  lines.push("");

  /* ---------------------------------------------------------------- team */

  lines.push(row(["Team", "Role", "Seniority", "FTE", "Start month", "Compensation basis", "Figure entered by you"]));
  profile.team.forEach((teamRow) => {
    lines.push(
      row([
        "",
        roleLabel(teamRow.roleKey),
        seniorityLabel(teamRow.seniority),
        teamRow.fte,
        teamRow.startMonth,
        teamRow.compensationBasis,
        teamRow.overrideAnnual != null ? `${teamRow.overrideAnnual} ${teamRow.overrideCurrency ?? currency}` : "No - benchmark used",
      ]),
    );
  });
  lines.push("");

  /* ---------------------------------------------------------- line items */

  lines.push(row(["Cost line", "Charged on", "Steady-state monthly", "First year", "Horizon total", "Basis", "Covered by bundled fee"]));
  cost.lineItems.forEach((item) => {
    lines.push(
      row([
        CATEGORY_LABELS[item.category],
        CATEGORY_UNIT_LABELS[item.category],
        amount(item.steadyStateMonthly),
        amount(item.firstYear),
        amount(item.total),
        item.basis,
        item.coveredByBundle ? "Yes - not charged again" : "No",
      ]),
    );
  });
  lines.push("");

  /* -------------------------------------------------------- monthly cash */

  const hasBaseline = economics.baselineCashMonthly != null;
  lines.push(
    row([
      "Month",
      `India cash (${currency})`,
      `Comparable baseline (${currency})`,
      `Net difference (${currency})`,
      `Cumulative difference (${currency})`,
      "Headcount",
    ]),
  );
  cost.indiaCashMonthly.forEach((value, index) => {
    lines.push(
      row([
        index + 1,
        amount(value),
        hasBaseline ? amount(economics.baselineCashMonthly![index]) : "No baseline",
        hasBaseline ? amount(economics.netDifferenceMonthly![index]) : "Not available",
        hasBaseline ? amount(economics.cumulativeDifference![index]) : "Not available",
        round2(cost.headcountMonthly[index] ?? 0),
      ]),
    );
  });
  lines.push("");

  /* ------------------------------------------------------------ economics */

  lines.push(row(["Economics", "Value", "Note"]));
  lines.push(row(["Payback", economics.paybackMonth != null ? `Month ${economics.paybackMonth}` : "Not available", paybackNote(economics.paybackState)]));
  lines.push(row(["Sustained payback", economics.sustainedPaybackMonth != null ? `Month ${economics.sustainedPaybackMonth}` : "Not available", "First month after which the cumulative difference stays non-negative"]));
  lines.push(
    row([
      "ROI",
      economics.roiPercent != null ? `${round2(economics.roiPercent)}%` : "Not available",
      economics.roiUnavailableReason ??
        "Cumulative net benefit divided by the separately identified transition investment. Not project profitability and not a revenue return.",
    ]),
  );
  lines.push(row(["Transition investment", amount(economics.transitionInvestment), "Counted once inside the cash costs above; not deducted again"]));
  if (economics.npv != null) {
    lines.push(row(["NPV", amount(economics.npv), `Pre-tax planning basis at ${((economics.discountRateAnnual ?? 0) * 100).toFixed(1)}% a year`]));
  }
  lines.push("");

  /* ---------------------------------------------------------- assumptions */

  lines.push(row(["Assumption", "Value", "Unit", "Low", "High", "Basis", "Source", "Confidence", "Why"]));
  snapshot.assumptions.forEach((item) => {
    lines.push(
      row([
        item.label,
        item.descriptive ? "-" : item.value,
        item.unit,
        item.low ?? "",
        item.high ?? "",
        item.basis,
        item.sourceId ?? "",
        item.confidence,
        item.confidenceRationale,
      ]),
    );
  });
  lines.push("");

  /* -------------------------------------------------------------- sources */

  lines.push(row(["Source", "Publisher", "As of", "URL", "Coverage"]));
  snapshot.sources.forEach((source) => {
    lines.push(row([source.title, source.publisher, source.asOf, source.url ?? "", source.coverageNote ?? ""]));
  });
  lines.push("");

  /* --------------------------------------------- exclusions and questions */

  lines.push(row(["Excluded from these figures"]));
  if (cost.exclusions.length === 0) lines.push(row(["Nothing is excluded."]));
  cost.exclusions.forEach((exclusion) => lines.push(row([exclusion])));
  lines.push("");

  lines.push(row(["Open questions"]));
  if (snapshot.openQuestions.length === 0) lines.push(row(["None recorded."]));
  snapshot.openQuestions.forEach((question) => lines.push(row([question])));
  lines.push("");

  lines.push(row(["Warnings"]));
  if (snapshot.warnings.length === 0) lines.push(row(["None."]));
  snapshot.warnings.forEach((warning) => lines.push(row([warning.severity, warning.message])));

  return lines.join("\r\n");
}

function paybackNote(state: ResultSnapshot["economics"]["paybackState"]): string {
  switch (state) {
    case "no-baseline": return "No baseline was entered, so there is nothing to pay back against.";
    case "no-initial-deficit": return "No initial deficit in this model - there was never a negative cumulative balance to recover.";
    case "recovered": return "First month the cumulative difference turned non-negative after an initial deficit.";
    case "not-recovered-in-horizon": return "The initial deficit is not recovered inside the modelled horizon.";
    default: return "";
  }
}

/** Filename for the download. Case id, so two exports are distinguishable. */
export const csvFilename = (snapshot: ResultSnapshot): string =>
  `neointelli-gcc-case-${snapshot.caseId}.csv`;
