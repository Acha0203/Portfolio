import type { Sketch } from '@p5-wrapper/react';
import type { Vector } from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  // A simple Particle class
  class Particle {
    acceleration: Vector;
    velocity: Vector;
    position: Vector;
    lifespan: number;
    size: number;

    constructor(position: Vector, x: number, y: number, size: number) {
      this.acceleration = p5.createVector(0, 0.005);
      this.velocity = p5.createVector(x, y);
      this.position = position.copy();
      this.lifespan = size;
      this.size = size;
    }

    run(): void {
      this.update();
      this.display();
    }

    // Method to update position
    update(): void {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= 2;
    }

    // Method to display
    display() {
      p5.fill((p5.frameCount + this.size) % 360, 90, this.lifespan, this.lifespan);
      p5.circle(this.position.x, this.position.y, p5.random(this.size - this.lifespan) / 50);
    }

    // Is the particle still useful?
    isDead() {
      return this.lifespan < 0;
    }
  }

  class Firework {
    origin: Vector;
    particles: Particle[];
    size: number;

    constructor(position: Vector, size: number) {
      this.origin = position.copy();
      this.particles = [];
      this.size = size;
    }

    addParticle() {
      for (let r = 0; r < p5.TAU; r += p5.PI / 10) {
        this.particles.push(new Particle(this.origin, Math.cos(r), Math.sin(r), this.size));
      }
    }

    run() {
      this.particles = this.particles.filter((p) => !p.isDead());
      for (const element of this.particles) {
        element.run();
      }
    }
  }

  class Fireworks {
    fireworks: Firework[];

    constructor() {
      this.fireworks = [];
    }

    initFireworks() {
      const MAX_NUMBER = p5.random(10, 20);
      this.fireworks = [];

      for (let i = 0; i < MAX_NUMBER; i++) {
        this.fireworks.push(
          new Firework(
            p5.createVector(p5.random(p5.width), p5.random(p5.height)),
            p5.random(p5.height / 10, p5.height / 2),
          ),
        );

        this.fireworks[i].addParticle();
      }
    }
  }

  let system = new Fireworks();

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();

    system = new Fireworks();
    system.initFireworks();
  };

  p5.draw = () => {
    const AVERAGE_LIFE = 250;
    p5.background(0, 0.05);

    for (const element of system.fireworks) {
      element.run();
    }

    if (p5.frameCount % AVERAGE_LIFE <= 0) system.initFireworks();
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

export default function SketchFireworks02() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
