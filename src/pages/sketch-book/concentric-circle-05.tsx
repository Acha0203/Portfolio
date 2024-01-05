import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchConcentricCircle05 from '@/components/sketch-components/SketchConcentricCircle05';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const ConcentricCircle05Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[16].title}
        thumbnailUrl={sketchList[16].thumbnailUrl}
        description={sketchList[16].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchConcentricCircle05 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[16].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[16].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default ConcentricCircle05Page;
