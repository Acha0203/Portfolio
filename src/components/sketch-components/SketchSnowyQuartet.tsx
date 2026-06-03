import type { Sketch } from '@p5-wrapper/react';
import type P5 from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { getImagePath } from '#/utils/path';

const sketch: Sketch = (p5) => {
  let img: P5.Image | undefined;

  p5.setup = async () => {
    img = await p5.loadImage(getImagePath('/images/snowy-quartet-texture.png'));
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    p5.noStroke();
  };

  p5.draw = () => {
    let angle = p5.frameCount * 0.01;

    p5.background(0);
    p5.blendMode(p5.ADD);

    if (img !== undefined) {
      p5.texture(img);
    }

    p5.rotateY(angle);
    p5.push();
    p5.rotateX(angle);
    p5.box(p5.width / 4);
    p5.rotateY(angle);
    p5.box(p5.width / 2);
    p5.push();
    p5.rotateY(angle);
    p5.rotateX(angle);
    p5.box(p5.width * (2 / 3));
    p5.pop();
    p5.pop();
    p5.box(p5.width);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchSnowyQuartet() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
