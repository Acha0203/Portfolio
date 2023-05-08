import Link from 'next/link';
import React from 'react';
import styles from '../../../styles/Home.module.scss';

interface Props {
  url: string;
  prevPage: string;
}

const CodeAndBackBtn: React.FC<Props> = ({ url, prevPage }) => {
  return (
    <div className={`${styles.code_back}`}>
      <div className={styles.code}>
        <a href={url} target='_blank' rel='noreferrer'>
          CODE
        </a>
      </div>
      <div className={styles.separater} />
      <div className={`${styles.code} ml-3`}>
        <Link href={prevPage}>BACK</Link>
      </div>
    </div>
  );
};

export default CodeAndBackBtn;
