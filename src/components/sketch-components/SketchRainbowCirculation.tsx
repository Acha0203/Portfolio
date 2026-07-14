import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { disableP5FriendlyErrors } from '#/utils/disableP5FriendlyErrors';

const sketch: Sketch = (p5) => {
  disableP5FriendlyErrors(p5);

  const volume = 0.3;
  let t = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  p5.draw = () => {
    t += 0.5;
    p5.background(0, 0.05);

    const frequency = p5.width / 90;
    const numPoints = frequency * 2;
    const interval = p5.width / numPoints;

    for (let i = 1; i <= numPoints; i++) {
      const x = (t + i * interval) % p5.width;
      const y =
        p5.height / 2 +
        p5.height * volume * p5.sin(((x + i / p5.noise(interval)) * frequency * p5.TAU) / p5.width);

      p5.fill(t % Math.floor(i * interval * 0.5), 100, 100, 0.2);
      p5.circle(x, y, interval * p5.sin(i));
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchRainbowCirculation() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
