import type { MyAppState } from '@/types';
import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';

const Blackout = () => {
  const isInTransition = useSelector((state: MyAppState) => state.myApp.isInTransition);

  return (
    <>
      {isInTransition && (
        <div
          className={`${styles.overlay} flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black`}
        ></div>
      )}
    </>
  );
};

export default Blackout;
