import { sketchList } from '@/consts/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchFireworks02 from '@/components/sketch-components/SketchFireworks02';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const Fireworks02Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[40].title}
        thumbnailUrl={sketchList[40].thumbnailUrl}
        description={sketchList[40].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchFireworks02 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[40].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[40].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default Fireworks02Page;
