import React from 'react';
import styles from '../../../styles/Home.module.scss';

interface Props {
  url: string;
}

const WebsiteBtn: React.FC<Props> = ({ url }) => {
  return (
    <div className={`${styles.website_btn} flex justify-center w-screen text-center my-5`}>
      <div className={`${styles.website_btn_text} text-neutral-800 bg-neutral-400 p-2 pl-4 ml-2`}>
        <a href={url} target='_blank' rel='noreferrer'>
          WEBSITE
        </a>
      </div>
    </div>
  );
};

export default WebsiteBtn;
