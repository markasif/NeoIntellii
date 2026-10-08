/**
 * Market-proof block for the GCC Strategy & Setup parent page.
 *
 * Policy: the site shows one market-proof block, on the parent only, and it
 * must carry current, sourced figures. The figures themselves live in
 * src/data/gccMarketStats.ts so that every page quoting the India GCC market
 * reads the same numbers from one file. This module only decides how the
 * parent page presents them.
 *
 * Figures are quoted from the India GCC Landscape Report 2026
 * (data as of March 2026 / FY2026). To move to a later edition, update
 * gccMarketStats.ts and re-check `lastChecked`.
 */
import {
  GCC_MARKET_LAST_CHECKED,
  GCC_MARKET_SOURCE,
  GCC_MARKET_SOURCE_URL,
  GCC_MARKET_STAT_CARDS,
  gccMarketStats,
} from "./gccMarketStats";

export interface MarketStat {
  value: string;
  label: string;
  /** Short context so the number is never read out of context. */
  context?: string;
}

export interface MarketProof {
  source: string;
  sourceUrl?: string;
  year: string;
  lastChecked: string;
  stats: MarketStat[];
}

export const gccMarketProof: MarketProof = {
  source: GCC_MARKET_SOURCE,
  sourceUrl: GCC_MARKET_SOURCE_URL,
  year: `${gccMarketStats.period}, data as of ${gccMarketStats.asOf}`,
  lastChecked: GCC_MARKET_LAST_CHECKED,
  stats: [...GCC_MARKET_STAT_CARDS],
};
