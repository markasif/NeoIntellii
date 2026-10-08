import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/images/favicon.ico" />

        {/* Font preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* GTM preconnect */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {process.env.NODE_ENV === "production" && (
          <>
            <script
              src="https://rankai.ai/apply.js"
              data-rankai-id="cmslvi2f60001zg576i8bs4mj"
              crossOrigin="anonymous"
              defer
            />
            <script
              defer
              src="https://app.splitsense.ai/script.js"
              data-website-id="92fccf76-f411-4812-adda-f25b7bed93b6"
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
