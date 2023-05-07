import type { MyAppState } from '@/types';
import Link from 'next/link';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myAppActions } from '@/store/myApp';
import styles from '../../styles/Home.module.scss';

const HamburgerMenu = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: MyAppState) => state.myApp.isOpen);
  const [pathname, setPathname] = useState('');

  const handleClick = () => {
    dispatch(myAppActions.setIsOpen(false));
  };

  const stopScrollingBackContent = () => {
    document.body.style.overflowX = 'clip';
    document.body.style.overflowY = 'clip';

    return () => {
      document.body.style.overflowX = 'clip';
      document.body.style.overflowY = 'auto';
    };
  };

  const allowScrollingBackContent = () => {
    document.body.style.overflowX = 'clip';
    document.body.style.overflowY = 'scroll';

    return () => {
      document.body.style.overflowX = 'clip';
      document.body.style.overflowY = 'auto';
    };
  };

  useEffect(() => {
    isOpen ? stopScrollingBackContent() : allowScrollingBackContent();
    setPathname(router.pathname);
  }, [isOpen]);

  return (
    <nav className={`${styles.hamburger_menu} ${isOpen && styles.active}`}>
      <ul className={`${styles.menu_ul} text-2xl sm:text-3xl lg:text-4xl`}>
        {pathname === '/' ? (
          <li className={styles.current}>HOME</li>
        ) : (
          <li className={styles.active} onClick={handleClick}>
            <Link href='/'>HOME</Link>
          </li>
        )}
        <li>PROFILE</li>
        {pathname === '/work' ? (
          <li className={styles.current}>WORK</li>
        ) : (
          <li className={styles.active} onClick={handleClick}>
            <Link href='/work'>WORK</Link>
          </li>
        )}
        {pathname === '/sketch-book' ? (
          <li className={styles.current}>SKETCH BOOK</li>
        ) : (
          <li className={styles.active} onClick={handleClick}>
            <Link href='/sketch-book'>SKETCH BOOK</Link>
          </li>
        )}
        <li>CONTACT</li>
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
