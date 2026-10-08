import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import ROIPage from '@/pages/gcc-roi-estimator';

const PATHNAME = '/gcc-roi-estimator';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <ROIPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
