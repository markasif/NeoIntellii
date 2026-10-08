import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CAL_BOOKING_URL } from "@/lib/constants";

export interface LandingNavLink {
  label: string;
  href: string; // can be "#anchor" or absolute path
}

interface LandingNavProps {
  links: LandingNavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  /** When true, the nav is glassmorphic from the start (no transparent state). */
  alwaysGlass?: boolean;
}

export default function LandingNav({
  links,
  ctaLabel = "Book a consultation",
  ctaHref = CAL_BOOKING_URL,
  alwaysGlass = false,
}: LandingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const glass = alwaysGlass || scrolled;
  // "isDark" controls white text/logo for use over dark backgrounds (video or hero).
  const isDark = !scrolled;
  const isAnchor = (href: string) => href.startsWith("#");
  const isExternal = (href: string) => /^(https?:|mailto:|tel:)/i.test(href);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isAnchor(href)) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        glass
          ? alwaysGlass && !scrolled
            ? "bg-white/10 backdrop-blur-xl border-b border-white/15 shadow-[0_4px_30px_-12px_rgba(0,0,0,0.25)]"
            : "bg-white/95 backdrop-blur-md border-b border-black/[0.06] shadow-[0_4px_20px_-12px_rgba(14,19,32,0.12)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="relative flex h-16 items-center justify-between gap-8">
          <Link to="/" className="flex items-center shrink-0" aria-label="NeoIntelli Home">
            <img
              src={isDark ? "/images/neointelli-white.webp" : "/images/neointelli_logo.webp"}
              alt="NeoIntelli logo"
              width={132}
              height={32}
              className="h-[2.12rem] w-auto"
              loading="eager"
              decoding="async"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1 mx-auto">
            {links.map((l) => {
              const cls = `inline-flex items-center px-3.5 py-2 text-xs tracking-tight transition-colors duration-200 ${
                isDark ? "text-white/85 hover:text-white" : "text-slate-700 hover:text-[#0a93bd]"
              }`;
              if (isAnchor(l.href)) {
                return (
                  <a key={l.href} href={l.href} onClick={(e) => handleAnchor(e, l.href)} className={cls}>
                    {l.label}
                  </a>
                );
              }
              if (isExternal(l.href)) {
                return (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {l.label}
                  </a>
                );
              }
              return (
                <Link key={l.href} to={l.href} className={cls}>
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={ctaHref}
              target={isExternal(ctaHref) ? "_blank" : undefined}
              rel={isExternal(ctaHref) ? "noopener noreferrer" : undefined}
              className="hidden lg:inline-flex btn-gradient-primary text-xs py-2 px-4 shadow-sm"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden w-9 h-9 flex items-center justify-center rounded-full ${
                isDark ? "text-white" : "text-slate-800"
              }`}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-[#0e1320]/[0.06] bg-white/95 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleAnchor(e, l.href)}
                  className="block py-2.5 text-sm text-[#0e1320] border-b border-[#0e1320]/[0.06] last:border-0"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={ctaHref}
                target={isExternal(ctaHref) ? "_blank" : undefined}
                rel={isExternal(ctaHref) ? "noopener noreferrer" : undefined}
                className="mt-4 btn-gradient-primary w-full py-2.5 text-sm"
              >
                <span>{ctaLabel}</span> <ArrowRight className="w-3.5 h-3.5 text-white" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}