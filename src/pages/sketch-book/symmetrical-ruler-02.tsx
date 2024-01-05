import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchSymmetricalRuler02 from '@/components/sketch-components/SketchSymmetricalRuler02';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const SymmetricalRuler02Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[1].title}
        thumbnailUrl={sketchList[1].thumbnailUrl}
        description={sketchList[1].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchSymmetricalRuler02 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[1].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[1].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default SymmetricalRuler02Page;
