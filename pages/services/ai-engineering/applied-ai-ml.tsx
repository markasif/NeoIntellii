import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AppliedAiMlPage from '@/pages/services/ai-engineering/AppliedAIML';

const PATHNAME = '/services/ai-engineering/applied-ai-ml';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AppliedAiMlPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
