import type { MyAppState } from '@/types';
import { useSelector } from 'react-redux';
import MyHead from '@/components/MyHead';
import SketchCliffordAttractor01 from '@/components/sketch-components/SketchCliffordAttractor03';
import TitleOfHome from '@/components/TitleOfHome';
import Menu from '@/components/ui/menu/Menu';
import styles from '../styles/Home.module.scss';

const Home = () => {
  const isInTransition = useSelector((state: MyAppState) => state.myApp.isInTransition);

  return (
    <>
      <MyHead />
      <div className='flex-col justify-center items-center fixed top-0 right-0'>
        <div className={styles.curtain}>
          <SketchCliffordAttractor01 />
        </div>
        <TitleOfHome />
        {isInTransition && (
          <div
            className={`${styles.overlay} flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black`}
          ></div>
        )}
        <Menu />
      </div>
    </>
  );
};

export default Home;
