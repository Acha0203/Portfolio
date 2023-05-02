import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const Rotation01 = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    p5.angleMode(p5.DEGREES);
  };

  const scale = 0.9;
  let rotation = 0;

  const draw = (p5: p5Types) => {
    p5.clear();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    for (let angle = 0; angle < 360; angle += 10) {
      p5.scale(scale);
      p5.rotate(rotation);
      const x = Math.cos(angle) * 200;
      const y = Math.sin(angle) * 200;
      p5.fill(angle + 1, 100, 100);
      p5.circle(x, y, 10);
    }

    rotation += 0.5;
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default Rotation01;
