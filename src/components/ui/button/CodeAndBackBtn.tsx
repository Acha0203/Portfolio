import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { UI_TEXT } from '#/constants/uiText';
import { myAppActions } from '#/store/myApp';
import styles from '#/styles/Home.module.scss';

interface Props {
  url: string;
  prevPage: string;
}

const CodeAndBackBtn = ({ url, prevPage }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { from } = router.query;
  const backUrl = typeof from === 'string' && from !== '' ? `/sketch-book?page=${from}` : prevPage;

  const handleClick = () => {
    dispatch(myAppActions.setIsInTransition(true));
  };

  return (
    <div
      className={`${styles.code_back} flex justify-center w-screen text-center text-neutral-400`}
    >
      <div className={styles.code}>
        <a href={url} target='_blank' rel='noreferrer'>
          {UI_TEXT.button.code}
        </a>
      </div>
      <div className={styles.separator} />
      <div className={`${styles.code} ml-3`}>
        <Link href={backUrl} onClick={handleClick}>
          {UI_TEXT.button.back}
        </Link>
      </div>
    </div>
  );
};

export default CodeAndBackBtn;
