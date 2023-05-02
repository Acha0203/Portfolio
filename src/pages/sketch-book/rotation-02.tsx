import Head from 'next/head';
import SketchRotation02 from '@/components/sketch-components/SketchRotation02';
import MenuBarTop from '@/components/ui/MenuBarTop';
import styles from '../../styles/Home.module.scss';

const SketchBookPage = () => {
  return (
    <>
      <Head>
        <title>Acha Ikeda | Sketch Book</title>
        <meta
          name='description'
          content="This page shows Acha Ikeda's generative arts with p5.js."
          key='desc'
        />
      </Head>
      <div className={'flex-col justify-center items-center relative'}>
        <div className={styles.curtain}>
          <SketchRotation02 />
        </div>
        <MenuBarTop />
      </div>
    </>
  );
};

export default SketchBookPage;
