import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AiAgentsPage from '@/pages/services/ai-engineering/AIAgentsAutomation';

const PATHNAME = '/services/ai-engineering/ai-agents-automation';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AiAgentsPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
