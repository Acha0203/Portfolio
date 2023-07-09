import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchLuminousSpiral03 = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  const draw = (p5: p5Types) => {
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.1);
    p5.blendMode(p5.ADD);

    for (let d = 0; d < 360; d += 18) {
      const size = Math.sin(p5.frameCount / 30 - d) * (p5.width / 60);
      for (let i = 1; i < 4; i++) {
        const radius = (((p5.width / 4) * (p5.frameCount % (p5.width / 4))) / 99) * i;
        const radian = d + p5.frameCount / 99 + p5.HALF_PI * i;
        const x = Math.cos(radian) * radius + p5.width / 2;
        const y = Math.sin(radian) * radius + p5.height / 2;
        p5.fill(p5.frameCount % 360, 50, 1);
        for (let l = 0; l < p5.HALF_PI; l += 0.01) {
          p5.ellipse(x, y, Math.tan(l) * size, Math.tan(p5.HALF_PI - l) * size);
        }
      }
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchLuminousSpiral03;
