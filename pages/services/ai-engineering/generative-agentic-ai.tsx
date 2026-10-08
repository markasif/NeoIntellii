import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import GenAgenticPage from '@/pages/services/ai-engineering/GenerativeAgenticAI';

const PATHNAME = '/services/ai-engineering/generative-agentic-ai';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <GenAgenticPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
