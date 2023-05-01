import styles from '../../styles/Home.module.scss';

const MenuBar = () => {
  return (
    <div className='flex-col'>
      <div className='flex justify-end items-end w-screen h-16'>
        <div className='mx-5 text-neutral-400'>HOME</div>
        <div className='mx-5 text-neutral-400'>PROFILE</div>
        <div className='mx-5 text-neutral-400'>WORK</div>
        <div className='mx-5 text-neutral-400'>SKETCH BOOK</div>
        <div className='mx-5 text-neutral-400'>CONTACT</div>
      </div>
      <div className='flex justify-end items-end w-screen h-2'>
        <div className={styles.line_under_menu_bar_grad} />
        <div className={styles.line_under_menu_bar} />
      </div>
    </div>
  );
};

export default MenuBar;
