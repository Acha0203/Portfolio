import type { Metadata } from 'next';
import { createMetadata } from '#/utils/metadata';
import LaboratoryPage from '#/components/page-components/LaboratoryPage';

export const metadata: Metadata = createMetadata({
  title: 'Laboratory',
  description:
    'This page shows experimental applications or documentations developed by Acha Ikeda, a designer and developer in Japan.',
});

const Page = () => {
  return <LaboratoryPage />;
};

export default Page;
