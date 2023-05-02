import { useState } from 'react';
import styles from '../../styles/Home.module.scss';

const HamburgerBtn = () => {
  const [isClosed, setIsClosed] = useState(false);

  const handleClick = () => {
    isClosed ? setIsClosed(false) : setIsClosed(true);
  };

  return (
    <div className='absolute top-0 right-0'>
      {isClosed ? (
        <button
          type='button'
          onClick={handleClick}
          className={`${styles.menu_btn} ${styles.is_closed}`}
        >
          <span className={styles.menu_btn_bar_frame}>
            <span className={styles.menu_btn_bar_frame_first_bar}></span>
            <span className={styles.menu_btn_bar_frame_second_bar}></span>
            <span className={styles.menu_btn_bar_frame_third_bar}></span>
          </span>
        </button>
      ) : (
        <button type='button' onClick={handleClick} className={styles.menu_btn}>
          <span className={styles.menu_btn_bar_frame}>
            <span className={styles.menu_btn_bar_frame_first_bar}></span>
            <span className={styles.menu_btn_bar_frame_second_bar}></span>
            <span className={styles.menu_btn_bar_frame_third_bar}></span>
          </span>
        </button>
      )}
    </div>
  );
};

export default HamburgerBtn;
