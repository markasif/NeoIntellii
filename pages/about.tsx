import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AboutPage from '@/pages/About';

const PATHNAME = '/about';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AboutPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
