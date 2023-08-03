import { sketchList } from '@/consts/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchRandomSquares from '@/components/sketch-components/SketchRandomSquares';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const RandomSquaresPage = () => {
  return (
    <>
      <MyHead
        title={sketchList[36].title}
        thumbnailUrl={sketchList[36].thumbnailUrl}
        description={sketchList[36].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchRandomSquares />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[36].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[36].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default RandomSquaresPage;
