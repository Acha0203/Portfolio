import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchTentacles from '@/components/sketch-components/SketchTentacles';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const TentaclesPage = () => {
  return (
    <>
      <MyHead
        title={sketchList[28].title}
        thumbnailUrl={sketchList[28].thumbnailUrl}
        description={sketchList[28].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchTentacles />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[28].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[28].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default TentaclesPage;
