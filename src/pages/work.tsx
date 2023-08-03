import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import ShowcaseOfWork from '@/components/ShowcaseOfWork';
import SketchBackground from '@/components/sketch-components/SketchBackground';
import TitleOfWork from '@/components/TitleOfWork';
import Menu from '@/components/ui/menu/Menu';
import styles from '../styles/Home.module.scss';

const WorkPage = () => {
  return (
    <>
      <MyHead
        title='Work'
        description='This page shows various Web applications developed by Acha Ikeda, a designer and developer in Japan.'
      />
      <div className={`flex-col justify-center items-center relative h-screen`}>
        <div className={styles.fade_up}>
          <SketchBackground />
          <TitleOfWork />
          <ShowcaseOfWork />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default WorkPage;
