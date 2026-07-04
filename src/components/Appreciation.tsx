import type { MyAppState } from '#/types';
import { useSelector } from 'react-redux';
import { LANGUAGE } from '#/constants/uiText';
import styles from '#/styles/Home.module.scss';

const Appreciation = () => {
  const language = useSelector((state: MyAppState) => state.myApp.language);

  return (
    <div
      className={`${
        styles.work_description
      } text-neutral-400 w-4/5 whitespace-pre-wrap max-sm:wrap-anywhere max-sm:hyphens-auto ${
        (language === LANGUAGE.enToJa || language === LANGUAGE.jaToEn) && styles.vanish
      } ${(language === LANGUAGE.enToJa || language === LANGUAGE.english) && styles.en} ${
        (language === LANGUAGE.jaToEn || language === LANGUAGE.japanese) && styles.ja
      }`}
    >
      {(language === LANGUAGE.enToJa || language === LANGUAGE.english) && (
        <div>
          This game was co-developed with{' '}
          <a href='https://github.com/tkwonn' target='_blank' rel='noreferrer'>
            tkwonn
          </a>{' '}
          and{' '}
          <a href='https://github.com/maxazm' target='_blank' rel='noreferrer'>
            maxazm
          </a>
          .
        </div>
      )}
      {(language === LANGUAGE.jaToEn || language === LANGUAGE.japanese) && (
        <div>
          なお、このゲームは{' '}
          <a href='https://github.com/tkwonn' target='_blank' rel='noreferrer'>
            tkwonn
          </a>{' '}
          および{' '}
          <a href='https://github.com/maxazm' target='_blank' rel='noreferrer'>
            maxazm
          </a>{' '}
          とのコラボレーションにより開発されました。
        </div>
      )}
    </div>
  );
};

export default Appreciation;
