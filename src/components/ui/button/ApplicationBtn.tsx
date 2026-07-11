import Link from 'next/link';
import styles from '#/styles/Home.module.scss';

interface Props {
  text: string;
  url: string;
}

const ApplicationBtn = ({ text, url }: Props) => {
  return (
    <div className={`${styles.website_btn} flex justify-center w-screen text-center my-5 relative`}>
      <div className={`${styles.website_btn_text} text-neutral-800 bg-neutral-400 p-2 pl-5`}>
        <Link href={url}>{text}</Link>
      </div>
    </div>
  );
};

export default ApplicationBtn;
