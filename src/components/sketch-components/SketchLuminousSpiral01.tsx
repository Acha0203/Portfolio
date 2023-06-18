import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchLuminousSpiral01 = () => {
  let d = 1;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  const draw = (p5: p5Types) => {
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.05);
    p5.blendMode(p5.ADD);

    for (let r = 0; r < p5.TAU; r += p5.PI / 360) {
      const angle = r * p5.frameCount * 0.03;
      const p = (r * r * p5.height) / 100;
      const x = Math.cos(angle * d) * p + p5.width / 2;
      const y = Math.sin(angle * d) * p + p5.height / 2;
      const c = p5.color(p5.frameCount % 360, 70 + r, r * r);
      const b = p5.blue(c);
      p5.fill(c);
      p5.circle(x, y, b / 4);
    }

    d = -d;
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchLuminousSpiral01;
