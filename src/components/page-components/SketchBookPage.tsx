'use client';

import { Suspense } from 'react';
import Blackout from '#/components/Blackout';
import Showcase from '#/components/Showcase';
import SketchBackground from '#/components/sketch-components/SketchBackground';
import TitleOfSketchBook from '#/components/TitleOfSketchBook';
import Menu from '#/components/ui/menu/Menu';
import styles from '#/styles/Home.module.scss';

const SketchBookPage = () => {
  return (
    <>
      <div className='flex-col justify-center items-center relative min-h-auto'>
        <div className={styles.fade_up}>
          <SketchBackground />
          <TitleOfSketchBook />
          {/* useSearchParams を使うため、静的エクスポート時に Suspense で囲む必要がある */}
          <Suspense>
            <Showcase />
          </Suspense>
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default SketchBookPage;
