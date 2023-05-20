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
    <div className={`flex justify-center items-center w-screen text-center mt-3 sm:mt-6`}>
      <button className={`${styles.en_ja}`} onClick={handleClick} disabled={isEnglish}>
        ENGLISH
      </button>
      <div className={styles.separater} />
      <button className={`${styles.en_ja}`} onClick={handleClick} disabled={!isEnglish}>
        JAPANESE
      </button>
    </div>
  );
};

export default LanguageSwitch;
