import { sketchList } from '@/consts/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchRoseCurve01 from '@/components/sketch-components/SketchRoseCurve01';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const RoseCurve01Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[8].title}
        thumbnailUrl={sketchList[8].thumbnailUrl}
        description={sketchList[8].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchRoseCurve01 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[8].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[8].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default RoseCurve01Page;
