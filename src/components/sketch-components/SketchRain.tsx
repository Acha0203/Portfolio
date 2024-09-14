import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  const maxSize = 300;
  const n = Math.floor(p5.windowWidth * p5.windowHeight * (6 / 1e5));
  let drawRipples = false;
  let ripples: Array<{ x: number; y: number; w: number; size: number }> = [];

  const initRipples = () => {
    ripples = [];

    for (let i = 0; i < n; i++) {
      ripples.push({
        x: Math.floor(Math.random() * p5.windowWidth),
        y: Math.floor(Math.random() * p5.windowHeight),
        w: 2,
        size: Math.floor(Math.random() * (300 - 50) + 50),
      });
    }
  };

  initRipples();

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noFill();
    initRipples();
  };

  p5.draw = () => {
    p5.background(0, 10);
    p5.stroke(p5.frameCount % 100, 100 + (p5.frameCount % 100), 240);

    for (let i = 0; i < n; i++) {
      p5.ellipse(ripples[i].x, ripples[i].y - 300 + (p5.frameCount % 100) * 3, 2, 2);
    }

    if (p5.frameCount % 100 === 0) {
      drawRipples = true;
    }

    if (drawRipples) {
      for (let i = 0; i < n; i++) {
        ripples[i].w =
          ripples[i].w > ripples[i].size ? 0 : ripples[i].w + (p5.frameCount % ripples[i].size);
        p5.ellipse(ripples[i].x, ripples[i].y, ripples[i].w, ripples[i].w / 2);
      }
    }

    if (p5.frameCount % (100 + maxSize) === 0) {
      initRipples();
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchRain() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
