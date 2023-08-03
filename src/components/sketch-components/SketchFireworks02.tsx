import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchFireworks02 = () => {
  // A simple Particle class
  class Particle {
    acceleration: p5Types.Vector;
    velocity: p5Types.Vector;
    position: p5Types.Vector;
    lifespan: number;
    size: number;

    constructor(p5: p5Types, position: p5Types.Vector, x: number, y: number, size: number) {
      this.acceleration = p5.createVector(0, 0.005);
      this.velocity = p5.createVector(x, y);
      this.position = position.copy();
      this.lifespan = size;
      this.size = size;
    }

    run(p5: p5Types): void {
      this.update();
      this.display(p5);
    }

    // Method to update position
    update(): void {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= 2;
    }

    // Method to display
    display(p5: p5Types) {
      p5.fill((p5.frameCount + this.size) % 360, 90, this.lifespan, this.lifespan);
      p5.circle(this.position.x, this.position.y, p5.random(this.size - this.lifespan) / 50);
    }

    // Is the particle still useful?
    isDead() {
      return this.lifespan < 0;
    }
  }

  class Firework {
    origin: p5Types.Vector;
    particles: Particle[];
    size: number;

    constructor(position: p5Types.Vector, size: number) {
      this.origin = position.copy();
      this.particles = [];
      this.size = size;
    }

    addParticle(p5: p5Types) {
      for (let r = 0; r < p5.TAU; r += p5.PI / 10) {
        this.particles.push(new Particle(p5, this.origin, Math.cos(r), Math.sin(r), this.size));
      }
    }

    run(p5: p5Types) {
      this.particles = this.particles.filter((p) => !p.isDead());
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].run(p5);
      }
    }
  }

  class Fireworks {
    fireworks: Firework[];

    constructor() {
      this.fireworks = [];
    }

    initFireworks(p5: p5Types) {
      this.fireworks = [];

      for (let i = 0; i < p5.width / 70; i++) {
        this.fireworks.push(
          new Firework(
            p5.createVector(p5.random(p5.width), p5.random(p5.height)),
            p5.random(p5.width / 10, p5.width / 2),
          ),
        );

        this.fireworks[i].addParticle(p5);
      }
    }
  }

  let system = new Fireworks();

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    p5.noStroke();

    system = new Fireworks();
    system.initFireworks(p5);
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 0.05);

    for (let i = 0; i < system.fireworks.length; i++) {
      system.fireworks[i].run(p5);
    }

    if (p5.frameCount % 250 <= 0) system.initFireworks(p5);
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchFireworks02;
