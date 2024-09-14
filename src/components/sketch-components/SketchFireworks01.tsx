import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  const n = 9;
  let fireworks: Array<{ x: number; y: number; size: number }> = [];

  const initFireworks = (): void => {
    fireworks = [];

    for (let i = 0; i < n; i++) {
      fireworks.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        size: p5.random(p5.width / 10, p5.width / 2),
      });
    }
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();
    initFireworks();
  };

  p5.draw = () => {
    p5.background(0, 0.05);

    for (let i = 0; i < n; i++) {
      for (let r = 0; r < p5.TAU; r += p5.PI / n) {
        const length = p5.random(p5.frameCount % fireworks[i].size);
        const x = Math.cos(r) * length + fireworks[i].x;
        const y = Math.sin(r) * length + fireworks[i].y;
        p5.fill((p5.frameCount + length) % 360, 80, 90);
        p5.circle(x, y, length / 20);
      }
    }

    if (p5.frameCount % 90 <= 0) initFireworks();
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchFireworks01() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
