import Head from 'next/head';
import SketchCliffordAttractor01 from '@/components/sketch/SketchCliffordAttractor01';
import TitleOfHome from '@/components/TitleOfHome';
import Footer from '@/components/ui/Footer';
import MenuBarTop from '@/components/ui/MenuBarTop';

const Home = () => {
  return (
    <>
      <Head>
        <title>Acha&apos;s Sketch Book</title>
        <meta
          name='description'
          content="This site shows Acha's generative arts with p5.js."
          key='desc'
        />
      </Head>
      <div className='flex-col justify-center items-center z-0 relative'>
        <SketchCliffordAttractor01 />
        <MenuBarTop />
        <TitleOfHome />
        <Footer />
      </div>
    </>
  );
};

export default Home;
