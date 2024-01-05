import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchPsychedelicCurve from '@/components/sketch-components/SketchPsychedelicCurve';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const PsychedelicCurvePage = () => {
  return (
    <>
      <MyHead
        title={sketchList[26].title}
        thumbnailUrl={sketchList[26].thumbnailUrl}
        description={sketchList[26].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchPsychedelicCurve />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[26].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[26].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default PsychedelicCurvePage;
