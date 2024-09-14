import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noFill();
  };

  p5.draw = () => {
    p5.background(0, 0.03);
    let direction = 5;
    for (let r = 0; r < p5.TAU; r += p5.PI / 8) {
      const a = r + (Math.sin(p5.frameCount / 50) / 3) * direction;
      const l = p5.noise(p5.frameCount / 100) * 300;
      const x = Math.cos(a) * l + p5.windowWidth / 2;
      const y = Math.sin(a) * l + p5.windowHeight / 2;
      p5.stroke((p5.frameCount % 300) + direction, 50 + direction, 100);
      p5.circle(x, y, p5.frameCount % 300);
      direction = -direction;
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchSymmetricalRuler02() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
