import { sketchList } from '@/consts/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchRotation03 from '@/components/sketch-components/SketchRotation03';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const SketchRotation03Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[15].title}
        thumbnailUrl={sketchList[15].thumbnailUrl}
        description={sketchList[15].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchRotation03 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[15].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[15].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default SketchRotation03Page;
