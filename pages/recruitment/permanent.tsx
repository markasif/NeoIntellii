import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import PermPage from '@/pages/recruitment/Permanent';

const PATHNAME = '/recruitment/permanent';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <PermPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
