import styles from '../styles/Home.module.scss';

const TitleOfWork = () => {
  return (
    <div>
      <div className={`${styles.title} ${styles.fade_up}`}>WORK</div>
      <div className={`${styles.description} ${styles.fade_up}`}>SHOWING WEB APPLICATIONS</div>
    </div>
  );
};

export default TitleOfWork;
