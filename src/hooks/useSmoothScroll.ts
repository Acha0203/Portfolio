import Lenis from 'lenis';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const useSmoothScroll = () => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reqIdRef = useRef<ReturnType<typeof requestAnimationFrame>>(0);
  const router = useRouter();

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
    if (!lenis) return;

    const handleRouteChangeComplete = () => {
      lenis.scrollTo(0, { immediate: true });
      lenis.resize();
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [lenis, router.events]);
};

export default useSmoothScroll;
