import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import RecruitHubPage from '@/pages/recruitment/RecruitmentHub';

const PATHNAME = '/recruitment';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <RecruitHubPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
