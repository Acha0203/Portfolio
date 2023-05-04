import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchHappyNewYear2023 = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 0.03);

    const colorValue = p5.frameCount % 360;
    const x = p5.random(p5.windowWidth);
    const y = p5.random(p5.windowHeight);
    const size = 12 + p5.random(30);
    p5.textSize(size);
    p5.fill(colorValue, 100, 100);
    p5.text('Happy', x, y);
    p5.fill(colorValue + 10, 100, 100);
    p5.text('New Year!', x + size, y + size);
    p5.fill(colorValue + 20, 100, 100);
    p5.text('2023', x + size * 2, y + size * 2);
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchHappyNewYear2023;
