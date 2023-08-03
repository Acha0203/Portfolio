import { sketchList } from '@/consts/sketchList';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchIllusion from '@/components/sketch-components/SketchIllusion';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const IllusionPage = () => {
  return (
    <>
      <MyHead
        title={sketchList[30].title}
        thumbnailUrl={sketchList[30].thumbnailUrl}
        description={sketchList[30].description.en}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchIllusion />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[30].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[30].codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default IllusionPage;
