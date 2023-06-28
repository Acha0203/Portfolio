import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchRotation06 = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  let t = 0;

  const draw = (p5: p5Types) => {
    const radius = p5.width / 2;

  p5.background(0, 0.1);
  p5.translate(p5.width / 2, p5.height / 2);

  for (let d = 0; d < 360; d += 9) {
    const radian = d + p5.frameCount / p5.width;
    p5.scale(0.93);
    p5.rotate(t);
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    const size = Math.sin(p5.frameCount / 30 - d * 9) ** 10 * d;
    p5.fill((p5.frameCount + d) % 360, 100, 100);
    p5.circle(x, y, size);
  }

  t += 0.005;
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchRotation06;
