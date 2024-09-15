import { sketchList } from '@/constants/sketchList';
import useReload from '@/hooks/useReload';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchSymmetricalRuler03 from '@/components/sketch-components/SketchSymmetricalRuler03';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const SymmetricalRuler03Page = () => {
  useReload();

  return (
    <>
      <MyHead
        title={sketchList[14].title}
        thumbnailUrl={sketchList[14].thumbnailUrl}
        description={sketchList[14].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchSymmetricalRuler03 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[14].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[14].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default SymmetricalRuler03Page;
