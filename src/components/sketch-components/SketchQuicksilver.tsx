import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { disableP5FriendlyErrors } from '#/utils/disableP5FriendlyErrors';

const sketch: Sketch = (p5) => {
  disableP5FriendlyErrors(p5);

  const quicksilverList: Quicksilver[] = [];
  const numberOfDrops = 20;

  p5.setup = () => {
    p5.createCanvas(720, 720);
    p5.colorMode(p5.HSB);
    p5.noStroke();
    p5.pixelDensity(1);

    for (let i = 0; i < numberOfDrops; i++) {
      quicksilverList.push(new Quicksilver(p5.random(0, p5.width), p5.random(0, p5.height)));
    }
  };

  p5.draw = () => {
    p5.background(0);

    p5.loadPixels();

    for (let x = 0; x < p5.width; x++) {
      for (let y = 0; y < p5.height; y++) {
        let brightValue = 0;

        for (let i = 0; i < quicksilverList.length; i++) {
          if (brightValue < 500) {
            const xDiff = x - quicksilverList[i].x;
            const yDiff = y - quicksilverList[i].y;
            const distance = p5.sqrt(xDiff * xDiff + yDiff * yDiff);

            brightValue += (10 * quicksilverList[i].radius) / distance;
          } else {
            brightValue = 500;
          }
        }

        const index = (x + y * p5.width) * 4;

        // brightValueが240未満のピクセルは描画せず背景を透過させる
        if (brightValue < 240) {
          p5.pixels[index + 3] = 0;
          continue;
        }

        if (brightValue < 300) {
          brightValue = p5.map(brightValue, 240, 299, 20, 45);
        } else if (brightValue < 400) {
          brightValue = p5.map(brightValue, 300, 399, 46, 70);
        } else if (brightValue < 500) {
          brightValue = p5.map(brightValue, 400, 499, 71, 79);
        } else {
          brightValue = 80;
        }

        const pixelColor = p5.color(0, 0, brightValue);

        p5.pixels[index] = p5.red(pixelColor);
        p5.pixels[index + 1] = p5.green(pixelColor);
        p5.pixels[index + 2] = p5.blue(pixelColor);
        p5.pixels[index + 3] = 255;
      }
    }

    p5.updatePixels();

    for (let i = 0; i < quicksilverList.length; i++) {
      quicksilverList[i].update();
    }
  };

  class Quicksilver {
    x: number;
    y: number;
    xVelocity: number;
    yVelocity: number;
    radius: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;

      const angle = p5.random(0, 2 * p5.PI);

      this.xVelocity = p5.random(2, 5) * p5.cos(angle);
      this.yVelocity = p5.random(2, 5) * p5.sin(angle);
      this.radius = p5.random(p5.height / 5, p5.height / 2);
    }

    update() {
      this.x += this.xVelocity;
      this.y += this.yVelocity;

      if (this.x > p5.width || this.x < 0) this.xVelocity *= -1;

      if (this.y > p5.height || this.y < 0) this.yVelocity *= -1;
    }
  }
};

export default function SketchQuicksilver() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
}
