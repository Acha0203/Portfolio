import type { Sketch } from '@p5-wrapper/react';
import type P5 from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { getImagePath } from '#/utils/path';

const sketch: Sketch = (p5) => {
  let img: P5.Image | undefined;

  p5.setup = async () => {
    img = await p5.loadImage(getImagePath('/images/flow-field-03-lg.png'));

    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    p5.colorMode(p5.HSB);
  };

  p5.draw = () => {
    let angle = p5.frameCount * 0.01;

    p5.background(0);
    p5.blendMode(p5.ADD);

    if (img !== undefined) {
      p5.texture(img);
    }

    p5.rotateY(angle);

    Array.from({ length: 12 }, (_, i) => 1 + i).forEach((r) => {
      p5.tint(p5.frameCount % (r * 30), 90, 90);
      p5.cylinder(p5.frameCount % (r * 90), 200, 90, 1, false, false);
    });
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchCastleWithTwelveRamparts() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
