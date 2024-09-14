import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noStroke();
    p5.colorMode(p5.HSL);
  };

  p5.draw = () => {
    p5.background(0, 0.1);

    for (let i = 0; i < 10; i++) {
      const fn = (m: number, n: number) => m * p5.noise(p5.frameCount / 100, n + i);

      const x1 = fn(p5.width, 0);
      const x2 = fn(p5.width, 10);
      const x3 = fn(p5.width, 20);
      const x4 = fn(p5.width, 30);
      const y1 = fn(p5.height, 40);
      const y2 = fn(p5.height, 50);
      const y3 = fn(p5.height, 60);
      const y4 = fn(p5.height, 70);

      const steps = 20;

      for (let j = 1; j <= steps; j++) {
        p5.fill(p5.map(p5.frameCount % 360, 0, 360, -150, 210) + (j + i) * 5, 90, 60, 0.05 * j);
        const p = j / steps;
        const x = p5.bezierPoint(x1, x2, x3, x4, p);
        const y = p5.bezierPoint(y1, y2, y3, y4, p);
        p5.circle(x, y, j);
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

export default function SketchBezierDance02() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
