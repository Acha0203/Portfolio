import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noStroke();
    p5.blendMode(p5.DIFFERENCE);
  };

  p5.draw = () => {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        const G = Math.sin(p5.TAU * p5.noise(i * 0.01, j * 0.01, p5.frameCount * 0.04));
        const B = Math.sin(p5.TAU * p5.noise(i * 0.005, j * 0.005, p5.frameCount * 0.04));

        p5.fill(0, G * 200, B * 200);
        p5.rect(
          (p5.windowWidth / 100) * i,
          (p5.windowHeight / 100) * j,
          p5.windowHeight / 100,
          p5.windowHeight / 100,
        );
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchPerlinNoise04() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
