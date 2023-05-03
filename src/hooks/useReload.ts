import { useEffect } from 'react';

const useReload = (): void => {
  useEffect(() => {
    const reload = (): void => {
      location.reload();
    };

    window.addEventListener('resize', reload);

    return () => {
      window.removeEventListener('resize', reload);
    };
  }, []);
};

export default useReload;
