/**
 * Design tokens for the /lp/hire-ai-engineers paid landing page, sampled
 * directly from the NeoIntelli AI-hiring infographics.
 *
 *   navy deep  #0a1f52  dark panels, CTA bar
 *   navy       #14205c  display headings
 *   blue       #0b57bd  headline accent, primary CTA
 *   cyan       #0084b4  section pills, icon badges, stat figures
 *   sky        #90c0f0  accents on dark surfaces
 *   tint       #f2f7fd  alternating section background
 *   border     #dbe7f6  card borders
 *   body       #2b3557  body copy
 *   muted      #5a6785  secondary copy
 *
 * The page is deliberately scoped to its own palette rather than the global
 * site tokens: it is a standalone paid page, and `.text-heading` doubles as a
 * 1.5rem font-size utility that silently overrides arbitrary text sizes.
 *
 * Class strings are written out in full so Tailwind's scanner can see them.
 */

export const LP = {
  navyDeep: "#0a1f52",
  navy: "#14205c",
  blue: "#0b57bd",
  cyan: "#0084b4",
  sky: "#90c0f0",
  tint: "#f2f7fd",
  border: "#dbe7f6",
  body: "#2b3557",
  muted: "#5a6785",
} as const;

/** White panel with the infographic's pale blue border. */
export const PANEL = "rounded-2xl bg-white border border-[#dbe7f6]";

/** Same panel, raised - used for the form and the scorecard. */
export const PANEL_RAISED =
  "rounded-3xl bg-white border border-[#dbe7f6] shadow-[0_2px_10px_rgba(10,31,82,0.05),0_18px_50px_-20px_rgba(10,31,82,0.18)]";

/** Display heading: navy, tight, heavy. */
export const H2 = "text-[26px] leading-[1.15] md:text-[36px] text-[#14205c] font-bold tracking-[-0.02em]";

/** Body copy at the two sizes used across the page. */
export const BODY = "text-[#2b3557] text-[15px] leading-relaxed";
export const BODY_LG = "text-[#2b3557] text-base md:text-lg leading-relaxed";
export const MUTED = "text-[#5a6785] text-sm leading-relaxed";

/** Solid blue pill CTA. */
export const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0b57bd] px-7 py-3.5 text-[15px] text-white font-semibold transition-colors";

/** Field styling shared by every input, select and the roles trigger. */
export const FIELD =
  "w-full px-4 py-3 rounded-xl border border-[#dbe7f6] bg-[#f7fafe] text-[15px] text-[#14205c] focus:outline-none focus:ring-2 focus:ring-[#0b57bd]/25 focus:border-[#0b57bd]/40 transition-all";

/** Pointy-top hexagon, the shape the whole page is built around. */
export const POINTY_TOP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
