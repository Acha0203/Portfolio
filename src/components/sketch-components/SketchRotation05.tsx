import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  let a = 0;
  const s = 0.9;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.rectMode(p5.CENTER);
    p5.noFill();
  };

  p5.draw = () => {
    p5.background(0, 10);
    p5.translate(p5.width / 2, p5.height / 2);

    for (let i = 0; i < 25; i++) {
      p5.scale(s);
      p5.stroke(0, i * 10, i * 10);

      rotateRect(0, 0);
      rotateRect(-p5.width / 3, -p5.height / 3);
      rotateRect(p5.width / 3, -p5.height / 3);
      rotateRect(p5.width / 3, p5.height / 3);
      rotateRect(-p5.width / 3, p5.height / 3);
    }

    a += p5.PI / 72;
  };

  const rotateRect = (x: number, y: number) => {
    p5.push();
    p5.translate(x, y);
    p5.rotate(a);
    p5.rect(0, 0, p5.width, p5.height);
    p5.pop();
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchRotation05() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
