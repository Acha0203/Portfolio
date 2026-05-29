import { InfoType, MyAppState } from '#/types';
import { useSelector } from 'react-redux';
import styles from '#/styles/Home.module.scss';
import { infoList } from '#/constants/information';

interface Props {
  infoListId: number;
  infoType: string;
}

const InfoForInfoPage = ({ infoListId, infoType }: Props) => {
  const language = useSelector((state: MyAppState) => state.myApp.language);
  const bilingualTexts = infoList[infoListId - 1].description;

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
        } text-neutral-400 whitespace-pre-wrap max-sm:wrap-anywhere max-sm:hyphens-auto max-sm:w-3/4 text-left ${infoType === InfoType.prizes ? (language === 'Japanese' ? 'w-80' : 'w-112.5') : 'w-3/4'} ${
          (language === 'English to Japanese' || language === 'Japanese to English') &&
          styles.vanish
        } ${(language === 'English to Japanese' || language === 'English') && styles.en} ${
          (language === 'Japanese to English' || language === 'Japanese') && styles.ja
        }`}
      >
        {(language === 'English to Japanese' || language === 'English') &&
          bilingualTexts.en.map((englishText: string, index) => (
            <div className='my-4' key={index}>
              {englishText}
            </div>
          ))}
        {(language === 'Japanese to English' || language === 'Japanese') &&
          bilingualTexts.ja.map((japaneseText: string, index) => (
            <div className='my-4' key={index}>
              {japaneseText}
            </div>
          ))}
      </div>
    </div>
  );
};

export default InfoForInfoPage;
