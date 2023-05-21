import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

export const SketchCliffordAttractor01 = () => {
  const drawScale = 200;
  let noiseValA = 0.002;
  let noiseValB = 0.002;
  let noiseValC = 0.002;
  let noiseValD = 0.002;
  let a = -1.5;
  let b = 1.7;
  let c = -1.8;
  let d = -0.5;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.background(0);
    p5.blendMode(p5.ADD);
    p5.stroke(0, 100, 100, 100);
  };

  const draw = (p5: p5Types) => {
    p5.clear();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    let xNow = 0.1;
    let yNow = 0.1;

    if (a > -1.42 || a < -1.52) noiseValA *= -1;
    if (b > 1.75 || b < 1.65) noiseValB *= -1;
    if (c > -1.65 || c < -1.85) noiseValC *= -1;
    if (d > -0.45 || d < -0.55) noiseValD *= -1;

    for (let i = 0; i < 5e4; i++) {
      const xNext = Math.sin(a * yNow) + c * Math.cos(a * xNow);
      const yNext = Math.sin(b * xNow) + d * Math.cos(b * yNow);

      p5.point(xNext * drawScale, yNext * drawScale);

      xNow = xNext;
      yNow = yNext;
    }

    a += noiseValA;
    b += noiseValB;
    c += noiseValC;
    d += noiseValD;
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchCliffordAttractor01;
