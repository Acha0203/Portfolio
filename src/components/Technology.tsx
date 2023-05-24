import type { MyAppState } from '@/types';
import React from 'react';
import { useSelector } from 'react-redux';
import { workList } from '@/consts/workList';
import styles from '../styles/Home.module.scss';

interface Props {
  index: number;
}

const Technology: React.FC<Props> = ({ index }) => {
  const language = useSelector((state: MyAppState) => state.myApp.language);

  return (
    <div className='flex flex-col justify-center items-center w-3/4 sm:w-3/5'>
      <div
        className={`${
          styles.title_of_description
        } text-center text-white w-full mb-6 sm:mb-10 ${
          (language === 'English to Japanese' || language === 'Japanese to English') &&
          styles.vanish
        } ${(language === 'English to Japanese' || language === 'English') && styles.en} ${
          (language === 'Japanese to English' || language === 'Japanese') && styles.ja
        }`}
      >
        TECHNOLOGY
      </div>
      <div
        className={`${
          styles.work_description
        } text-neutral-400 text-justify w-full mb-6 sm:mb-10 whitespace-pre-wrap ${
          (language === 'English to Japanese' || language === 'Japanese to English') &&
          styles.vanish
        } ${(language === 'English to Japanese' || language === 'English') && styles.en} ${
          (language === 'Japanese to English' || language === 'Japanese') && styles.ja
        }`}
      >
        {(language === 'English to Japanese' || language === 'English') &&
          workList[index].technology.en}
        {(language === 'Japanese to English' || language === 'Japanese') &&
          workList[index].technology.ja}
      </div>
    </div>
  );
};

export default Technology;
