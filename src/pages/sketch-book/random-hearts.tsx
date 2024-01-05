import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchRandomHearts from '@/components/sketch-components/SketchRandomHearts';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const SketchRandomHeartsPage = () => {
  return (
    <>
      <MyHead
        title={sketchList[23].title}
        thumbnailUrl={sketchList[23].thumbnailUrl}
        description={sketchList[23].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchRandomHearts />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[23].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[23].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default SketchRandomHeartsPage;
