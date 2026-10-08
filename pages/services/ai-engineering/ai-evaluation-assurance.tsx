import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AiEvalPage from '@/pages/services/ai-engineering/AIEvaluationAssurance';

const PATHNAME = '/services/ai-engineering/ai-evaluation-assurance';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AiEvalPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
