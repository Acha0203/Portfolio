import { sketchList } from '@/consts/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchRotation04 from '@/components/sketch-components/SketchRotation04';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const SketchRotation04Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[18].title}
        thumbnailUrl={sketchList[18].thumbnailUrl}
        description={sketchList[18].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchRotation04 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[18].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[18].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default SketchRotation04Page;
