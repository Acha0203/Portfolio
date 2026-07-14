import type { Sketch } from '@p5-wrapper/react';
import type P5 from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { disableP5FriendlyErrors } from '#/utils/disableP5FriendlyErrors';

const sketch: Sketch = (p5) => {
  disableP5FriendlyErrors(p5);

  const outlineWeight = 8;
  const scrollSpeed = 1;
  let layer1: P5.Graphics, layer2: P5.Graphics, layer3: P5.Graphics;
  let patternSize = 0;
  let movement = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    // sizeは基本となる正方形の1辺の長さ
    const baseSquareSize = Math.floor(Math.min(p5.width, p5.height) * 0.4);
    // 基本となる正方形の対角線の長さ
    const baseSquareDiagonal = baseSquareSize * Math.sqrt(2);

    // パターン1つの大きさ（レイヤーの1辺の長さ）
    patternSize = baseSquareDiagonal - baseSquareSize * 0.2 - outlineWeight;

    // パターンの対角線の長さ
    const patternDiagonal = patternSize * Math.sqrt(2);
    // 基本となる正方形の対角線上に描画する長方形の幅
    const rectWidth = baseSquareSize * 0.2;
    // 基本となる正方形の対角線上に描画する長方形の長さ
    const rectHeight = patternDiagonal + outlineWeight;

    layer1 = p5.createGraphics(patternSize, patternSize);
    layer1.noStroke();
    layer1.rectMode(p5.CENTER);
    layer1.translate(patternSize / 2, patternSize / 2);

    // 中心の十二芒星を描画
    drawCentralStar(rectWidth);

    // 周囲の五芒星を描画
    let angle = 0;

    for (let i = 0; i < 12; i++) {
      layer1.push();
      layer1.rotate(angle);
      drawTwelveStars(baseSquareSize, baseSquareDiagonal, rectWidth);
      layer1.pop();
      angle += p5.HALF_PI / 3;
    }

    // 四隅の八芒星を描画
    drawCornersStars(rectWidth, patternSize);

    // layer2にイスラム文様を描画
    drawSquares(
      patternSize,
      baseSquareDiagonal,
      baseSquareSize,
      rectWidth,
      rectHeight,
      0,
      0,
      30,
      100,
      20,
      30,
      0,
      100,
    );

    // layer1とlayer2をlayer3にまとめる
    layer3 = p5.createGraphics(patternSize, patternSize);

    layer3.image(layer2, 0, 0);
    layer3.image(layer1, 0, 0);
  };

  p5.draw = () => {
    for (let h = -1; h < p5.height / patternSize; h++) {
      for (let w = -1; w < p5.width / patternSize; w++) {
        p5.image(layer3, w * patternSize + movement, h * patternSize + movement);
      }
    }

    movement += scrollSpeed;

    // 1パターン分動いたら0に戻す
    if (movement >= patternSize) {
      movement = 0;
    }
  };

  const drawCentralStar = (rectWidth: number) => {
    layer1.fill(60, 80, 30);
    layer1.push();
    layer1.rotate(p5.QUARTER_PI);

    for (let i = 0; i < 3; i++) {
      layer1.rotate(p5.HALF_PI / 3);
      layer1.push();
      layer1.square(0, 0, rectWidth - 7);
      layer1.rotate(p5.QUARTER_PI);
      layer1.pop();
    }

    layer1.pop();
  };

  const drawGradation = (
    layer: P5.Graphics,
    radius: number,
    r1: number,
    g1: number,
    b1: number,
    a1: number,
    r2: number,
    g2: number,
    b2: number,
    a2: number,
  ) => {
    const from = p5.color(r1, g1, b1, a1);
    const to = p5.color(r2, g2, b2, a2);

    layer.noFill();
    layer.strokeWeight(1);

    for (let i = 0; i < radius; i++) {
      const interColor = p5.lerpColor(from, to, i / radius);

      layer.stroke(interColor);
      layer.circle(0, 0, radius - i);
    }
  };

  const drawSquares = (
    patternSize: number,
    patternDiagonal: number,
    baseSquareSize: number,
    rectWidth: number,
    rectHeight: number,
    r1: number,
    g1: number,
    b1: number,
    a1: number,
    r2: number,
    g2: number,
    b2: number,
    a2: number,
  ) => {
    layer2 = p5.createGraphics(patternSize, patternSize);
    layer2.rectMode(p5.CENTER);
    layer2.blendMode(p5.BLEND);
    layer2.background(50, 50, 80);
    layer2.blendMode(p5.ADD);
    layer2.stroke(255, 255, 255);
    layer2.strokeWeight(outlineWeight);
    layer2.fill(r1, g1, b1, a1);
    layer2.translate(patternSize / 2, patternSize / 2);

    for (let i = 0; i < 3; i++) {
      layer2.rotate(p5.HALF_PI / 3);

      layer2.push();
      layer2.square(0, 0, baseSquareSize);
      layer2.fill(r2, g2, b2, a2);
      layer2.rotate(p5.QUARTER_PI);
      layer2.rect(0, 0, rectHeight, rectWidth);
      layer2.rotate(p5.HALF_PI);
      layer2.rect(0, 0, rectHeight, rectWidth);
      layer2.rotate(p5.HALF_PI / 3);
      layer2.pop();
    }

    drawGradation(layer2, patternDiagonal, 10, 0, 100, 0, 50, 70, 0, 150);
  };

  const drawTwelveStars = (
    baseSquareSize: number,
    baseSquareDiagonal: number,
    rectWidth: number,
  ) => {
    // 五芒星を構成する三角形の1つTriangleAを描画
    const heightOfTriangleA = (baseSquareDiagonal - baseSquareSize) / 2 / 3;
    const baseOfTriangleA = heightOfTriangleA * p5.tan(p5.PI / 3);
    const valueToAdjustTriangleA = 4;

    layer1.fill(90, 100, 30);

    layer1.triangle(
      0,
      -(baseSquareSize / 2 + heightOfTriangleA),
      -baseOfTriangleA + valueToAdjustTriangleA,
      -(baseSquareSize / 2 + valueToAdjustTriangleA),
      baseOfTriangleA - valueToAdjustTriangleA,
      -(baseSquareSize / 2 + valueToAdjustTriangleA),
    );

    // 五芒星を構成する残り2つの三角形、TriangleBを描画
    // 3つの正方形で構成される正十二角形の1辺の長さの半分
    const halfOfDodecagonSide = (baseSquareDiagonal / 2) * p5.cos(p5.QUARTER_PI + p5.HALF_PI / 3);
    // 正十二角形を構成する12個の三角形の高さ
    const heightOfDodecagonTriangle = Math.sqrt(
      Math.pow(baseSquareDiagonal / 2, 2) - Math.pow(halfOfDodecagonSide, 2),
    );
    // 中心からTriangleBの下の角までの距離
    const lengthFromCenter = rectWidth / 2 / p5.cos(p5.QUARTER_PI + p5.HALF_PI / 3);
    // TriangleBの上の角のX座標
    const topXOfTriangleB =
      halfOfDodecagonSide - Math.sqrt(Math.pow(rectWidth / 2, 2) * 2) * p5.cos(p5.HALF_PI / 3);
    // TriangleBの上の角のY座標
    const topYOfTriangleB =
      heightOfDodecagonTriangle - Math.sqrt(Math.pow(rectWidth / 2, 2) * 2) * p5.cos(p5.PI / 3);

    // 内側の正十二角形の1辺の長さの半分
    const halfOfInnerDodecagonSide = (baseSquareSize / 2) * p5.tan(p5.QUARTER_PI / 3);
    // 長方形の中心からTriangleBの中間の角までの距離
    const lengthFromRectangleCenter =
      (rectWidth / 2 / p5.cos(p5.QUARTER_PI / 3)) * p5.cos(p5.HALF_PI / 3);
    // TriangleBの中間の角のX座標
    const middleXOfTriangleB = halfOfInnerDodecagonSide - lengthFromRectangleCenter;
    // TriangleBの中間の角のY座標
    const middleYOfTriangleB =
      baseSquareSize / 2 + lengthFromRectangleCenter * p5.tan(p5.HALF_PI / 3);
    const valueToAdjustTriangleB = 6;

    for (let i = -1; i < 2; i += 2) {
      layer1.triangle(
        0,
        -lengthFromCenter - valueToAdjustTriangleB * 2,
        (topXOfTriangleB - valueToAdjustTriangleB) * i,
        -topYOfTriangleB + valueToAdjustTriangleB,
        (-middleXOfTriangleB + valueToAdjustTriangleB / 2) * i,
        -middleYOfTriangleB + valueToAdjustTriangleB / 2,
      );
    }
  };

  const drawCornersStars = (rectWidth: number, patternSize: number) => {
    const halfOfRectWidth = rectWidth / 2;
    const halfOfPatternSize = patternSize / 2;
    const diagonalSizeOfStar = rectWidth * p5.cos(p5.QUARTER_PI);

    layer1.fill(80, 150, 200);
    layer1.push();

    for (let i = 0; i < 4; i++) {
      layer1.push();
      layer1.triangle(
        halfOfPatternSize - (halfOfRectWidth - outlineWeight + diagonalSizeOfStar),
        halfOfPatternSize - halfOfRectWidth + outlineWeight / 2,
        halfOfPatternSize + (halfOfRectWidth - outlineWeight + diagonalSizeOfStar),
        halfOfPatternSize - halfOfRectWidth + outlineWeight / 2,
        halfOfPatternSize,
        halfOfPatternSize + diagonalSizeOfStar - outlineWeight / 2,
      );
      layer1.triangle(
        halfOfPatternSize - halfOfRectWidth + outlineWeight / 2,
        halfOfPatternSize - (halfOfRectWidth - outlineWeight + diagonalSizeOfStar),
        halfOfPatternSize - halfOfRectWidth + outlineWeight / 2,
        halfOfPatternSize + (halfOfRectWidth - outlineWeight + diagonalSizeOfStar),
        halfOfPatternSize + diagonalSizeOfStar - outlineWeight / 2,
        halfOfPatternSize,
      );
      layer1.pop();
      layer1.rotate(p5.HALF_PI);
    }

    layer1.pop();
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchIslamicGeometricPattern02() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
