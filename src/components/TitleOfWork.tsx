import styles from '../styles/Home.module.scss';

const TitleOfWork = () => {
  return (
    <div>
      <div
        className={`${styles.title_of_work_top} flex justify-center w-screen text-white absolute text-center`}
      >
        WORK
      </div>
      <div
        className={`${styles.description_for_work_title} flex justify-center w-screen absolute text-center top-32 sm:top-56 lg:top-60`}
      >
        SHOWING WEB APPLICATIONS
      </div>
    </div>
  );
};

export default TitleOfWork;
