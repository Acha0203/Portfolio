import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchRotation02 = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noStroke();
  };

  let angle = 0;
  let r = 0;

  const draw = (p5: p5Types) => {
    p5.background(0, 10);
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    for (let i = 0; i < 100; i++) {
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      p5.fill(200);
      p5.circle(x, y, 5);

      angle += 0.25;

      r = r > 250 ? 0 : r + 2;
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchRotation02;
