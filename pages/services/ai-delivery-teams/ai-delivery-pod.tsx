import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AiDeliveryPodPage from '@/pages/services/ai-delivery-teams/AiDeliveryPod';

const PATHNAME = '/services/ai-delivery-teams/ai-delivery-pod';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AiDeliveryPodPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
