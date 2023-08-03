import type { MyAppState } from '@/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoList } from '@/consts/information';
import { myAppActions } from '@/store/myApp';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchBackground from '@/components/sketch-components/SketchBackground';
import LanguageSwitch from '@/components/ui/button/LanguageSwitch';
import LinkBtn from '@/components/ui/button/LinkBtn';
import WebsiteBtn from '@/components/ui/button/WebsiteBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../styles/Home.module.scss';

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
      <div className={`flex flex-col justify-center items-center relative ${styles.vh_340}`}>
        <SketchBackground />
        <div
          className={`flex flex-col justify-start items-center absolute ${styles.work_wrapper} ${styles.fade_up}`}
        >
          <div
            className={`${styles.title_of_work_top} flex justify-center text-white text-center pl-5`}
          >
            INFO
          </div>
          <LanguageSwitch />
          <div className='flex flex-col justify-center items-center sm:mt-10'>
            <div
              className={`${styles.title_of_description} text-center text-white w-3/4 my-5 sm:mb-10`}
            >
              BACKGROUND
            </div>
            <div
              className={`${
                styles.work_description
              } text-neutral-400 text-justify w-3/4 sm:w-3/5 mb-6 sm:mb-10 whitespace-pre-wrap ${
                (language === 'English to Japanese' || language === 'Japanese to English') &&
                styles.vanish
              } ${(language === 'English to Japanese' || language === 'English') && styles.en} ${
                (language === 'Japanese to English' || language === 'Japanese') && styles.ja
              }`}
            >
              {(language === 'English to Japanese' || language === 'English') &&
                infoList[0].description.en}
              {(language === 'Japanese to English' || language === 'Japanese') &&
                infoList[0].description.ja}
            </div>
            <div
              className={`${
                styles.title_of_description
              } text-center text-white w-3/4 my-5 sm:mb-10 ${
                (language === 'English to Japanese' || language === 'Japanese to English') &&
                styles.vanish
              } ${(language === 'English to Japanese' || language === 'English') && styles.en} ${
                (language === 'Japanese to English' || language === 'Japanese') && styles.ja
              }`}
            >
              BOOTH
            </div>
            <div
              className={`${
                styles.work_description
              } text-neutral-400 text-justify w-3/4 sm:w-3/5 mb-6 sm:mb-10 ${
                (language === 'English to Japanese' || language === 'Japanese to English') &&
                styles.vanish
              } ${(language === 'English to Japanese' || language === 'English') && styles.en} ${
                (language === 'Japanese to English' || language === 'Japanese') && styles.ja
              }`}
            >
              <p className='text-center whitespace-pre-wrap'>
                <a
                  href='https://www.lancers.jp/profile/HiroyaWebStudio'
                  target='_blank'
                  rel='noreferrer'
                >
                  {(language === 'English to Japanese' || language === 'English') &&
                    `Hiroya Web Studio in Lancers
(Japanese only)`}
                  {(language === 'Japanese to English' || language === 'Japanese') &&
                    `Hiroya Web Studio (Lancers)`}
                </a>
              </p>
              <p className='text-center whitespace-pre-wrap mt-7'>
                <a href='https://coconala.com/users/3587217' target='_blank' rel='noreferrer'>
                  {(language === 'English to Japanese' || language === 'English') &&
                    `Hiroya Web Studio in coconala
(Japanese only)`}
                  {(language === 'Japanese to English' || language === 'Japanese') &&
                    `Hiroya Web Studio (coconala)`}
                </a>
              </p>
            </div>
            <div
              className={`${
                styles.title_of_description
              } text-center text-white w-3/4 my-5 sm:mb-10 ${
                (language === 'English to Japanese' || language === 'Japanese to English') &&
                styles.vanish
              } ${(language === 'English to Japanese' || language === 'English') && styles.en} ${
                (language === 'Japanese to English' || language === 'Japanese') && styles.ja
              }`}
            >
              PRIZES
            </div>
            <div
              className={`${
                styles.work_description
              } text-neutral-400 text-justify w-3/4 sm:w-3/5 mb-6 sm:mb-10 whitespace-pre-wrap ${
                (language === 'English to Japanese' || language === 'Japanese to English') &&
                styles.vanish
              } ${(language === 'English to Japanese' || language === 'English') && styles.en} ${
                (language === 'Japanese to English' || language === 'Japanese') && styles.ja
              }`}
            >
              {(language === 'English to Japanese' || language === 'English') &&
                infoList[1].description.en}
              {(language === 'Japanese to English' || language === 'Japanese') &&
                infoList[1].description.ja}
            </div>
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
          <div className='flex justify-around items-center w-1/3 mt-5 mb-14'>
            <LinkBtn
              url='https://twitter.com/Acha_for_CS'
              iconUrl='https://acha0203.github.io/Portfolio/images/Twitter_Logo_white.svg'
              name='Twitter'
              width={1034}
              height={842}
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
