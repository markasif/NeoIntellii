import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import GenAIAgenticHiringPage from '@/pages/services/ai-talent/GenAIAgenticHiring';

const PATHNAME = '/services/ai-talent/genai-agentic-ai-hiring';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <GenAIAgenticHiringPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
