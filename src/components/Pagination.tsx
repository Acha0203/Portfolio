import React from 'react';
import styles from '#/styles/Home.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPaginationItems(currentPage: number, totalPages: number): (number | '...')[] {
  let windowStart = Math.max(1, currentPage - 1);
  let windowEnd = Math.min(totalPages, currentPage + 1);

  if (windowEnd >= totalPages - 1) {
    windowEnd = totalPages;
    windowStart = Math.max(1, totalPages - 2);
  } else if (windowStart <= 2) {
    windowStart = 1;
    windowEnd = Math.min(totalPages, 3);
  }

  const items: (number | '...')[] = [1];

  if (windowStart > 2) items.push('...');

  for (let p = windowStart; p <= windowEnd; p++) {
    if (p !== 1 && p !== totalPages) items.push(p);
  }

  if (windowEnd < totalPages - 1) items.push('...');

  items.push(totalPages);

  return items;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) return null;

  const items = getPaginationItems(currentPage, totalPages);

  return (
    <nav className={styles.pagination}>
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className={styles.pagination_btn}>
          &lt;
        </button>
      )}
      {items.map((item, i) =>
        item === '...' ? (
          <span key={`ellipsis-${i}`} className={styles.pagination_ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={item}
            disabled={item === currentPage}
            onClick={() => onPageChange(item as number)}
            className={`${styles.pagination_btn} ${item === currentPage ? styles.pagination_btn_active : ''}`}
          >
            {item}
          </button>
        ),
      )}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} className={styles.pagination_btn}>
          &gt;
        </button>
      )}
    </nav>
  );
};

export default Pagination;
