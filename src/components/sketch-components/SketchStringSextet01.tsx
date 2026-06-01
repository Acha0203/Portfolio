import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  p5.draw = () => {
    p5.background(0, 0.1);

    let direction = 1;
    let i = 1;
    let hz = 660;

    while (i < 7) {
      let n = i * i + 7;

      for (let r = 0; r < p5.TAU; r += p5.PI / n) {
        let angle = r + p5.noise(p5.frameCount / hz) * n * direction;
        let length = p5.noise(p5.frameCount / 50) * hz;
        let x = p5.tan(p5.cos(angle)) * length + p5.width / 2;
        let y = p5.tan(p5.sin(angle)) * length + p5.height / 2;

        p5.fill(p5.frameCount % hz, 50, hz);
        p5.circle(x, y, length / 20);
        direction = -direction;
      }

      hz = hz / 2;
      i++;
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchStringSextet01() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
