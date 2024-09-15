import { sketchList } from '@/constants/sketchList';
import useReload from '@/hooks/useReload';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchConcentricCircle04 from '@/components/sketch-components/SketchConcentricCircle04';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const ConcentricCircle04Page = () => {
  useReload();

  return (
    <>
      <MyHead
        title={sketchList[10].title}
        thumbnailUrl={sketchList[10].thumbnailUrl}
        description={sketchList[10].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchConcentricCircle04 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[10].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[10].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default ConcentricCircle04Page;
