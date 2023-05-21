import type { MyAppState } from '@/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sketchList } from '@/consts/sketchList';
// import useReload from '@/hooks/useReload';
import useWindowSize from '@/hooks/useWindowSize';
import { myAppActions } from '@/store/myApp';
import MyHead from '@/components/MyHead';
import SketchBezier08 from '@/components/sketch-components/SketchBezier08';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import HamburgerBtn from '@/components/ui/button/HamburgerBtn';
import HamburgerMenu from '@/components/ui/menu/HamburgerMenu';
import MenuBarTop from '@/components/ui/menu/MenuBarTop';
import styles from '../../styles/Home.module.scss';

const Bezier08Page = () => {
  const dispatch = useDispatch();
  const { isHamburger, isInTransition } = useSelector((state: MyAppState) => state.myApp);
  const windowWidth = useWindowSize()[0];

  // useReload();

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

  return (
    <>
      <MyHead title={sketchList[9].title} description={sketchList[9].description.en} />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchBezier08 />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketchList[9].title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketchList[9].codeUrl}`} prevPage='/sketch-book' />
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

export default Bezier08Page;
