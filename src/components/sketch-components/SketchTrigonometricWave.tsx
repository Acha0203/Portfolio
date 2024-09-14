import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  let t = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  p5.draw = () => {
    t += 0.01;
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.1);
    p5.blendMode(p5.ADD);

    for (let r = 0; r < 15; r += 0.005) {
      p5.fill(233, 100, 100, 0.2);
      p5.circle(
        Math.tan(r * 2 + t) * 300 + p5.width / 5,
        Math.sin(r * 7 + t + r / p5.noise(2, 6)) * Math.sin(r * 2 + t + r) * 200 +
          p5.height / 2 +
          Math.sin(r * 2 + t + r),
        20 * Math.sin(r * 9 - t * 9),
      );
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchTrigonometricWave() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
