import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import MLOpsPage from '@/pages/services/ai-gcc/MLOps';

const PATHNAME = '/services/ai-gcc/mlops';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <MLOpsPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
