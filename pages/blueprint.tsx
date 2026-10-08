import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import BlueprintPage from '@/pages/SEOBlueprint';

const PATHNAME = '/blueprint';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <BlueprintPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
