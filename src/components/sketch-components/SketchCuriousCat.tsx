import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React from 'react';

const sketch: Sketch = (p5) => {
  let isMobile = false;

  const userAgentInfo = window.navigator.userAgent.toLowerCase();

  if (
    userAgentInfo.includes('android') ||
    userAgentInfo.includes('iphone') ||
    userAgentInfo.includes('ipad')
  ) {
    isMobile = true;
  } else {
    isMobile = false;
  }

  const drawEars = (d: number) => {
    p5.triangle(
      p5.width / 2 - 90 * d,
      p5.height / 2 - 180,
      p5.width / 2 - 120 * d,
      p5.height / 2 - 70,
      p5.width / 2 - 20 * d,
      p5.height / 2 - 100,
    );
  };

  const drawWhiskers = (x: number, y: number, d: number) => {
    p5.line(x - 100 * d, y + 30, x - 50 * d, y + 50);
    p5.line(x - 100 * d, y + 60, x - 50 * d, y + 60);
    p5.line(x - 100 * d, y + 90, x - 50 * d, y + 70);
  };

  const drawEyes = (x: number, y: number) => {
    p5.circle(x - 70, y, 50);
    p5.circle(x + 70, y, 50);
  };

  const drawEyeLights = (x: number, y: number) => {
    p5.circle(x - 60, y - 10, 9);
    p5.circle(x + 80, y - 10, 9);
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    let x = p5.width / 2;
    let y = p5.height / 2;

    if (isMobile) {
      const v = p5.createVector(p5.mouseX - p5.width / 2, p5.mouseY - p5.height / 2);
      v.setMag(p5.min(v.mag(), 50));
      x = p5.width / 2 + v.x;
      y = p5.height / 2 + v.y;
    } else {
      x += Math.floor(p5.movedX / 2);
      y += Math.floor(p5.movedY / 2);
    }

    p5.clear();
    p5.background(255, 200);
    p5.noStroke();

    p5.fill(0);
    p5.ellipse(p5.width / 2, p5.height / 2, 300, 250);
    drawEars(1);
    drawEars(-1);

    p5.fill(50);
    drawEyes(x, y);
    p5.rect(x - 2, y + 30, 4, 40);
    p5.rect(x - 20, y + 70, 40, 4);
    p5.ellipse(x, y + 40, 30, 20);

    p5.fill(255);
    drawEyeLights(x, y);

    p5.stroke(50);
    drawWhiskers(x, y, 1);
    drawWhiskers(x, y, -1);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchCuriousCat() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
