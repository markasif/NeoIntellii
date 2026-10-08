import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import ForwardDeployedAiEngineersPage from '@/pages/services/ai-delivery-teams/ForwardDeployedAiEngineers';

const PATHNAME = '/services/ai-delivery-teams/forward-deployed-ai-engineers';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <ForwardDeployedAiEngineersPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
