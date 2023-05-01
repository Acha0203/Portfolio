import Head from 'next/head';
import SketchRotation from '@/components/sketch/SketchRotation';
import Footer from '@/components/ui/Footer';
import MenuBarTop from '@/components/ui/MenuBarTop';

const SketchBookPage = () => {
  return (
    <>
      <Head>
        <title>Acha&apos;s Sketch Book</title>
        <meta
          name='description'
          content="This page shows Acha Ikeda's generative arts with p5.js."
          key='desc'
        />
      </Head>
      <div className='flex-col justify-center items-center relative'>
        <SketchRotation />
        <MenuBarTop />
        <Footer />
      </div>
    </>
  );
};

export default SketchBookPage;
