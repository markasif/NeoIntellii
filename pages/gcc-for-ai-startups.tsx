import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import GCCAiStartupsPage from '@/pages/gcc-for-ai-startups';

const PATHNAME = '/gcc-for-ai-startups';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <GCCAiStartupsPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
