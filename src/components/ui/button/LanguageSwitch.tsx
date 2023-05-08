import type { MyAppState } from '@/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myAppActions } from '@/store/myApp';
import styles from '../../../styles/Home.module.scss';

const LanguageSwitch = () => {
  const dispatch = useDispatch();
  const isEnglish = useSelector((state: MyAppState) => state.myApp.isEnglish);

  const handleClick = () => {
    dispatch(myAppActions.toggleIsEnglish());
  };

  return (
    <div
      className={`${styles.en_ja} flex justify-center items-center w-screen text-center mt-3 sm:mt-6`}
    >
      <div
        className={`${isEnglish ? styles.selected_lang : styles.language}`}
        onClick={handleClick}
      >
        ENGLISH
      </div>
      <div className={styles.separater} />
      <div
        className={`${!isEnglish ? styles.selected_lang : styles.language}`}
        onClick={handleClick}
      >
        JAPANESE
      </div>
    </div>
  );
};

export default LanguageSwitch;
