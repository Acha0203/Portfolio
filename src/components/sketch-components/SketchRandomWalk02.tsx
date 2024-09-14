import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  let walker = { x: 0, y: 0 };
  const s = 8;
  const colors = [
    '#618355',
    '#77986a',
    '#87a97c',
    '#a5c99a',
    '#bfe1b9',
    '#d9f5db',
    '#bfe1b9',
    '#a5c99a',
    '#87a97c',
    '#77986a',
  ];

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noFill();
    p5.strokeWeight(1);
    setWalker();
  };

  p5.draw = () => {
    p5.background(0, 10);

    for (let i = 0; i < p5.width; i++) {
      walk(walker, i);
    }

    setWalker();
  };

  const setWalker = () => {
    const x = p5.random(p5.width);
    const y = p5.random(p5.height);

    walker = { x, y };
  };

  const walk = (walker: { x: number; y: number }, i: number) => {
    const x = walker.x + s * p5.random([-1, 1]);
    const y = walker.y + s * p5.random([-1, 1]);

    p5.stroke(colors[i % 10]);
    p5.line(x, y, walker.x, walker.y);

    walker.x = x;
    walker.y = y;
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchRandomWalk02() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
