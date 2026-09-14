'use client';

import { Suspense } from 'react';
import { sketchComponentMap } from '#/constants/sketchComponentMap';
import { sketchList } from '#/constants/sketchList';
import useReload from '#/hooks/useReload';
import Blackout from '#/components/Blackout';
import CodeAndBackBtn from '#/components/ui/button/CodeAndBackBtn';
import Menu from '#/components/ui/menu/Menu';
import styles from '#/styles/Home.module.scss';

type Props = {
  index: number;
  slug: string;
};

const SketchPage = ({ index, slug }: Props) => {
  useReload();

  const SketchComponent = sketchComponentMap[slug];
  const sketch = sketchList[index];

  return (
    <>
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchComponent />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketch.title.toUpperCase()}`}</div>
          {/* useSearchParams を使うため、静的エクスポート時に Suspense で囲む必要がある */}
          <Suspense>
            <CodeAndBackBtn url={`${sketch.codeUrl}`} prevPage='/sketch-book' />
          </Suspense>
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default SketchPage;
