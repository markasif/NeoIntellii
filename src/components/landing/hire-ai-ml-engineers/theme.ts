/**
 * Design tokens for the /lp/hire-ai_ml-engineers paid landing page.
 *
 * The page reuses the copy of /lp/hire-ai-engineers but swaps the light
 * infographic look for a dark, AI-native treatment referenced from
 * welocity.ai: near-black canvas, violet-to-cyan aurora gradients, glass
 * panels with hairline borders, and glowing gradient CTAs.
 *
 *   ink        #05060e  page canvas
 *   ink raised #0a0d1c  raised panels / form surface
 *   violet     #8b5cf6  gradient start, glow accents
 *   blue       #4d7cfe  gradient middle, links
 *   cyan       #2dd4f5  gradient end, stat figures, checks
 *   heading    #f4f6ff  display headings
 *   body       #a6adcd  body copy on dark
 *   muted      #6f77a1  secondary copy, microcopy
 *
 * Class strings are written out in full so Tailwind's scanner can see them.
 */

export const LP = {
  ink: "#05060e",
  inkRaised: "#0a0d1c",
  violet: "#8b5cf6",
  blue: "#4d7cfe",
  cyan: "#2dd4f5",
  heading: "#f4f6ff",
  body: "#a6adcd",
  muted: "#6f77a1",
} as const;

/** Frosted glass panel - the base card of the page. */
export const GLASS = "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl";

/** Raised glass - the form and the scorecard. Opaque enough to read on any glow. */
export const GLASS_RAISED =
  "rounded-3xl border border-white/10 bg-[#0a0d1c]/90 backdrop-blur-2xl shadow-[0_0_0_1px_rgba(139,92,246,0.06),0_24px_80px_-24px_rgba(77,124,254,0.35)]";

/** Display heading on dark. */
export const H2 = "text-[27px] leading-[1.12] md:text-[38px] text-[#f4f6ff] font-bold tracking-[-0.02em]";

/** Body copy at the two sizes used across the page. */
export const BODY = "text-[#a6adcd] text-[15px] leading-relaxed";
export const BODY_LG = "text-[#a6adcd] text-base md:text-lg leading-relaxed";
export const MUTED = "text-[#6f77a1] text-sm leading-relaxed";

/** Gradient headline/stat text - the welocity-style violet-to-cyan sweep. */
export const GRADIENT_TEXT =
  "text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#6d9dff] to-[#2dd4f5]";

/** Primary CTA: gradient pill with an ambient glow. */
export const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#7c5cfc] via-[#4d7cfe] to-[#22b8f0] px-7 py-3.5 text-[15px] text-white font-semibold shadow-[0_0_24px_rgba(109,92,252,0.45),0_8px_32px_-8px_rgba(34,184,240,0.55)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_0_36px_rgba(109,92,252,0.65),0_10px_40px_-8px_rgba(34,184,240,0.7)] hover:-translate-y-0.5";

/** Secondary CTA: glass pill. */
export const BTN_GHOST =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 text-[15px] text-[#e7eaff] font-semibold backdrop-blur transition-colors hover:bg-white/[0.09]";

/** Field styling shared by every input, select and the roles trigger. */
export const FIELD =
  "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.05] text-[15px] text-[#f4f6ff] placeholder:text-[#6f77a1] focus:outline-none focus:ring-2 focus:ring-[#4d7cfe]/40 focus:border-[#4d7cfe]/50 transition-all [color-scheme:dark]";

/** Pill badge with a live dot - section eyebrows. */
export const EYEBROW =
  "inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[12px] tracking-[0.14em] uppercase font-semibold text-[#9db1ff]";

/** Hairline gradient ring wrapper - put around a div for a glowing border. */
export const GRADIENT_RING =
  "relative rounded-3xl p-px bg-gradient-to-br from-[#8b5cf6]/50 via-[#4d7cfe]/25 to-[#2dd4f5]/50";
