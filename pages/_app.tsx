import type { AppProps } from 'next/app';
import { Inter, Instrument_Serif, Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import CookieConsent from '@/components/analytics/CookieConsent';
import '@/index.css';

// Google Analytics (GA4), Google Ads and GTM are no longer loaded here.
// They boot from @/lib/consent only after the visitor grants consent —
// see src/components/analytics/CookieConsent.tsx.

// Self-hosted via next/font: no render-blocking request to fonts.googleapis.com,
// font CSS is inlined and the woff2 files are served from our own origin.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Expose the generated family names globally (covers portals rendered
          outside the component tree); index.css and tailwind.config.ts
          reference these variables. */}
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-instrument-serif: ${instrumentSerif.style.fontFamily};
          --font-plus-jakarta: ${plusJakartaSans.style.fontFamily};
          --font-manrope: ${manrope.style.fontFamily};
        }
      `}</style>

      {/* Consent-gated analytics: GA4, Google Ads, GTM, RankAI and SplitSense
          only load after the visitor accepts (see @/lib/consent). */}
      <CookieConsent />

      <Component {...pageProps} />
    </>
  );
}
