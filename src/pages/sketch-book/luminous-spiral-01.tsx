import { sketchList } from '@/constants/sketchList';
import useReload from '@/hooks/useReload';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchLuminousSpiral01 from '@/components/sketch-components/SketchLuminousSpiral01';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const LuminousSpiral01Page = () => {
  useReload();

  return (
    <>
      <MyHead
        title={sketchList[32].title}
        thumbnailUrl={sketchList[32].thumbnailUrl}
        description={sketchList[32].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchLuminousSpiral01 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[32].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[32].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default LuminousSpiral01Page;
