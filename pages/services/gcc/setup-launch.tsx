import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import SetupLaunchPage from '@/pages/services/gcc/SetupLaunch';

const PATHNAME = '/services/gcc/setup-launch';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <SetupLaunchPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
