import type { Sketch } from '@p5-wrapper/react';
import type { Vector } from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  let systems: ParticleSystem[] = [];
  let green = 100;
  let blue = 150;
  let greenD = 1;
  let blueD = 1;
  let isFirst = true;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    systems = [];
    addNewParticles(p5.width / 2, p5.height / 2);
  };

  p5.draw = () => {
    p5.background(0);

    for (let i = 0; i < systems.length; i++) {
      systems[i].run();
      systems[i].addParticle();

      if (systems[i].number <= 0 && systems[i].particles.length <= 0) {
        systems.splice(i, 1);
      }
    }

    if (systems.length === 0) {
      if (isFirst) {
        addNewParticles(p5.width / 2, p5.height / 2);
        isFirst = false;
      } else {
        isFirst = p5.frameCount % 400 === 0;
      }
    }
  };

  p5.mousePressed = () => {
    if (isHit(p5.mouseX, p5.mouseY)) {
      addNewParticles(p5.mouseX, p5.mouseY);
    }
  };
  const addNewParticles = (x: number, y: number) => {
    green -= 20 * greenD;
    blue += 20 * blueD;

    if (green >= 240 || green <= 100) {
      greenD *= -1;
    }

    if (blue >= 240 || blue <= 100) {
      blueD *= -1;
    }

    const p = new ParticleSystem(p5.createVector(x, y), green, blue);
    systems.push(p);
  };

  const isHit = (x: number, y: number) => {
    for (const element of systems) {
      for (const particle of element.particles) {
        if (
          x <= particle.position.x + Number(particle.size) / 2 &&
          x >= particle.position.x - Number(particle.size) / 2 &&
          y <= particle.position.y + Number(particle.size) / 2 &&
          y >= particle.position.y - Number(particle.size) / 2
        ) {
          console.log('Hit!');

          return true;
        }
      }
    }

    return false;
  };

  /// A simple Particle class
  class Particle {
    acceleration: Vector;
    velocity: Vector;
    position: Vector;
    lifespan: number;
    size: number;

    constructor(position: Vector, size: number) {
      this.acceleration = p5.createVector(0, 0.02);
      this.velocity = p5.createVector(p5.random(-5, 5), p5.random(-5, 5));
      this.position = position.copy();
      this.lifespan = 255.0;
      this.size = size;
    }

    run(green: number, blue: number) {
      this.update();
      this.display(green, blue);
    }

    // Method to update position
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= 2;
    }

    // Method to display
    display(green: number, blue: number) {
      p5.stroke(0, green + 50, blue + 50, this.lifespan);
      p5.strokeWeight(2);
      p5.fill(0, green, blue, this.lifespan);
      p5.ellipse(this.position.x, this.position.y, this.size, this.size);
    }

    // Is the particle still useful?
    isDead(): boolean {
      if (this.lifespan < 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  class ParticleSystem {
    origin: Vector;
    particles: Particle[];
    green: number;
    blue: number;
    number: number;

    constructor(position: Vector, green: number, blue: number) {
      this.origin = position.copy();
      this.particles = [];
      this.green = green;
      this.blue = blue;
      this.number = 100;
    }

    addParticle() {
      if (this.number > 0) {
        const p = new Particle(this.origin, p5.random(5, 30));

        this.particles.push(p);
      }
    }

    run() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.run(this.green, this.blue);
        if (p.isDead()) {
          this.particles.splice(i, 1);
          this.number--;
        }
      }
    }

    destroySystem() {
      this.particles = [];
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchMultipleParticleSystems03() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
