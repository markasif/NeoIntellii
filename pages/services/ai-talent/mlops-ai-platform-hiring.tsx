import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import MLOpsPlatformHiringPage from '@/pages/services/ai-talent/MLOpsPlatformHiring';

const PATHNAME = '/services/ai-talent/mlops-ai-platform-hiring';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <MLOpsPlatformHiringPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
