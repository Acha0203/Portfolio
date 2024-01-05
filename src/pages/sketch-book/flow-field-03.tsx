import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchFlowField03 from '@/components/sketch-components/SketchFlowField03';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const SketchFlowField03Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[19].title}
        thumbnailUrl={sketchList[19].thumbnailUrl}
        description={sketchList[19].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchFlowField03 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[19].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[19].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default SketchFlowField03Page;
