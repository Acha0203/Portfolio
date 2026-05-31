import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.RGB);
    p5.noFill();
  };

  p5.draw = () => {
    p5.clear();
    p5.stroke(0, p5.frameCount % 255, 255);

    let angle1 = p5.frameCount * 0.3;
    let angle2 = p5.frameCount * 0.5;

    for (let z = 240; z > -240; z -= 2) {
      for (let x = -240; x < 240; x += 2) {
        let q = p5.sqrt(x * x + z * z) / 60;
        let y = (50 * p5.sin(q * p5.PI)) / q;
        let ya = y * p5.cos(angle1) - z * p5.sin(angle1);
        let xa = x * p5.cos(angle2) - (y * p5.sin(angle1) + z * p5.cos(angle1)) * p5.sin(angle2);
        p5.point(
          p5.width / 2 + xa * p5.cos(0) - ya * p5.sin(0),
          p5.height / 2 + xa * p5.sin(0) + ya * p5.cos(0),
        );
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchSombrero() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
