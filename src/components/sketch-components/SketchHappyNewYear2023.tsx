import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
  };

  p5.draw = () => {
    p5.background(0, 0.03);

    const colorValue = p5.frameCount % 360;
    const x = p5.random(p5.windowWidth);
    const y = p5.random(p5.windowHeight);
    const size = 12 + p5.random(30);
    p5.textSize(size);
    p5.fill(colorValue, 100, 100);
    p5.text('Happy', x, y);
    p5.fill(colorValue + 10, 100, 100);
    p5.text('New Year!', x + size, y + size);
    p5.fill(colorValue + 20, 100, 100);
    p5.text('2023', x + size * 2, y + size * 2);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchHappyNewYear2023() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
