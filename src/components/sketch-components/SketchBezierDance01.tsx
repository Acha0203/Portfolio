import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noFill();
    p5.colorMode(p5.HSL, 1);
  };

  p5.draw = () => {
    p5.background(0, 0.05);
    const c1 = p5.color(0.05, 1, 1);
    const c2 = p5.color(0.5, 0.5, 0.05);

    for (let i = 0; i < 10; i++) {
      p5.stroke(p5.lerpColor(c1, c2, p5.noise(p5.frameCount / 100, 0 + i)));

      const x1 = p5.width * p5.noise(p5.frameCount / 100, 0 + i);
      const x2 = p5.width * p5.noise(p5.frameCount / 100, 10 + i);
      const x3 = p5.width * p5.noise(p5.frameCount / 100, 20 + i);
      const x4 = p5.width * p5.noise(p5.frameCount / 100, 30 + i);
      const y1 = p5.height * p5.noise(p5.frameCount / 100, 40 + i);
      const y2 = p5.height * p5.noise(p5.frameCount / 100, 50 + i);
      const y3 = p5.height * p5.noise(p5.frameCount / 100, 60 + i);
      const y4 = p5.height * p5.noise(p5.frameCount / 100, 70 + i);

      p5.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

export default function SketchBezierDance01() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
