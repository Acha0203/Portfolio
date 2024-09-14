import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.angleMode(p5.DEGREES);
    p5.colorMode(p5.HSB);
  };

  let angle = 0;

  p5.draw = () => {
    const centerX = p5.windowWidth / 2;
    const centerY = p5.windowHeight / 2;

    p5.clear();
    p5.translate(centerX, centerY);

    for (let i = 0; i < 360; i += 10) {
      p5.scale(0.9);
      p5.rotate(angle);
      const x = Math.cos(i) * 250;
      const y = Math.sin(i) * 250;
      p5.noFill();
      p5.stroke(i, 250, 250);
      p5.circle(x, y, i * 5);
    }

    angle += 0.5;
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchCircleMotion02() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
