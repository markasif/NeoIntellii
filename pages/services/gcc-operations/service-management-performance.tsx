import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import ServiceManagementPerformance from '@/pages/services/gcc-operations/ServiceManagementPerformance';

const PATHNAME = '/services/gcc-operations/service-management-performance';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <ServiceManagementPerformance />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
