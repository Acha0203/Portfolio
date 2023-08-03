import { sketchList } from '@/consts/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchAinuFantasy01 from '@/components/sketch-components/SketchAinuFantasy01';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const AinuFantasy01Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[34].title}
        thumbnailUrl={sketchList[34].thumbnailUrl}
        description={sketchList[34].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchAinuFantasy01 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[34].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[34].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default AinuFantasy01Page;
