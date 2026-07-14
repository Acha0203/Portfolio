import type { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGE, UI_TEXT } from '#/constants/uiText';
import { workList } from '#/constants/workList';
import { myAppActions } from '#/store/myApp';
import { InfoType, type MyAppState } from '#/types';
import { getImagePath } from '#/utils/path';
import Blackout from '#/components/Blackout';
import InfoForWorkPages from '#/components/InfoForWorkPages';
import MyHead from '#/components/MyHead';
import SketchBackground from '#/components/sketch-components/SketchBackground';
import CodeAndBackBtn from '#/components/ui/button/CodeAndBackBtn';
import LanguageSwitch from '#/components/ui/button/LanguageSwitch';
import WebsiteBtn from '#/components/ui/button/WebsiteBtn';
import Menu from '#/components/ui/menu/Menu';
import styles from '#/styles/Home.module.scss';

type Props = {
  index: number;
  slug: string;
};

const WorkPage = ({ index }: Props) => {
  const dispatch = useDispatch();
  const language = useSelector((state: MyAppState) => state.myApp.language);
  const work = workList[index];

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
        title={work.title}
        thumbnailUrl={`https://acha0203.github.io/Portfolio${work.thumbnailUrl}-s.png`}
        description={work.description.en.join('')}
      />
      <div className='flex flex-col justify-center items-center relative mb-7'>
        <SketchBackground />
        <div
          className={`flex flex-col justify-start items-center absolute ${styles.work_wrapper} ${styles.fade_up}`}
        >
          <div
            className={`${styles.title_of_work} flex justify-center text-white text-center w-3/4`}
          >{`${work.title.toUpperCase()}`}</div>
          <LanguageSwitch />
          <div className='flex justify-center items-start w-full mt-8 sm:mt-10 lg:mt-12'>
            <div className='w-4/5 sm:w-1/2'>
              <a href={work.siteUrl} target='_blank' rel='noreferrer'>
                <Image
                  src={getImagePath(`${work.thumbnailUrl}.png`)}
                  alt={work.title}
                  width={work.thumbnailX}
                  height={work.thumbnailY}
                  sizes='100vw'
                  className={`${styles.work_image} w-full`}
                />
              </a>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center w-full gap-y-2 mt-10 max-sm:mt-5'>
            <InfoForWorkPages item={work} infoType={InfoType.description} />

            {work.title === 'Connect 4' && (
              <InfoForWorkPages item={work} infoType={InfoType.algorithm} />
            )}

            <InfoForWorkPages item={work} infoType={InfoType.technology} />
          </div>
          <div className='my-5'>
            <WebsiteBtn text={UI_TEXT.button.website} url={work.siteUrl} />
          </div>
          <div className='mb-10'>
            <CodeAndBackBtn url={work.codeUrl} prevPage='/work' />
          </div>
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = workList.map((work) => ({
    params: { slug: work.path.replace('/work/', '') },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params!.slug as string;
  const index = workList.findIndex((s) => s.path === `/work/${slug}`);
  return { props: { index, slug } };
};

export default WorkPage;
