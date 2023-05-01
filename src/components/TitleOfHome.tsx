import styles from '../styles/Home.module.scss';

const TitleOfHome = () => {
  return (
    <div>
      <div className={`${styles.my_name} ${styles.fade_up}`}>ACHA IKEDA</div>
      <div className={`${styles.profession} ${styles.fade_up}`}>DESIGNER & DEVELOPER</div>
    </div>
  );
};

export default TitleOfHome;
