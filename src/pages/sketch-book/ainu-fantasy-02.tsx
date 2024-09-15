import { sketchList } from '@/constants/sketchList';
import useReload from '@/hooks/useReload';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchAinuFantasy02 from '@/components/sketch-components/SketchAinuFantasy02';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const AinuFantasy02Page = () => {
  useReload();

  return (
    <>
      <MyHead
        title={sketchList[35].title}
        thumbnailUrl={sketchList[35].thumbnailUrl}
        description={sketchList[35].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchAinuFantasy02 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[35].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[35].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default AinuFantasy02Page;
