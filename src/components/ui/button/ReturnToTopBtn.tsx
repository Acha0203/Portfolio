// import styles from '../../../styles/Home.module.scss';

const ReturnToTopBtn = () => {
  const returnToTop = () => {
    const element = document.getElementById('top-of-page');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='fixed bottom-0 right-0 z-50'>
      <div className='absolute bottom-5 right-5'>
        <button className={`text-white bg-red-500 w-10 h-10`} onClick={returnToTop}>
          ↑
        </button>
      </div>
    </div>
  );
};

export default ReturnToTopBtn;
