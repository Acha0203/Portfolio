import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchComposition02 from '@/components/sketch-components/SketchComposition02';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const Composition02Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[7].title}
        thumbnailUrl={sketchList[7].thumbnailUrl}
        description={sketchList[7].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchComposition02 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[7].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[7].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default Composition02Page;
