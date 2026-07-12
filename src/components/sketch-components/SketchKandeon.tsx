import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { disableP5FriendlyErrors } from '#/utils/disableP5FriendlyErrors';

const sketch: Sketch = (p5) => {
  disableP5FriendlyErrors(p5);

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
  };

  p5.draw = () => {
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.1);
    p5.blendMode(p5.ADD);

    // 放電の分割数を画面の高さに基づいて設定
    const segments = p5.height / 40;

    if (p5.random() < 0.05) {
      drawLightning(segments);
    }
  };

  const drawLightning = (segments: number) => {
    p5.noFill();
    p5.beginShape();

    const X1 = p5.random(0, p5.width);
    const X2 = X1;

    // 奥行きを持たせるために放電のサイズをランダムに生成する
    const ratio = p5.random(0.6, 1);
    const Y1 = 0;
    const Y2 = p5.height * ratio;

    p5.stroke(200, 90, 90 * ratio);
    p5.strokeWeight((ratio * p5.width) / 80);
    p5.vertex(X1, Y1);

    for (let i = 1; i < segments; i++) {
      const t = i / segments;

      // 直線上の基本座標を計算
      const bx = p5.lerp(X1, X2, t);
      const by = p5.lerp(Y1, Y2, t);

      // 中心の膨らみに向かってランダムなズレ（ノイズ）を加える
      const wave = p5.sin(t * p5.PI) * 30;
      const offset = p5.map(p5.noise(p5.frameCount * 0.1, i), 0, 1, -wave, wave);

      p5.vertex(bx + offset, by + p5.random(-10, 10));
    }

    p5.vertex(X2, Y2);
    p5.endShape();

    drawSparkle(X2, Y2, (p5.width / 3) * ratio, ratio);
  };

  const drawSparkle = (x: number, y: number, maxRadius: number, ratio: number) => {
    p5.push();
    p5.noStroke();

    for (let r = 0; r < maxRadius; r++) {
      p5.fill(200, 90, (90 - r * (90 / maxRadius)) * ratio, 0.02);
      p5.arc(x, y + 5, r, r, p5.PI, p5.TWO_PI);
    }

    p5.pop();
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchKandeon() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
