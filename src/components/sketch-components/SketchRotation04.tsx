import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  const n = 30;
  const s = 1.1;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    p5.angleMode(p5.DEGREES);
    p5.colorMode(p5.HSB);
    p5.noFill();
  };

  p5.draw = () => {
    p5.clear();
    p5.normalMaterial();
    p5.translate(-1 * (p5.width / 2), -1 * (p5.height / 2), -250);

    for (let i = 0; i < n; i++) {
      p5.scale(s);
      p5.translate(i * 2, i * 2, 0);
      p5.rotateX(p5.frameCount * 0.25);
      p5.rotateY(p5.frameCount * 0.25);
      p5.plane(50);
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchRotation04() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
