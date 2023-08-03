import { sketchList } from '@/consts/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchHappyNewYear2023 from '@/components/sketch-components/SketchHappyNewYear2023';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const HappyNewYear2023Page = () => {
  return (
    <>
      <MyHead
        title={sketchList[2].title}
        thumbnailUrl={sketchList[2].thumbnailUrl}
        description={sketchList[2].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchHappyNewYear2023 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[2].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[2].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default HappyNewYear2023Page;
