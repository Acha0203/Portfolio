import { sketchList } from '@/constants/sketchList';
import useReload from '@/hooks/useReload';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchMultipleParticleSystems03 from '@/components/sketch-components/SketchMultipleParticleSystems03';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const MultipleParticleSystems03Page = () => {
  useReload();

  return (
    <>
      <MyHead
        title={sketchList[22].title}
        thumbnailUrl={sketchList[22].thumbnailUrl}
        description={sketchList[22].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchMultipleParticleSystems03 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[22].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[22].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default MultipleParticleSystems03Page;
