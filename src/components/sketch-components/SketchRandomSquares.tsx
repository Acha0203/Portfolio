import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noFill();
    p5.rectMode(p5.CENTER);
    p5.colorMode(p5.HSB);
  };

  p5.draw = () => {
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.05);
    p5.blendMode(p5.ADD);

    const x = p5.random(p5.width);
    const y = p5.random(p5.height);
    const d = p5.random(10, p5.height / 3);
    const n = p5.random(10, d / 10);

    for (let w = 10; w > 0; w--) {
      for (let i = 1; i <= n; i++) {
        p5.translate(x, y);
        p5.strokeWeight(w);
        p5.stroke((p5.frameCount % 270) + i * 3, 50, 1);
        p5.rotate((p5.TAU / n) * i);
        p5.square(0, 0, d);
        p5.resetMatrix();
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchRandomSquares() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
