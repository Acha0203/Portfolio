import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { workList } from '@/consts/workList';
import styles from '../styles/Home.module.scss';

const ShowcaseOfWork = () => {
  return (
    <div
      className={`${styles.showcase_wrapper} flex flex-wrap justify-center items-center w-full absolute px-5`}
    >
      {workList.map(
        (work: {
          id: number;
          title: string;
          thumbnailUrl: string;
          codeUrl: string;
          path: string;
        }) => {
          return (
            <div key={work.id} className={`${styles.showcase} relative`}>
              <Link href={work.path}>
                <div
                  className={`${styles.showcase_image} flex justify-center items-center relative`}
                >
                  <Image
                    src={`${work.thumbnailUrl}-s.png`}
                    alt={work.title}
                    width={250}
                    height={250}
                    sizes='100vw'
                    className='w-full h-full'
                  />
                  <div
                    className={`${styles.showcase_image_text} flex justify-center items-center absolute text-white text-center`}
                  >
                    {work.title.toUpperCase()}
                  </div>
                </div>
              </Link>
            </div>
          );
        },
      )}
    </div>
  );
};

export default ShowcaseOfWork;
