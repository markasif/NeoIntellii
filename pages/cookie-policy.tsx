import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import CookiePage from '@/pages/CookiePolicy';

const PATHNAME = '/cookie-policy';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <CookiePage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
