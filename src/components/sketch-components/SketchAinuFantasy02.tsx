import type { Sketch } from '@p5-wrapper/react';
import type P5 from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';
import { getImagePath } from '#/utils/path';

const sketch: Sketch = (p5) => {
  let hasCreated = false;
  let img: P5.Image | undefined;
  let layer1: P5.Graphics;
  let layer2: P5.Graphics;

  p5.setup = async () => {
    img = await p5.loadImage(getImagePath('/images/ainu-pattern-03-m3.png'));
    hasCreated = false;
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    p5.clear();
    p5.blendMode(p5.MULTIPLY);

    if (!hasCreated) {
      layer1 = p5.createGraphics(p5.width, p5.height);
      layer2 = p5.createGraphics(p5.width, p5.height, p5.WEBGL);
      hasCreated = true;
    }

    drawBackground(layer1, 50);
    drawAinuSphere(layer2);

    let w: number;
    let h: number;

    if (p5.width > p5.height) {
      w = p5.width;
      h = layer1.height * (p5.width / layer1.width);
    } else {
      w = layer1.width * (p5.height / layer1.height);
      h = p5.height;
    }

    p5.image(layer1, 0, 0, w, h);
    p5.image(layer2, 0, 0, w, h);
  };

  const drawAinuSphere = (layer: P5.Graphics) => {
    layer.clear();
    layer.background(0);
    layer.blendMode(p5.SCREEN);
    layer.noStroke();

    if (img !== undefined) {
      layer.texture(img);
    }

    layer.push();
    layer.rotateY(p5.frameCount * 0.02);
    layer.sphere(p5.height / 12);
    layer.rotateY(p5.frameCount * 0.02);
    layer.sphere(p5.height / 8);
    layer.pop();
    layer.push();
    layer.rotateY(p5.frameCount * 0.02);
    layer.sphere(p5.height / 6);
    layer.pop();
    layer.push();
    layer.rotateX(p5.frameCount * 0.02);
    layer.sphere((p5.height * 5) / 24);
    layer.rotateY(p5.frameCount * -0.02);
    layer.sphere(p5.height / 4);
    layer.pop();
  };

  const drawBackground = (layer: P5.Graphics, n: number) => {
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
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchAinuFantasy02() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
