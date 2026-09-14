'use client';

import Blackout from '#/components/Blackout';
import SketchCliffordAttractor03 from '#/components/sketch-components/SketchCliffordAttractor03';
import TitleOfHome from '#/components/TitleOfHome';
import Menu from '#/components/ui/menu/Menu';
import styles from '#/styles/Home.module.scss';

const HomePage = () => {
  return (
    <>
      <div className='flex-col justify-center items-center fixed top-0 right-0 w-screen h-screen'>
        <div className={styles.curtain}>
          <SketchCliffordAttractor03 />
        </div>
        <TitleOfHome />
        <p className='absolute bottom-4 right-4 text-xs tracking-widest text-slate-400'>
          v{process.env.NEXT_PUBLIC_VERSION}
        </p>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default HomePage;
