import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import RespAIPage from '@/pages/services/ai-gcc/ResponsibleAI';

const PATHNAME = '/services/ai-gcc/responsible-ai';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <RespAIPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
