import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  let t = 0;

  p5.draw = () => {
    const w = p5.width / 2;
    const h = p5.height / 2;
    const particleSize = Math.max(p5.width, p5.height) / 30;

    t += 0.01;
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.1);
    p5.blendMode(p5.ADD);

    p5.translate(p5.width * 0.01 * p5.sin(p5.PI * t), p5.height * 0.01 * p5.sin(p5.PI * t));
    p5.rotate(t);

    for (let r = 0; r < particleSize * 2; r += 0.1) {
      p5.fill((p5.frameCount % 200) + r * 2, r * 2, r * 2, 0.2);
      p5.ellipse(
        p5.tan(r * 2 + t) * w + w,
        p5.sin(t + r / p5.noise(3, 9)) * p5.sin(r * 5 + t) * h + h,
        particleSize,
        particleSize / 3,
      );
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchRotation07() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
