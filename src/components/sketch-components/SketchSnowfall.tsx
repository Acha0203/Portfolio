import type { Sketch } from '@p5-wrapper/react';
import type P5 from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { disableP5FriendlyErrors } from '#/utils/disableP5FriendlyErrors';

const sketch: Sketch = (p5) => {
  disableP5FriendlyErrors(p5);

  let snowCrystalImage: P5.Graphics;
  const snowflakes: Snowflake[] = [];

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();

    const imageSize = p5.height / 4;
    const branchSize = imageSize / 3; // 雪の結晶の最も大きい枝の長さ
    const baseWeight = branchSize / 20;

    snowCrystalImage = p5.createGraphics(imageSize, imageSize);
    snowCrystalImage.colorMode(p5.HSB);
    snowCrystalImage.noFill();

    for (let i = 0; i < 6; i++) {
      drawSnowCrystal(imageSize / 2, imageSize / 2, branchSize, baseWeight, i);
    }

    const snowflakeSize = p5.height / 8;

    for (let i = 0; i < p5.height / 12; i++) {
      snowflakes.push(new Snowflake(snowflakeSize));
    }
  };

  p5.draw = () => {
    drawGradation(50, 100);

    for (let i = 0; i < snowflakes.length; i++) {
      snowflakes[i].fall();
    }
  };

  const drawGradation = (from: number, to: number) => {
    p5.noStroke();

    for (let y = 0; y < p5.height; y++) {
      p5.fill(0, 0, p5.lerp(from, to, y / p5.height));
      p5.rect(0, y, p5.width, 1);
    }
  };

  const drawSnowCrystal = (
    x: number,
    y: number,
    baseLength: number,
    branchWeight: number,
    rotateNumber: number,
  ) => {
    // base case
    if (baseLength < 1) {
      return;
    }

    const nextLength = baseLength / 2.5;
    const nextWeight = Math.max(branchWeight - 1, 1);
    // snowCrystalImageはP2Dで生成しているためdrawingContextは2Dコンテキスト
    const crystalContext = snowCrystalImage.drawingContext as CanvasRenderingContext2D;

    snowCrystalImage.push();
    snowCrystalImage.translate(x, y);
    snowCrystalImage.rotate((p5.PI / 3) * rotateNumber);
    snowCrystalImage.strokeWeight(branchWeight);
    snowCrystalImage.stroke(0, 0, 100);

    crystalContext.shadowColor = 'white';
    crystalContext.shadowBlur = 20;

    snowCrystalImage.line(0, 0, 0, -baseLength);

    crystalContext.shadowBlur = 0;

    snowCrystalImage.push();
    snowCrystalImage.translate(0, -nextLength * 1.2);

    for (let i = -1; i <= 1; i += 2) {
      snowCrystalImage.push();
      snowCrystalImage.rotate((p5.PI / 3) * i);

      drawSnowCrystal(0, 0, nextLength, nextWeight, 0);

      snowCrystalImage.pop();
    }

    snowCrystalImage.pop();

    drawSnowCrystal(0, 0, nextLength, nextWeight, 0);
    drawSnowCrystal(0, -nextLength * 1.5, nextLength, nextWeight, 0);

    snowCrystalImage.pop();
  };

  class Snowflake {
    baseX: number;
    x: number;
    y: number;
    speed: number;
    maxSnowflakeSize: number;
    proportion: number;
    size: number;
    time: number;
    amplitude: number;
    angle: number;

    constructor(maxSize: number) {
      this.baseX = p5.random(p5.width);
      this.x = this.baseX;
      this.y = p5.random(p5.height);
      this.speed = p5.random(2, 5);
      this.maxSnowflakeSize = maxSize;
      this.proportion = p5.random(0.2, 1);
      this.size = this.proportion * maxSize;
      this.time = p5.random(900);
      this.amplitude = p5.random(20, 100);
      this.angle = 0;
    }

    fall() {
      this.y = this.y + this.speed;
      this.x = this.baseX + this.amplitude * p5.sin(this.time);
      this.time += 0.01;
      this.angle += 0.1;

      if (this.y > p5.height + this.maxSnowflakeSize) {
        this.baseX = p5.random(p5.width);
        this.y = -this.maxSnowflakeSize;
        this.speed = p5.random(2, 5);
        this.proportion = p5.random(0.2, 1);
        this.size = this.proportion * this.maxSnowflakeSize;
        this.time = p5.random(900);
        this.amplitude = p5.random(20, 100);
        this.angle = 0;
      }

      const imageSize = snowCrystalImage.width;
      p5.push();
      p5.translate(this.x, this.y);
      p5.rotate(((this.time * p5.PI) / 3600) * this.angle);
      p5.scale(this.proportion, this.proportion);
      p5.tint(0, 0, 100, this.proportion);
      p5.image(snowCrystalImage, -imageSize / 2, -imageSize / 2);
      p5.pop();
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchSnowfall() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
