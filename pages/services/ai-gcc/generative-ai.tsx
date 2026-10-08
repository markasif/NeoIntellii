import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import GenAIPage from '@/pages/services/ai-gcc/GenerativeAI';

const PATHNAME = '/services/ai-gcc/generative-ai';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <GenAIPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
