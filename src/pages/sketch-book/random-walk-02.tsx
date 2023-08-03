import { sketchList } from '@/consts/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchRandomWalk02 from '@/components/sketch-components/SketchRandomWalk02';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const SketchRandomWalk02Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[20].title}
        thumbnailUrl={sketchList[20].thumbnailUrl}
        description={sketchList[20].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchRandomWalk02 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[20].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[20].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default SketchRandomWalk02Page;
