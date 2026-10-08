import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AIDataRecruitmentPage from '@/pages/services/AIDataRecruitment';

const PATHNAME = '/services/ai-data-recruitment';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AIDataRecruitmentPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
