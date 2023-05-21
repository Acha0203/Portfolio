import type { MyAppState } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myAppActions } from '@/store/myApp';
import styles from '../../../styles/Home.module.scss';

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
  }, [isOpen, router.pathname]);

  return (
    <nav
      className={`${styles.hamburger_menu} ${
        isOpen && styles.active
      } grid justify-center content-center text-center fixed top-0 w-full h-full bg-black`}
    >
      <ul className={`${styles.menu_ul} text-2xl sm:text-3xl lg:text-4xl`}>
        {pathname === '/' ? (
          <li className={styles.current}>HOME</li>
        ) : (
          <li className={styles.active}>
            <Link href='/' onClick={handleClick}>
              HOME
            </Link>
          </li>
        )}
        {pathname === '/work' ? (
          <li className={styles.current}>WORK</li>
        ) : (
          <li className={styles.active}>
            <Link href='/work' onClick={handleClick}>
              WORK
            </Link>
          </li>
        )}
        {pathname === '/sketch-book' ? (
          <li className={styles.current}>SKETCH BOOK</li>
        ) : (
          <li className={styles.active}>
            <Link href='/sketch-book' onClick={handleClick}>
              SKETCH BOOK
            </Link>
          </li>
        )}
        {pathname === '/info' ? (
          <li className={styles.current}>INFO</li>
        ) : (
          <li className={styles.active}>
            <Link href='/info' onClick={handleClick}>
              INFO
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
