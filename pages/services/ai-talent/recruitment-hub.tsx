import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import RecruitmentHubPage from '@/pages/services/ai-talent/RecruitmentHub';

const PATHNAME = '/services/ai-talent/recruitment-hub';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <RecruitmentHubPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
