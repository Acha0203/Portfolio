import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noStroke();
    p5.colorMode(p5.HSB);
  };

  p5.draw = () => {
    const step = p5.frameCount % 20;
    p5.background(255, 0.1);
    p5.applyMatrix(1 / step, 0, 0, 1 / step, p5.random(p5.width), p5.random(p5.height));
    for (let r = p5.PI / 3; r < p5.PI; r += p5.PI / 3) {
      p5.push();
      p5.rotate(r - p5.PI);
      for (let i = 0; i < 40; i++) {
        p5.fill((p5.frameCount + i) % 360, 100 - i * 2, 90);
        p5.ellipse(200 - i * 5, 0, 240 - i * 6, 200 - i * 5);
      }
      p5.pop();
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchRandomHearts() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
