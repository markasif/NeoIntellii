import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import DedicatedAiEngineeringTeamPage from '@/pages/services/ai-delivery-teams/DedicatedAiEngineeringTeam';

const PATHNAME = '/services/ai-delivery-teams/dedicated-ai-engineering-team';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <DedicatedAiEngineeringTeamPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
