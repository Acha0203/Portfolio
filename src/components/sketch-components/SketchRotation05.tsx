import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchRotation05 = () => {
  let a = 0;
  const s = 0.9;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.rectMode(p5.CENTER);
    p5.noFill();
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 10);
    p5.translate(p5.width / 2, p5.height / 2);

    for (let i = 0; i < 25; i++) {
      p5.scale(s);
      p5.stroke(0, i * 10, i * 10);

      rotateRect(p5, 0, 0);
      rotateRect(p5, -p5.width / 3, -p5.height / 3);
      rotateRect(p5, p5.width / 3, -p5.height / 3);
      rotateRect(p5, p5.width / 3, p5.height / 3);
      rotateRect(p5, -p5.width / 3, p5.height / 3);
    }

    a += p5.PI / 72;
  };

  const rotateRect = (p5: p5Types, x: number, y: number) => {
    p5.push();
    p5.translate(x, y);
    p5.rotate(a);
    p5.rect(0, 0, p5.width, p5.height);
    p5.pop();
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchRotation05;
