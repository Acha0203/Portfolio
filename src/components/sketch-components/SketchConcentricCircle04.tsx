import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchConcentricCircle04 = () => {
  const array: Array<{ x: number; y: number; d: number }> = [];

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noFill();
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 10);
    const X = p5.random(p5.width);
    const Y = p5.random(p5.width);
    for (let i = 0; i < p5.random(p5.width); i++) {
      array[i] = { x: X, y: Y, d: i + (p5.frameCount % 10) };
    }
    array.forEach((e) => {
      p5.stroke(p5.random(p5.width));
      p5.strokeWeight(p5.random(1, 8));
      p5.arc(e.x, e.y, e.d, e.d, p5.random(p5.TAU), p5.random(p5.TAU));
    });
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchConcentricCircle04;
