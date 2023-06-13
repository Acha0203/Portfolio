import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchTentacles = () => {
  let angle = 0;
  let length = 0;
  let x = 0;
  let y = 0;
  let z = 0;

  const drawSphere = (p5: p5Types, n: number, m: number) => {
    for (let r = 0; r < Math.PI * 2; r += Math.PI / n) {
      angle = r + p5.noise(p5.frameCount / 90) * 0.2;
      length = p5.noise(p5.frameCount / 90) * m;
      x = Math.cos(angle) * length;
      y = Math.sin(angle) * length;
      z = Math.tan(angle) * length;
      p5.push();
      p5.fill(50 + angle * 30, 100 + angle * 100, 100 + angle * 150);
      p5.translate(x, y, z);
      p5.sphere(m / 30);
      p5.pop();
    }
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(canvasParentRef);
    p5.noStroke();
  };

  const draw = (p5: p5Types) => {
    p5.clear();
    p5.directionalLight(255, 255, 255, 0, 1, 0);
    p5.directionalLight(150, 100, 100, 0, -1, 0);

    for (let i = 1; i < 10; i++) {
      p5.rotateZ(p5.frameCount * 0.005);
      drawSphere(p5, i * 10, i * 100);
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchTentacles;
