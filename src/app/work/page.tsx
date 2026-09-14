import type { Metadata } from 'next';
import { createMetadata } from '#/utils/metadata';
import WorkPage from '#/components/page-components/WorkPage';

export const metadata: Metadata = createMetadata({
  title: 'Work',
  description:
    'This page shows various Web applications developed by Acha Ikeda, a designer and developer in Japan.',
});

const Page = () => {
  return <WorkPage />;
};

export default Page;
