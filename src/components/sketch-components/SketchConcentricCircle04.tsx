import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  const arcs: Array<{ x: number; y: number; diameter: number; sWidth: number; colorCode: string }> =
    [];
  const colors = [
    '#d8f3dc',
    '#b7e4c7',
    '#95d5b2',
    '#74c69d',
    '#52b788',
    '#40916c',
    '#2d6a4f',
    '#1b4332',
    '#081c15',
  ];

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noFill();
  };

  p5.draw = () => {
    p5.background(8, 28, 21, 30);
    const px = p5.random(p5.width);
    const py = p5.random(p5.height);
    const n = p5.random(p5.height / 50);
    let d = p5.random(1, 20);

    for (let i = 0; i < n; i++) {
      const s = p5.random(1, 20);
      arcs[i] = { x: px, y: py, diameter: d, sWidth: s, colorCode: colors[i % 9] };
      d += s * 2;
    }

    arcs.forEach((a) => {
      p5.stroke(p5.color(a.colorCode + '80'));
      p5.strokeWeight(a.sWidth);
      p5.arc(a.x, a.y, a.diameter, a.diameter, p5.random(p5.TAU), p5.random(p5.TAU));
    });
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

export default function SketchConcentricCircle04() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
