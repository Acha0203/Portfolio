import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchPerlinNoise04 = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noStroke();
    p5.blendMode(p5.DIFFERENCE);
  };

  const draw = (p5: p5Types) => {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        const G = Math.sin(p5.TAU * p5.noise(i * 0.01, j * 0.01, p5.frameCount * 0.04));
        const B = Math.sin(p5.TAU * p5.noise(i * 0.005, j * 0.005, p5.frameCount * 0.04));

        p5.fill(0, G * 200, B * 200);
        p5.rect(
          (p5.windowWidth / 100) * i,
          (p5.windowHeight / 100) * j,
          p5.windowHeight / 100,
          p5.windowHeight / 100,
        );
      }
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchPerlinNoise04;
