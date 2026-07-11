import type { BilingualTexts, MyAppState, WorkObj } from '#/types';
import { useSelector } from 'react-redux';
import { LANGUAGE } from '#/constants/uiText';
import { InfoType } from '#/types';
import Appreciation from '#/components/Appreciation';
import styles from '#/styles/Home.module.scss';

interface Props {
  item: WorkObj;
  infoType: string;
}

function getBilingualTexts(item: WorkObj, infoType: string): BilingualTexts {
  if (infoType === InfoType.description) return item.description;

  if (infoType === InfoType.technology) return item.technology;

  return item.supplement;
}

const InfoForWorkPages = ({ item, infoType }: Props) => {
  const language = useSelector((state: MyAppState) => state.myApp.language);
  const bilingualTexts = getBilingualTexts(item, infoType);

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
          (language === LANGUAGE.enToJa || language === LANGUAGE.jaToEn) && styles.vanish
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

      {/* Connect 4 の場合は Appreciation コンポーネントを表示する */}
      {item.title === 'Connect 4' && infoType === InfoType.description && <Appreciation />}
    </div>
  );
};

export default InfoForWorkPages;
