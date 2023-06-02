import type p5Types from 'p5';
import dynamic from 'next/dynamic';
import useWindowSize from '@/hooks/useWindowSize';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchFlowField03 = () => {
  let pos: Array<{ x: number; y: number }> = [];
  let n = 5;
  const windowWidth = useWindowSize()[0];
  const windowHeight = useWindowSize()[1];
  const max = 1e4 + windowWidth * 5;

  for (let i = 0; i < max; i++) {
    pos.push({ x: Math.random() * windowWidth, y: Math.random() * windowHeight });
  }

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.blendMode(p5.ADD);
    p5.stroke(0, 0, 255, 10);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    drawFlowField(p5);
  };

  const mousePressed = (p5: p5Types) => {
    p5.clear();
    initPosList(p5);
    n = p5.random(5, 20);
  };

  const initPosList = (p5: p5Types) => {
    pos = [];

    for (let i = 0; i < max; i++) {
      pos.push({ x: p5.random(p5.width), y: p5.random(p5.height) });
    }
  };

  const drawFlowField = (p5: p5Types) => {
    for (let i = 0; i < pos.length; i++) {
      p5.stroke(i / 100, i / 70, 255, 10);
      p5.point(pos[i].x, pos[i].y);

      const angle = 0.5 - p5.noise((pos[i].x / p5.width) * n, (pos[i].y / p5.height) * n, n);

      const dx = Math.sin(angle);
      const dy = Math.cos(angle);

      pos[i].x += dx;
      pos[i].y += dy;

      if (pos[i].y > p5.height) continue;
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <Sketch setup={setup} draw={draw} windowResized={windowResized} mousePressed={mousePressed} />
  );
};

export default SketchFlowField03;
