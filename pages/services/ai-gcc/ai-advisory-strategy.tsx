import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AIAdvPage from '@/pages/services/ai-gcc/AIAdvisoryStrategy';

const PATHNAME = '/services/ai-gcc/ai-advisory-strategy';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AIAdvPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
