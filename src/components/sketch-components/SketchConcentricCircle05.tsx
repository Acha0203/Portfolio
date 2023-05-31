import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchConcentricCircle05 = () => {
  const colors = ['#22577a', '#3873a5', '#5799cc', '#8099ed', '#a7ccf9'];
  const n = 50;
  const circles: Array<{
    x: number;
    y: number;
    diameter: number;
    maxSize: number;
    c1: string;
    c2: string;
  }> = [];

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noFill();
  };

  const draw = (p5: p5Types) => {
    p5.background(14, 57, 92, 10);

    for (let i = 0; i < n; i++) {
      circles.push({
        x: Math.floor(p5.random(0, p5.width)),
        y: Math.floor(p5.random(0, p5.height)),
        diameter: 2,
        maxSize: Math.floor(p5.random(50, 300)),
        c1: p5.random(colors),
        c2: p5.random(colors),
      });
    }

    for (let i = 0; i < n; i++) {
      const m = p5.map(circles[i].diameter, 0, circles[i].maxSize, 0, 1);
      const c3 = p5.lerpColor(p5.color(circles[i].c1), p5.color(circles[i].c2), m);

      circles[i].diameter =
        circles[i].diameter > circles[i].maxSize
          ? 0
          : circles[i].diameter + (p5.frameCount % circles[i].maxSize);

      p5.stroke(c3);
      p5.circle(circles[i].x, circles[i].y, circles[i].diameter);
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchConcentricCircle05;
