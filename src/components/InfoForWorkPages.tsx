import { BilingualTexts, InfoType, MyAppState, WorkObj } from '#/types';
import React from 'react';
import { useSelector } from 'react-redux';
import { workList } from '#/constants/workList';
import { LANGUAGE } from '#/constants/uiText';
import styles from '#/styles/Home.module.scss';
import Appreciation from '#/components/Appreciation';

interface Props {
  workListId: number;
  infoType: string;
}

function getBilingualTexts(infoType: string, workData: WorkObj): BilingualTexts {
  if (infoType === InfoType.description) return workData.description;

  if (infoType === InfoType.technology) return workData.technology;

  return workData.supplement;
}

const InfoForWorkPages: React.FC<Props> = ({ workListId, infoType }) => {
  const language = useSelector((state: MyAppState) => state.myApp.language);
  const bilingualTexts = getBilingualTexts(infoType, workList[workListId - 1]);

  return (
    <div className='flex flex-col justify-center items-center w-3/4 max-sm:w-11/12'>
      <div
        className={`${styles.title_of_description} text-center text-white w-full mt-6 mb-4 max-sm:mb-0 max-sm:mt-4`}
      >
        {infoType.toUpperCase()}
      </div>
      <div
        className={`${
          styles.work_description
        } text-neutral-400 w-4/5 whitespace-pre-wrap max-sm:wrap-anywhere max-sm:hyphens-auto ${infoType === InfoType.technology ? 'text-center max-sm:text-left' : 'text-left'} ${
          (language === LANGUAGE.enToJa || language === LANGUAGE.jaToEn) &&
          styles.vanish
        } ${(language === LANGUAGE.enToJa || language === LANGUAGE.english) && styles.en} ${
          (language === LANGUAGE.jaToEn || language === LANGUAGE.japanese) && styles.ja
        }`}
      >
        {(language === LANGUAGE.enToJa || language === LANGUAGE.english) &&
          bilingualTexts.en.map((englishText: string, index) => (
            <div className='my-4' key={index}>
              {englishText}
            </div>
          ))}
        {(language === LANGUAGE.jaToEn || language === LANGUAGE.japanese) &&
          bilingualTexts.ja.map((japaneseText: string, index) => (
            <div className='my-4' key={index}>
              {japaneseText}
            </div>
          ))}
      </div>

      {/* Connect 4 (workListId === 7) の場合は Appreciation コンポーネントを表示する */}
      {workListId === 7 && infoType === InfoType.description && <Appreciation />}
    </div>
  );
};

export default InfoForWorkPages;
