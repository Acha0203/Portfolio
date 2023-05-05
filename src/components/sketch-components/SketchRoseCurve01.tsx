import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

export const SketchRoseCurve01 = () => {
  const radius = 250;
  const n = 10;
  const d = 4;
  let x = 0;
  let y = 0;
  let bx = 0;
  let by = 0;
  let range = 0;
  let angle = 0;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.strokeWeight(1);
    p5.background(0, 10);
    p5.angleMode(p5.DEGREES);
    p5.colorMode(p5.HSB, 100);
  };

  const draw = (p5: p5Types) => {
    p5.translate(p5.width / 2, p5.height / 2);
    p5.stroke(0, 0, p5.millis() % 100);

    // ここがバラ曲線の数式
    // radius をかけてあげないとかなり小さな絵になってしまう
    range = radius * p5.sin(angle * (n / d));
    bx = x;
    by = y;
    x = range * p5.cos(angle);
    y = range * p5.sin(angle);
    p5.line(bx, by, x, y);
    angle += 28;
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchRoseCurve01;
