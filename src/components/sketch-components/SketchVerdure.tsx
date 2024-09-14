import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  const n = 10;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  p5.draw = () => {
    p5.blendMode(p5.BLEND);
    p5.background(120, 100, 10, 0.1);
    p5.blendMode(p5.ADD);

    for (let r = 0; r < p5.TAU * 5; r += 0.005) {
      const angle = r * p5.frameCount * 0.1;
      const p = r * r * n;
      const x = Math.cos(angle) * p + p5.width / 2;
      const y = Math.tan(angle) * p + p5.height;
      p5.fill(100 + (p5.frameCount % 70), 50, r);
      p5.circle(x, y, r * n);
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchVerdure() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
