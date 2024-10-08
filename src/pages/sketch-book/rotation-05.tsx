import { sketchList } from '@/constants/sketchList';
import useReload from '@/hooks/useReload';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchRotation05 from '@/components/sketch-components/SketchRotation05';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const SketchRotation05Page = () => {
  useReload();

  return (
    <>
      <MyHead
        title={sketchList[21].title}
        thumbnailUrl={sketchList[21].thumbnailUrl}
        description={sketchList[21].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchRotation05 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[21].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[21].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default SketchRotation05Page;
