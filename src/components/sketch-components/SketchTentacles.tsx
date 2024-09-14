import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  let angle = 0;
  let length = 0;
  let x = 0;
  let y = 0;
  let z = 0;

  const drawSphere = (n: number, m: number) => {
    for (let r = 0; r < Math.PI * 2; r += Math.PI / n) {
      angle = r + p5.noise(p5.frameCount / 90) * 0.2;
      length = p5.noise(p5.frameCount / 90) * m;
      x = Math.cos(angle) * length;
      y = Math.sin(angle) * length;
      z = Math.tan(angle) * length;
      p5.push();
      p5.fill(50 + angle * 30, 100 + angle * 100, 100 + angle * 150);
      p5.translate(x, y, z);
      p5.sphere(m / 30);
      p5.pop();
    }
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    p5.noStroke();
  };

  p5.draw = () => {
    p5.clear();
    p5.directionalLight(255, 255, 255, 0, 1, 0);
    p5.directionalLight(150, 100, 100, 0, -1, 0);

    for (let i = 1; i < 10; i++) {
      p5.rotateZ(p5.frameCount * 0.005);
      drawSphere(i * 10, i * 100);
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchTentacles() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
