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

const TaskManagementAppPage = () => {
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
        title={workList[2].title}
        thumbnailUrl={workList[2].thumbnailUrl}
        description={workList[2].description.en}
      />
      <div className={`flex-col justify-center items-center relative ${styles.vh_220}`}>
        <SketchBackground />
        <div
          className={`flex flex-col justify-start items-center absolute ${styles.work_wrapper} ${styles.fade_up}`}
        >
          <div
            className={`${styles.title_of_work} flex justify-center text-white text-center w-3/4`}
          >{`${workList[2].title.toUpperCase()}`}</div>
          <LanguageSwitch />
          <div className={`flex justify-center items-start w-screen mt-8 sm:mt-10 lg:mt-12`}>
            <div className='w-4/5 sm:w-1/2'>
              <Image
                src={`${workList[2].thumbnailUrl}.png`}
                alt={workList[2].title}
                width={workList[2].thumbnailX}
                height={workList[2].thumbnailY}
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
                workList[2].description.en}
              {(language === 'Japanese to English' || language === 'Japanese') &&
                workList[2].description.ja}
            </div>
            <Technology index={2} />
          </div>
          <div className='my-5'>
            <WebsiteBtn text='WEBSITE' url={`${workList[2].siteUrl}`} />
          </div>
          <div className='mb-10'>
            <CodeAndBackBtn url={`${workList[2].codeUrl}`} prevPage='/work' />
          </div>
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default TaskManagementAppPage;
