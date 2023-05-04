import type { MyAppState } from '@/types';
import Link from 'next/link';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/Home.module.scss';

const HamburgerMenu = () => {
  const isOpen = useSelector((state: MyAppState) => state.myApp.isOpen);
  const [pathname, setPathname] = useState('');

  const stopScrollingBackContent = () => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  };

  const allowScrollingBackContent = () => {
    document.body.style.overflow = 'scroll';

    return () => {
      document.body.style.overflow = 'auto';
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
          <li className={styles.active}>
            <Link href='/'>HOME</Link>
          </li>
        )}
        <li>PROFILE</li>
        <li>WORK</li>
        {pathname === '/sketch-book' ? (
          <li className={styles.current}>SKETCH BOOK</li>
        ) : (
          <li className={styles.active}>
            <Link href='/sketch-book'>SKETCH BOOK</Link>
          </li>
        )}
        <li>CONTACT</li>
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
