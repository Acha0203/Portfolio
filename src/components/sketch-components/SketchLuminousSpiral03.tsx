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

    for (let d = 0; d < 360; d += 18) {
      const size = Math.sin(p5.frameCount / 30 - d) * (p5.width / 60);
      for (let i = 1; i < 4; i++) {
        const radius = (((p5.width / 4) * (p5.frameCount % (p5.width / 4))) / 99) * i;
        const radian = d + p5.frameCount / 99 + p5.HALF_PI * i;
        const x = Math.cos(radian) * radius + p5.width / 2;
        const y = Math.sin(radian) * radius + p5.height / 2;
        p5.fill(p5.frameCount % 360, 50, 1);
        for (let l = 0; l < p5.HALF_PI; l += 0.01) {
          p5.ellipse(x, y, Math.tan(l) * size, Math.tan(p5.HALF_PI - l) * size);
        }
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchLuminousSpiral03() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
