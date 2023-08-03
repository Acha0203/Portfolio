import { sketchList } from '@/consts/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchCircleInCircle03 from '@/components/sketch-components/SketchCircleInCircle03';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const CircleInCircle03Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[11].title}
        thumbnailUrl={sketchList[11].thumbnailUrl}
        description={sketchList[11].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchCircleInCircle03 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[11].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[11].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default CircleInCircle03Page;
