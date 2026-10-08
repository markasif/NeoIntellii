import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import WorkplaceItSecurity from '@/pages/services/gcc-operations/WorkplaceItSecurity';

const PATHNAME = '/services/gcc-operations/workplace-it-security';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <WorkplaceItSecurity />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
