import type { WorkObj } from '#/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { workList } from '#/constants/workList';
import styles from '#/styles/Home.module.scss';

const IMAGE_WIDTH = 250;
const IMAGE_HEIGHT = 250;

const ShowcaseOfWork = () => {
  const reversedWorkList: WorkObj[] = [...workList].reverse();

  return (
    <div
      className={`${styles.showcase_wrapper} flex flex-wrap justify-center items-center w-full absolute px-5`}
    >
      <div className={`${styles.showcase_grid} w-full`}>
        {reversedWorkList.map(
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
                      width={IMAGE_WIDTH}
                      height={IMAGE_HEIGHT}
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
    </div>
  );
};

export default ShowcaseOfWork;
