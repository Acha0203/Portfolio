import Head from 'next/head';
import SketchCliffordAttractor01 from '@/components/sketch/SketchCliffordAttractor01';
import TitleOfHome from '@/components/TitleOfHome';
import Footer from '@/components/ui/Footer';
import MenuBarTop from '@/components/ui/MenuBarTop';
import styles from '../styles/Home.module.scss'

const Home = () => {
  return (
    <>
      <Head>
        <title>Acha&apos;s Sketch Book</title>
        <meta
          name='description'
          content="This site shows Acha Ikada's works, generative arts, profile, and so on."
          key='desc'
        />
      </Head>
      <div className={`${styles.curtain} flex-col justify-center items-center relative`}>
        <SketchCliffordAttractor01 />
        <MenuBarTop />
        <TitleOfHome />
        <Footer />
      </div>
    </>
  );
};

export default Home;
