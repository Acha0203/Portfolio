import Head from 'next/head';
import useWindowSize from '@/hooks/useWindowSize';
import Showcase from '@/components/Showcase';
import SketchBackground from '@/components/sketch-components/SketchBackground';
import TitleOfSketchBook from '@/components/TitleOfSketchBook';
import HamburgerBtn from '@/components/ui/HamburgerBtn';
import HamburgerMenu from '@/components/ui/HamburgerMenu';
import MenuBarTop from '@/components/ui/MenuBarTop';
import styles from '../styles/Home.module.scss';

const SketchBookPage = () => {
  const windowWidth = useWindowSize()[0];

  return (
    <>
      <Head>
        <title>Acha Ikeda | Sketch Book</title>
        <meta
          name='description'
          content="This page shows Acha Ikeda's works using the creative coding."
          key='desc'
        />
      </Head>
      <div className={'flex-col justify-center items-center relative'}>
        <div className={styles.curtain}>
          <SketchBackground />
        </div>
        <TitleOfSketchBook />
        <Showcase />
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

export default SketchBookPage;
