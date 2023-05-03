import styles from '../../styles/Home.module.scss';

const HamburgerMenu = () => {
  return (
    <div className='h-screen w-screen absolute top-0'>
      <nav className={styles.sp_menu}>
        <ul>
          <li>HOME</li>
          <li>PROFILE</li>
          <li>WORK</li>
          <li>SKETCH BOOK</li>
          <li>CONTACT</li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
