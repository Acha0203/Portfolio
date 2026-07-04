import { UI_TEXT } from '#/constants/uiText';
import styles from '#/styles/Home.module.scss';

const TitleOfHome = () => {
  return (
    <div>
      <div className={`${styles.my_name} ${styles.fade_up}`}>
        {UI_TEXT.page.myName}
        <br />
        <span className={styles.profession}>{UI_TEXT.page.profession}</span>
      </div>
    </div>
  );
};

export default TitleOfHome;
