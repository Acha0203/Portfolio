import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchConcentricCircle04 = () => {
  const arcs: Array<{ x: number; y: number; diameter: number; sWidth: number; colorCode: string }> =
    [];
  const colors = [
    '#d8f3dc',
    '#b7e4c7',
    '#95d5b2',
    '#74c69d',
    '#52b788',
    '#40916c',
    '#2d6a4f',
    '#1b4332',
    '#081c15',
  ];

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noFill();
  };

  const draw = (p5: p5Types) => {
    p5.background(8, 28, 21, 30);
    const px = p5.random(p5.width);
    const py = p5.random(p5.height);
    const n = p5.random(p5.height / 50);
    let d = p5.random(1, 20);

    for (let i = 0; i < n; i++) {
      const s = p5.random(1, 20);
      arcs[i] = { x: px, y: py, diameter: d, sWidth: s, colorCode: colors[i % 9] };
      d += s * 2;
    }

    arcs.forEach((a) => {
      p5.stroke(p5.color(a.colorCode + '80'));
      p5.strokeWeight(a.sWidth);
      p5.arc(a.x, a.y, a.diameter, a.diameter, p5.random(p5.TAU), p5.random(p5.TAU));
    });
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchConcentricCircle04;
