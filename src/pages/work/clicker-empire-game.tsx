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

const ClickerEmpireGamePage = () => {
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
        title={workList[0].title}
        thumbnailUrl={workList[0].thumbnailUrl}
        description={workList[0].description.en}
      />
      <div className={`flex-col justify-center items-center relative ${styles.vh_320}`}>
        <SketchBackground />
        <div
          className={`flex flex-col justify-start items-center absolute ${styles.work_wrapper} ${styles.fade_up}`}
        >
          <div
            className={`${styles.title_of_work} flex justify-center text-white text-center w-3/4`}
          >{`${workList[0].title.toUpperCase()}`}</div>
          <LanguageSwitch />
          <div className={`flex justify-center items-start w-screen mt-8 sm:mt-10 lg:mt-12`}>
            <div className='w-4/5 sm:w-1/2'>
              <Image
                src={`${workList[0].thumbnailUrl}.png`}
                alt={workList[0].title}
                width={workList[0].thumbnailX}
                height={workList[0].thumbnailY}
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
              {(language === 'English to Japanese' || language === 'English') && (
                <>
                  <div className='mb-5'>{workList[0].description.en}</div>
                  <ol>
                    <li>
                      On the start page, enter your name and select New Game, then click Game Start.
                    </li>
                    <li>
                      By clicking the hamburger, you can make money. One day elapses in one second.
                    </li>
                    <li>
                      By purchasing items, you can make more money per one click or get an unearned
                      income.
                    </li>
                    <li>
                      By clicking the save button at the lower right, you can save your data in your
                      local storage. To resume the game, select Continue on the start page and enter
                      the same name, then click Game Start.
                    </li>
                    <li>
                      Let&apos;s make a lot of money efficiently to get a bullet-apeed sky railway.
                      Good luck!
                    </li>
                  </ol>
                </>
              )}
              {(language === 'Japanese to English' || language === 'Japanese') && (
                <>
                  <div className='mb-5'>{workList[0].description.ja}</div>
                  <ol>
                    <li>
                      スタート画面で名前を入力して「New Game」を選び、「Game
                      Start」をクリックします。
                    </li>
                    <li>
                      ハンバーガーをクリックするとお金を獲得できます。1 秒で 1 日が経過します。
                    </li>
                    <li>
                      アイテムを購入するとクリックごとに獲得できるお金が増えたり、毎秒不労所得を得られるようになります。
                    </li>
                    <li>
                      右下のセーブボタンをクリックするとローカルストレージにデータを保存できます。ゲームを再開するにはスタート画面で「Continue」を選び、同じ名前を入力して「Game
                      Start」をクリックします。
                    </li>
                    <li>うまくお金を稼いで新幹線の購入を目指しましょう。</li>
                  </ol>
                </>
              )}
            </div>
            <Technology index={0} />
          </div>
          <div className='my-5'>
            <WebsiteBtn text='WEBSITE' url={`${workList[0].siteUrl}`} />
          </div>
          <div className='mb-10'>
            <CodeAndBackBtn url={`${workList[0].codeUrl}`} prevPage='/work' />
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

export default ClickerEmpireGamePage;
