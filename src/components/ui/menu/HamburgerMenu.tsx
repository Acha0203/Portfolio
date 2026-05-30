import type { MyAppState } from '#/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myAppActions } from '#/store/myApp';
import { UI_TEXT } from '#/constants/uiText';
import styles from '#/styles/Home.module.scss';

const HamburgerMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isOpen = useSelector((state: MyAppState) => state.myApp.isOpen);
  const [pathname, setPathname] = useState('');

  const handleClick = () => {
    dispatch(myAppActions.setIsOpen(false));
    dispatch(myAppActions.setIsInTransition(true));
  };

  // const stopScrollingBackContent = () => {
  //   document.body.style.overflowX = 'clip';
  //   document.body.style.overflowY = 'clip';

  //   return () => {
  //     document.body.style.overflowX = 'clip';
  //     document.body.style.overflowY = 'clip';
  //   };
  // };

  // const allowScrollingBackContent = () => {
  //   document.body.style.overflowX = 'clip';
  //   document.body.style.overflowY = 'scroll';

  //   return () => {
  //     document.body.style.overflowX = 'clip';
  //     document.body.style.overflowY = 'scroll';
  //   };
  // };

  useEffect(() => {
    // isOpen ? stopScrollingBackContent() : allowScrollingBackContent();
    setPathname(router.pathname);
  }, [router.pathname]);

  return (
    <nav
      className={`${styles.hamburger_menu} ${
        isOpen && styles.active
      } grid justify-center content-center text-center fixed top-0 w-full h-full bg-black`}
    >
      <ul className={`${styles.menu_ul} text-2xl sm:text-3xl lg:text-4xl`}>
        {pathname === '/' ? (
          <li className={styles.current}>{UI_TEXT.nav.home}</li>
        ) : (
          <li className={styles.active}>
            <Link href='/' onClick={handleClick}>
              {UI_TEXT.nav.home}
            </Link>
          </li>
        )}
        {pathname === '/work' ? (
          <li className={styles.current}>{UI_TEXT.nav.work}</li>
        ) : (
          <li className={styles.active}>
            <Link href='/work' onClick={handleClick}>
              {UI_TEXT.nav.work}
            </Link>
          </li>
        )}
        {pathname === '/sketch-book' ? (
          <li className={styles.current}>{UI_TEXT.nav.sketchBook}</li>
        ) : (
          <li className={styles.active}>
            <Link href='/sketch-book' onClick={handleClick}>
              {UI_TEXT.nav.sketchBook}
            </Link>
          </li>
        )}
        {pathname === '/info' ? (
          <li className={styles.current}>{UI_TEXT.nav.info}</li>
        ) : (
          <li className={styles.active}>
            <Link href='/info' onClick={handleClick}>
              {UI_TEXT.nav.info}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
