import React from 'react';
import styles from '../../../styles/Home.module.scss';

interface Props {
  text: string;
  url: string;
}

const WebsiteBtn: React.FC<Props> = ({ text, url }) => {
  return (
    <div
      className={`${styles.website_btn} flex justify-center w-screen text-center my-5 relative right-2`}
    >
      <div className={`${styles.website_btn_text} text-neutral-800 bg-neutral-400 p-2 pl-5`}>
        <a href={url} target='_blank' rel='noreferrer'>
          {text}
        </a>
      </div>
    </div>
  );
};

export default WebsiteBtn;
