import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch: Sketch = (p5) => {
  const bloomingInterval = 300;
  const flowers: Flower[] = [];
  let t = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();

    const radius = Math.max(p5.width, p5.height) * 0.3;

    for (let i = 0; i < 36; i++) {
      const nextCoordinate = calcCoordinate(radius, 0.9 * p5.PI * i);

      flowers.push(new Flower(nextCoordinate.x, nextCoordinate.y, radius));
    }
  };

  p5.draw = () => {
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.05);
    p5.blendMode(p5.ADD);

    for (let i = 0; i < flowers.length; i++) {
      const startTime = i * bloomingInterval;
      const endTime = startTime + bloomingInterval;

      if (t > startTime && t <= endTime) {
        flowers[i].bloom();
      }
    }

    if (t > flowers.length * bloomingInterval) {
      t = 0;
    }

    drawPond(Math.max(p5.width, p5.height) / 2);

    t++;
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
      p5.translate(this.x, this.y);
      this.drawPetals(6, this.flowerSize, 0.1);
      this.drawPetals(10, this.flowerSize * 1.7, 2);
      this.drawPetals(8, this.flowerSize * 2.2, 0.5);
      p5.pop();
    }

    drawPetals(n: number, m: number, o: number) {
      let direction = 1;

      p5.fill((p5.frameCount + n * 3) % 360, 80, 60, 0.1);

      for (let r = 0; r < p5.TAU; r += p5.PI / n) {
        const angle = r + p5.sin(p5.frameCount / 50) * o * direction;
        const length = p5.noise(p5.frameCount / 100) * m;
        const x = p5.cos(angle) * length + p5.width / 2;
        const y = p5.sin(angle) * length + p5.height / 2;
        p5.circle(x, y, (length / 2) * p5.sin(p5.frameCount / 50));
        direction = -direction;
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

    const numberOfCircles = radius / 30;
    const maxRadius = radius * 3;

    let r = radius;

    for (let i = 0; i < numberOfCircles; i++) {
      r += (maxRadius - r) / numberOfCircles;

      p5.strokeWeight(2);
      p5.stroke(0, 0, i - p5.sin(p5.frameCount / numberOfCircles) * i, 0.05);
      p5.circle(0, 0, r);
    }

    p5.pop();
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchFlowersOfTime() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
