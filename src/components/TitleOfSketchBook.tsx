import styles from '../styles/Home.module.scss';

const TitleOfSketchBook = () => {
  return (
    <div>
      <div className={`${styles.title} ${styles.fade_up}`}>SKETCH BOOK</div>
      <div className={`${styles.description} ${styles.fade_up}`}>SHOWING GENERATIVE ARTS</div>
    </div>
  );
};

export default TitleOfSketchBook;
