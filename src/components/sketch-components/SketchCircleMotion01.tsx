import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchCircleMotion01 = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    p5.noFill();
  };

  let angle = 0;

  const draw = (p5: p5Types) => {
    const centerX = p5.windowWidth / 2;
    const centerY = p5.windowHeight / 2;

    p5.clear();
    p5.translate(centerX, centerY);

    for (let i = 0; i < 10; i++) {
      p5.rotate(angle);
      const w = p5.map(Math.sin(angle + 0.2 * i), -1, 1, 1, 20);
      p5.stroke(i * 36, 100, 100);
      p5.circle(w * 20, w * 5, 5);
      p5.ellipse(0, 0, w * 20, w * 5);
    }

    angle += 0.02;
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchCircleMotion01;
