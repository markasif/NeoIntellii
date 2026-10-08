/**
 * Currency conversion for the Decision Lab.
 *
 * Every quote in an FxSet is INR per one unit of the foreign currency, so the
 * conversion is always the same shape:
 *
 *   foreign_amount = INR_amount / INR_per_foreign_unit
 *   INR_amount     = foreign_amount * INR_per_foreign_unit
 *
 * Cross-currency conversion goes through INR rather than multiplying two
 * quotes together, so there is exactly one anchor and one rounding point.
 *
 * The default quotes below are planning defaults, not a live feed. They are
 * labelled as such everywhere they surface, and the user can replace any of
 * them. Nothing in this file claims a market rate.
 */

import type { CurrencyCode, FxSet } from "./types";

/** Symbols used for display. Falls back to the code when there is no symbol. */
const SYMBOLS: Partial<Record<CurrencyCode, string>> = {
  INR: "₹",
  USD: "$",
  GBP: "£",
  EUR: "€",
  CAD: "C$",
  AUD: "A$",
  SGD: "S$",
};

export const SUPPORTED_CURRENCIES: CurrencyCode[] = [
  "USD", "EUR", "GBP", "INR", "CHF", "NOK", "SEK", "DKK", "CAD", "AUD", "SGD",
];

/**
 * Planning FX quotes: INR per one unit.
 *
 * These are round planning numbers chosen so the arithmetic is inspectable,
 * not a rate anyone should transact on. Anything published to a visitor must
 * carry the "planning default - edit to your own rate" label, and the quote
 * date travels with the snapshot.
 */
export const DEFAULT_FX: FxSet = {
  quotes: {
    INR: 1,
    USD: 85,
    EUR: 92,
    GBP: 108,
    CHF: 96,
    NOK: 8,
    SEK: 8,
    DKK: 12,
    CAD: 62,
    AUD: 56,
    SGD: 64,
  },
  quoteDate: "2026-09-05",
  origin: "planning-default",
};

export const currencySymbol = (currency: CurrencyCode): string => SYMBOLS[currency] ?? `${currency} `;

/** INR per one unit of `currency`, or null when the set does not quote it. */
export function inrPerUnit(fx: FxSet, currency: CurrencyCode): number | null {
  const quote = fx.quotes[currency];
  if (!Number.isFinite(quote) || quote == null || quote <= 0) return null;
  return quote;
}

/** foreign_amount = INR_amount / INR_per_foreign_unit. */
export function fromInr(inrAmount: number, inrPerForeignUnit: number): number {
  if (!Number.isFinite(inrAmount) || !Number.isFinite(inrPerForeignUnit) || inrPerForeignUnit <= 0) return NaN;
  return inrAmount / inrPerForeignUnit;
}

/** INR_amount = foreign_amount * INR_per_foreign_unit. */
export function toInr(amount: number, inrPerForeignUnit: number): number {
  if (!Number.isFinite(amount) || !Number.isFinite(inrPerForeignUnit) || inrPerForeignUnit <= 0) return NaN;
  return amount * inrPerForeignUnit;
}

/**
 * Converts between any two quoted currencies, via INR.
 *
 * Returns null - never a silent zero - when either currency is unquoted, so
 * the caller has to decide what to show instead of printing a wrong number.
 */
export function convert(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  fx: FxSet,
): number | null {
  if (!Number.isFinite(amount)) return null;
  if (from === to) return amount;
  const fromQuote = inrPerUnit(fx, from);
  const toQuote = inrPerUnit(fx, to);
  if (fromQuote == null || toQuote == null) return null;
  return fromInr(toInr(amount, fromQuote), toQuote);
}

/**
 * Applies a relative shock to every non-INR quote.
 *
 * `+0.1` is a 10% change in the quote itself: more rupees per unit of foreign
 * currency, which is a weaker rupee. That makes an INR-denominated cost
 * *cheaper* when read in the foreign currency, and makes anything priced in a
 * foreign currency (cloud, tooling) more expensive in rupees. The economics
 * layer applies both effects; this function only moves the quotes.
 */
export function shockFx(fx: FxSet, relativeChange: number): FxSet {
  const quotes = { ...fx.quotes };
  (Object.keys(quotes) as CurrencyCode[]).forEach((code) => {
    if (code === "INR") return;
    quotes[code] = quotes[code] * (1 + relativeChange);
  });
  return {
    ...fx,
    quotes,
    note: `${(relativeChange * 100).toFixed(0)}% stress applied to the ${fx.quoteDate} quotes`,
  };
}

/** Money for display. Whole units - these are planning figures, not invoices. */
export function formatMoney(amount: number | null | undefined, currency: CurrencyCode): string {
  if (amount == null || !Number.isFinite(amount)) return "Not available";
  const symbol = currencySymbol(currency);
  const rounded = Math.round(amount);
  const sign = rounded < 0 ? "-" : "";
  return `${sign}${symbol}${Math.abs(rounded).toLocaleString("en-US")}`;
}

/**
 * Indian numbering: "₹44.2L", "₹1.25 Cr".
 *
 * The Indian market talks about pay in lakh per annum on a cost-to-company
 * basis, and a recruiter, a candidate and a finance lead in Bengaluru will all
 * read a figure in that form far faster than they will read a converted dollar
 * number. Showing it costs nothing and makes a miscalibrated band obvious to
 * anyone who knows the market, rather than hiding it behind a currency
 * conversion.
 */
export function formatLakh(inrAmount: number | null | undefined): string {
  if (inrAmount == null || !Number.isFinite(inrAmount)) return "Not available";
  const abs = Math.abs(inrAmount);
  const sign = inrAmount < 0 ? "-" : "";
  if (abs >= 10_000_000) return `${sign}₹${(abs / 10_000_000).toFixed(2)} Cr`;
  if (abs >= 100_000) return `${sign}₹${(abs / 100_000).toFixed(1)}L`;
  return `${sign}₹${Math.round(abs).toLocaleString("en-IN")}`;
}

/** Compact form for headline tiles: ₹1.2M, $840K. */
export function formatMoneyCompact(amount: number | null | undefined, currency: CurrencyCode): string {
  if (amount == null || !Number.isFinite(amount)) return "Not available";
  const symbol = currencySymbol(currency);
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";
  if (abs >= 1_000_000) return `${sign}${symbol}${(abs / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 1)}M`;
  if (abs >= 1_000) return `${sign}${symbol}${Math.round(abs / 1_000)}K`;
  return `${sign}${symbol}${Math.round(abs)}`;
}
