import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import MicroGccIndiaLandingPage from '@/pages/landing/MicroGccIndia';

const PATHNAME = '/lp/micro-gcc-india';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <MicroGccIndiaLandingPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
