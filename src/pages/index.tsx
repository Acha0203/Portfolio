import type { MyAppState } from '@/types';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '@/hooks/useWindowSize';
import { myAppActions } from '@/store/myApp';
import SketchCliffordAttractor01 from '@/components/sketch-components/SketchCliffordAttractor01';
import TitleOfHome from '@/components/TitleOfHome';
import HamburgerBtn from '@/components/ui/HamburgerBtn';
import HamburgerMenu from '@/components/ui/HamburgerMenu';
import MenuBarTop from '@/components/ui/MenuBarTop';
import styles from '../styles/Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const isHamburger = useSelector((state: MyAppState) => state.myApp.isHamburger);
  const windowWidth = useWindowSize()[0];

  // useWindowSize() を使用すると windowWidth の初期値が 0 にセットされてしまうため、メニューをクリックして画面遷移すると一瞬ハンバーガーメニューが表示されてしまう。それを防ぐために isHamburger という state を設定して、最初に画面が読み込まれた際に画面サイズを取得し、それに合わせてあらかじめ isHamburger の値をセットしておく。そして windowWidth の値が 0 の場合は isHamburger の値を参照する。

  useEffect(() => {
    if (window.innerWidth <= 768) {
      dispatch(myAppActions.setIsHamburger(true));
    } else {
      dispatch(myAppActions.setIsHamburger(false));
    }
    dispatch(myAppActions.setIsOpen(false));
  }, [dispatch, windowWidth]);

  return (
    <>
      <Head>
        <title>Acha Ikeda | Portfolio</title>
        <meta
          name='description'
          content="This site shows Acha Ikada's works, generative arts, profile, and so on."
          key='desc'
        />
      </Head>
      <div className={'flex-col justify-center items-center relative'}>
        <div className={styles.curtain}>
          <SketchCliffordAttractor01 />
        </div>
        <TitleOfHome />
        {windowWidth === 0 ? (
          isHamburger ? (
            <>
              <HamburgerMenu />
              <HamburgerBtn />
            </>
          ) : (
            <MenuBarTop />
          )
        ) : windowWidth <= 768 ? (
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

export default Home;
