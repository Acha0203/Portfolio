import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  let d = 1;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  p5.draw = () => {
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.05);
    p5.blendMode(p5.ADD);

    for (let r = 0; r < p5.TAU; r += p5.PI / 360) {
      const angle = r * p5.frameCount * 0.03;
      const p = (r * r * p5.height) / 100;
      const x = Math.cos(angle * d) * p + p5.width / 2;
      const y = Math.sin(angle * d) * p + p5.height / 2;
      const c = p5.color(p5.frameCount % 360, 70 + r, r * r);
      const b = p5.blue(c);
      p5.fill(c);
      p5.circle(x, y, b / 4);
    }

    d = -d;
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchLuminousSpiral01() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
