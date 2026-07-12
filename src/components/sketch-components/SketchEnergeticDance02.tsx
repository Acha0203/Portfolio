import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { disableP5FriendlyErrors } from '#/utils/disableP5FriendlyErrors';

const sketch: Sketch = (p5) => {
  disableP5FriendlyErrors(p5);

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noFill();
  };

  p5.draw = () => {
    p5.background(0, 0.05);

    for (let i = 0; i < 9; i++) {
      const steps = Math.max(p5.width, p5.height) / 20;

      for (let j = 1; j <= steps; j++) {
        const numberToFill = j / steps;
        const x = getBezierPoint(p5.width, i, numberToFill, 0, 1, 2, 3);
        const y = getBezierPoint(p5.height, i, numberToFill, 4, 5, 6, 7);

        p5.stroke((p5.frameCount + j * i) % 360, 90, 90, 0.1);
        p5.circle(x, y, j * 1.5);
      }
    }
  };

  const getBezierCoordinate = (canvasSize: number, n: number, i: number) => {
    return canvasSize * p5.noise(p5.frameCount / 40, n * 9 + i);
  };

  const getBezierPoint = (
    canvasSize: number,
    i: number,
    numberToFill: number,
    x1: number,
    x2: number,
    x3: number,
    x4: number,
  ) => {
    return p5.bezierPoint(
      getBezierCoordinate(canvasSize, x1, i),
      getBezierCoordinate(canvasSize, x2, i),
      getBezierCoordinate(canvasSize, x3, i),
      getBezierCoordinate(canvasSize, x4, i),
      numberToFill,
    );
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchEnergeticDance02() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
