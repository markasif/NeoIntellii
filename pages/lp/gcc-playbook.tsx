import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import GccPlaybookPage from '@/pages/landing/GccPlaybook';

const PATHNAME = '/lp/gcc-playbook';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <GccPlaybookPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
