import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchScreensaver = () => {
  let t = 0;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noStroke();
    p5.colorMode(p5.HSB);
  };

  const draw = (p5: p5Types) => {
    t += 0.5;
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.5);
    p5.blendMode(p5.ADD);
    for (let y = 0; y <= p5.height; y += 9) {
      for (let x = 0; x <= p5.width; x += 9) {
        const hue = (p5.noise(x, y, t) * p5.width) % 270;
        const tang = p5.tan(p5.noise(x / p5.width, y / p5.height) * 99 + t);
        p5.fill(hue, hue - 80, hue, tang);
        p5.circle(x, y, 5 / tang);
      }
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchScreensaver;
