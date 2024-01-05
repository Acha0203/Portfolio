import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchScreensaver from '@/components/sketch-components/SketchScreensaver';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const ScreensaverPage = () => {
  return (
    <>
      <MyHead
        title={sketchList[42].title}
        thumbnailUrl={sketchList[42].thumbnailUrl}
        description={sketchList[42].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchScreensaver />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[42].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[42].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default ScreensaverPage;
