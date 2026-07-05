import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch: Sketch = (p5) => {
  const numberOfWalkers = 40;
  const walkers: RandomWalker[] = [];

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noFill();

    for (let i = 0; i < numberOfWalkers; i++) {
      walkers.push(new RandomWalker());
    }
  };

  p5.draw = () => {
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.08);
    p5.blendMode(p5.ADD);

    for (let i = 0; i < walkers.length; i++) {
      walkers[i].walk();
    }
  };

  class RandomWalker {
    x: number;
    y: number;
    tx: number;
    ty: number;
    size: number;
    speed: number;
    weight: number;
    hue: number;
    bright: number;

    constructor() {
      this.x = p5.floor(p5.width / 2);
      this.y = p5.floor(p5.height / 2);
      this.tx = this.x;
      this.ty = this.y;
      this.size = p5.min(p5.width, p5.height) * p5.random(0.01, 0.2);
      this.speed = p5.random(0.01, 0.1);
      this.weight = p5.random(2, 20);
      this.hue = p5.random(120, 270);
      this.bright = p5.random(30, 70);
    }

    walk() {
      p5.stroke(this.hue, 100, this.bright);
      p5.strokeWeight(this.weight);

      if (p5.abs(this.x - this.tx) < 1 && p5.abs(this.y - this.ty) < 1) {
        this.tx = this.x + p5.random([-this.size, this.size]);
        this.ty = this.y + p5.random([-this.size, this.size]);

        if (this.tx > p5.width) {
          this.tx = 0;
          this.x = 0;
        }
        if (this.tx < 0) {
          this.tx = p5.width;
          this.x = p5.width;
        }
        if (this.ty > p5.height) {
          this.ty = 0;
          this.y = 0;
        }
        if (this.ty < 0) {
          this.ty = p5.height;
          this.y = p5.height;
        }
      }

      this.x = p5.lerp(this.x, this.tx, this.speed);
      this.y = p5.lerp(this.y, this.ty, this.speed);

      p5.point(this.x, this.y);
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchRandomWalk03() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
