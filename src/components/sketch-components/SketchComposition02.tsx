import type p5Types from 'p5';
import dynamic from 'next/dynamic';
import useWindowSize from '@/hooks/useWindowSize';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchComposition02 = () => {
  const windowHeight = useWindowSize()[1];

  let circle1: {
    x: number;
    y: number;
    r: number;
    angle: number;
    speed: number;
  } = { x: 0, y: windowHeight / 2, r: 50, angle: 0, speed: 0.08 };

  let circle2: {
    x: number;
    y: number;
    r: number;
    angle: number;
    speed: number;
  } = {
    x: windowHeight / 4,
    y: windowHeight / 2,
    r: 100,
    angle: 0,
    speed: 0.03,
  };

  const hist: Array<{ x: number; y: number }> = [];

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    p5.noFill();

    circle1 = {
      x: 0,
      y: p5.height / 2,
      r: 50,
      angle: 0,
      speed: 0.08,
    };

    circle2 = {
      x: p5.height / 4,
      y: p5.height / 2,
      r: 100,
      angle: 0,
      speed: 0.03,
    };
  };

  const draw = (p5: p5Types) => {
    p5.clear();

    circle1.angle += circle1.speed;
    circle2.angle += circle2.speed;

    const x1 = circle1.x + Math.cos(circle1.angle) * circle1.r;
    const y1 = circle1.y + Math.sin(circle1.angle) * circle1.r;
    const x2 = circle2.x + Math.cos(circle2.angle) * circle2.r;
    const y2 = circle2.y + Math.sin(circle2.angle) * circle2.r;

    const v = p5.createVector(x2 - x1, y2 - y1);
    v.setMag(x1 + p5.width / 2);
    hist.push({ x: x1 + v.x, y: y1 + v.y });
    if (hist.length > 100) {
      hist.shift();
    }

    for (let i = 0; i < hist.length - 1; i++) {
      p5.circle(hist[i].x, hist[i].y, i);
      p5.stroke(i, i, i);
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchComposition02;
