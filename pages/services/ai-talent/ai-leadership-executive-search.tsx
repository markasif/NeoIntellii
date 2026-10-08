import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AILeadershipSearchPage from '@/pages/services/ai-talent/AILeadershipSearch';

const PATHNAME = '/services/ai-talent/ai-leadership-executive-search';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AILeadershipSearchPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
