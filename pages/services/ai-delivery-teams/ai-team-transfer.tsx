import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AiTeamTransferPage from '@/pages/services/ai-delivery-teams/AiTeamTransfer';

const PATHNAME = '/services/ai-delivery-teams/ai-team-transfer';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AiTeamTransferPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
