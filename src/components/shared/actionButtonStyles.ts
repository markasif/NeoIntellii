/**
 * Shared "accent action" button style.
 *
 * Single source of truth for the cyan action button used on the AI GCC
 * "Three ways to begin" cards (`OutcomeCardGrid`), and reused by the home
 * Industries cards and the home Insights "Read article" cards so every card
 * CTA shares one consistent look.
 */
export const accentActionButtonClass =
  "btn-cyan";

/**
 * Variant for buttons that live inside a larger `group` click target (e.g. the
 * whole article card is the link). Responds to the group hover as well as its
 * own hover.
 */
export const accentActionButtonGroupClass =
  `${accentActionButtonClass} group-hover:bg-[#0D306C] group-hover:gap-2.5`;

/**
 * Compact accent button for cards where the CTA sits inside a narrow text
 * column (shorter labels, single line).
 */
export const accentActionButtonCardClass =
  "inline-flex items-center gap-1.5 px-3 py-2 rounded-sm bg-[#169DC8] hover:bg-[#0D306C] text-white text-[10px] sm:text-[10.5px] font-bold tracking-wide transition-all duration-200 shadow-xs";

/**
 * Gradient (btn-gradient look) compact card button — same sizing as the card
 * class but with the gradient pill styling used elsewhere on the site.
 */
export const accentActionButtonCardGradientClass =
  "inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-br from-[#169DC8] to-[#0D306C] text-white text-[10px] sm:text-[10.5px] font-bold tracking-wide transition-all duration-200 shadow-xs hover:shadow-[0_0_22px_rgba(22,157,200,0.55),0_4px_16px_rgba(13,48,108,0.3)]";

