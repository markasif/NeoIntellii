"use client";

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NeoIntelliHero from "@/components/shared/NeoIntelliHero";

const suggestedLinks = [
  { name: "Homepage", href: "/" },
  { name: "GCC Services", href: "/services/gcc" },
  { name: "AI-first GCC", href: "/services/ai-gcc" },
  { name: "GCC Blueprint", href: "/blueprint" },
  { name: "Contact", href: "/contact" },
];

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found | NeoIntelli";
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#E7EDF9] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C] flex flex-col">
      <Navbar appearance="dark" />

      <main className="flex-1">
        <NeoIntelliHero
          id="not-found-hero"
          ariaLabel="Page not found"
          titleHighlight="404"
          titleSuffix="Page not found"
          description="The page you're looking for doesn't exist or has been moved. Head back to a page that works."
          desktopImage="/images/hero/404.webp.webp"
          mobileImage="/images/hero/404-mobile.webp.webp"
          imageAlt="404 page not found"
          primaryCta={{ label: "Back to Homepage", href: "/" }}
          secondaryCta={{ label: "Explore GCC Services", href: "/services/gcc" }}
          bottomContent={
            <div className="relative z-20 w-full shrink-0 pb-4 sm:pb-6 lg:pb-8 px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl">
                <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3">
                  {suggestedLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 bg-white/[0.06] text-white/90 text-xs sm:text-sm font-semibold hover:bg-white/15 hover:border-[#38BDF8]/60 hover:text-white transition-all duration-200"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          }
        />
      </main>

      <Footer />
    </div>
  );
}