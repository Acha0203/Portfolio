import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchVerdure = () => {
  const n = 10;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  const draw = (p5: p5Types) => {
    p5.blendMode(p5.BLEND);
    p5.background(120, 100, 10, 0.1);
    p5.blendMode(p5.ADD);

    for (let r = 0; r < p5.TAU * n; r += 0.005) {
      const angle = r * p5.frameCount * 0.1;
      const p = r * r * n;
      const x = Math.cos(angle) * p + p5.width / 2;
      const y = Math.tan(angle) * p + p5.height;
      p5.fill(100 + (p5.frameCount % 70), 50, r);
      p5.circle(x, y, r * n);
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchVerdure;
