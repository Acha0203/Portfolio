import { useSelector } from 'react-redux';
import styles from '#/styles/Home.module.scss';
import { MyAppState } from '#/types';

const Appreciation = () => {
  const language = useSelector((state: MyAppState) => state.myApp.language);

  return (
    <div
      className={`${
        styles.work_description
      } text-neutral-400 w-4/5 whitespace-pre-wrap max-sm:wrap-anywhere max-sm:hyphens-auto ${
        (language === 'English to Japanese' || language === 'Japanese to English') && styles.vanish
      } ${(language === 'English to Japanese' || language === 'English') && styles.en} ${
        (language === 'Japanese to English' || language === 'Japanese') && styles.ja
      }`}
    >
      {(language === 'English to Japanese' || language === 'English') && (
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
      {(language === 'Japanese to English' || language === 'Japanese') && (
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
