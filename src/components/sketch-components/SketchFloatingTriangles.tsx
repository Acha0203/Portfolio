import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noFill();
    p5.strokeWeight(2);
  };

  p5.draw = () => {
    p5.background(0, 0.1);

    let angle = 0;

    p5.translate(p5.frameCount % p5.width, p5.frameCount % p5.height);
    p5.rotate((p5.frameCount * p5.TAU) / 360);

    for (let i = 0; i < 360; i += 5) {
      p5.stroke(p5.frameCount % (360 - i), 60, 90);

      const oneSide = p5.width * 0.5;
      const altitude = (oneSide / 2) * p5.sqrt(3);
      const x1 = -oneSide / 2;
      const y1 = -altitude / 3;
      const x2 = oneSide / 2;
      const y2 = y1;
      const x3 = 0;
      const y3 = (altitude * 2) / 3;

      angle += i;
      p5.rotate(((p5.frameCount * p5.PI * 0.1) / 360) * angle);
      p5.triangle(x1, y1, x2, y2, x3, y3);
      p5.scale(0.8);
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchFloatingTriangles() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
