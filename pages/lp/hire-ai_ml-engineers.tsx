import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import HireAiMlEngineersLandingPage from '@/pages/landing/HireAiMlEngineers';

const PATHNAME = '/lp/hire-ai_ml-engineers';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <HireAiMlEngineersLandingPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
