/**
 * Design tokens for the /lp/micro-gcc-india paid landing page.
 *
 * The page is a standalone paid landing page - no site navigation, no site
 * footer - so it carries its own palette rather than the global tokens (which
 * also redefine utilities like `.text-heading` as a font size).
 *
 *   navy deep  #0a1533  hero canvas, dark bands, final CTA
 *   navy       #16225c  navy panels inside the dark bands
 *   navy ink   #101c4a  display headings on light
 *   blue       #1f5fd0  primary CTA, headline accent
 *   sky        #8fb6f2  accents on dark surfaces
 *   amber      #f97316  the "seats are on us" band, step numbers, emphasis
 *   tint       #f3f6fc  alternating section background
 *   border     #dde7f7  card borders on light
 *   body       #2a3556  body copy on light
 *   muted      #5d6a8a  secondary copy on light
 *
 * Class strings are written out in full so Tailwind's scanner can see them.
 */

export const LP = {
  navyDeep: "#0a1533",
  navy: "#16225c",
  navyInk: "#101c4a",
  blue: "#1f5fd0",
  sky: "#8fb6f2",
  amber: "#f97316",
  tint: "#f3f6fc",
  border: "#dde7f7",
  body: "#2a3556",
  muted: "#5d6a8a",
} as const;

/** White card with the page's pale blue hairline. */
export const PANEL = "rounded-2xl bg-white border border-[#dde7f7]";

/** Same card, raised - used for the forms and the team designer. */
export const PANEL_RAISED =
  "rounded-3xl bg-white border border-[#dde7f7] shadow-[0_2px_10px_rgba(10,21,51,0.05),0_18px_50px_-20px_rgba(10,21,51,0.20)]";

/** Card on a dark band. */
export const PANEL_DARK = "rounded-2xl border border-white/10 bg-white/[0.05]";

/** Display heading on light. */
export const H2 = "text-[27px] leading-[1.12] md:text-[38px] text-[#101c4a] font-bold tracking-[-0.025em]";

/** Display heading on a dark band. */
export const H2_DARK = "text-[27px] leading-[1.12] md:text-[38px] text-white font-bold tracking-[-0.025em]";

/** Body copy at the sizes used across the page. */
export const BODY = "text-[#2a3556] text-[15px] leading-relaxed";
export const BODY_LG = "text-[#2a3556] text-base md:text-lg leading-relaxed";
export const BODY_DARK = "text-[#c2d2ee] text-[15px] leading-relaxed";
export const MUTED = "text-[#5d6a8a] text-sm leading-relaxed";

/** Small caps section label. */
export const EYEBROW = "text-[11px] md:text-xs tracking-[0.16em] uppercase font-semibold";

/** Solid blue pill CTA. */
export const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1f5fd0] px-7 py-3.5 text-[15px] text-white font-semibold transition-colors hover:bg-[#1a51b4]";

/** Outlined pill CTA, readable on the dark hero. */
export const BTN_GHOST_DARK =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-6 py-3.5 text-[15px] text-white font-semibold transition-colors hover:bg-white/[0.12]";

/** Field styling shared by every input and select on the light forms. */
export const FIELD =
  "w-full px-4 py-3 rounded-xl border border-[#dde7f7] bg-[#f7fafe] text-[15px] text-[#101c4a] focus:outline-none focus:ring-2 focus:ring-[#1f5fd0]/25 focus:border-[#1f5fd0]/40 transition-all";
