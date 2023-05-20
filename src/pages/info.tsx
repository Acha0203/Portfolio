import type { MyAppState } from '@/types';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '@/hooks/useWindowSize';
import { myAppActions } from '@/store/myApp';
import MyHead from '@/components/MyHead';
import SketchBackground from '@/components/sketch-components/SketchBackground';
import HamburgerBtn from '@/components/ui/button/HamburgerBtn';
import LanguageSwitch from '@/components/ui/button/LanguageSwitch';
import WebsiteBtn from '@/components/ui/button/WebsiteBtn';
import HamburgerMenu from '@/components/ui/menu/HamburgerMenu';
import MenuBarTop from '@/components/ui/menu/MenuBarTop';
import styles from '../styles/Home.module.scss';

const InfoPage = () => {
  const dispatch = useDispatch();
  const { isHamburger, isEnglish, isInTransition } = useSelector(
    (state: MyAppState) => state.myApp,
  );
  const windowWidth = useWindowSize()[0];
  const topDevRef = useRef(null);

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
      dispatch(myAppActions.setIsHamburger(true));
    } else {
      dispatch(myAppActions.setIsHamburger(false));
    }
  }, [dispatch]);

  return (
    <>
      <MyHead
        title='Info'
        description='This page shows information about Acha Ikeda, a designer and developer in Japan.'
      />
      <div className='flex flex-col justify-center items-center relative w-screen h-screen'>
        <div id='top-of-page' ref={topDevRef} />
        <SketchBackground />
        <div
          className={`flex flex-col justify-start items-center absolute w-screen ${styles.work_wrapper} ${styles.fade_up}`}
        >
          <div
            className={`${styles.title_of_work_top} flex justify-center text-white text-center pl-10`}
          >
            INFO
          </div>
          <LanguageSwitch />
          <div className={`flex flex-col justify-center items-center w-screen sm:mt-10`}>
            <div className={`${styles.title_of_description} text-center text-white w-3/4`}>
              BACKGROUND
            </div>
            {isEnglish ? (
              <div
                className={`${styles.work_description} text-neutral-400 text-justify w-4/5 sm:w-3/5 whitespace-pre-wrap mb-3 ${styles.en}`}
              >
                Information
              </div>
            ) : (
              <div
                className={`${styles.work_description} text-neutral-400 text-justify w-4/5 sm:w-3/5 whitespace-pre-wrap mb-3 ${styles.jp}`}
              >
                インフォメーション
              </div>
            )}
          </div>
          <div className='my-5'>
            <WebsiteBtn url={``} />
          </div>
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

export default InfoPage;
