import styles from '../styles/Home.module.scss';

const TitleOfHome = () => {
  return (
    <div>
      <div className={`${styles.my_name} ${styles.fade_up}`}>
        ACHA IKEDA
        <br />
        <span className={styles.profession}>DESIGNER & DEVELOPER</span>
      </div>
    </div>
  );
};

export default TitleOfHome;
