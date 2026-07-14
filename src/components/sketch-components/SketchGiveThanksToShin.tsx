import type { Sketch } from '@p5-wrapper/react';
import type P5 from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { disableP5FriendlyErrors } from '#/utils/disableP5FriendlyErrors';
import { getImagePath } from '#/utils/path';

const sketch: Sketch = (p5) => {
  disableP5FriendlyErrors(p5);

  const leaves: Leaf[] = [];
  const flowers: Flower[] = [];
  const stars: Star[] = [];
  const texts = ['木稠葉落更回春', '長緑生花旧約新', '森也深恩若忘却', '無量億劫畜生身'];
  const textsAnimDuration = 30;
  const textsHoldDuration = 60;
  const textsFadeOutDuration = 60;
  const intermissionFadeDuration = textsFadeOutDuration * 2;
  const textsFinalFadeInDuration = 120;
  const textsFlashDuration = 60;
  const textsFinalFadeOutDuration = 240;
  const oneTextDuration = textsAnimDuration * texts[0].length + textsHoldDuration;
  let textsLayer: P5.Graphics, intermissionLayer: P5.Graphics;
  let minchoFont: P5.Font;

  p5.setup = async () => {
    minchoFont = await p5.loadFont(getImagePath('/fonts/HinaMincho-Regular.ttf'));
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);

    intermissionLayer = p5.createGraphics(p5.width, p5.height);
    textsLayer = p5.createGraphics(p5.width, p5.height);

    for (let i = 0; i < 100; i++) {
      leaves.push(new Leaf());
    }

    const numberOfFlowers = 10;
    const maxSize = p5.width / numberOfFlowers;

    for (let i = 0; i < numberOfFlowers; i++) {
      flowers.push(new Flower(maxSize));
    }

    const numberOfStars = Math.floor(p5.width * p5.height * (6 / 1e5));

    for (let i = 0; i < numberOfStars; i++) {
      stars.push(new Star());
    }
  };

  p5.draw = () => {
    const leavesFadeOutEnd = oneTextDuration + intermissionFadeDuration;
    const flowersFadeInStart = leavesFadeOutEnd;
    const flowersFadeInEnd = flowersFadeInStart + oneTextDuration;
    const flowersFadeOutStart = flowersFadeInEnd;
    const flowersFadeOutEnd = flowersFadeOutStart + intermissionFadeDuration;
    const blackoutFadeInStart = flowersFadeOutEnd;
    const blackoutFadeInEnd = blackoutFadeInStart + oneTextDuration;
    const starsFadeInStart = blackoutFadeInEnd;
    const starsFadeInEnd = starsFadeInStart + intermissionFadeDuration;

    p5.background(0);
    p5.noStroke();

    if (p5.frameCount > oneTextDuration && p5.frameCount <= flowersFadeInEnd) {
      intermission(oneTextDuration, false);
    }

    if (p5.frameCount > flowersFadeOutStart && p5.frameCount <= flowersFadeOutEnd) {
      p5.blendMode(p5.BLEND);
      p5.background(0);
      intermission(flowersFadeOutStart, true);
    }

    if (p5.frameCount > starsFadeInStart && p5.frameCount <= starsFadeInEnd) {
      intermission(starsFadeInStart, true);
    }

    if (p5.frameCount <= leavesFadeOutEnd) {
      const factor = p5.max(
        0,
        1 - p5.max(0, p5.frameCount - oneTextDuration) / intermissionFadeDuration,
      );

      for (let i = 0; i < leaves.length; i++) {
        leaves[i].fall(factor);
      }
    }

    if (p5.frameCount > flowersFadeInStart && p5.frameCount <= flowersFadeOutEnd) {
      let factor = 1;

      if (p5.frameCount <= flowersFadeInEnd) {
        factor = p5.min(1, (p5.frameCount - flowersFadeInStart) / intermissionFadeDuration);
      }

      if (p5.frameCount > flowersFadeOutStart) {
        factor = p5.max(
          0,
          1 - p5.max(0, p5.frameCount - flowersFadeOutStart) / intermissionFadeDuration,
        );
      }

      p5.blendMode(p5.BLEND);
      p5.background(0, 0.05);
      p5.blendMode(p5.ADD);
      p5.noFill();

      for (let i = 0; i < flowers.length; i++) {
        flowers[i].bloom(factor);
      }
    }

    if (p5.frameCount > starsFadeInStart) {
      const factor = p5.min(1, (p5.frameCount - starsFadeInEnd) / intermissionFadeDuration);

      p5.blendMode(p5.BLEND);
      p5.background(0);
      p5.blendMode(p5.ADD);
      p5.noStroke();

      for (let i = 0; i < stars.length; i++) {
        stars[i].twinkle(factor);
      }
    }

    displayAllTexts(texts, p5.height / 15);
  };

  class Leaf {
    baseX: number;
    x: number;
    y: number;
    speed: number;
    leafSize: number;
    time: number;
    amplitude: number;
    angle: number;
    hue: number;

    constructor() {
      this.baseX = p5.random(p5.width);
      this.x = this.baseX;
      this.y = p5.random(p5.height);
      this.speed = p5.random(2, 5);
      this.leafSize = p5.random(5, 10);
      this.time = p5.random(900);
      this.amplitude = p5.random(20, 100);
      this.angle = 0;
      this.hue = p5.random(0, 40);
    }

    fall(brightnessFactor = 1) {
      this.y = this.y + this.speed;
      this.x = this.baseX + this.amplitude * p5.sin(this.time);
      this.time += 0.01;
      this.angle += 0.1;

      if (this.y > p5.height) {
        this.baseX = p5.random(p5.width);
        this.y = 0;
        this.speed = p5.random(2, 5);
        this.time = p5.random(900);
        this.amplitude = p5.random(20, 100);
        this.angle = 0;
        this.hue = p5.random(0, 40);
      }

      p5.push();
      p5.fill(this.hue, 100, 50 * brightnessFactor);
      p5.translate(this.x, this.y);
      p5.rotate(((this.time * p5.PI) / 3600) * this.angle);
      p5.ellipse(0, 0, this.leafSize, this.leafSize * 2);
      p5.pop();
    }
  }

  class Flower {
    maxSize: number;
    x: number;
    y: number;
    size: number;
    petals: number;

    constructor(maxSize: number) {
      this.maxSize = maxSize;
      this.x = p5.random(p5.width);
      this.y = p5.random(p5.height);
      this.size = p5.random(maxSize / 2, maxSize);
      this.petals = p5.random(4, 6);
    }

    bloom(brightnessFactor = 1) {
      const t = p5.frameCount / 5;
      const period = 90;
      const oscillation = 1 - p5.abs((t % (2 * period)) / period - 1);

      let direction = 3;

      p5.push();
      p5.translate(this.x, this.y);

      for (let r = 0; r < p5.TAU; r += p5.PI / this.petals) {
        const angle = r + (p5.sin(t / 50) / 3) * direction;
        const x = p5.cos(angle) * this.size;
        const y = p5.sin(angle) * this.size;
        p5.stroke(
          this.size + ((t + this.size) % 300),
          30,
          30 * brightnessFactor * oscillation,
          0.5,
        );
        p5.circle(x, y, this.size + (t % period));
        direction = -direction;
      }

      p5.pop();

      if (t % period === 0) {
        this.x = p5.random(p5.width);
        this.y = p5.random(p5.height);
        this.size = p5.random(this.maxSize / 2, this.maxSize);
        this.petals = p5.random(4, 6);
      }
    }
  }

  class Star {
    x: number;
    y: number;
    size: number;
    duration: number;

    constructor() {
      this.x = p5.random(p5.width);
      this.y = p5.random(p5.height);
      this.size = p5.random(5, 10);
      this.duration = p5.random(30, 60);
    }

    twinkle(brightnessFactor = 1) {
      const progress = 1 - p5.abs((p5.frameCount % (2 * this.duration)) / this.duration - 1);

      p5.push();
      p5.fill(this.duration * 2 + (p5.frameCount % 300), 50, 10 * progress * brightnessFactor);
      p5.translate(this.x, this.y);

      for (let l = 0; l < p5.HALF_PI; l += 0.1) {
        p5.ellipse(0, 0, p5.tan(l) * this.size, p5.tan(p5.HALF_PI - l) * this.size);
      }

      p5.pop();
    }
  }

  const displayAllTexts = (textsArray: string[], size: number) => {
    const phaseDuration =
      textsArray[0].length * textsAnimDuration + textsHoldDuration + intermissionFadeDuration;
    const phase2StartFrame = textsArray.length * phaseDuration;
    const finalXOffsets = [size * 3, size, -size, -size * 3];
    const maxBrightness = 10 * textsArray[0].length;

    textsLayer.clear();
    textsLayer.colorMode(p5.HSB);
    textsLayer.noStroke();
    textsLayer.textFont(minchoFont);
    textsLayer.textSize(size);

    // Phase 1: 1文字列ずつ順番にフェードイン→フェードアウト
    for (let j = 0; j < textsArray.length; j++) {
      const txt = textsArray[j];
      const startFrame = j * phaseDuration;
      const fadeOutStart = startFrame + txt.length * textsAnimDuration + textsHoldDuration;
      const textsFadeInDuration = txt.length * textsAnimDuration;

      if (p5.frameCount < startFrame || p5.frameCount >= startFrame + phaseDuration) continue;

      textsLayer.push();
      textsLayer.translate(
        (p5.width - size) / 2,
        (p5.height - size * 1.2 * txt.length + size * 1.2) / 2,
      );

      for (let i = 0; i < txt.length; i++) {
        const charProgress = p5.min(
          p5.max((p5.frameCount - startFrame - i * textsAnimDuration) / textsFadeInDuration, 0),
          1,
        );
        const fadeOutDuration = j === 0 ? textsFadeOutDuration : intermissionFadeDuration;
        const fadeOutProgress = p5.min(
          p5.max((p5.frameCount - fadeOutStart) / fadeOutDuration, 0),
          1,
        );

        textsLayer.fill(0, 0, maxBrightness * charProgress * (1 - fadeOutProgress));
        textsLayer.text(txt[i], 0, size * 1.2 * i);
      }

      textsLayer.pop();
    }

    // Phase 2: 全文字列が finalXOffsets の位置で同時フェードイン→燐光発光→フェードアウト
    if (p5.frameCount >= phase2StartFrame) {
      const flashStart = phase2StartFrame + textsFinalFadeInDuration;
      const fadeOutStart = flashStart + textsFlashDuration;
      const maxGlow = size * 1.2;

      let brightness: number, glowAmount: number;

      if (p5.frameCount < flashStart) {
        const t = (p5.frameCount - phase2StartFrame) / textsFinalFadeInDuration;
        brightness = maxBrightness * t;
        glowAmount = 0;
      } else if (p5.frameCount < fadeOutStart) {
        const t = (p5.frameCount - flashStart) / textsFlashDuration;
        brightness = maxBrightness;
        glowAmount = maxGlow * p5.sin(p5.PI * t);
      } else {
        const t = p5.min((p5.frameCount - fadeOutStart) / textsFinalFadeOutDuration, 1);
        brightness = maxBrightness * (1 - t);
        glowAmount = maxGlow * (1 - t);
      }

      // textsLayerはP2Dで生成しているためdrawingContextは2Dコンテキスト
      const textsContext = textsLayer.drawingContext as CanvasRenderingContext2D;

      for (let j = 0; j < textsArray.length; j++) {
        const txt = textsArray[j];

        textsLayer.push();
        textsLayer.translate(
          (p5.width - size) / 2 + finalXOffsets[j],
          (p5.height - size * 1.2 * txt.length + size * 1.2) / 2,
        );
        textsLayer.fill(0, 0, brightness);
        textsContext.shadowColor = '#cff';
        textsContext.shadowBlur = glowAmount;

        for (let i = 0; i < txt.length; i++) {
          textsLayer.text(txt[i], 0, size * 1.2 * i);
        }

        // 他の描画に影響しないように描画後にshadowBlurをリセット
        textsContext.shadowBlur = 0;
        textsLayer.pop();
      }
    }

    p5.image(textsLayer, 0, 0);
  };

  const intermission = (intermissionStart: number, isFadeIn: boolean) => {
    const elapsed = p5.frameCount - intermissionStart;

    let factor = p5.max(0, 1 - p5.max(0, elapsed) / intermissionFadeDuration);

    if (isFadeIn) {
      factor = p5.max(0, p5.min(1, 1 - p5.abs(elapsed / intermissionFadeDuration - 1)));
    }

    intermissionLayer.clear();
    intermissionLayer.colorMode(p5.HSB);
    intermissionLayer.noStroke();
    intermissionLayer.fill(0, 0, 0, 100 * factor);
    intermissionLayer.rect(0, 0, p5.width, p5.height);

    p5.image(intermissionLayer, 0, 0);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchGiveThanksToShin() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
