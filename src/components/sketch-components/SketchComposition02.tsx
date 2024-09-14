import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  let circle1: {
    x: number;
    y: number;
    r: number;
    angle: number;
    speed: number;
  } = { x: 0, y: p5.windowHeight / 2, r: 50, angle: 0, speed: 0.08 };

  let circle2: {
    x: number;
    y: number;
    r: number;
    angle: number;
    speed: number;
  } = {
    x: p5.windowHeight / 4,
    y: p5.windowHeight / 2,
    r: 100,
    angle: 0,
    speed: 0.03,
  };

  const hist: Array<{ x: number; y: number }> = [];

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noFill();

    circle1 = {
      x: 0,
      y: p5.height / 2,
      r: 50,
      angle: 0,
      speed: 0.08,
    };

    circle2 = {
      x: p5.height / 4,
      y: p5.height / 2,
      r: 100,
      angle: 0,
      speed: 0.03,
    };
  };

  p5.draw = () => {
    p5.clear();

    circle1.angle += circle1.speed;
    circle2.angle += circle2.speed;

    const x1 = circle1.x + Math.cos(circle1.angle) * circle1.r;
    const y1 = circle1.y + Math.sin(circle1.angle) * circle1.r;
    const x2 = circle2.x + Math.cos(circle2.angle) * circle2.r;
    const y2 = circle2.y + Math.sin(circle2.angle) * circle2.r;

    const v = p5.createVector(x2 - x1, y2 - y1);
    v.setMag(x1 + p5.width / 2);
    hist.push({ x: x1 + v.x, y: y1 + v.y });
    if (hist.length > 100) {
      hist.shift();
    }

    for (let i = 0; i < hist.length - 1; i++) {
      p5.circle(hist[i].x, hist[i].y, i);
      p5.stroke(i, i, i);
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchComposition02() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
