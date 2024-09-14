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
    p5.background(0, 0.05);

    drawCircle(6, 200, 0.1);
    drawCircle(10, 350, 2);
    drawCircle(16, 450, 0.5);
  };

  const drawCircle = (n: number, m: number, o: number) => {
    let direction = 1;

    p5.fill((p5.frameCount + n * 3) % 360, 80, 100);

    for (let r = 0; r < p5.TAU; r += p5.PI / n) {
      const angle = r + Math.sin(p5.frameCount / 50) * o * direction;
      const length = p5.noise(p5.frameCount / 100) * m;
      const x = Math.cos(angle) * length + p5.width / 2;
      const y = Math.sin(angle) * length + p5.height / 2;

      p5.circle(x, y, length / 20);
      direction = -direction;
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchSymmetricalRuler03() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
