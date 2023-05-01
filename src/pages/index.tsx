import Head from 'next/head';
import SketchCliffordAttractor01 from '@/components/sketch-components/SketchCliffordAttractor01';
import TitleOfHome from '@/components/TitleOfHome';
import MenuBarTop from '@/components/ui/MenuBarTop';
import styles from '../styles/Home.module.scss';

const Home = () => {
  return (
    <>
      <Head>
        <title>Acha Ikeda | Portfolio</title>
        <meta
          name='description'
          content="This site shows Acha Ikada's works, generative arts, profile, and so on."
          key='desc'
        />
      </Head>
      <div className={'flex-col justify-center items-center relative'}>
        <div className={styles.curtain}>
          <SketchCliffordAttractor01 />
        </div>
        <MenuBarTop />
        <TitleOfHome />
      </div>
    </>
  );
};

export default Home;
