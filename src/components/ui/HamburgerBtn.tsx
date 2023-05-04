import type { MyAppState } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { myAppActions } from '@/store/myApp';
import styles from '../../styles/Home.module.scss';

const HamburgerBtn = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: MyAppState) => state.myApp.isOpen);

  const handleClick = () => {
    dispatch(myAppActions.toggleIsOpen());
  };

  return (
    <div className='fixed top-0 right-0'>
      <div className='absolute top-2 right-2'>
        <div onClick={handleClick} className={`${styles.hamburger} ${isOpen && styles.is_closed}`}>
          <span className={styles.hamburger_line_frame}>
            <span className={styles.hamburger_line}></span>
            <span className={styles.hamburger_line}></span>
            <span className={styles.hamburger_line}></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HamburgerBtn;
