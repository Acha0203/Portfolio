import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch: Sketch = (p5) => {
  const volume = 0.3;
  const frequency = 5;
  const noiseScale = 0.01;
  const numCurtains = 30;
  const noiseSeed = 1000;

  let t = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.strokeWeight(5);
    p5.noFill();
  };

  p5.draw = () => {
    p5.background(0, 0.1);

    t += 5;

    const numPoints = p5.width / 3;
    const stagger = p5.height / numCurtains;

    for (let j = 0; j < numCurtains; j++) {
      const fallY = (t + stagger * j) % p5.height;

      for (let i = 0; i < numPoints; i++) {
        const noiseFactor = p5.noise(i * noiseScale, noiseSeed * j + t * 0.002) - 0.5;
        const x = (i * (p5.width / numPoints)) % p5.width;
        const y =
          fallY + p5.height * volume * noiseFactor * p5.sin((x * frequency * p5.TAU) / p5.width);

        p5.stroke((90 + t + stagger * j) % 200, 90, (t + stagger * j) % 100, 0.5);
        p5.point(x, y);
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchRainbowFalls() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
