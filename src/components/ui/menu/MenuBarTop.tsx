import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UI_TEXT } from '#/constants/uiText';
import { myAppActions } from '#/store/myApp';
import styles from '#/styles/Home.module.scss';

const MenuBarTop = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOverSketchBook, setIsOverSketchBook] = useState(false);
  const [isOverHome, setIsOverHome] = useState(false);
  const [isOverWork, setIsOverWork] = useState(false);
  const [isOverInfo, setIsOverInfo] = useState(false);

  const handleClick = () => {
    dispatch(myAppActions.setIsInTransition(true));
  };

  return (
    <div>
      <div className='flex-col fixed top-0 right-0 w-screen h-36 bg-linear-to-b from-black from-40%'>
        <div className='flex justify-end items-end w-screen relative top-12'>
          <div className={styles.line_under_menu_bar_grad} />
          <div className={styles.line_under_menu_bar} />
        </div>
        <div className='flex justify-end items-end w-screen h-12 absolute'>
          {router.pathname === '/' ? (
            <div className='flex flex-col justify-center items-center'>
              <div className='mx-5 text-white'>{UI_TEXT.nav.home}</div>
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
                <Link href='/' onClick={handleClick}>
                  {UI_TEXT.nav.home}
                </Link>
              </div>
              {isOverHome && <div className={`${styles.line_under_text_grad} w-20`} />}
            </div>
          )}
          {router.pathname === '/work' ? (
            <div className='flex flex-col justify-center items-center'>
              <div className='mx-5 text-white'>{UI_TEXT.nav.work}</div>
              <div className={`${styles.line_under_text_grad} w-20`} />
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center'>
              <div
                className='mx-5 text-neutral-500 hover:text-white'
                onMouseEnter={() => {
                  setIsOverWork(true);
                }}
                onMouseLeave={() => {
                  setIsOverWork(false);
                }}
              >
                <Link href='/work' onClick={handleClick}>
                  {UI_TEXT.nav.work}
                </Link>
              </div>
              {isOverWork && <div className={`${styles.line_under_text_grad} w-20`} />}
            </div>
          )}
          {router.pathname === '/sketch-book' ? (
            <div className='flex flex-col justify-center items-center'>
              <div className='mx-5 text-white'>{UI_TEXT.nav.sketchBook}</div>
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
                <Link href='/sketch-book' onClick={handleClick}>
                  {UI_TEXT.nav.sketchBook}
                </Link>
              </div>
              {isOverSketchBook && <div className={`${styles.line_under_text_grad} w-48`} />}
            </div>
          )}
          {router.pathname === '/info' ? (
            <div className='flex flex-col justify-center items-center'>
              <div className='mx-5 text-white'>{UI_TEXT.nav.info}</div>
              <div className={`${styles.line_under_text_grad} w-20`} />
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center'>
              <div
                className='mx-5 text-neutral-500 hover:text-white'
                onMouseEnter={() => {
                  setIsOverInfo(true);
                }}
                onMouseLeave={() => {
                  setIsOverInfo(false);
                }}
              >
                <Link href='/info' onClick={handleClick}>
                  {UI_TEXT.nav.info}
                </Link>
              </div>
              {isOverInfo && <div className={`${styles.line_under_text_grad} w-20`} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuBarTop;
