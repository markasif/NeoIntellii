/**
 * Design tokens for the /lp/india-engineering-squad paid landing page.
 *
 * The page is deliberately the same design system as /lp/micro-gcc-india: same
 * navy canvas, same amber accent, same panels, same field styling. Rather than
 * copy the palette (and let the two drift), the tokens are re-exported from the
 * original page's theme module, which stays the single source of truth.
 *
 * Only tokens this page needs and the other does not are defined here.
 */

export {
  LP,
  PANEL,
  PANEL_RAISED,
  PANEL_DARK,
  H2,
  H2_DARK,
  BODY,
  BODY_LG,
  BODY_DARK,
  MUTED,
  EYEBROW,
  BTN_PRIMARY,
  BTN_GHOST_DARK,
  FIELD,
} from "@/components/landing/micro-gcc-india/theme";

/** Amber-tinted card, used for the "you keep" and highlight blocks on light. */
export const PANEL_ACCENT = "rounded-2xl border border-[#f97316]/30 bg-[#f97316]/[0.06]";

/** White pill CTA, readable on the dark final CTA band. */
export const BTN_ON_DARK =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] text-[#0a1533] font-semibold transition-colors hover:bg-[#e8eefb]";

/** Muted panel for the alternating light bands, one step down from PANEL. */
export const PANEL_TINT = "rounded-2xl border border-[#dde7f7] bg-[#f7fafe]";

/** Small-caps eyebrow inside a card. */
export const CARD_LABEL = "text-[11px] tracking-[0.14em] uppercase font-semibold text-[#5d6a8a]";

/** Section heading sizes one step below H2, used for sub-headlines. */
export const H3 = "text-[20px] md:text-[24px] text-[#101c4a] font-bold tracking-[-0.02em] leading-snug";
