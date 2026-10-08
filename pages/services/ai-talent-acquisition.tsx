import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AITalentAcquisitionPage from '@/pages/services/AITalentAcquisition';

const PATHNAME = '/services/ai-talent-acquisition';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AITalentAcquisitionPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
