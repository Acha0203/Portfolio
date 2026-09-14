import type { Metadata } from 'next';
import { createMetadata } from '#/utils/metadata';
import SketchBookPage from '#/components/page-components/SketchBookPage';

export const metadata: Metadata = createMetadata({
  title: 'Sketch Book',
  description:
    'This page shows various generative arts created by Acha Ikeda, a designer and developer in Japan.',
});

const Page = () => {
  return <SketchBookPage />;
};

export default Page;
