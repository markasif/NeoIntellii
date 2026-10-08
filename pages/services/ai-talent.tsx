import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AITalentOverviewPage from '@/pages/services/ai-talent/AITalentOverview';

const PATHNAME = '/services/ai-talent';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AITalentOverviewPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
