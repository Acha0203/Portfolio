import { sketchList } from '@/constants/sketchList';
import useReload from '@/hooks/useReload';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchMultipleFans from '@/components/sketch-components/SketchMultipleFans';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const MultipleFansPage = () => {
  useReload();

  return (
    <>
      <MyHead
        title={sketchList[24].title}
        thumbnailUrl={sketchList[24].thumbnailUrl}
        description={sketchList[24].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchMultipleFans />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[24].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[24].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default MultipleFansPage;
