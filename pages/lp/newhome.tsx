import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import NewHomeLandingPage from '@/pages/landing/NewHome';

const PATHNAME = '/lp/newhome';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <NewHomeLandingPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
