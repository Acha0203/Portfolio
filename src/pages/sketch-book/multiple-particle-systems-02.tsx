import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchMultipleParticleSystems02 from '@/components/sketch-components/SketchMultipleParticleSystems02';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const MultipleParticleSystems02Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[13].title}
        thumbnailUrl={sketchList[13].thumbnailUrl}
        description={sketchList[13].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchMultipleParticleSystems02 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[13].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[13].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default MultipleParticleSystems02Page;
