import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { workList } from '@/consts/workList';
import styles from '../styles/Home.module.scss';

const ShowcaseOfWork = () => {
  return (
    <div
      className={`${styles.showcase_wrapper} flex flex-wrap justify-center items-center w-full absolute`}
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
                <Image
                  src={`${work.thumbnailUrl}-s.png`}
                  alt={work.title}
                  width={250}
                  height={250}
                />
                <div
                  className={`${styles.showcase_image_text} flex justify-center items-center absolute top-0 text-white text-center text-2xl`}
                >
                  {work.title.toUpperCase()}
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
