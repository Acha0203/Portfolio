import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noStroke();
  };

  let angle = 0;
  let r = 0;

  p5.draw = () => {
    p5.background(0, 10);
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    for (let i = 0; i < 100; i++) {
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      p5.fill(200);
      p5.circle(x, y, 5);

      angle += 0.25;

      r = r > 250 ? 0 : r + 2;
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchRotation02() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
