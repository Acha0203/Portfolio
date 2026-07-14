import styles from '#/styles/Home.module.scss';

const CloseBtn = () => {
  return (
    <div className={`${styles.close} flex flex-col justify-center items-center cursor-pointer`}>
      <span className={styles.close_line_frame}>
        <span className={styles.close_line}></span>
        <span className={styles.close_line}></span>
      </span>
    </div>
  );
};

export default CloseBtn;
