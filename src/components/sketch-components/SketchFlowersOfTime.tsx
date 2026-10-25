import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { disableP5FriendlyErrors } from '#/utils/disableP5FriendlyErrors';

const sketch: Sketch = (p5) => {
  disableP5FriendlyErrors(p5);

  const bloomingInterval = 300;
  const FLOWER_COUNT = 36;

  let flowers: Flower[] = [];
  let pondRadius: number;
  let t = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();

    initLayout();
  };

  p5.draw = () => {
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.05);
    p5.blendMode(p5.ADD);

    flowers[Math.floor(t / bloomingInterval)].bloom();
    drawPond(pondRadius);

    t = (t + 1) % (flowers.length * bloomingInterval);
  };

  class Flower {
    x: number;
    y: number;
    flowerSize: number;

    constructor(x: number, y: number, radius: number) {
      this.x = x;
      this.y = y;
      this.flowerSize = radius * 0.3;
    }

    bloom() {
      p5.push();
      p5.translate(p5.width / 2 + this.x, p5.height / 2 + this.y);
      this.drawPetals(6, this.flowerSize, 0.1);
      this.drawPetals(10, this.flowerSize * 1.7, 2);
      this.drawPetals(8, this.flowerSize * 2.2, 0.5);
      p5.pop();
    }

    drawPetals(petalCount: number, maxLength: number, swing: number) {
      const swingAngle = p5.sin(p5.frameCount / 50) * swing;
      const petalLength = p5.noise(p5.frameCount / 100) * maxLength;
      const diameter = (petalLength / 2) * p5.sin(p5.frameCount / 50);

      p5.fill((p5.frameCount + petalCount * 3) % 360, 80, 60, 0.1);

      for (let i = 0; i < petalCount * 2; i++) {
        const direction = i % 2 === 0 ? 1 : -1;
        const angle = (i * p5.PI) / petalCount + swingAngle * direction;
        p5.circle(p5.cos(angle) * petalLength, p5.sin(angle) * petalLength, diameter);
      }
    }
  }

  const calcCoordinate = (radius: number, angle: number) => {
    const r = radius * p5.random(0.6, 1);
    return { x: r * p5.cos(angle), y: r * p5.sin(angle) };
  };

  const drawPond = (radius: number) => {
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.noFill();
    p5.strokeWeight(2);

    const numberOfCircles = radius / 30;
    const maxRadius = radius * 3;

    let r = radius;

    for (let i = 0; i < numberOfCircles; i++) {
      r += (maxRadius - r) / numberOfCircles;

      p5.stroke(0, 0, i - p5.sin(p5.frameCount / numberOfCircles) * i, 0.05);
      p5.circle(0, 0, r);
    }

    p5.pop();
  };

  const initLayout = () => {
    const baseSize = Math.max(p5.width, p5.height);

    pondRadius = baseSize / 2;
    flowers = createFlowers(baseSize * 0.3);
  };

  const createFlowers = (radius: number) => {
    return Array.from({ length: FLOWER_COUNT }, (_, i) => {
      const { x, y } = calcCoordinate(radius, 0.9 * p5.PI * i);
      return new Flower(x, y, radius);
    });
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
    initLayout();
  };
};

export default function SketchFlowersOfTime() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
