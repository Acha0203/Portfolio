import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchFireworks01 = () => {
  const n = 9;
  let fireworks: Array<{ x: number; y: number; size: number }> = [];

  const initFireworks = (p5: p5Types): void => {
    fireworks = [];

    for (let i = 0; i < n; i++) {
      fireworks.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        size: p5.random(p5.width / 10, p5.width / 2),
      });
    }
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    p5.noStroke();
    initFireworks(p5);
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 0.05);

    for (let i = 0; i < n; i++) {
      for (let r = 0; r < p5.TAU; r += p5.PI / n) {
        const length = p5.random(p5.frameCount % fireworks[i].size);
        const x = Math.cos(r) * length + fireworks[i].x;
        const y = Math.sin(r) * length + fireworks[i].y;
        p5.fill((p5.frameCount + length) % 360, 80, 90);
        p5.circle(x, y, length / 20);
      }
    }

    if (p5.frameCount % 90 <= 0) initFireworks(p5);
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchFireworks01;
