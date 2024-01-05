import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchVerdure from '@/components/sketch-components/SketchVerdure';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const VerdurePage = () => {
  return (
    <>
      <MyHead
        title={sketchList[31].title}
        thumbnailUrl={sketchList[31].thumbnailUrl}
        description={sketchList[31].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchVerdure />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[31].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[31].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default VerdurePage;
