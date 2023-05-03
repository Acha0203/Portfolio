import { useState } from 'react';
import styles from '../../styles/Home.module.scss';

const HamburgerBtn = () => {
  const [isClosed, setIsClosed] = useState(false);

  const handleClick = () => {
    isClosed ? setIsClosed(false) : setIsClosed(true);
  };

  return (
    <div className='absolute top-2 right-2'>
      <div onClick={handleClick} className={`${styles.hamburger} ${isClosed && styles.is_closed}`}>
        <span className={styles.hamburger_line_frame}>
          <span className={styles.hamburger_line}></span>
          <span className={styles.hamburger_line}></span>
          <span className={styles.hamburger_line}></span>
        </span>
      </div>
    </div>
  );
};

export default HamburgerBtn;
