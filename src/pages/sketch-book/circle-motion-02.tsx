import Head from 'next/head';
import { sketchList } from '@/consts/sketchList';
import CircleMotion02 from '@/components/sketch-components/CircleMotion02';
import MenuBarTop from '@/components/ui/MenuBarTop';
import styles from '../../styles/Home.module.scss';

const CircleMotion02Page = () => {
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
          <CircleMotion02 />
        </div>
        <MenuBarTop />
      </div>
      <div>
        <div className={`${styles.title_of_sketch} ${styles.fade_up}`}>
          {`${sketchList[4].title}`}
          <br />
          <span className={styles.code}>
            <a href={`${sketchList[4].codeUrl}`} target='_blank' rel='noreferrer'>
              CODE
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default CircleMotion02Page;
