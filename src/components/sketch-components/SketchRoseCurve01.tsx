import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  const radius = 250;
  const n = 10;
  const d = 4;
  let x = 0;
  let y = 0;
  let bx = 0;
  let by = 0;
  let range = 0;
  let angle = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.strokeWeight(1);
    p5.background(0, 10);
    p5.angleMode(p5.DEGREES);
    p5.colorMode(p5.HSB, 100);
  };

  p5.draw = () => {
    p5.translate(p5.width / 2, p5.height / 2);
    p5.stroke(0, 0, p5.millis() % 100);

    range = radius * p5.sin(angle * (n / d));
    bx = x;
    by = y;
    x = range * p5.cos(angle);
    y = range * p5.sin(angle);
    p5.line(bx, by, x, y);
    angle += 28;
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchRoseCurve01() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
