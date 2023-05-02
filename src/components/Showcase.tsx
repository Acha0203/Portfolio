import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { sketchList } from '@/consts/sketchList';
import styles from '../styles/Home.module.scss';

const Showcase = () => {
  return (
    <div className={`${styles.fade_up} flex justify-center items-center w-full absolute top-80`}>
      {sketchList.map(
        (work: {
          id: number;
          title: string;
          thumbnailUrl: string;
          codeUrl: string;
          path: string;
          description: string;
        }) => {
          return (
            <div key={work.id} className={`${styles.showcase}`}>
              <Link href={work.path}>
                <Image src={work.thumbnailUrl} alt={work.title} width={250} height={250} />
              </Link>
            </div>
          );
        },
      )}
    </div>
  );
};

export default Showcase;
