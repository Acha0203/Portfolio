import type { MyAppState } from '@/types';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sketchList } from '@/consts/sketchList';
import useReload from '@/hooks/useReload';
import useWindowSize from '@/hooks/useWindowSize';
import { myAppActions } from '@/store/myApp';
import SketchRotation01 from '@/components/sketch-components/SketchRotation01';
import HamburgerBtn from '@/components/ui/HamburgerBtn';
import HamburgerMenu from '@/components/ui/HamburgerMenu';
import MenuBarTop from '@/components/ui/MenuBarTop';
import styles from '../../styles/Home.module.scss';

const Rotation01Page = () => {
  const dispatch = useDispatch();
  const isHamburger = useSelector((state: MyAppState) => state.myApp.isHamburger);
  const windowWidth = useWindowSize()[0];

  useReload();

  // useWindowSize() を使用すると windowWidth の初期値が 0 にセットされてしまうため、メニューをクリックして画面遷移すると一瞬ハンバーガーメニューが表示されてしまう。それを防ぐために isHamburger という state を設定して、最初に画面が読み込まれた際に画面サイズを取得し、それに合わせてあらかじめ isHamburger の値をセットしておく。そして windowWidth の値が 0 の場合は isHamburger の値を参照する。

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      dispatch(myAppActions.setIsHamburger(true));
    } else {
      dispatch(myAppActions.setIsHamburger(false));
    }
    dispatch(myAppActions.setIsOpen(false));
  }, [dispatch, windowWidth]);

  return (
    <>
      <Head>
        <title>Acha Ikeda | Sketch Book</title>
        <meta
          name='description'
          content="This page shows Acha Ikeda's generative art with p5.js."
          key='desc'
        />
      </Head>
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchRotation01 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[6].title}`}</div>
          <div className={styles.code_back}>
            <div className={styles.code}>
              <a href={`${sketchList[6].codeUrl}`} target='_blank' rel='noreferrer'>
                CODE
              </a>
            </div>
            <div>|</div>
            <div className={styles.code}>
              <Link href={'/sketch-book'}>BACK</Link>
            </div>
          </div>
        </div>
        {windowWidth === 0 ? (
          isHamburger ? (
            <>
              <HamburgerMenu />
              <HamburgerBtn />
            </>
          ) : (
            <MenuBarTop />
          )
        ) : windowWidth <= 1024 ? (
          <>
            <HamburgerMenu />
            <HamburgerBtn />
          </>
        ) : (
          <MenuBarTop />
        )}
      </div>
    </>
  );
};

export default Rotation01Page;
