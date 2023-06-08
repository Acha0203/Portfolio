import type p5Types from 'p5';
import dynamic from 'next/dynamic';
import useWindowSize from '@/hooks/useWindowSize';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchMultipleFans = () => {
  const windowWidth = useWindowSize()[0];
  let direction = -1;
  const size = windowWidth / 3;
  let x = 0;
  let y = size / 3;
  let gx = 0;
  let gy = 0;
  const fx = x;
  let fy = y;
  let count = 0;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    p5.angleMode(p5.DEGREES);
    p5.noFill();
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 0.01);
    const step = 3;
    const start = -135 + step;

    if (gx > p5.width && x > p5.width) {
      fy += size * 1.2;
      x = fx;
      y = fy;
      direction = -1;
      count++;
    }

    if (gy > p5.height && y > p5.height) {
      fy -= size * 1.2 * count + size / 2.5;
      x = fx;
      y = fy;
      direction = -1;
      count = 0;
    }

    if (p5.frameCount % 30 === 0) {
      x = gx;
      y = gy;
      direction = -direction;
    }

    const angle = start + step * (p5.frameCount % 30);

    gx = x + size * p5.cos(angle);
    gy = y + size * p5.sin(angle) * direction;
    p5.stroke((x * y) % 360, 100, 100 - (p5.frameCount % 30) * 2);
    p5.line(x, y, gx, gy);
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchMultipleFans;
