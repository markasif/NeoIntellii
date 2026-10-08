import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import ThankYouCallPage from '@/pages/ThankYouCall';

const PATHNAME = '/thank-you-call';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <ThankYouCallPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
