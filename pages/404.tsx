import Head from 'next/head';
import NotFound from '@/pages/NotFound';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | NeoIntelli</title>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <NotFound />
    </>
  );
}
