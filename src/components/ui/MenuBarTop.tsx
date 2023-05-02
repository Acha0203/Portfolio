import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../styles/Home.module.scss';

const MenuBarTop = () => {
  const router = useRouter();
  const [isOverSketchBook, setIsOverSketchBook] = useState(false);
  const [isOverHome, setIsOverHome] = useState(false);

  return (
    <div className='flex-col absolute top-0'>
      <div className='flex justify-end items-end w-screen h-12 absolute'>
        {router.pathname === '/' ? (
          <div className='flex flex-col justify-center items-center'>
            <div className='mx-5 text-white'>HOME</div>
            <div className={`${styles.line_under_text_grad} w-20`} />
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center'>
            <div
              className='mx-5 text-neutral-500 hover:text-white'
              onMouseEnter={() => {
                setIsOverHome(true);
              }}
              onMouseLeave={() => {
                setIsOverHome(false);
              }}
            >
              <Link href='/'>HOME</Link>
            </div>
            {isOverHome && <div className={`${styles.line_under_text_grad} w-20`} />}
          </div>
        )}
        {router.pathname === '/profile' ? (
          <div className='flex flex-col justify-center items-center'>
            <div className='mx-5 text-white'>PROFILE</div>
            <div className={`${styles.line_under_text_grad} w-24`} />
          </div>
        ) : (
          <div className='mx-5 text-neutral-500'>PROFILE</div>
        )}
        {router.pathname === '/work' ? (
          <div className='flex flex-col justify-center items-center'>
            <div className='mx-5 text-white'>WORK</div>
            <div className={`${styles.line_under_text_grad} w-20`} />
          </div>
        ) : (
          <div className='mx-5 text-neutral-500'>WORK</div>
        )}
        {router.pathname === '/sketch-book' ? (
          <div className='flex flex-col justify-center items-center'>
            <div className='mx-5 text-white'>SKETCH BOOK</div>
            <div className={`${styles.line_under_text_grad} w-48`} />
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center'>
            <div
              className='mx-5 text-neutral-500 hover:text-white'
              onMouseEnter={() => {
                setIsOverSketchBook(true);
              }}
              onMouseLeave={() => {
                setIsOverSketchBook(false);
              }}
            >
              <Link href='/sketch-book'>SKETCH BOOK</Link>
            </div>
            {isOverSketchBook && <div className={`${styles.line_under_text_grad} w-48`} />}
          </div>
        )}
        {router.pathname === '/contact' ? (
          <div className='flex flex-col justify-center items-center'>
            <div className='mx-5 text-white'>CONTACT</div>
            <div className={`${styles.line_under_text_grad} w-24`} />
          </div>
        ) : (
          <div className='mx-5 text-neutral-500'>CONTACT</div>
        )}
      </div>
      <div className='flex justify-end items-end w-screen relative top-12'>
        <div className={styles.line_under_menu_bar_grad} />
        <div className={styles.line_under_menu_bar} />
      </div>
    </div>
  );
};

export default MenuBarTop;
