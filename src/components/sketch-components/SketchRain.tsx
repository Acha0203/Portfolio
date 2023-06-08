import type p5Types from 'p5';
import dynamic from 'next/dynamic';
import useWindowSize from '@/hooks/useWindowSize';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchMultipleFans = () => {
  const windowWidth = useWindowSize()[0];
  const windowHeight = useWindowSize()[1];
  const maxSize = 300;
  const n = Math.floor(windowWidth * windowHeight * (6 / 1e5));
  let drawRipples = false;
  let ripples: Array<{ x: number; y: number; w: number; size: number }> = [];

  const initRipples = () => {
    ripples = [];

    for (let i = 0; i < n; i++) {
      ripples.push({
        x: Math.floor(Math.random() * windowWidth),
        y: Math.floor(Math.random() * windowHeight),
        w: 2,
        size: Math.floor(Math.random() * (300 - 50) + 50),
      });
    }
  };

  initRipples();

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noFill();
    initRipples();
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 10);
    p5.stroke(p5.frameCount % 100, 100 + (p5.frameCount % 100), 240);

    for (let i = 0; i < n; i++) {
      p5.ellipse(ripples[i].x, ripples[i].y - 300 + (p5.frameCount % 100) * 3, 2, 2);
    }

    if (p5.frameCount % 100 === 0) {
      drawRipples = true;
    }

    if (drawRipples) {
      for (let i = 0; i < n; i++) {
        ripples[i].w =
          ripples[i].w > ripples[i].size ? 0 : ripples[i].w + (p5.frameCount % ripples[i].size);
        p5.ellipse(ripples[i].x, ripples[i].y, ripples[i].w, ripples[i].w / 2);
      }
    }

    if (p5.frameCount % (100 + maxSize) === 0) {
      initRipples();
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchMultipleFans;
