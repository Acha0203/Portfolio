import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  const x2 = p5.windowWidth / 3;
  const x3 = p5.windowWidth - x2;
  let y2 = 0;
  let y3 = p5.windowHeight;
  let D = 1;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noFill();
    p5.stroke(255);
  };

  p5.draw = () => {
    p5.background(0, 10);

    if (y2 >= p5.windowHeight || y2 <= 0) {
      D *= -1;
    }
    y2 += (p5.frameCount % 5) * D;
    y3 -= (p5.frameCount % 5) * D;

    p5.bezier(0, p5.height, x2, y2, x3, y3, p5.width, 0);

    p5.circle(x2, y2, 20);
    p5.circle(x3, y3, 20);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

export default function SketchBezier08() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
