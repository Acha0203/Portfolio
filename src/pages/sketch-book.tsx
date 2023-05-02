import Head from 'next/head';
import Showcase from '@/components/Showcase';
import SketchBackground from '@/components/sketch-components/SketchBackground';
import TitleOfSketchBook from '@/components/TitleOfSketchBook';
import MenuBarTop from '@/components/ui/MenuBarTop';
import styles from '../styles/Home.module.scss';

const SketchBookPage = () => {
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
        <MenuBarTop />
        <TitleOfSketchBook />
        <Showcase />
      </div>
    </>
  );
};

export default SketchBookPage;
