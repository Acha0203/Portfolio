import { UI_TEXT } from '#/constants/uiText';
import styles from '#/styles/Home.module.scss';

const TitleOfSketchBook = () => {
  return (
    <div>
      <div
        className={`${styles.title_of_sketch_book} flex justify-center w-screen text-white absolute text-center`}
      >
        {UI_TEXT.nav.sketchBook}
      </div>
      <div
        className={`${styles.description_for_sketch_book_title} flex justify-center w-screen absolute text-center`}
      >
        {UI_TEXT.page.sketchBookSubtitle}
      </div>
    </div>
  );
};

export default TitleOfSketchBook;
