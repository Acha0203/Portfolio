import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  const txt1 = 'minacoding2023';
  const txt2 = 'Completed!';

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noStroke();
    p5.colorMode(p5.HSL);
  };

  p5.draw = () => {
    p5.background(0, 0.05);

    display(txt1, p5.height / 3, p5.height / 12, 0);
    display(txt2, p5.height / 6, p5.height / 16, 180);
  };

  const display = (txt: string, radius: number, tSize: number, startHue: number) => {
    for (let i = 0; i < txt.length; i++) {
      const step = p5.TAU / txt.length;
      const x = Math.cos(step * i) * radius + p5.width / 2;
      const y = Math.sin(step * i) * radius + p5.height / 2;
      p5.push();
      p5.textSize(tSize);
      p5.translate(x, y);
      p5.rotate(step * i + p5.HALF_PI + Math.tan(p5.frameCount / 99));
      p5.fill((startHue + p5.frameCount + i * (360 / txt.length)) % 360, 100, 80);
      p5.text(txt[i], 0, 0);
      p5.pop();
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchMinacoding2023() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
