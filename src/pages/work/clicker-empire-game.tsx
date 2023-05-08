import type { MyAppState } from '@/types';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { workList } from '@/consts/workList';
import useWindowSize from '@/hooks/useWindowSize';
import { myAppActions } from '@/store/myApp';
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
  const { isHamburger, isEnglish } = useSelector((state: MyAppState) => state.myApp);
  const windowWidth = useWindowSize()[0];

  // useWindowSize() を使用すると windowWidth の初期値が 0 にセットされてしまうため、メニューをクリックして画面遷移すると一瞬ハンバーガーメニューが表示されてしまう。それを防ぐために isHamburger という state を設定して、最初に画面が読み込まれた際に画面サイズを取得し、それに合わせてあらかじめ isHamburger の値をセットしておく。そして windowWidth の値が 0 の場合は isHamburger の値を参照する。

  useEffect(() => {
    dispatch(myAppActions.setIsOpen(false));

    if (window.innerWidth <= 1024) {
      dispatch(myAppActions.setIsHamburger(true));
    } else {
      dispatch(myAppActions.setIsHamburger(false));
    }
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Acha Ikeda | {workList[4].title}</title>
        <meta name='description' content={workList[4].description.en} key='desc' />
      </Head>
      <div className='flex flex-col justify-center items-center relative w-screen h-screen'>
        <SketchBackground />
        <div
          className={`flex flex-col justify-start items-center absolute w-screen ${styles.work_wrapper} ${styles.fade_up}`}
        >
          <div
            className={`${styles.title_of_work} flex justify-center text-white text-center`}
          >{`${workList[4].title.toUpperCase()}`}</div>
          <LanguageSwitch />
          <div className={`flex justify-center items-start w-screen mt-8 sm:mt-10 lg:mt-12`}>
            <div className='w-4/5 sm:w-1/2'>
              <Image
                src={`${workList[4].thumbnailUrl}.png`}
                alt={workList[4].title}
                width={workList[4].thumbnailX}
                height={workList[4].thumbnailY}
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
                <div className='mb-5'>{workList[4].description.en}</div>
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
              </div>
            ) : (
              <div
                className={`${styles.work_description} text-neutral-400 text-justify w-4/5 sm:w-3/5 whitespace-pre-wrap mb-3 ${styles.jp}`}
              >
                <div className='mb-5'>{workList[4].description.ja}</div>
                <ol>
                  <li>
                    スタート画面で名前を入力して「New Game」を選び、「Game Start」をクリックします。
                  </li>
                  <li>ハンバーガーをクリックするとお金を獲得できます。1 秒で 1 日が経過します。</li>
                  <li>
                    アイテムを購入するとクリックごとに獲得できるお金が増えたり、毎秒不労所得を得られるようになります。
                  </li>
                  <li>
                    右下のセーブボタンをクリックするとローカルストレージにデータを保存できます。ゲームを再開するにはスタート画面で「Continue」を選び、同じ名前を入力して「Game
                    Start」をクリックします。
                  </li>
                  <li>うまくお金を稼いで新幹線の購入を目指しましょう。</li>
                </ol>
              </div>
            )}
            <Technology index={4} />
          </div>
          <div className='my-5'>
            <WebsiteBtn url={`${workList[4].siteUrl}`} />
          </div>
          <div className='mb-10'>
            <CodeAndBackBtn url={`${workList[4].codeUrl}`} prevPage='/work' />
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

export default ClickerEmpireGamePage;