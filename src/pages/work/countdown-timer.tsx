import type { MyAppState } from '@/types';
import Image from 'next/image';
import { useEffect } from 'react';
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

const CountdownTimerPage = () => {
  const dispatch = useDispatch();
  const { isHamburger, isInTransition, language } = useSelector((state: MyAppState) => state.myApp);
  const windowWidth = useWindowSize()[0];

  // useWindowSize() を使用すると windowWidth の初期値が 0 にセットされてしまうため、メニューをクリックして画面遷移すると一瞬ハンバーガーメニューが表示されてしまう。それを防ぐために isHamburger という state を設定して、最初に画面が読み込まれた際に画面サイズを取得し、それに合わせてあらかじめ isHamburger の値をセットしておく。そして windowWidth の値が 0 の場合は isHamburger の値を参照する。

  useEffect(() => {
    dispatch(myAppActions.setIsOpen(false));
    dispatch(myAppActions.setIsInTransition(false));

    if (window.innerWidth <= 1024) {
      dispatch(myAppActions.setIsHamburger(true));
    } else {
      dispatch(myAppActions.setIsHamburger(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (language === 'English to Japanese') {
      setTimeout(() => {
        dispatch(myAppActions.setLanguage('Japanese'));
      }, 500);
    } else if (language === 'Japanese to English') {
      setTimeout(() => {
        dispatch(myAppActions.setLanguage('English'));
      }, 500);
    }
  }, [dispatch, language]);

  return (
    <>
      <MyHead title={workList[7].title} description={workList[7].description.en} />
      <div className='flex flex-col justify-center items-center relative w-screen h-auto'>
        <SketchBackground />
        <div
          className={`flex flex-col justify-start items-center absolute w-screen ${styles.work_wrapper} ${styles.fade_up}`}
        >
          <div
            className={`${styles.title_of_work} flex justify-center text-white text-center w-3/4`}
          >{`${workList[7].title.toUpperCase()}`}</div>
          <LanguageSwitch />
          <div className={`flex justify-center items-start w-screen mt-8 sm:mt-10 lg:mt-12`}>
            <div className='w-4/5 sm:w-1/2'>
              <Image
                src={`${workList[7].thumbnailUrl}.png`}
                alt={workList[7].title}
                width={workList[7].thumbnailX}
                height={workList[7].thumbnailY}
                sizes='100vw'
                className={`${styles.work_image} w-full`}
              />
            </div>
          </div>
          <div className={`flex flex-col justify-center items-center w-screen sm:mt-10`}>
            <div
              className={`${styles.title_of_description} text-center text-white w-3/4 my-6 sm:my-10`}
            >
              DESCRIPTION
            </div>
            <div
              className={`${
                styles.work_description
              } text-neutral-400 text-justify w-3/4 sm:w-3/5 mb-6 sm:mb-10 whitespace-pre-wrap ${
                (language === 'English to Japanese' || language === 'Japanese to English') &&
                styles.vanish
              } ${(language === 'English to Japanese' || language === 'English') && styles.en} ${
                (language === 'Japanese to English' || language === 'Japanese') && styles.ja
              }`}
            >
              {(language === 'English to Japanese' || language === 'English') &&
                workList[7].description.en}
              {(language === 'Japanese to English' || language === 'Japanese') &&
                workList[7].description.ja}
            </div>
            <Technology index={7} />
          </div>
          <div className='my-5'>
            <WebsiteBtn text='WEBSITE' url={`${workList[7].siteUrl}`} />
          </div>
          <div className='mb-10'>
            <CodeAndBackBtn url={`${workList[7].codeUrl}`} prevPage='/work' />
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

export default CountdownTimerPage;
