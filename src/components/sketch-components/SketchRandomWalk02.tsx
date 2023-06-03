import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchRandomWalk02 = () => {
  let walker = { x: 0, y: 0 };
  const s = 8;
  const colors = [
    '#618355',
    '#77986a',
    '#87a97c',
    '#a5c99a',
    '#bfe1b9',
    '#d9f5db',
    '#bfe1b9',
    '#a5c99a',
    '#87a97c',
    '#77986a',
  ];

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noFill();
    p5.strokeWeight(1);
    setWalker(p5);
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 10);

    for (let i = 0; i < p5.width; i++) {
      walk(p5, walker, i);
    }

    setWalker(p5);
  };

  const setWalker = (p5: p5Types) => {
    const x = p5.random(p5.width);
    const y = p5.random(p5.height);

    walker = { x, y };
  };

  const walk = (p5: p5Types, walker: { x: number; y: number }, i: number) => {
    const x = walker.x + s * p5.random([-1, 1]);
    const y = walker.y + s * p5.random([-1, 1]);

    p5.stroke(colors[i % 10]);
    p5.line(x, y, walker.x, walker.y);

    walker.x = x;
    walker.y = y;
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchRandomWalk02;
