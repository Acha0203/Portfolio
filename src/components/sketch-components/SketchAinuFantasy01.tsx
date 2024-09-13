import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react';
import type { Graphics } from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  let hasCreated = false;
  let layer1: Graphics;
  let layer2: Graphics;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    p5.clear();
    p5.background(0);

    if (!hasCreated) {
      layer1 = p5.createGraphics(p5.width, p5.height);
      layer2 = p5.createGraphics(p5.width, p5.height);
      hasCreated = true;
    }

    drawBackground(layer1, 50);
    p5.image(layer1, 0, 0);

    p5.push();
    p5.imageMode(p5.CENTER);
    p5.translate(p5.width / 2, p5.height / 2);
    p5.image(layer2, 0, 0);
    p5.pop();

    drawAll(layer2);
  };

  const drawAll = (layer: Graphics) => {
    const ainuPatternA = new AinuPattern(layer, 0, -p5.height * 0.6);
    const ainuPatternB = new AinuPattern(layer, 0, -p5.height * 0.4);

    layer.background(0, 20);
    layer.noStroke();
    layer.erase(200);

    layer.push();
    layer.translate(p5.width / 2, p5.height / 2);
    layer.scale(0.4);
    layer.rotate(p5.frameCount * 0.05);

    layer.scale(0.4 + (p5.frameCount % 60) * 0.05);

    for (let i = 0; i < 4; i++) {
      layer.rotate(p5.HALF_PI * i);
      ainuPatternA.drawPatternA(p5);
    }
    layer.pop();

    layer.push();
    layer.translate(p5.width / 2, p5.height / 2);
    layer.scale(0.46);
    layer.rotate(p5.HALF_PI / 2 + p5.frameCount * 0.05);

    layer.scale(0.4 + (p5.frameCount % 60) * 0.05);

    for (let i = 0; i < 4; i++) {
      layer.rotate(p5.HALF_PI * i);
      ainuPatternB.drawPatternB(p5);
    }
    layer.pop();
  };

  const drawBackground = (layer: Graphics, n: number) => {
    layer.background(0);
    layer.colorMode(p5.HSB);
    layer.noStroke();

    const step = p5.width / n;
    const m = p5.height / step;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const p = Math.sin(p5.TAU * p5.noise(i * 0.01, j * 0.01, p5.frameCount * 0.04));
        layer.fill(210 + p * 60, 100, 100);
        layer.square(step * i, (p5.height / m) * j, step + 2);
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

class AinuPattern {
  layer: Graphics;
  cx: number;
  cy: number;

  constructor(layer: Graphics, cx: number, cy: number) {
    this.layer = layer;
    this.cx = cx;
    this.cy = cy;
  }

  drawSpiral(p5: P5CanvasInstance, centerX: number, maxRadian: number, direction: number) {
    const spiralCenterX = centerX * direction;
    for (let r = 0; r < maxRadian; r += p5.PI / 180) {
      const p = (r * p5.height) / 100;
      const x = Math.cos(r) * p * direction + (this.cx - spiralCenterX);
      const y = Math.sin(r) * p + this.cy;
      this.layer.circle(x, y, r + p5.height / 64);
    }
  }

  drawKnot(
    p5: P5CanvasInstance,
    size: number,
    thickness: number,
    spiralRadian: number,
    maxRadian: number,
    direction: number,
  ) {
    const spiralCenterY = Math.sin(spiralRadian) * spiralRadian * (p5.height / 100);

    for (let r = 1.5 * p5.PI; r < maxRadian; r += p5.PI / 180) {
      const x = Math.pow(Math.cos(r), 3) * size * direction + this.cx;
      const y = Math.pow(Math.sin(r), 3) * size + this.cy + spiralCenterY + p5.height / 520;
      this.layer.circle(x, y, r * thickness);
    }
  }

  drawThorn(p5: P5CanvasInstance, direction: number) {
    const startPointX = Math.cos(2 * p5.PI) * (p5.height / 14) * direction;

    for (let i = 0; i < p5.height / 2; i += 1) {
      const r = i * (p5.PI / (p5.height / 4));
      const x = Math.cos(r) * (p5.height / 14) * direction + this.cx - startPointX;
      const y = i + Math.cos(r) * (p5.height / 40) + this.cy - p5.height / 150;
      this.layer.circle(x, y, p5.height / 30 - r);
    }
  }

  drawPatternA(p5: P5CanvasInstance) {
    const maxRadian = p5.TAU * 2.02;
    const centerX = (Math.cos(maxRadian) * maxRadian * p5.height) / 100;
    const size = p5.height / 7;
    const thickness = p5.height / 260;
    const spiralRadian = p5.TAU * 1.75;

    this.drawSpiral(p5, centerX, maxRadian, 1);
    this.drawSpiral(p5, centerX, maxRadian, -1);
    this.drawKnot(p5, size, thickness, spiralRadian, p5.TAU, 1);
    this.drawKnot(p5, size, thickness, spiralRadian, p5.TAU, -1);
    this.drawThorn(p5, 1);
    this.drawThorn(p5, -1);
  }

  drawPatternB(p5: P5CanvasInstance) {
    const centerX = (Math.cos(p5.TAU) * p5.TAU * p5.height) / 100 + p5.TAU + p5.height / 256;
    let maxRadian = p5.TAU * 1.72;

    this.drawSpiral(p5, centerX, maxRadian, 1);
    this.drawSpiral(p5, centerX, maxRadian, -1);

    let size = p5.height / 10;
    let thickness = p5.height / 220;
    let spiralRadian = p5.TAU * 1.73;
    maxRadian = (p5.TAU * 35) / 36;

    this.drawKnot(p5, size, thickness, spiralRadian, maxRadian, 1);
    this.drawKnot(p5, size, thickness, spiralRadian, maxRadian, -1);

    size = p5.height / 20;
    thickness = p5.height / 250;
    spiralRadian = p5.TAU * 1.58;

    this.drawKnot(p5, size, thickness, spiralRadian, maxRadian, 1);
    this.drawKnot(p5, size, thickness, spiralRadian, maxRadian, -1);
  }
}

export default function SketchAinuFantasy01() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
