import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchLuminousSpiral03 from '@/components/sketch-components/SketchLuminousSpiral03';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const LuminousSpiral03Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[39].title}
        thumbnailUrl={sketchList[39].thumbnailUrl}
        description={sketchList[39].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchLuminousSpiral03 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[39].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[39].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default LuminousSpiral03Page;
