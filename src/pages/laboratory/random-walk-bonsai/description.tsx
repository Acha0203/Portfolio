import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { laboratoryList } from '#/constants/laboratoryList';
import { LANGUAGE, UI_TEXT } from '#/constants/uiText';
import { myAppActions } from '#/store/myApp';
import { InfoType, type MyAppState } from '#/types';
import { getImagePath } from '#/utils/path';
import Blackout from '#/components/Blackout';
import InfoForWorkPages from '#/components/InfoForWorkPages';
import MyHead from '#/components/MyHead';
import SketchBackground from '#/components/sketch-components/SketchBackground';
import ApplicationBtn from '#/components/ui/button/ApplicationBtn';
import CodeAndBackBtn from '#/components/ui/button/CodeAndBackBtn';
import LanguageSwitch from '#/components/ui/button/LanguageSwitch';
import Menu from '#/components/ui/menu/Menu';
import styles from '#/styles/Home.module.scss';

const RandomWalkBonsaiDescription = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: MyAppState) => state.myApp.language);
  const laboratory = laboratoryList[0];

  useEffect(() => {
    if (language === LANGUAGE.enToJa) {
      setTimeout(() => {
        dispatch(myAppActions.setLanguage(LANGUAGE.japanese));
      }, 500);
    } else if (language === LANGUAGE.jaToEn) {
      setTimeout(() => {
        dispatch(myAppActions.setLanguage(LANGUAGE.english));
      }, 500);
    }
  }, [dispatch, language]);

  return (
    <>
      <MyHead
        title={laboratory.title}
        thumbnailUrl={`https://acha0203.github.io/Portfolio${laboratory.thumbnailUrl}-s.png`}
        description={laboratory.description.en.join('')}
      />
      <div className='flex flex-col justify-center items-center relative mb-7'>
        <SketchBackground />
        <div
          className={`flex flex-col justify-start items-center absolute ${styles.work_wrapper} ${styles.fade_up}`}
        >
          <div
            className={`${styles.title_of_work} flex justify-center text-white text-center w-3/4`}
          >{`${laboratory.title.toUpperCase()}`}</div>
          <LanguageSwitch />
          <div className='flex justify-center items-start w-full mt-8 sm:mt-10 lg:mt-12'>
            <div className='w-4/5 sm:w-1/2'>
              <Link href={laboratory.siteUrl}>
                <Image
                  src={getImagePath(`${laboratory.thumbnailUrl}.png`)}
                  alt={laboratory.title}
                  width={laboratory.thumbnailX}
                  height={laboratory.thumbnailY}
                  sizes='100vw'
                  className={`${styles.work_image} w-full`}
                />
              </Link>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center w-full gap-y-2 mt-10 max-sm:mt-5'>
            <InfoForWorkPages item={laboratory} infoType={InfoType.description} />
            <InfoForWorkPages item={laboratory} infoType={InfoType.technology} />
          </div>
          <div className='my-5'>
            <ApplicationBtn text={UI_TEXT.button.application} url={laboratory.siteUrl} />
          </div>
          <div className='mb-10'>
            <CodeAndBackBtn url={laboratory.codeUrl} prevPage='/laboratory' />
          </div>
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default RandomWalkBonsaiDescription;
