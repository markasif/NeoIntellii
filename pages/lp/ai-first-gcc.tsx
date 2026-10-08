import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AiFirstLandingPage from '@/pages/landing/AiFirstGcc';

const PATHNAME = '/lp/ai-first-gcc';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AiFirstLandingPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
