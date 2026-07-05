import type { Sketch } from '@p5-wrapper/react';
import type P5 from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch: Sketch = (p5) => {
  let t = 0;
  let particles: Particle[] = [];
  const spacing = 4; // 砂の細かさ
  let density = 1; // ディスプレイのピクセル密度
  let initialized = false;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();

    density = p5.pixelDensity();
  };

  p5.draw = () => {
    p5.blendMode(p5.BLEND);
    p5.background(0, 0);
    p5.blendMode(p5.ADD);

    const flowerSize = p5.height / 5;

    if (t < 240 && !initialized) {
      drawFlower(5, flowerSize, 1);
      drawFlower(8, flowerSize * 2, 1);
      drawFlower(15, flowerSize * 4, 0.7);
    }

    if (t >= 240) {
      if (!initialized) {
        initializeParticles();
      }

      if (t > 300) {
        p5.blendMode(p5.BLEND);
        p5.background(0);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          p.update();
          p.display();
        }
      }
    }

    if (t > 360) {
      particles = [];
      initialized = false;
      t = 0;
    }

    t++;
  };

  const drawFlower = (n: number, m: number, o: number) => {
    let direction = 1;

    p5.fill((p5.frameCount + n * n) % 360, 80, 20, 0.1);

    for (let r = 0; r < p5.TAU; r += p5.PI / n) {
      const angle = r + p5.sin(p5.frameCount / 50) * o * direction;
      const length = p5.noise(p5.frameCount / 100) * m;
      const x = p5.cos(angle) * length + p5.width / 2;
      const y = p5.sin(angle) * length + p5.height / 2;
      p5.circle(x, y, (length / 4) * p5.sin(p5.frameCount / 50) * o);
      direction = -direction;
    }
  };

  const initializeParticles = () => {
    p5.loadPixels();

    p5.colorMode(p5.RGB);

    // 画面のピクセル情報を元にパーティクルを初期化
    for (let y = 0; y < p5.height; y += spacing) {
      for (let x = 0; x < p5.width; x += spacing) {
        const index = (x + y * p5.width) * 4 * density;
        const r = p5.pixels[index];
        const g = p5.pixels[index + 1];
        const b = p5.pixels[index + 2];
        const particleColor = p5.color(r, g, b);

        particles.push(new Particle(x, y, particleColor));
      }
    }

    p5.colorMode(p5.HSB);

    initialized = true;
  };

  class Particle {
    origin: P5.Vector;
    current: P5.Vector;
    vel: P5.Vector;
    acc: P5.Vector;
    particleColor: P5.Color;
    size: number;

    constructor(x: number, y: number, c: P5.Color) {
      this.origin = p5.createVector(x, y); // 元の位置
      this.current = p5.createVector(x, y); // 現在の位置
      this.vel = p5.createVector(0, 0); // 速度
      this.acc = p5.createVector(0, 0); // 加速度
      this.particleColor = c;
      this.size = spacing;
    }

    update() {
      // 重力を加える
      const gravity = p5.createVector(0, 5);

      this.applyForce(gravity);

      // ランダムな揺れ（風）を加える
      const wind = p5.createVector(p5.random(-5, 5), p5.random(-5, 0));

      this.applyForce(wind);
      this.vel.add(this.acc);
      this.current.add(this.vel);
      this.acc.mult(0); // 加速度をリセット
    }

    applyForce(force: P5.Vector) {
      this.acc.add(force);
    }

    display() {
      p5.noStroke();
      p5.fill(this.particleColor);
      p5.rect(this.current.x, this.current.y, this.size, this.size);
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchMortalFlowers() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
