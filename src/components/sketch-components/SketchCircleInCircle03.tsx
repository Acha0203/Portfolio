import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  const circles: Array<{ x: number; y: number }> = [];
  const n = 24;

  for (let y = -6; y < n; y++) {
    for (let x = -6; x < n; x++) {
      const tx = (p5.windowWidth / (n - 1)) * x;
      const ty = (p5.windowHeight / (n - 1)) * y;

      circles.push({ x: tx, y: ty });
    }
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noStroke();
    p5.colorMode(p5.HSB);
  };

  p5.draw = () => {
    p5.background(0, 0.01);
    p5.fill(p5.frameCount % 360, 80, 100);

    for (const c of circles) {
      const v = p5.createVector(p5.mouseX - c.x, p5.mouseY - c.y);
      v.setMag(p5.min(v.mag(), 100));
      const tx = c.x + v.x;
      const ty = c.y + v.y;

      p5.circle(tx, ty, 10);
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

export default function SketchCircleInCircle03() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
