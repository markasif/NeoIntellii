import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import DataEngPage from '@/pages/services/ai-gcc/DataEngineering';

const PATHNAME = '/services/ai-gcc/data-engineering';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <DataEngPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
