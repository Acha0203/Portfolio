import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchTrigonometricWave = () => {
  let t = 0;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  const draw = (p5: p5Types) => {
    t += 0.01;
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.1);
    p5.blendMode(p5.ADD);

    for (let r = 0; r < 15; r += 0.005) {
      p5.fill(233, 100, 100, 0.2);
      p5.circle(
        Math.tan(r * 2 + t) * 300 + p5.width / 5,
        Math.sin(r * 7 + t + r / p5.noise(2, 6)) * Math.sin(r * 2 + t + r) * 200 +
          p5.height / 2 +
          Math.sin(r * 2 + t + r),
        20 * Math.sin(r * 9 - t * 9),
      );
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchTrigonometricWave;
