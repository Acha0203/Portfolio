import styles from '../styles/Home.module.scss';

const TitleOfSketchBook = () => {
  return (
    <div>
      <div
        className={`${styles.title_of_sketch_book} flex justify-center w-screen text-white absolute text-center`}
      >
        SKETCH BOOK
      </div>
      <div
        className={`${styles.description_for_sketch_book_title} flex justify-center w-screen absolute text-center`}
      >
        SHOWING GENERATIVE ARTS
      </div>
    </div>
  );
};

export default TitleOfSketchBook;
