import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import Showcase from '@/components/Showcase';
import SketchBackground from '@/components/sketch-components/SketchBackground';
import TitleOfSketchBook from '@/components/TitleOfSketchBook';
import Menu from '@/components/ui/menu/Menu';
import styles from '../styles/Home.module.scss';

const SketchBookPage = () => {
  return (
    <>
      <MyHead
        title='Sketch Book'
        description='This page shows various generative arts created by Acha Ikeda, a designer and developer in Japan.'
      />
      <div className={`flex-col justify-center items-center relative ${styles.vh_780}`}>
        <div className={styles.fade_up}>
          <SketchBackground />
          <TitleOfSketchBook />
          <Showcase />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default SketchBookPage;
