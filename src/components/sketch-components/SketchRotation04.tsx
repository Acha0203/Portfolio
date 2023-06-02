import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchRotation04 = () => {
  const n = 30;
  const s = 1.1;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    p5.colorMode(p5.HSB);
    p5.noFill();
  };

  const draw = (p5: p5Types) => {
    p5.clear();
    p5.normalMaterial();
    p5.translate(-1 * (p5.width / 2), -1 * (p5.height / 2), -250);

    for (let i = 0; i < n; i++) {
      p5.scale(s);
      p5.translate(i * 2, i * 2, 0);
      p5.rotateX(p5.frameCount * 0.25);
      p5.rotateY(p5.frameCount * 0.25);
      p5.plane(50);
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchRotation04;
