import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import RPOPage from '@/pages/recruitment/Rpo';

const PATHNAME = '/recruitment/rpo';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <RPOPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
