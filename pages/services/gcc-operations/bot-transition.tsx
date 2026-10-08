import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import BotTransition from '@/pages/services/gcc-operations/BotTransition';

const PATHNAME = '/services/gcc-operations/bot-transition';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <BotTransition />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
