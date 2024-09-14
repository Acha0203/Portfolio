import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  let pos: Array<{ x: number; y: number }> = [];
  let n = 5;
  const max = 1e4 + p5.windowWidth * 5;

  for (let i = 0; i < max; i++) {
    pos.push({ x: Math.random() * p5.windowWidth, y: Math.random() * p5.windowHeight });
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.blendMode(p5.ADD);
    p5.stroke(0, 0, 255, 10);
  };

  p5.draw = () => {
    p5.background(0);
    drawFlowField();
  };

  p5.mousePressed = () => {
    p5.clear();
    initPosList();
    n = p5.random(5, 20);
  };

  const initPosList = () => {
    pos = [];

    for (let i = 0; i < max; i++) {
      pos.push({ x: p5.random(p5.width), y: p5.random(p5.height) });
    }
  };

  const drawFlowField = () => {
    for (let i = 0; i < pos.length; i++) {
      p5.stroke(i / 100, i / 70, 255, 10);
      p5.point(pos[i].x, pos[i].y);

      const angle = 0.5 - p5.noise((pos[i].x / p5.width) * n, (pos[i].y / p5.height) * n, n);

      const dx = Math.sin(angle);
      const dy = Math.cos(angle);

      pos[i].x += dx;
      pos[i].y += dy;

      if (pos[i].y > p5.height) continue;
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchFlowField03() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
