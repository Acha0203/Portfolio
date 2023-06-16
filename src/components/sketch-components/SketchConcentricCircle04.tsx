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
    '#fbf8cc',
    '#fde4cf',
    '#ffcfd2',
    '#f1c0e8',
    '#cfbaf0',
    '#a3c4f3',
    '#90dbf4',
    '#8eecf5',
    '#98f5e1',
    '#b9fbc0',
  ];

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noFill();
  };

  const draw = (p5: p5Types) => {
    p5.background(137, 157, 255, 30);
    const px = p5.random(p5.width);
    const py = p5.random(p5.height);
    const n = p5.random(p5.height / 50);
    let d = p5.random(1, 20);

    for (let i = 0; i < n; i++) {
      const s = p5.random(1, 20);
      arcs[i] = { x: px, y: py, diameter: d, sWidth: s, colorCode: colors[i % 10] };
      d += s * 2;
    }

    arcs.forEach((a) => {
      p5.stroke(p5.color(a.colorCode));
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
