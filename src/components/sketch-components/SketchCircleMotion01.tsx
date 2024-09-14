import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noFill();
  };

  let angle = 0;

  p5.draw = () => {
    const centerX = p5.windowWidth / 2;
    const centerY = p5.windowHeight / 2;

    p5.clear();
    p5.translate(centerX, centerY);

    for (let i = 0; i < 10; i++) {
      p5.rotate(angle);
      const w = p5.map(Math.sin(angle + 0.2 * i), -1, 1, 1, 20);
      p5.stroke(i * 36, 100, 100);
      p5.circle(w * 20, w * 5, 5);
      p5.ellipse(0, 0, w * 20, w * 5);
    }

    angle += 0.02;
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchCircleMotion01() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
