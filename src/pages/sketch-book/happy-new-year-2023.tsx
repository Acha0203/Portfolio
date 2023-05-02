import Head from 'next/head';
import { sketchList } from '@/consts/sketchList';
import HappyNewYear2023 from '@/components/sketch-components/HappyNewYear2023';
import MenuBarTop from '@/components/ui/MenuBarTop';
import styles from '../../styles/Home.module.scss';

const HappyNewYear2023Page = () => {
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
          <HappyNewYear2023 />
        </div>
        <MenuBarTop />
      </div>
      <div>
        <div className={`${styles.title_of_sketch} ${styles.fade_up}`}>
          {`${sketchList[2].title}`}
          <br />
          <span className={styles.code}>
            <a href={`${sketchList[2].codeUrl}`} target='_blank' rel='noreferrer'>
              CODE
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default HappyNewYear2023Page;
