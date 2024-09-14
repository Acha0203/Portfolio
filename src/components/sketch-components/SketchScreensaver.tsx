import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  let t = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noStroke();
    p5.colorMode(p5.HSB);
  };

  p5.draw = () => {
    t += 0.5;
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.5);
    p5.blendMode(p5.ADD);
    for (let y = 0; y <= p5.height; y += 9) {
      for (let x = 0; x <= p5.width; x += 9) {
        const hue = (p5.noise(x, y, t) * p5.width) % 270;
        const tang = p5.tan(p5.noise(x / p5.width, y / p5.height) * 99 + t);
        p5.fill(hue, hue - 80, hue, tang);
        p5.circle(x, y, 5 / tang);
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchScreensaver() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
