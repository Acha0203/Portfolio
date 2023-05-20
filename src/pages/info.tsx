import type { MyAppState } from '@/types';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
            <div
              className={`${styles.title_of_description} text-center text-white w-3/4 my-5 sm:mb-10`}
            >
              BACKGROUND
            </div>
            {isEnglish ? (
              <div
                className={`${styles.work_description} text-neutral-400 text-justify w-3/4 sm:w-3/5 mb-6 sm:mb-10 ${styles.en}`}
              >
                <p>1991: Bachelor of Fine Arts, Tokyo University of the Arts, Tokyo</p>
                <br />
                <p>
                  1993: Master of Fine Arts, Graduate School of Fine Arts, Tokyo University of the
                  Arts, Tokyo
                </p>
                <br />
                <p>
                  1992 - 2000: Designed and created various 3D computer graphics for games,
                  publishing, and so on.
                </p>
                <br />
                <p>
                  2000 - 2011: Designed and coded various websites and created raster or vector
                  graphics for websites.
                </p>
                <br />
                <p>
                  2012 - Present: Translated English texts into Japanese, including IT and computer
                  marketing materials, computer software manuals, cyber security reports.
                </p>
                <br />
                <p>2021 - Present: Designed and developed various web applications and websites.</p>
              </div>
            ) : (
              <div
                className={`${styles.work_description} text-neutral-400 text-justify w-3/4 sm:w-3/5 mb-6 sm:mb-10 ${styles.jp}`}
              >
                <p>1991 年 東京藝術大学美術学部デザイン科卒業</p>
                <br />
                <p>1993 年 東京藝術大学大学院美術研究科修士課程修了</p>
                <br />
                <p>
                  1992 年 〜 2000 年: ゲーム、印刷物向けに 3D
                  コンピュータグラフィックスのデザインおよび制作に従事
                </p>
                <br />
                <p>
                  2000 年 〜 2011 年: さまざまな Web サイトのデザインおよびコーディング、Web
                  サイト用のラスターまたはベクター画像の制作等に従事
                </p>
                <br />
                <p>
                  2012 年 〜 現在: IT
                  およびコンピュータ関連のドキュメント、マーケティング資料、サイバーセキュリティレポートなどの英日翻訳に従事
                </p>
                <br />
                <p>2021 年 〜 現在: Web アプリケーションや Web サイトのデザインおよび開発に従事</p>
              </div>
            )}
            <div className={`${styles.title_of_description} text-center text-white w-3/4 mb-5`}>
              PRIZES
            </div>
            {isEnglish ? (
              <div
                className={`${styles.work_description} text-neutral-400 text-justify w-3/4 sm:w-3/5 mb-3 ${styles.en}`}
              >
                <p> 1990: Won the second prize in the MdN CG Grand Prix.</p>
                <br />
                <p>
                  1992: Won a special jury prize and the second prize of the students still image
                  category in the Japan CG Grand Prix.
                </p>
              </div>
            ) : (
              <div
                className={`${styles.work_description} text-neutral-400 text-justify w-3/4 sm:w-3/5 mb-3 ${styles.jp}`}
              >
                <p>1990 年 MdN CG グランプリにて優秀賞を受賞</p>
                <br />
                <p>1992 年日本 CG グランプリ学生静止画部門にて審査員特別賞、優秀賞を受賞</p>
              </div>
            )}
          </div>
          <div className='my-5 sm:my-10'>
            <WebsiteBtn
              text='CONTACT'
              url={
                isEnglish
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
