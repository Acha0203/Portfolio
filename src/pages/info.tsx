import type { MyAppState } from '@/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoList } from '@/consts/information';
import useWindowSize from '@/hooks/useWindowSize';
import { myAppActions } from '@/store/myApp';
import MyHead from '@/components/MyHead';
import SketchBackground from '@/components/sketch-components/SketchBackground';
import HamburgerBtn from '@/components/ui/button/HamburgerBtn';
import LanguageSwitch from '@/components/ui/button/LanguageSwitch';
import TwitterBtn from '@/components/ui/button/TwitterBtn';
import WebsiteBtn from '@/components/ui/button/WebsiteBtn';
import HamburgerMenu from '@/components/ui/menu/HamburgerMenu';
import MenuBarTop from '@/components/ui/menu/MenuBarTop';
import styles from '../styles/Home.module.scss';

const InfoPage = () => {
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
      <MyHead
        title='Info'
        description='This page shows information about Acha Ikeda, a designer and developer in Japan.'
      />
      <div className='flex flex-col justify-center items-center relative w-screen h-auto'>
        <SketchBackground />
        <div
          className={`flex flex-col justify-start items-center absolute w-screen ${styles.work_wrapper} ${styles.fade_up}`}
        >
          <div
            className={`${styles.title_of_work_top} flex justify-center text-white text-center pl-5`}
          >
            INFO
          </div>
          <LanguageSwitch />
          <div className='flex flex-col justify-center items-center w-screen sm:mt-10'>
            <div
              className={`${styles.title_of_description} text-center text-white w-3/4 my-5 sm:mb-10`}
            >
              BACKGROUND
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
                infoList[0].description.en}
              {(language === 'Japanese to English' || language === 'Japanese') &&
                infoList[0].description.ja}
            </div>
            <div
              className={`${
                styles.title_of_description
              } text-center text-white w-3/4 my-5 sm:mb-10 ${
                (language === 'English to Japanese' || language === 'Japanese to English') &&
                styles.vanish
              } ${(language === 'English to Japanese' || language === 'English') && styles.en} ${
                (language === 'Japanese to English' || language === 'Japanese') && styles.ja
              }`}
            >
              BOOTH
            </div>
            <div
              className={`${
                styles.work_description
              } text-neutral-400 text-justify w-3/4 sm:w-3/5 mb-6 sm:mb-10 ${
                (language === 'English to Japanese' || language === 'Japanese to English') &&
                styles.vanish
              } ${(language === 'English to Japanese' || language === 'English') && styles.en} ${
                (language === 'Japanese to English' || language === 'Japanese') && styles.ja
              }`}
            >
              <p className='text-center'>
                <a
                  href='https://www.lancers.jp/profile/HiroyaWebStudio'
                  target='_blank'
                  rel='noreferrer'
                >
                  {(language === 'English to Japanese' || language === 'English') &&
                    `Hiroya Web Studio in Lancers (Japanese only)`}
                  {(language === 'Japanese to English' || language === 'Japanese') &&
                    `Hiroya Web Studio (Lancers)`}
                </a>
              </p>
              <p className='text-center mt-7'>
                <a href='https://coconala.com/users/3587217' target='_blank' rel='noreferrer'>
                  {(language === 'English to Japanese' || language === 'English') &&
                    `Hiroya Web Studio in coconala (Japanese only)`}
                  {(language === 'Japanese to English' || language === 'Japanese') &&
                    `Hiroya Web Studio (coconala)`}
                </a>
              </p>
            </div>
            <div
              className={`${
                styles.title_of_description
              } text-center text-white w-3/4 my-5 sm:mb-10 ${
                (language === 'English to Japanese' || language === 'Japanese to English') &&
                styles.vanish
              } ${(language === 'English to Japanese' || language === 'English') && styles.en} ${
                (language === 'Japanese to English' || language === 'Japanese') && styles.ja
              }`}
            >
              PRIZES
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
                infoList[1].description.en}
              {(language === 'Japanese to English' || language === 'Japanese') &&
                infoList[1].description.ja}
            </div>
          </div>
          <div className='my-5 sm:my-10'>
            <WebsiteBtn
              text='CONTACT'
              url={
                language === 'English'
                  ? 'https://docs.google.com/forms/d/e/1FAIpQLSdl1GxKpcAaQwmxcdeeN5eMnPAbLzGT1RhYV4xgm3aESYmQQg/viewform?usp=sf_link'
                  : 'https://docs.google.com/forms/d/e/1FAIpQLSffeDpyhnvtgtsoZ7SM5c_VV0YB1xXomh4dQ-94XaxSiBEAEw/viewform?usp=sf_link'
              }
            />
          </div>
          <div className='mt-5 mb-14'>
            <TwitterBtn />
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
