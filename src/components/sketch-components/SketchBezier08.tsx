import type p5Types from 'p5';
import dynamic from 'next/dynamic';
import useWindowSize from '@/hooks/useWindowSize';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

export const SketchBezier08 = () => {
  const windowWidth = useWindowSize()[0];
  const windowHeight = useWindowSize()[1];

  const x2 = windowWidth / 3;
  const x3 = windowWidth - x2;
  let y2 = 0;
  let y3 = windowHeight;
  let D = 1;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noFill();
    p5.stroke(255);
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 10);

    if (y2 >= p5.windowHeight || y2 <= 0) {
      D *= -1;
    }
    y2 += (p5.frameCount % 5) * D;
    y3 -= (p5.frameCount % 5) * D;

    p5.bezier(0, p5.height, x2, y2, x3, y3, p5.width, 0);

    p5.circle(x2, y2, 20);
    p5.circle(x3, y3, 20);
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchBezier08;
