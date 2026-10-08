/**
 * Standard footnote for any page that quotes a price, fee or percentage.
 *
 * POLICY: marketing, service, landing and FAQ pages carry NO commercial
 * figures at all - no rate, fee, markup, range or "from" number for anything
 * NeoIntelli charges, in visible copy or in structured data. Describe the fee
 * STRUCTURE, then point the reader at us: "contact us for pricing". Keep it
 * to that - no "we do not publish rates", which only draws attention to the
 * missing number. Do not reintroduce a figure and reach for this disclaimer
 * to cover it.
 *
 * This note therefore belongs only to the interactive cost tools and the cost
 * benchmark page, where a visitor asks for a modelled figure: they mark each
 * figure with an asterisk (see <PriceStar />) and render this note near the
 * end of the page.
 *
 * Keep the wording in one place so the disclaimer reads the same everywhere.
 */

export const PRICING_DISCLAIMER =
  "Starting price. Every fee, rate and cost figure shown is an indicative starting point, not a quote. Final commercial terms vary with scope, role mix, volume, seniority, city and engagement length, and are confirmed in writing in the proposal and the MSA.";

/** The asterisk that ties a figure on the page to the note at the bottom. */
export function PriceStar({ className = "" }: { className?: string }) {
  return (
    <a
      href="#pricing-note"
      aria-label="See pricing note"
      className={`align-super text-[0.7em] text-body-muted hover:text-body transition-colors ${className}`}
    >
      *
    </a>
  );
}

interface PricingDisclaimerProps {
  /** Extra classes for spacing inside whatever section hosts the note. */
  className?: string;
  /** Set on dark backgrounds, where the muted body colour disappears. */
  tone?: "light" | "dark";
}

export default function PricingDisclaimer({ className = "", tone = "light" }: PricingDisclaimerProps) {
  return (
    <p
      id="pricing-note"
      className={`text-2xs leading-relaxed scroll-mt-28 ${tone === "dark" ? "text-white/60" : "text-body-muted"} ${className}`}
    >
      <span aria-hidden="true">*</span> {PRICING_DISCLAIMER}
    </p>
  );
}

/**
 * Full-width footnote band. Drop it at the end of a page that quotes prices,
 * just above the related links or the footer, so the star on the figure has
 * somewhere to land.
 */
export function PricingFootnote({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <section
      className={`px-6 sm:px-8 lg:px-12 py-8 border-t ${
        tone === "dark" ? "border-white/10 bg-[#0a1533]" : "border-black/[0.06] bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <PricingDisclaimer tone={tone} />
      </div>
    </section>
  );
}
