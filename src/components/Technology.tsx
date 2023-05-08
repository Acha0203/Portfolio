import type { MyAppState } from '@/types';
import React from 'react';
import { useSelector } from 'react-redux';
import { workList } from '@/consts/workList';
import styles from '../styles/Home.module.scss';

interface Props {
  index: number;
}

const Technology: React.FC<Props> = ({ index }) => {
  const isEnglish = useSelector((state: MyAppState) => state.myApp.isEnglish);

  return (
    <>
      <div className={`${styles.title_of_description} text-center text-white w-3/4 sm:w-3/5`}>
        TECHNOLOGY
      </div>
      {isEnglish ? (
        <div
          className={`${styles.work_description} text-neutral-400 text-justify w-4/5 sm:w-3/5 whitespace-pre-wrap mb-3 ${styles.en}`}
        >
          {workList[index].technology.en}
        </div>
      ) : (
        <div
          className={`${styles.work_description} text-neutral-400 text-justify w-4/5 sm:w-3/5 whitespace-pre-wrap mb-3 ${styles.jp}`}
        >
          {workList[index].technology.ja}
        </div>
      )}
    </>
  );
};

export default Technology;
