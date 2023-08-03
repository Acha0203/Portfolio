import { sketchList } from '@/consts/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchBezier08 from '@/components/sketch-components/SketchBezier08';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const Bezier08Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[9].title}
        thumbnailUrl={sketchList[9].thumbnailUrl}
        description={sketchList[9].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchBezier08 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[9].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[9].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default Bezier08Page;
