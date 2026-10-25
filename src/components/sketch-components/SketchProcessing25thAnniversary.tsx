import type { Sketch } from '@p5-wrapper/react';
import type P5 from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { disableP5FriendlyErrors } from '#/utils/disableP5FriendlyErrors';
import { getImagePath } from '#/utils/path';

const sketch: Sketch = (p5) => {
  disableP5FriendlyErrors(p5);

  const GRID_SIZE = 5;
  const MESSAGES = ['Processing', '25th', 'Anniversary!'];
  const LINE_HEIGHT = 1.4;

  let flowers: Flower[] = [];
  let textsLayer: P5.Graphics;
  let beauRivageFont: P5.Font;

  p5.setup = async () => {
    beauRivageFont = await p5.loadFont(getImagePath('/fonts/BeauRivage-Regular.ttf'));
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();

    initLayout();
  };

  p5.draw = () => {
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.05);
    p5.blendMode(p5.ADD);

    p5.image(textsLayer, 0, 0);
    flowers.forEach((flower) => flower.bloom());
  };

  class Flower {
    x: number;
    y: number;
    flowerSize: number;
    randomFactor: number;

    constructor(x: number, y: number, radius: number) {
      this.x = x;
      this.y = y;
      this.flowerSize = radius * 0.9;
      this.randomFactor = p5.random(1, 3);
    }

    bloom() {
      p5.push();
      p5.translate(this.x, this.y);
      this.drawPetals(3 * this.randomFactor, this.flowerSize, 0.1);
      this.drawPetals(5 * this.randomFactor, this.flowerSize * 1.7, 2);
      this.drawPetals(4 * this.randomFactor, this.flowerSize * 2.2, 0.5);
      p5.pop();
    }

    drawPetals(petalCount: number, maxLength: number, swing: number) {
      const count = Math.round(petalCount);
      const swingAngle = p5.sin(p5.frameCount / 50) * swing;
      const petalLength = p5.noise(p5.frameCount / 100 + this.randomFactor * 100) * maxLength;
      const diameter =
        (petalLength / this.randomFactor) * p5.sin(p5.frameCount / (this.randomFactor * 5));

      p5.fill((p5.frameCount + petalCount * this.randomFactor * 3) % 360, 100, 30, 0.02);

      for (let i = 0; i < count * 2; i++) {
        const direction = i % 2 === 0 ? 1 : -1;
        const angle = (i * p5.PI) / count + swingAngle * direction;
        p5.circle(p5.cos(angle) * petalLength, p5.sin(angle) * petalLength, diameter);
      }
    }
  }

  const initLayout = () => {
    const fontSize = Math.min(p5.width, p5.height) * 0.1;

    textsLayer = createTextsLayer(MESSAGES, fontSize);
    flowers = createFlowers();
  };

  const createTextsLayer = (messages: string[], fontSize: number) => {
    const layer = p5.createGraphics(p5.width, p5.height);
    const centerIndex = (messages.length - 1) / 2;

    layer.fill(255);
    layer.textSize(fontSize);
    layer.textFont(beauRivageFont);
    layer.textAlign(p5.CENTER, p5.CENTER);

    messages.forEach((message, i) => {
      const y = p5.height / 2 + (i - centerIndex) * LINE_HEIGHT * fontSize;
      layer.text(message, p5.width / 2, y);
    });

    return layer;
  };

  const createFlowers = () => {
    const pictureSize = Math.min(p5.width, p5.height) * 0.9;
    const cellSize = pictureSize / GRID_SIZE;
    const firstX = p5.width / 2 - pictureSize / 2;
    const firstY = p5.height / 2 - pictureSize / 2;

    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
      const { x, y } = calcCellCenter(firstX, firstY, cellSize, i);
      return new Flower(x, y, cellSize / 2);
    });
  };

  const calcCellCenter = (firstX: number, firstY: number, cellSize: number, index: number) => {
    const row = Math.floor(index / GRID_SIZE);
    const column = index % GRID_SIZE;

    return {
      x: firstX + (column + 0.5) * cellSize,
      y: firstY + (row + 0.5) * cellSize,
    };
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
    textsLayer.remove();
    initLayout();
  };
};

export default function SketchProcessing25thAnniversary() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
