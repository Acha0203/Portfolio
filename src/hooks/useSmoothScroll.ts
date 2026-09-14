import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const useSmoothScroll = () => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reqIdRef = useRef<ReturnType<typeof requestAnimationFrame>>(0);
  const pathname = usePathname();
  // 初回表示時はスクロール位置をリセットせず、ページ遷移時のみリセットするために直前の pathname を保持する
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const step = (time: DOMHighResTimeStamp) => {
      lenis?.raf(time);
      reqIdRef.current = requestAnimationFrame(step);
    };

    reqIdRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(reqIdRef.current as number);
    };
  }, [lenis]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    setLenis(lenis);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (!lenis || prevPathnameRef.current === pathname) return;

    prevPathnameRef.current = pathname;
    lenis.scrollTo(0, { immediate: true });
    lenis.resize();
  }, [lenis, pathname]);
};

export default useSmoothScroll;
