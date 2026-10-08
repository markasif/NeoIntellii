import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AIMLRecruitmentPage from '@/pages/services/ai-talent/AIMLRecruitment';

const PATHNAME = '/services/ai-talent/ai-ml-recruitment';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AIMLRecruitmentPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
