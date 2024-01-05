import type { MyAppState } from '@/types';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { workList } from '@/constants/workList';
import { myAppActions } from '@/store/myApp';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchBackground from '@/components/sketch-components/SketchBackground';
import Technology from '@/components/Technology';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import LanguageSwitch from '@/components/ui/button/LanguageSwitch';
import WebsiteBtn from '@/components/ui/button/WebsiteBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '../../styles/Home.module.scss';

const CountdownTimerPage = () => {
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
        title={workList[3].title}
        thumbnailUrl={workList[3].thumbnailUrl}
        description={workList[3].description.en}
      />
      <div className={`flex-col justify-center items-center relative ${styles.vh_200}`}>
        <SketchBackground />
        <div
          className={`flex flex-col justify-start items-center absolute ${styles.work_wrapper} ${styles.fade_up}`}
        >
          <div
            className={`${styles.title_of_work} flex justify-center text-white text-center w-3/4`}
          >{`${workList[3].title.toUpperCase()}`}</div>
          <LanguageSwitch />
          <div className={`flex justify-center items-start w-screen mt-8 sm:mt-10 lg:mt-12`}>
            <div className='w-4/5 sm:w-1/2'>
              <Image
                src={`${workList[3].thumbnailUrl}.png`}
                alt={workList[3].title}
                width={workList[3].thumbnailX}
                height={workList[3].thumbnailY}
                sizes='100vw'
                className={`${styles.work_image} w-full`}
              />
            </div>
          </div>
          <div className={`flex flex-col justify-center items-center w-screen sm:mt-10`}>
            <div
              className={`${styles.title_of_description} text-center text-white w-3/4 my-6 sm:my-10`}
            >
              DESCRIPTION
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
                workList[3].description.en}
              {(language === 'Japanese to English' || language === 'Japanese') &&
                workList[3].description.ja}
            </div>
            <Technology index={3} />
          </div>
          <div className='my-5'>
            <WebsiteBtn text='WEBSITE' url={`${workList[3].siteUrl}`} />
          </div>
          <div className='mb-10'>
            <CodeAndBackBtn url={`${workList[3].codeUrl}`} prevPage='/work' />
          </div>
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default CountdownTimerPage;
