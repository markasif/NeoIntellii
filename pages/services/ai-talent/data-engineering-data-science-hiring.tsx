import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import DataHiringPage from '@/pages/services/ai-talent/DataHiring';

const PATHNAME = '/services/ai-talent/data-engineering-data-science-hiring';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <DataHiringPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
