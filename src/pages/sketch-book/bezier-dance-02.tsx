import { sketchList } from '@/constants/sketchList';
import useReload from '@/hooks/useReload';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchBezierDance02 from '@/components/sketch-components/SketchBezierDance02';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const BezierDance02Page = () => {
  useReload();

  return (
    <>
      <MyHead
        title={sketchList[37].title}
        thumbnailUrl={sketchList[37].thumbnailUrl}
        description={sketchList[37].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchBezierDance02 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[37].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[37].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default BezierDance02Page;
