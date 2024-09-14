import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  p5.draw = () => {
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.1);
    p5.blendMode(p5.ADD);

    const angleA = (p5.frameCount * p5.TAU) / 240;
    const cosA = Math.cos(angleA);
    const sinA = Math.sin(angleA);
    p5.applyMatrix(cosA, sinA, -sinA, cosA, p5.frameCount % p5.width, p5.frameCount % p5.height);

    for (let r = 0; r < p5.TAU * 3; r += p5.PI / 10) {
      const angleB = r * p5.frameCount * 0.03;
      const p = (r * r * p5.height) / 100;
      const x = Math.cos(angleB) * p + p5.width / 2;
      const y = Math.sin(angleB) * p + p5.height / 2;
      p5.fill(p5.color(p5.frameCount % 360, 50, 1));
      for (let l = 0; l < 90; l++) {
        p5.ellipse(x, y, Math.tan(l) * 10, Math.tan(90 - l) * 10);
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchLuminousSpiral01() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
