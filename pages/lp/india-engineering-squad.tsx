import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import IndiaEngineeringSquadLandingPage from '@/pages/landing/IndiaEngineeringSquad';

const PATHNAME = '/lp/india-engineering-squad';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <IndiaEngineeringSquadLandingPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
