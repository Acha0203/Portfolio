import { sketchList } from '@/consts/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchCliffordAttractor01 from '@/components/sketch-components/SketchCliffordAttractor03';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const CliffordAttractor01Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[3].title}
        thumbnailUrl={sketchList[3].thumbnailUrl}
        description={sketchList[3].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchCliffordAttractor01 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[3].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[3].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default CliffordAttractor01Page;
