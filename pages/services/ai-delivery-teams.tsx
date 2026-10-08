import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AiDeliveryTeamsPage from '@/pages/services/ai-delivery-teams/AiDeliveryTeams';

const PATHNAME = '/services/ai-delivery-teams';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AiDeliveryTeamsPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
