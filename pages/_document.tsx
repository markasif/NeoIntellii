import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/images/favicon.ico" />

        {/* GTM preconnect */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {process.env.NODE_ENV === "production" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
                  var s1 = document.createElement('script');
                  s1.src = 'https://rankai.ai/apply.js';
                  s1.setAttribute('data-rankai-id', 'cmslvi2f60001zg576i8bs4mj');
                  s1.defer = true;
                  document.head.appendChild(s1);

                  var s2 = document.createElement('script');
                  s2.src = 'https://app.splitsense.ai/script.js';
                  s2.setAttribute('data-website-id', '92fccf76-f411-4812-adda-f25b7bed93b6');
                  s2.defer = true;
                  document.head.appendChild(s2);
                }
              `,
            }}
          />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
