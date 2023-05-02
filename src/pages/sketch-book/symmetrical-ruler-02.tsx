import Head from 'next/head';
import { sketchList } from '@/consts/sketchList';
import SketchSymmetricalRuler02 from '@/components/sketch-components/SketchSymmetricalRuler02';
import MenuBarTop from '@/components/ui/MenuBarTop';
import styles from '../../styles/Home.module.scss';

const SymmetricalRuler02Page = () => {
  return (
    <>
      <Head>
        <title>Acha Ikeda | Sketch Book</title>
        <meta
          name='description'
          content="This page shows Acha Ikeda's generative art with p5.js."
          key='desc'
        />
      </Head>
      <div className={'flex-col justify-center items-center relative'}>
        <div className={styles.curtain}>
          <SketchSymmetricalRuler02 />
        </div>
        <MenuBarTop />
      </div>
      <div>
        <div className={`${styles.title_of_sketch} ${styles.fade_up}`}>
          {`${sketchList[1].title}`}
          <br />
          <span className={styles.code}>
            <a href={`${sketchList[1].codeUrl}`} target='_blank' rel='noreferrer'>
              CODE
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default SymmetricalRuler02Page;
