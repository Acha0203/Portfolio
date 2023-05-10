import styles from '../styles/Home.module.scss';

const TitleOfSketchBook = () => {
  return (
    <div>
      <div
        className={`${styles.title} flex justify-center w-screen text-white absolute text-center`}
      >
        SKETCH BOOK
      </div>
      <div className={`${styles.description} flex justify-center w-screen absolute text-center`}>SHOWING GENERATIVE ARTS</div>
    </div>
  );
};

export default TitleOfSketchBook;
