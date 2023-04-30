import Head from 'next/head';
import SketchRotation from '@/components/SketchRotation';

export default function Home() {
  return (
    <>
      <Head>
        <title>Acha&apos;s Sketch Book</title>
        <meta
          name='description'
          content="This page shows Acha's generative arts with p5.js."
          key='desc'
        />
      </Head>
      <SketchRotation />
    </>
  );
}
