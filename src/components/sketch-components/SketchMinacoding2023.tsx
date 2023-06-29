import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

export const SketchMinacoding2023 = () => {
  const txt1 = 'minacoding2023';
  const txt2 = 'Completed!';

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noStroke();
    p5.colorMode(p5.HSL);
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 0.05);

    display(p5, txt1, p5.height / 3, p5.height / 12, 0);
    display(p5, txt2, p5.height / 6, p5.height / 16, 180);
  };

  const display = (p5: p5Types, txt: string, radius: number, tSize: number, startHue: number) => {
    for (let i = 0; i < txt.length; i++) {
      const step = p5.TAU / txt.length;
      const x = Math.cos(step * i) * radius + p5.width / 2;
      const y = Math.sin(step * i) * radius + p5.height / 2;
      p5.push();
      p5.textSize(tSize);
      p5.translate(x, y);
      p5.rotate(step * i + p5.HALF_PI + Math.tan(p5.frameCount / 99));
      p5.fill((startHue + p5.frameCount + i * (360 / txt.length)) % 360, 100, 80);
      p5.text(txt[i], 0, 0);
      p5.pop();
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchMinacoding2023;
