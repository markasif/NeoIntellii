import type { AppProps } from 'next/app';
import Script from 'next/script';
import { Inter, Instrument_Serif, Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import '@/index.css';

const GA_ID = 'G-C1G4RM3CN3';
const GOOGLE_ADS_ID = 'AW-17602240384';

/**
 * Google Tag Manager container, if one is configured.
 *
 * The site tags with gtag today, and every campaign event in
 * src/lib/dataLayer.ts is pushed to `window.dataLayer` as well as mirrored
 * into gtag - so a container can be switched on without renaming anything.
 * Set NEXT_PUBLIC_GTM_ID (Netlify → Site configuration → Environment
 * variables) to GTM-XXXXXXX and the container loads on every page; leave it
 * unset and nothing changes.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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

      {/* Google Analytics 4 + Google Ads — loads after page is interactive to avoid render-blocking */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>

      {GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      <Component {...pageProps} />
    </>
  );
}
