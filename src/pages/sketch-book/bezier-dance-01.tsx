import { sketchList } from '@/constants/sketchList';
import useReload from '@/hooks/useReload';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchBezierDance01 from '@/components/sketch-components/SketchBezierDance01';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const BezierDance01Page = () => {
  useReload();

  return (
    <>
      <MyHead
        title={sketchList[17].title}
        thumbnailUrl={sketchList[17].thumbnailUrl}
        description={sketchList[17].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchBezierDance01 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[17].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[17].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default BezierDance01Page;
