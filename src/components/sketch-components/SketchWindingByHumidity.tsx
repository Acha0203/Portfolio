import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { disableP5FriendlyErrors } from '#/utils/disableP5FriendlyErrors';

const sketch: Sketch = (p5) => {
  disableP5FriendlyErrors(p5);

  const frequency = 5;
  const animDuration = 60; // 約1秒（60fps想定）でフルの波形に到達
  const hairDiameter = 5;
  const numbersOfHair = 30;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noStroke();
  };

  p5.draw = () => {
    const progress = 1 - p5.abs((p5.frameCount % (2 * animDuration)) / animDuration - 1);
    const baseColorR = 0;
    const baseColorG = 0;
    const baseColorB = 0;

    p5.background(baseColorR, baseColorG, baseColorB);

    let endColorR = 30;
    let endColorG = 0;
    let endColorB = 150;
    let startX = p5.width / 2 - numbersOfHair * hairDiameter;

    drawHair(startX, progress, baseColorR, baseColorG, baseColorB, endColorR, endColorG, endColorB);

    startX = p5.width / 2;
    endColorR = 60;
    endColorG = 20;
    endColorB = 200;

    drawHair(startX, progress, endColorR, endColorG, endColorB, baseColorR, baseColorG, baseColorB);
  };

  const amountOfColorChange = (startColor: number, endColor: number) => {
    return (endColor - startColor) / numbersOfHair;
  };

  const drawHair = (
    startX: number,
    progress: number,
    startColorR: number,
    startColorG: number,
    startColorB: number,
    endColorR: number,
    endColorG: number,
    endColorB: number,
  ) => {
    const redValue = amountOfColorChange(startColorR, endColorR);
    const greenValue = amountOfColorChange(startColorG, endColorG);
    const blueValue = amountOfColorChange(startColorB, endColorB);

    for (let i = 0; i < numbersOfHair; i++) {
      const x = startX + hairDiameter * i;
      const colorR = startColorR + redValue * i;
      const colorG = startColorG + greenValue * i;
      const colorB = startColorB + blueValue * i;

      p5.fill(colorR, colorG, colorB);
      drawOneHair(x, progress);
    }
  };

  const drawOneHair = (startX: number, progress: number) => {
    for (let i = 1; i < p5.height; i++) {
      p5.circle(
        startX + p5.width * (i * 0.0002) * p5.sin((i * frequency * p5.TAU) / p5.height) * progress,
        i,
        hairDiameter,
      );
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchWindingByHumidity() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
