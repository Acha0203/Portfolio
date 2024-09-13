import type { MyAppState } from '@/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myAppActions } from '@/store/myApp';
import styles from '../../../styles/Home.module.scss';

const LanguageSwitch = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: MyAppState) => state.myApp.language);

  const handleClickEn = () => {
    dispatch(myAppActions.setLanguage('Japanese to English'));
  };

  const handleClickJa = () => {
    dispatch(myAppActions.setLanguage('English to Japanese'));
  };

  return (
    <div
      className={`flex justify-center items-center w-screen text-center mt-3 sm:mt-6 mb-3 sm:mb-6`}
    >
      <button
        className={`${styles.en_ja}`}
        onClick={handleClickEn}
        disabled={language === 'English'}
      >
        ENGLISH
      </button>
      <div className={styles.separator} />
      <button
        className={`${styles.en_ja}`}
        onClick={handleClickJa}
        disabled={language === 'Japanese'}
      >
        JAPANESE
      </button>
    </div>
  );
};

export default LanguageSwitch;
