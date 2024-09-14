import type { Sketch } from '@p5-wrapper/react';
import type { Image } from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  let img: Image;

  p5.preload = () => {
    img = p5.loadImage('https://acha0203.github.io/Portfolio/images/symmetrical-ruler-03-m.png');
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    p5.noStroke();
    p5.blendMode(p5.SCREEN);
  };

  p5.draw = () => {
    p5.background(0);

    if (img !== undefined) {
      p5.texture(img);
    } else {
      p5.preload();
    }

    p5.rotateY(p5.frameCount * -0.01);
    p5.push();
    p5.rotateX(p5.QUARTER_PI);
    p5.box(p5.width / 2);
    p5.rotateY(p5.QUARTER_PI);
    p5.box(p5.width / 2);
    p5.push();
    p5.rotateY(p5.QUARTER_PI);
    p5.rotateX(p5.QUARTER_PI);
    p5.box(p5.width / 2);
    p5.pop();
    p5.pop();
    p5.box(p5.width / 2);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchIllusion() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
