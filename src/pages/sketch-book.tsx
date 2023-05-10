import type { MyAppState } from '@/types';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReload from '@/hooks/useReload';
import useWindowSize from '@/hooks/useWindowSize';
import { myAppActions } from '@/store/myApp';
import MyHead from '@/components/MyHead';
import Showcase from '@/components/Showcase';
import SketchBackground from '@/components/sketch-components/SketchBackground';
import TitleOfSketchBook from '@/components/TitleOfSketchBook';
import HamburgerBtn from '@/components/ui/button/HamburgerBtn';
import HamburgerMenu from '@/components/ui/menu/HamburgerMenu';
import MenuBarTop from '@/components/ui/menu/MenuBarTop';
import styles from '../styles/Home.module.scss';

const SketchBookPage = () => {
  const dispatch = useDispatch();
  const { isHamburger, isInTransition } = useSelector((state: MyAppState) => state.myApp);
  const windowWidth = useWindowSize()[0];
  const topDevRef = useRef(null);

  useReload();

  const returnToTop = () => {
    const element = document.getElementById('top-of-page');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // useWindowSize() を使用すると windowWidth の初期値が 0 にセットされてしまうため、メニューをクリックして画面遷移すると一瞬ハンバーガーメニューが表示されてしまう。それを防ぐために isHamburger という state を設定して、最初に画面が読み込まれた際に画面サイズを取得し、それに合わせてあらかじめ isHamburger の値をセットしておく。そして windowWidth の値が 0 の場合は isHamburger の値を参照する。

  useEffect(() => {
    dispatch(myAppActions.setIsOpen(false));
    dispatch(myAppActions.setIsInTransition(false));
    returnToTop();

    if (window.innerWidth <= 1024) {
      // window.innerWidth は useEffect() の中でしか使用できない。
      dispatch(myAppActions.setIsHamburger(true));
    } else {
      dispatch(myAppActions.setIsHamburger(false));
    }
  }, [dispatch]);

  return (
    <>
      <MyHead
        title='Sketch Book'
        description='This page shows various generative arts created by Acha Ikeda, a designer and developer in Japan.'
      />
      <div className='flex-col justify-center items-center relative'>
        <div id='top-of-page' ref={topDevRef} />
        <div className={styles.fade_up}>
          <SketchBackground />
          <TitleOfSketchBook />
          <Showcase />
        </div>
        {isInTransition && (
          <div
            className={`${styles.overlay} flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black`}
          ></div>
        )}
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

export default SketchBookPage;
