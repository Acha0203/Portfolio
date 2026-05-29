import { InfoType, type MyAppState } from '#/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myAppActions } from '#/store/myApp';
import Blackout from '#/components/Blackout';
import MyHead from '#/components/MyHead';
import SketchBackground from '#/components/sketch-components/SketchBackground';
import LanguageSwitch from '#/components/ui/button/LanguageSwitch';
import LinkBtn from '#/components/ui/button/LinkBtn';
import WebsiteBtn from '#/components/ui/button/WebsiteBtn';
import Menu from '#/components/ui/menu/Menu';
import styles from '#/styles/Home.module.scss';
import InfoForInfoPage from '#/components/InfoForInfoPage';

const InfoPage = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: MyAppState) => state.myApp.language);

  useEffect(() => {
    if (language === 'English to Japanese') {
      setTimeout(() => {
        dispatch(myAppActions.setLanguage('Japanese'));
      }, 500);
    } else if (language === 'Japanese to English') {
      setTimeout(() => {
        dispatch(myAppActions.setLanguage('English'));
      }, 500);
    }
  }, [dispatch, language]);

  return (
    <>
      <MyHead
        title='Info'
        description='This page shows information about Acha Ikeda, a designer and developer in Japan.'
      />
      <div className='flex flex-col justify-center items-center relative'>
        <SketchBackground />
        <div
          className={`flex flex-col justify-start items-center absolute w-full ${styles.work_wrapper} ${styles.fade_up}`}
        >
          <div
            className={`${styles.title_of_work_top} flex justify-center text-white text-center pl-5`}
          >
            INFO
          </div>
          <LanguageSwitch />
          <div className='flex flex-col justify-center items-center w-full sm:mt-10'>
            <InfoForInfoPage infoListId={1} infoType={InfoType.background} />
            <InfoForInfoPage infoListId={2} infoType={InfoType.prizes} />
          </div>
          <div className='my-5 sm:my-10'>
            <WebsiteBtn
              text='CONTACT'
              url={
                language === 'English'
                  ? 'https://docs.google.com/forms/d/e/1FAIpQLSdl1GxKpcAaQwmxcdeeN5eMnPAbLzGT1RhYV4xgm3aESYmQQg/viewform?usp=sf_link'
                  : 'https://docs.google.com/forms/d/e/1FAIpQLSffeDpyhnvtgtsoZ7SM5c_VV0YB1xXomh4dQ-94XaxSiBEAEw/viewform?usp=sf_link'
              }
            />
          </div>
          <div className='flex justify-around items-center w-52 mt-5 mb-14 gap-5 max-sm:w-36'>
            <LinkBtn
              url='https://x.com/Acha_for_CS'
              iconUrl='https://acha0203.github.io/Portfolio/images/x-logo.svg'
              name='X'
              width={204}
              height={200}
            />
            <LinkBtn
              url='https://github.com/Acha0203'
              iconUrl='https://acha0203.github.io/Portfolio/images/github-mark-white.svg'
              name='GitHub'
              width={204}
              height={200}
            />
            <LinkBtn
              url='https://zenn.dev/acha_n'
              iconUrl='https://acha0203.github.io/Portfolio/images/zenn-logo-only-white.svg'
              name='Zenn'
              width={204}
              height={200}
            />
          </div>
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default InfoPage;
