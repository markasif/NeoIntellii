import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import ReadinessPage from '@/pages/gcc-readiness-assessment';

const PATHNAME = '/gcc-readiness-assessment';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <ReadinessPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
