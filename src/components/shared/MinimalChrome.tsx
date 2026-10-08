import { Link } from "react-router-dom";

/**
 * Header and footer for the paid pages (/lp/gcc-cost-calculator,
 * /book-a-call, /thank-you-call).
 *
 * Deliberately bare: a logo, and a footer with the legal pages and one email
 * address. No navigation, no link columns, nothing that invites a visitor who
 * arrived on a paid click to wander off before they have their number or their
 * booking.
 *
 * The logo goes home by default. `linkLogo={false}` renders it as plain
 * branding instead, for a page that should hold the click where it landed.
 */

export function MinimalHeader({ linkLogo = true }: { linkLogo?: boolean } = {}) {
  const logo = (
    <img
      src="/images/neointelli_logo.webp"
      alt="NeoIntelli"
      width={150}
      height={32}
      className="h-7 md:h-8 w-auto"
    />
  );

  return (
    <header className="bg-white border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 h-16 md:h-[72px] flex items-center">
        {linkLogo ? (
          <Link to="/" aria-label="NeoIntelli home">
            {logo}
          </Link>
        ) : (
          logo
        )}
      </div>
    </header>
  );
}

export function MinimalFooter() {
  return (
    <footer className="border-t border-black/[0.06] bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-body-muted">
        <p>&copy; {new Date().getFullYear()} NeoIntelli. All rights reserved.</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link to="/privacy-policy" className="hover:text-heading transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-heading transition-colors">Terms</Link>
          <Link to="/cookie-policy" className="hover:text-heading transition-colors">Cookie Policy</Link>
          <a href="mailto:reachus@neointelli.com" className="hover:text-heading transition-colors">reachus@neointelli.com</a>
        </nav>
      </div>
    </footer>
  );
}
