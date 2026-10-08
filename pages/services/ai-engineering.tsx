import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AIEngineeringPage from '@/pages/services/AIEngineering';

const PATHNAME = '/services/ai-engineering';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AIEngineeringPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
