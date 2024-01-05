import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchCircleMotion01 from '@/components/sketch-components/SketchCircleMotion01';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const CircleMotion01Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[5].title}
        thumbnailUrl={sketchList[5].thumbnailUrl}
        description={sketchList[5].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchCircleMotion01 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[5].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[5].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default CircleMotion01Page;
