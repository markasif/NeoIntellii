import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import HireAiEngineersLandingPage from '@/pages/landing/HireAiEngineers';

const PATHNAME = '/lp/hire-ai-engineers';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <HireAiEngineersLandingPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
