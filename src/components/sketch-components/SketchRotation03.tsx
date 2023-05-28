import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchRotation03 = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    p5.colorMode(p5.HSB);
    p5.noFill();
  };

  const n = 20;
  const s = 1.1;
  let angle = 0;

  const draw = (p5: p5Types) => {
    p5.background(0, 0.1);
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    for (let i = 0; i < n; i++) {
      p5.scale(s);
      p5.rotate(angle);
      p5.stroke(i * 10, i * 5, i * 5);
      p5.quad(38, 31, 0, 30, 69, 63, 30, 76);
    }

    angle += 0.5;
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchRotation03;
