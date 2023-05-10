import type { RefObject } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { myAppActions } from '@/store/myApp';
import useThrottle from './useThrottle';

const useVewportTop = (ref?: RefObject<HTMLElement>) => {
  const dispatch = useDispatch();

  const handleScroll = useThrottle(() => {
    if (!ref?.current) return;

    const clientRect = ref?.current?.getBoundingClientRect();
    dispatch(myAppActions.setViewportTop(clientRect.top));
  }, 100); // 100msに一度実行

  useEffect(() => {
    if (!ref?.current) return;

    // マウント時にも実行
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, ref]);
};

export default useVewportTop;
