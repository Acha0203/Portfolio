import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchSymmetricalRuler02 = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    p5.noFill();
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 0.03);
    let direction = 5;
    for (let r = 0; r < p5.TAU; r += p5.PI / 8) {
      const a = r + (Math.sin(p5.frameCount / 50) / 3) * direction;
      const l = p5.noise(p5.frameCount / 100) * 300;
      const x = Math.cos(a) * l + p5.windowWidth / 2;
      const y = Math.sin(a) * l + p5.windowHeight / 2;
      p5.stroke((p5.frameCount % 300) + direction, 50 + direction, 100);
      p5.circle(x, y, p5.frameCount % 300);
      direction = -direction;
    }
  };
  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchSymmetricalRuler02;
