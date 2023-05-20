import Image from 'next/image';
import styles from '../../../styles/Home.module.scss';

const TwitterBtn = () => {
  return (
    <>
      <a href='https://twitter.com/Acha_for_CS' target='_blank' rel='noreferrer'>
        <Image
          src='https://acha0203.github.io/Portfolio/images/Twitter_Logo_white.svg'
          alt='Twitter button'
          width={1034}
          height={842}
          sizes='100vw'
          className={`${styles.twitter_btn} brightness-50 hover:brightness-100`}
        />
      </a>
    </>
  );
};

export default TwitterBtn;
