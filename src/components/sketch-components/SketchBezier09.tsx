import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

export const SketchBezier09 = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noFill();
    p5.colorMode(p5.HSL, 1);
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 0.05);
    const c1 = p5.color(0.1, 1, 1);
    const c2 = p5.color(0.9, 1, 0.05);

    for (let i = 0; i < 10; i++) {
      p5.stroke(p5.lerpColor(c1, c2, p5.noise(p5.frameCount / 100, 0 + i)));

      const x1 = p5.width * p5.noise(p5.frameCount / 100, 0 + i);
      const x2 = p5.width * p5.noise(p5.frameCount / 100, 10 + i);
      const x3 = p5.width * p5.noise(p5.frameCount / 100, 20 + i);
      const x4 = p5.width * p5.noise(p5.frameCount / 100, 30 + i);
      const y1 = p5.height * p5.noise(p5.frameCount / 100, 40 + i);
      const y2 = p5.height * p5.noise(p5.frameCount / 100, 50 + i);
      const y3 = p5.height * p5.noise(p5.frameCount / 100, 60 + i);
      const y4 = p5.height * p5.noise(p5.frameCount / 100, 70 + i);

      p5.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchBezier09;
