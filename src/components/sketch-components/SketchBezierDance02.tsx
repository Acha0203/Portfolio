import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

export const SketchBezierDance02 = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noStroke();
    p5.colorMode(p5.HSL);
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 0.1);

    for (let i = 0; i < 10; i++) {
      const fn = (m: number, n: number) => m * p5.noise(p5.frameCount / 100, n + i);

      const x1 = fn(p5.width, 0);
      const x2 = fn(p5.width, 10);
      const x3 = fn(p5.width, 20);
      const x4 = fn(p5.width, 30);
      const y1 = fn(p5.height, 40);
      const y2 = fn(p5.height, 50);
      const y3 = fn(p5.height, 60);
      const y4 = fn(p5.height, 70);

      const steps = 20;

      for (let j = 1; j <= steps; j++) {
        p5.fill(p5.map(p5.frameCount % 360, 0, 360, -150, 210) + (j + i) * 5, 90, 60, 0.05 * j);
        const p = j / steps;
        const x = p5.bezierPoint(x1, x2, x3, x4, p);
        const y = p5.bezierPoint(y1, y2, y3, y4, p);
        p5.circle(x, y, j);
      }
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchBezierDance02;
