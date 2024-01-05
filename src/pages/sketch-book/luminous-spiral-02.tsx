import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchLuminousSpiral02 from '@/components/sketch-components/SketchLuminousSpiral02';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const LuminousSpiral02Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[33].title}
        thumbnailUrl={sketchList[33].thumbnailUrl}
        description={sketchList[33].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchLuminousSpiral02 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[33].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[33].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default LuminousSpiral02Page;
