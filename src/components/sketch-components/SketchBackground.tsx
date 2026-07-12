import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { disableP5FriendlyErrors } from '#/utils/disableP5FriendlyErrors';

const sketch: Sketch = (p5) => {
  disableP5FriendlyErrors(p5);

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchBackground() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
