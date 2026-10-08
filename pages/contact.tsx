import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import ContactPage from '@/pages/Contact';

const PATHNAME = '/contact';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <ContactPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
