import type { Sketch } from '@p5-wrapper/react';
import type P5 from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { disableP5FriendlyErrors } from '#/utils/disableP5FriendlyErrors';
import { getImagePath } from '#/utils/path';

const sketch: Sketch = (p5) => {
  disableP5FriendlyErrors(p5);

  let img: P5.Image | undefined;

  p5.setup = async () => {
    img = await p5.loadImage(getImagePath('/images/symmetrical-ruler-03-m.png'));
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    p5.noStroke();
    p5.blendMode(p5.SCREEN);
  };

  p5.draw = () => {
    p5.background(0);

    if (img !== undefined) {
      p5.texture(img);
    }

    p5.rotateY(p5.frameCount * -0.01);
    p5.push();
    p5.rotateX(p5.QUARTER_PI);
    p5.box(p5.width / 3);
    p5.rotateY(p5.QUARTER_PI);
    p5.box(p5.width / 3);
    p5.push();
    p5.rotateY(p5.QUARTER_PI);
    p5.rotateX(p5.QUARTER_PI);
    p5.box(p5.width / 3);
    p5.pop();
    p5.pop();
    p5.box(p5.width / 3);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchIllusion() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
