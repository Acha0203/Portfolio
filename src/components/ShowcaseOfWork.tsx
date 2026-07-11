import type { WorkObj } from '#/types';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '#/utils/path';
import styles from '#/styles/Home.module.scss';

const IMAGE_WIDTH = 250;
const IMAGE_HEIGHT = 250;

interface showcaseProps {
  itemList: WorkObj[];
}

const ShowcaseOfWork: NextPage<showcaseProps> = ({ itemList }) => {
  const reversedItemList: WorkObj[] = [...itemList].reverse();

  return (
    <div
      className={`${styles.showcase_wrapper} flex flex-wrap justify-center items-center w-full absolute px-5`}
    >
      <div className={`${styles.showcase_grid} w-full`}>
        {reversedItemList.map(
          (item: {
            id: number;
            title: string;
            thumbnailUrl: string;
            codeUrl: string;
            path: string;
          }) => {
            return (
              <div key={item.id} className={`${styles.showcase} relative`}>
                <Link href={item.path}>
                  <div
                    className={`${styles.showcase_image} flex justify-center items-center relative`}
                  >
                    <Image
                      src={getImagePath(`${item.thumbnailUrl}-s.png`)}
                      alt={item.title}
                      width={IMAGE_WIDTH}
                      height={IMAGE_HEIGHT}
                      sizes='100vw'
                      className='w-full h-full'
                    />
                    <div
                      className={`${styles.showcase_image_text} flex justify-center items-center absolute text-white text-center`}
                    >
                      {item.title.toUpperCase()}
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
