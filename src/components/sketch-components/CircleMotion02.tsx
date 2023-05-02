import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const CircleMotion02 = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    p5.angleMode(p5.DEGREES);
  };

  let angle = 0;

  const draw = (p5: p5Types) => {
    const centerX = p5.windowWidth / 2;
    const centerY = p5.windowHeight / 2;

    p5.clear();
    p5.translate(centerX, centerY);

    for (let i = 0; i < 360; i += 10) {
      p5.scale(0.9);
      p5.rotate(angle);
      const x = Math.cos(i) * 250;
      const y = Math.sin(i) * 250;
      p5.noFill();
      p5.stroke(i, 100, 100);
      p5.circle(x, y, i * 5);
    }

    angle += 0.5;
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default CircleMotion02;
