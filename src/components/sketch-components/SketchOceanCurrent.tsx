import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch: Sketch = (p5) => {
  let t = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  p5.draw = () => {
    const w = p5.width / 2;
    const h = p5.height / 2;
    const fishSize = Math.max(p5.width, p5.height) / 30;

    t += 0.01;
    p5.blendMode(p5.BLEND);
    p5.background(240, 255, 20, 0.1);
    p5.blendMode(p5.ADD);

    for (let r = 0; r < fishSize; r += 0.1) {
      p5.fill(200 + r, 8 * r, 8 * r, 0.2);
      p5.ellipse(
        p5.tan(r * 2 + t) * w + w,
        p5.sin(t + r / p5.noise(3, 9)) * p5.sin(r * 5 + t) * h + h,
        fishSize,
        fishSize / 3,
      );
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchOceanCurrent() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
