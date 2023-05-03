import Head from 'next/head';
import useWindowSize from '@/hooks/useWindowSize';
import SketchCliffordAttractor01 from '@/components/sketch-components/SketchCliffordAttractor01';
import TitleOfHome from '@/components/TitleOfHome';
import HamburgerBtn from '@/components/ui/HamburgerBtn';
import HamburgerMenu from '@/components/ui/HamburgerMenu';
import MenuBarTop from '@/components/ui/MenuBarTop';
import styles from '../styles/Home.module.scss';

const Home = () => {
  const windowWidth = useWindowSize()[0];

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
        <TitleOfHome />
        {windowWidth <= 768 ? (
          <>
            <HamburgerMenu />
            <HamburgerBtn />
          </>
        ) : (
          <MenuBarTop />
        )}
      </div>
    </>
  );
};

export default Home;
