import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import SetupOpsPage from '@/pages/services/ai-gcc/SetupOperations';

const PATHNAME = '/services/ai-gcc/setup-operations';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <SetupOpsPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
