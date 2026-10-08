import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import LocationStrategyPage from '@/pages/services/gcc/LocationStrategy';

const PATHNAME = '/services/gcc/location-strategy';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <LocationStrategyPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
