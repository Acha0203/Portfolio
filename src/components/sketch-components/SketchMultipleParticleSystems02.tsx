import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchMultipleParticleSystems02 = () => {
  let systems: ParticleSystem[] = [];
  let green = 100;
  let blue = 150;
  let greenD = 1;
  let blueD = 1;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    systems = [];
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    for (let i = 0; i < systems.length; i++) {
      systems[i].run(p5);
      systems[i].addParticle(p5);
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

  const mousePressed = (p5: p5Types) => {
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
    acceleration: p5Types.Vector;
    velocity: p5Types.Vector;
    position: p5Types.Vector;
    lifespan: number;
    size: number;

    constructor(p5: p5Types, position: p5Types.Vector, size: number) {
      this.acceleration = p5.createVector(0, 0.05);
      this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 0));
      this.position = position.copy();
      this.lifespan = 255.0;
      this.size = size;
    }

    run(p5: p5Types, green: number, blue: number) {
      this.update();
      this.display(p5, green, blue);
    }

    // Method to update position
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= 2;
    }

    // Method to display
    display(p5: p5Types, green: number, blue: number) {
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
    origin: p5Types.Vector;
    particles: Particle[];
    green: number;
    blue: number;

    constructor(position: p5Types.Vector, green: number, blue: number) {
      this.origin = position.copy();
      this.particles = [];
      this.green = green;
      this.blue = blue;
    }

    addParticle(p5: p5Types) {
      const p = new Particle(p5, this.origin, p5.random(5, 25));

      this.particles.push(p);
    }

    run(p5: p5Types) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.run(p5, this.green, this.blue);
        if (p.isDead()) {
          this.particles.splice(i, 1);
        }
      }
    }
  }

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <Sketch setup={setup} draw={draw} windowResized={windowResized} mousePressed={mousePressed} />
  );
};

export default SketchMultipleParticleSystems02;
