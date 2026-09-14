import type { Metadata } from 'next';
import { createMetadata } from '#/utils/metadata';
import InfoPage from '#/components/page-components/InfoPage';

export const metadata: Metadata = createMetadata({
  title: 'Info',
  description: 'This page shows information about Acha Ikeda, a designer and developer in Japan.',
});

const Page = () => {
  return <InfoPage />;
};

export default Page;
