import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AiOpsPage from '@/pages/services/ai-engineering/MLOpsLLMOpsAgentOps';

const PATHNAME = '/services/ai-engineering/mlops-llmops-agentops';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AiOpsPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
