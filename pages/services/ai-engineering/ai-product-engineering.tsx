import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AiProductEngPage from '@/pages/services/ai-engineering/AIProductEngineering';

const PATHNAME = '/services/ai-engineering/ai-product-engineering';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AiProductEngPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
