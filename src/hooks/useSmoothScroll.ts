import Lenis from '@studio-freight/lenis';
import { useEffect, useRef, useState } from 'react';

const useSmoothScroll = () => {
  const [lenis, setLenis] = useState<Lenis | null>();
  const reqIdRef = useRef<ReturnType<typeof requestAnimationFrame>>();

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
};

export default useSmoothScroll;
