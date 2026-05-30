import type { MyAppState } from '#/types';
import { useDispatch, useSelector } from 'react-redux';
import { myAppActions } from '#/store/myApp';
import { LANGUAGE, UI_TEXT } from '#/constants/uiText';
import styles from '#/styles/Home.module.scss';

const LanguageSwitch = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: MyAppState) => state.myApp.language);

  const handleClickEn = () => {
    dispatch(myAppActions.setLanguage(LANGUAGE.jaToEn));
  };

  const handleClickJa = () => {
    dispatch(myAppActions.setLanguage(LANGUAGE.enToJa));
  };

  return (
    <div
      className={`flex justify-center items-center w-screen text-center mt-3 sm:mt-6 mb-3 sm:mb-6`}
    >
      <button
        className={`${styles.en_ja}`}
        onClick={handleClickEn}
        disabled={language === LANGUAGE.english}
      >
        {UI_TEXT.button.english}
      </button>
      <div className={styles.separator} />
      <button
        className={`${styles.en_ja}`}
        onClick={handleClickJa}
        disabled={language === LANGUAGE.japanese}
      >
        {UI_TEXT.button.japanese}
      </button>
    </div>
  );
};

export default LanguageSwitch;
