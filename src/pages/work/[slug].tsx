import { InfoType, type MyAppState } from '@/types';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { workList } from '@/constants/workList';
import { myAppActions } from '@/store/myApp';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import SketchBackground from '@/components/sketch-components/SketchBackground';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import LanguageSwitch from '@/components/ui/button/LanguageSwitch';
import WebsiteBtn from '@/components/ui/button/WebsiteBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '@/styles/Home.module.scss';
import InfoForWorkPages from '@/components/InfoForWorkPages';
import { GetStaticPaths, GetStaticProps } from 'next';

type Props = {
  index: number;
  slug: string;
};

const WorkPage = ({ index, slug }: Props) => {
  const dispatch = useDispatch();
  const language = useSelector((state: MyAppState) => state.myApp.language);
  const work = workList[index];

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
        title={work.title}
        thumbnailUrl={work.thumbnailUrl}
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
          <div className='flex justify-center items-start w-screen mt-8 sm:mt-10 lg:mt-12'>
            <div className='w-4/5 sm:w-1/2'>
              <Image
                src={`${work.thumbnailUrl}.png`}
                alt={work.title}
                width={work.thumbnailX}
                height={work.thumbnailY}
                sizes='100vw'
                className={`${styles.work_image} w-full`}
              />
            </div>
          </div>
          <div className='flex flex-col justify-center items-center w-full gap-y-2 mt-10 max-sm:mt-5'>
            <InfoForWorkPages workListId={work.id} infoType={InfoType.description} />

            {work.title === 'Connect 4' && (
              <InfoForWorkPages workListId={work.id} infoType={InfoType.algorithm} />
            )}

            <InfoForWorkPages workListId={work.id} infoType={InfoType.technology} />
          </div>
          <div className='my-5'>
            <WebsiteBtn text='WEBSITE' url={`${work.siteUrl}`} />
          </div>
          <div className='mb-10'>
            <CodeAndBackBtn url={`${work.codeUrl}`} prevPage='/work' />
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
