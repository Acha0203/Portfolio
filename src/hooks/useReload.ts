import { useEffect } from 'react';

const useReload = (): void => {
  useEffect(() => {
    const reloadWindow = (): void => {
      window.location.reload();
    };

    window.addEventListener('resize', reloadWindow);

    return () => {
      window.removeEventListener('resize', reloadWindow);
    };
  }, []);
};

export default useReload;
