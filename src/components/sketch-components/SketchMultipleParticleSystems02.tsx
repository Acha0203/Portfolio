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

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    systems = [];
  };

  p5.draw = () => {
    p5.background(0);

    for (const element of systems) {
      element.run();
      element.addParticle();
    }

    if (systems.length === 0) {
      p5.fill(255);
      p5.textAlign(p5.CENTER);
      p5.textSize(32);
      p5.text('click mouse', p5.width / 2, p5.height / 2 - 50);
      p5.text('to add', p5.width / 2, p5.height / 2);
      p5.text('particle systems', p5.width / 2, p5.height / 2 + 50);
    }
  };

  p5.mousePressed = () => {
    green -= 20 * greenD;
    blue += 20 * blueD;

    if (green >= 240 || green <= 100) {
      greenD *= -1;
    }

    if (blue >= 240 || blue <= 100) {
      blueD *= -1;
    }

    const p = new ParticleSystem(p5.createVector(p5.mouseX, p5.mouseY), green, blue);
    systems.push(p);
  };

  /// A simple Particle class
  class Particle {
    acceleration: Vector;
    velocity: Vector;
    position: Vector;
    lifespan: number;
    size: number;

    constructor(position: Vector, size: number) {
      this.acceleration = p5.createVector(0, 0.05);
      this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 0));
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

    constructor(position: Vector, green: number, blue: number) {
      this.origin = position.copy();
      this.particles = [];
      this.green = green;
      this.blue = blue;
    }

    addParticle() {
      const p = new Particle(this.origin, p5.random(5, 25));

      this.particles.push(p);
    }

    run() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.run(this.green, this.blue);
        if (p.isDead()) {
          this.particles.splice(i, 1);
        }
      }
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchMultipleParticleSystems02() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
