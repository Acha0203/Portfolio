import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.angleMode(p5.DEGREES);
    p5.colorMode(p5.HSB);
    p5.noFill();
  };

  const n = 20;
  const s = 1.1;
  let angle = 0;

  p5.draw = () => {
    p5.background(0, 0.1);
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    for (let i = 0; i < n; i++) {
      p5.scale(s);
      p5.rotate(angle);
      p5.stroke(i * 10, i * 5, i * 5);
      p5.quad(38, 31, 0, 30, 69, 63, 30, 76);
    }

    angle += 0.5;
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchRotation03() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
