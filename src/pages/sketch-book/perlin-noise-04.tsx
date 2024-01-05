import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchPerlinNoise04 from '@/components/sketch-components/SketchPerlinNoise04';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const PerlinNoise04Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[12].title}
        thumbnailUrl={sketchList[12].thumbnailUrl}
        description={sketchList[12].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchPerlinNoise04 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[12].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[12].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default PerlinNoise04Page;
