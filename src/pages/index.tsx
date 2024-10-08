import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchCliffordAttractor03 from '@/components/sketch-components/SketchCliffordAttractor03';
import TitleOfHome from '@/components/TitleOfHome';
import Menu from '@/components/ui/menu/Menu';
import styles from '../styles/Home.module.scss';

const Home = () => {
  return (
    <>
      <MyHead />
      <div className='flex-col justify-center items-center fixed top-0 right-0 w-screen h-screen'>
        <div className={styles.curtain}>
          <SketchCliffordAttractor03 />
        </div>
        <TitleOfHome />
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default Home;
