import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchMultipleParticleSystems03 = () => {
  let systems: ParticleSystem[] = [];
  let green = 100;
  let blue = 150;
  let greenD = 1;
  let blueD = 1;
  let isFirst = true;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    systems = [];
    addNewParticles(p5, p5.width / 2, p5.height / 2);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);

    for (let i = 0; i < systems.length; i++) {
      systems[i].run(p5);
      systems[i].addParticle(p5);

      if (systems[i].number <= 0 && systems[i].particles.length <= 0) {
        systems.splice(i, 1);
      }
    }

    if (systems.length === 0) {
      if (isFirst) {
        addNewParticles(p5, p5.width / 2, p5.height / 2);
        isFirst = false;
      } else {
        isFirst = p5.frameCount % 400 === 0;
      }
    }
  };

  const mousePressed = (p5: p5Types) => {
    if (isHit(p5.mouseX, p5.mouseY)) {
      addNewParticles(p5, p5.mouseX, p5.mouseY);
    }
  };
  const addNewParticles = (p5: p5Types, x: number, y: number) => {
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
    for (let i = 0; i < systems.length; i++) {
      for (let j = 0; j < systems[i].particles.length; j++) {
        if (
          x <= systems[i].particles[j].position.x + systems[i].particles[j].size / 2 &&
          x >= systems[i].particles[j].position.x - systems[i].particles[j].size / 2 &&
          y <= systems[i].particles[j].position.y + systems[i].particles[j].size / 2 &&
          y >= systems[i].particles[j].position.y - systems[i].particles[j].size / 2
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
    acceleration: p5Types.Vector;
    velocity: p5Types.Vector;
    position: p5Types.Vector;
    lifespan: number;
    size: number;

    constructor(p5: p5Types, position: p5Types.Vector, size: number) {
      this.acceleration = p5.createVector(0, 0.02);
      this.velocity = p5.createVector(p5.random(-5, 5), p5.random(-5, 5));
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
    number: number;

    constructor(position: p5Types.Vector, green: number, blue: number) {
      this.origin = position.copy();
      this.particles = [];
      this.green = green;
      this.blue = blue;
      this.number = 100;
    }

    addParticle(p5: p5Types) {
      if (this.number > 0) {
        const p = new Particle(p5, this.origin, p5.random(5, 30));

        this.particles.push(p);
      }
    }

    run(p5: p5Types) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.run(p5, this.green, this.blue);
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

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <Sketch setup={setup} draw={draw} windowResized={windowResized} mousePressed={mousePressed} />
  );
};

export default SketchMultipleParticleSystems03;
