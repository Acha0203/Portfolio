import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  const colors = ['#22577a', '#3873a5', '#5799cc', '#8099ed', '#a7ccf9'];
  const circles: Array<{
    x: number;
    y: number;
    diameter: number;
    maxSize: number;
    c1: string;
    c2: string;
  }> = [];

  const pick = (array: string[]) => {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
  };

  let n: number;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noFill();

    n = Math.floor(p5.windowWidth * p5.windowHeight * (6 / 1e5));

    for (let i = 0; i < n; i++) {
      circles.push({
        x: Math.floor(Math.random() * p5.windowWidth + 1),
        y: Math.floor(Math.random() * p5.windowHeight + 1),
        diameter: 2,
        maxSize: Math.floor(Math.random() * (300 - 50) + 50),
        c1: pick(colors),
        c2: pick(colors),
      });
    }
  };

  p5.draw = () => {
    p5.background(14, 57, 92, 10);

    for (let i = 0; i < n; i++) {
      const m = p5.map(circles[i].diameter, 0, circles[i].maxSize, 0, 1);
      const c3 = p5.lerpColor(p5.color(circles[i].c1), p5.color(circles[i].c2), m);

      circles[i].diameter =
        circles[i].diameter > circles[i].maxSize
          ? 0
          : circles[i].diameter + (p5.frameCount % circles[i].maxSize);

      p5.stroke(c3);
      p5.circle(circles[i].x, circles[i].y, circles[i].diameter);
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchConcentricCircle05() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
