import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchSymmetricalRuler03 = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 0.05);

    drawCircle(p5, 6, 200, 0.1);
    drawCircle(p5, 10, 350, 2);
    drawCircle(p5, 16, 450, 0.5);
  };

  const drawCircle = (p5: p5Types, n: number, m: number, o: number) => {
    let direction = 1;

    p5.fill((p5.frameCount + n * 3) % 360, 80, 100);

    for (let r = 0; r < p5.TAU; r += p5.PI / n) {
      const angle = r + Math.sin(p5.frameCount / 50) * o * direction;
      const length = p5.noise(p5.frameCount / 100) * m;
      const x = Math.cos(angle) * length + p5.width / 2;
      const y = Math.sin(angle) * length + p5.height / 2;

      p5.circle(x, y, length / 20);
      direction = -direction;
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchSymmetricalRuler03;
