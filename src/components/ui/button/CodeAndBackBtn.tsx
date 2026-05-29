import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { myAppActions } from '#/store/myApp';
import styles from '#/styles/Home.module.scss';

interface Props {
  url: string;
  prevPage: string;
}

const CodeAndBackBtn: React.FC<Props> = ({ url, prevPage }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const backUrl = router.query.from ? `/sketch-book?page=${router.query.from}` : prevPage;

  const handleClick = () => {
    dispatch(myAppActions.setIsInTransition(true));
  };

  return (
    <div
      className={`${styles.code_back} flex justify-center w-screen text-center text-neutral-400`}
    >
      <div className={styles.code}>
        <a href={url} target='_blank' rel='noreferrer'>
          CODE
        </a>
      </div>
      <div className={styles.separator} />
      <div className={`${styles.code} ml-3`}>
        <Link href={backUrl} onClick={handleClick}>
          BACK
        </Link>
      </div>
    </div>
  );
};

export default CodeAndBackBtn;
