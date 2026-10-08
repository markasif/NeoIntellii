import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CAL_BOOKING_URL } from "@/lib/constants";
import { trackCalendarOpen, trackCta } from "./tracking";

/**
 * Minimal header for the paid landing page.
 *
 * No site navigation, no services menu, no second CTA competing with the
 * booking link. The five links are in-page anchors; the button is the page's
 * single header conversion.
 */

const NAV_LINKS = [
  { label: "Built For", target: "built-for" },
  { label: "Evaluation", target: "evaluation" },
  { label: "Squad Shapes", target: "squads" },
  { label: "Leadership", target: "leadership" },
  { label: "FAQ", target: "faq" },
];

/** Shortened in the header; the hero and final CTA carry the full label. */
const ADVISOR_CTA_LABEL = "Talk to an AI Advisor";

export default function LandingHeader({
  onNavigate,
  scrolled,
  hideMobileCta,
}: {
  /** Smooth-scrolls to a section id. */
  onNavigate: (target: string) => void;
  /** Adds the hairline and shadow once the page has moved. */
  scrolled: boolean;
  /**
   * True once the sticky bottom bar is on screen. The header CTA hides on
   * mobile at that point so only one sticky CTA is ever visible.
   */
  hideMobileCta: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (target: string) => {
    setMenuOpen(false);
    trackCta(`header_nav_${target}`);
    onNavigate(target);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "border-b border-[#dde7f7] shadow-[0_1px_16px_rgba(10,21,51,0.06)]" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 md:h-[72px]">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            go("top");
          }}
          className="shrink-0"
        >
          <img
            src="/images/neointelli_logo.webp"
            alt="NeoIntelli"
            width={150}
            height={32}
            className="h-7 w-auto md:h-8"
          />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Page sections">
          {NAV_LINKS.map(({ label, target }) => (
            <a
              key={target}
              href={`#${target}`}
              onClick={(event) => {
                event.preventDefault();
                go(target);
              }}
              className="text-sm font-medium text-[#2a3556] transition-colors hover:text-[#1f5fd0]"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCalendarOpen("header_talk_to_advisor")}
            className={`items-center justify-center rounded-full bg-[#1f5fd0] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1a51b4] sm:px-5 sm:text-sm ${
              hideMobileCta ? "hidden lg:inline-flex" : "inline-flex"
            }`}
          >
            <span className="sm:hidden">Talk to an advisor</span>
            <span className="hidden sm:inline">{ADVISOR_CTA_LABEL}</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="lp-mobile-nav"
            aria-label={menuOpen ? "Close section menu" : "Open section menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dde7f7] text-[#101c4a] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="lp-mobile-nav"
          aria-label="Page sections"
          className="border-t border-[#dde7f7] bg-white px-5 pb-4 pt-2 sm:px-8 lg:hidden"
        >
          {NAV_LINKS.map(({ label, target }) => (
            <a
              key={target}
              href={`#${target}`}
              onClick={(event) => {
                event.preventDefault();
                go(target);
              }}
              className="block border-b border-[#eef3fb] py-3 text-sm font-medium text-[#2a3556] last:border-b-0"
            >
              {label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
