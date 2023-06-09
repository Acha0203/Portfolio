import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchPsychedelicCurve = () => {
  const p1 = { x: -100, y: 100 };
  const p2 = { x: 0, y: -100 };
  const p3 = { x: 100, y: 100 };
  const p4 = { x: 200, y: -100 };
  let r = 0;

  const drawCurve = (
    p5: p5Types,
    n: number,
    i: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number,
  ) => {
    p5.stroke((p5.frameCount % 360) + i * 5 * n, 90, i * 5);
    p5.curve(x1, y1, x2, y2, x3, y3, x4, y4);
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noFill();
    p5.colorMode(p5.HSB);
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 0.1);
    p5.translate(p5.width / 2, p5.height / 2);

    for (let i = 0; i < 20; i++) {
      p5.rotate(r);
      drawCurve(p5, 0, i, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
      drawCurve(p5, 1, i, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x + 100, p1.y);
      drawCurve(p5, 2, i, p3.x, p3.y, p4.x, p4.y, p4.x + 100, p1.y, p4.x + 200, p2.y);
    }
    r += 0.002;
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchPsychedelicCurve;
