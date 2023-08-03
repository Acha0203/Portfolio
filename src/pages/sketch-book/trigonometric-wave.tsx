import { sketchList } from '@/consts/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchTrigonometricWave from '@/components/sketch-components/SketchTrigonometricWave';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const TrigonometricWavePage = () => {
  return (
    <>
      <MyHead
        title={sketchList[29].title}
        thumbnailUrl={sketchList[29].thumbnailUrl}
        description={sketchList[29].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchTrigonometricWave />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[29].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[29].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default TrigonometricWavePage;
