import { sketchList } from '@/constants/sketchList';
import useReload from '@/hooks/useReload';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchRotation06 from '@/components/sketch-components/SketchRotation06';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const Rotation06Page = () => {
  useReload();

  return (
    <>
      <MyHead
        title={sketchList[6].title}
        thumbnailUrl={sketchList[6].thumbnailUrl}
        description={sketchList[6].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchRotation06 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[6].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[6].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default Rotation06Page;
