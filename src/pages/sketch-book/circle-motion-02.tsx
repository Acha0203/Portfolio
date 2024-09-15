import { sketchList } from '@/constants/sketchList';
import useReload from '@/hooks/useReload';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchCircleMotion02 from '@/components/sketch-components/SketchCircleMotion02';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const CircleMotion02Page = () => {
  useReload();

  return (
    <>
      <MyHead
        title={sketchList[4].title}
        thumbnailUrl={sketchList[4].thumbnailUrl}
        description={sketchList[4].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchCircleMotion02 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[4].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[4].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default CircleMotion02Page;
