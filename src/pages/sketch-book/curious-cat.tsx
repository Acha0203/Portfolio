import { sketchList } from '@/constants/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchCuriousCat from '@/components/sketch-components/SketchCuriousCat';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const CuriousCatPage = () => {
  return (
    <>
      <MyHead
        title={sketchList[27].title}
        thumbnailUrl={sketchList[27].thumbnailUrl}
        description={sketchList[27].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchCuriousCat />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[27].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[27].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default CuriousCatPage;
