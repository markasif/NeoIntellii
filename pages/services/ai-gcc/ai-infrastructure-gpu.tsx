import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AIInfrastructureGpuPage from '@/pages/services/ai-gcc/AIInfrastructureGpu';

const PATHNAME = '/services/ai-gcc/ai-infrastructure-gpu';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AIInfrastructureGpuPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
