import type p5Types from 'p5';
import dynamic from 'next/dynamic';
import useWindowSize from '@/hooks/useWindowSize';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchCircleInCircle03 = () => {
  const windowWidth = useWindowSize()[0];
  const windowHeight = useWindowSize()[1];

  const circles: Array<{ x: number; y: number }> = [];
  const n = 24;

  for (let y = -6; y < n; y++) {
    for (let x = -6; x < n; x++) {
      const tx = (windowWidth / (n - 1)) * x;
      const ty = (windowHeight / (n - 1)) * y;

      circles.push({ x: tx, y: ty });
    }
  }

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noStroke();
    p5.colorMode(p5.HSB);
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 0.01);
    p5.fill(p5.frameCount % 360, 80, 100);

    for (const c of circles) {
      const v = p5.createVector(p5.mouseX - c.x, p5.mouseY - c.y);
      v.setMag(p5.min(v.mag(), 100));
      const tx = c.x + v.x;
      const ty = c.y + v.y;

      p5.circle(tx, ty, 10);
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchCircleInCircle03;
