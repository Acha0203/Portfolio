import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();
  };

  p5.draw = () => {
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.05);
    p5.blendMode(p5.ADD);

    let direction = 5; // どちらの方向に動くかのフラグ

    for (let r = 0; r < p5.TAU; r += p5.PI / 8) {
      let angle = r + (Math.cos(p5.frameCount / 50) / 3) * direction;
      let length = p5.noise(p5.frameCount / 90) * 360;
      let x = Math.tan(Math.cos(angle)) * length + p5.width / 2;
      let y = Math.tan(Math.sin(angle)) * length + p5.height / 2;
      p5.fill(p5.color((p5.frameCount % 360) * r * 0.1, 80 + r, r));
      p5.circle(x, y, length);
      direction = -direction; // 動く方向を反転する
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchSymmetricalRuler04() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
