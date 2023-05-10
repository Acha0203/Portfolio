import type { MyAppState } from '@/types';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { workList } from '@/consts/workList';
import useWindowSize from '@/hooks/useWindowSize';
import { myAppActions } from '@/store/myApp';
import MyHead from '@/components/MyHead';
import SketchBackground from '@/components/sketch-components/SketchBackground';
import Technology from '@/components/Technology';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import HamburgerBtn from '@/components/ui/button/HamburgerBtn';
import LanguageSwitch from '@/components/ui/button/LanguageSwitch';
import WebsiteBtn from '@/components/ui/button/WebsiteBtn';
import HamburgerMenu from '@/components/ui/menu/HamburgerMenu';
import MenuBarTop from '@/components/ui/menu/MenuBarTop';
import styles from '../../styles/Home.module.scss';

const TaskManagementAppPage = () => {
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
      <MyHead title={workList[5].title} description={workList[5].description.en} />
      <div className='flex flex-col justify-center items-center relative w-screen h-screen'>
        <div id='top-of-page' ref={topDevRef} />
        <SketchBackground />
        <div
          className={`flex flex-col justify-start items-center absolute w-screen ${styles.work_wrapper} ${styles.fade_up}`}
        >
          <div
            className={`${styles.title_of_work} flex justify-center text-white text-center w-3/4`}
          >{`${workList[5].title.toUpperCase()}`}</div>
          <LanguageSwitch />
          <div className={`flex justify-center items-start w-screen mt-8 sm:mt-10 lg:mt-12`}>
            <div className='w-4/5 sm:w-1/2'>
              <Image
                src={`${workList[5].thumbnailUrl}.png`}
                alt={workList[5].title}
                width={workList[5].thumbnailX}
                height={workList[5].thumbnailY}
                sizes='100vw'
                className={`${styles.work_image} w-full`}
              />
            </div>
          </div>
          <div className={`flex flex-col justify-center items-center w-screen sm:mt-10`}>
            <div className={`${styles.title_of_description} text-center text-white w-3/4`}>
              DESCRIPTION
            </div>
            {isEnglish ? (
              <div
                className={`${styles.work_description} text-neutral-400 text-justify w-4/5 sm:w-3/5 whitespace-pre-wrap mb-3 ${styles.en}`}
              >
                {workList[5].description.en}
              </div>
            ) : (
              <div
                className={`${styles.work_description} text-neutral-400 text-justify w-4/5 sm:w-3/5 whitespace-pre-wrap mb-3 ${styles.jp}`}
              >
                {workList[5].description.ja}
              </div>
            )}
            <Technology index={5} />
          </div>
          <div className='my-5'>
            <WebsiteBtn url={`${workList[5].siteUrl}`} />
          </div>
          <div className='mb-10'>
            <CodeAndBackBtn url={`${workList[5].codeUrl}`} prevPage='/work' />
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

export default TaskManagementAppPage;
