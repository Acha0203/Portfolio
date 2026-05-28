import type { WorkObj } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import React from 'react';
import { sketchList } from '@/constants/sketchList';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.scss';

const ITEMS_PER_PAGE = 12;

const Showcase = () => {
  const router = useRouter();
  const reversedSketchList: WorkObj[] = [...sketchList].reverse();
  const totalPages = Math.ceil(reversedSketchList.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(Number(router.query.page) || 1, 1), totalPages);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleItems = reversedSketchList.slice(start, start + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    router.push({ pathname: '/sketch-book', query: { page } });
  };

  return (
    <div
      className={`${styles.showcase_wrapper} flex flex-col justify-center items-center w-full absolute px-5`}
    >
      <div key={currentPage} className={`${styles.fade_up} flex flex-wrap justify-center items-center w-full`}>
        {visibleItems.map((work: WorkObj) => (
          <div key={work.id} className={`${styles.showcase} relative`}>
            <Link href={`${work.path}?from=${currentPage}`}>
              <div className={`${styles.showcase_image} flex justify-center items-center relative`}>
                <Image
                  src={work.thumbnailUrl}
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
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Showcase;
