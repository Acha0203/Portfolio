import { sketchList } from '@/consts/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchMinacoding2023 from '@/components/sketch-components/SketchMinacoding2023';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const Minacoding2023Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[38].title}
        thumbnailUrl={sketchList[38].thumbnailUrl}
        description={sketchList[38].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchMinacoding2023 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[38].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[38].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default Minacoding2023Page;
