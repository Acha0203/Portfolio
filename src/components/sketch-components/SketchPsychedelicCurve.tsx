import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  const p1 = { x: -100, y: 100 };
  const p2 = { x: 0, y: -100 };
  const p3 = { x: 100, y: 100 };
  const p4 = { x: 200, y: -100 };
  const curvePoints1 = [p1, p2, p3, p4];
  const curvePoints2 = [p2, p3, p4, { x: p4.x + 100, y: p1.y }];
  const curvePoints3 = [p3, p4, { x: p4.x + 100, y: p1.y }, { x: p4.x + 200, y: p2.y }];

  let r = 0;

  const drawCurve = (n: number, i: number, points: Array<{ x: number; y: number }>) => {
    p5.stroke((p5.frameCount % 360) + i * 5 * n, 90, i * 5);
    p5.curve(
      points[0].x,
      points[0].y,
      points[1].x,
      points[1].y,
      points[2].x,
      points[2].y,
      points[3].x,
      points[3].y,
    );
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noFill();
    p5.colorMode(p5.HSB);
  };

  p5.draw = () => {
    p5.background(0, 0.1);
    p5.translate(p5.width / 2, p5.height / 2);

    for (let i = 0; i < 20; i++) {
      p5.rotate(r);
      drawCurve(0, i, curvePoints1);
      drawCurve(1, i, curvePoints2);
      drawCurve(2, i, curvePoints3);
    }
    r += 0.002;
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchPsychedelicCurve() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
