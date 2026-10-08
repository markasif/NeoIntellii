import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AiDataEngPage from '@/pages/services/ai-engineering/DataEngineering';

const PATHNAME = '/services/ai-engineering/data-engineering';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AiDataEngPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
