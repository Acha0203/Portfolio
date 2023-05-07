import type { MyAppState } from '@/types';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReload from '@/hooks/useReload';
import useWindowSize from '@/hooks/useWindowSize';
import { myAppActions } from '@/store/myApp';
import Showcase from '@/components/Showcase';
import SketchBackground from '@/components/sketch-components/SketchBackground';
import TitleOfSketchBook from '@/components/TitleOfSketchBook';
import HamburgerBtn from '@/components/ui/HamburgerBtn';
import HamburgerMenu from '@/components/ui/HamburgerMenu';
import MenuBarTop from '@/components/ui/MenuBarTop';

const SketchBookPage = () => {
  const dispatch = useDispatch();
  const isHamburger = useSelector((state: MyAppState) => state.myApp.isHamburger);
  const windowWidth = useWindowSize()[0];

  useReload();

  // useWindowSize() を使用すると windowWidth の初期値が 0 にセットされてしまうため、メニューをクリックして画面遷移すると一瞬ハンバーガーメニューが表示されてしまう。それを防ぐために isHamburger という state を設定して、最初に画面が読み込まれた際に画面サイズを取得し、それに合わせてあらかじめ isHamburger の値をセットしておく。そして windowWidth の値が 0 の場合は isHamburger の値を参照する。

  useEffect(() => {
    dispatch(myAppActions.setIsOpen(false));
    if (window.innerWidth <= 1024) {
      // window.innerWidth は useEffect() の中でしか使用できない。
      dispatch(myAppActions.setIsHamburger(true));
    } else {
      dispatch(myAppActions.setIsHamburger(false));
    }
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Acha Ikeda | Sketch Book</title>
        <meta
          name='description'
          content="This page shows Acha Ikeda's works using the creative coding."
          key='desc'
        />
      </Head>
      <div className='flex-col justify-center items-center relative'>
        <SketchBackground />
        <TitleOfSketchBook />
        <Showcase />
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
