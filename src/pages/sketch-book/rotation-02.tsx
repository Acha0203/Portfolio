import { sketchList } from '@/constants/sketchList';
import useReload from '@/hooks/useReload';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchRotation02 from '@/components/sketch-components/SketchRotation02';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const SketchRotation02Page = () => {
  useReload();

  return (
    <>
      <MyHead
        title={sketchList[0].title}
        thumbnailUrl={sketchList[0].thumbnailUrl}
        description={sketchList[0].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchRotation02 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[0].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[0].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default SketchRotation02Page;
