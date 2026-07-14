import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { disableP5FriendlyErrors } from '#/utils/disableP5FriendlyErrors';

type Grass = {
  x: number;
  y: number;
  ix: number;
  iy: number;
};

const sketch: Sketch = (p5) => {
  disableP5FriendlyErrors(p5);

  const gap = 50; // 草の間隔
  const bladeWidth = 8; // 草の横幅（太さ）
  const bladeLength = 500; // 草の長さ
  const numSegments = 200; // 草のなめらかさ
  const grasses: Grass[] = [];
  let windStrength = 0;
  let prevMouseX = 0;
  let t = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noFill();

    const hNumbers = p5.width / (bladeWidth + gap);
    const vNumbers = p5.height / (bladeWidth + gap);
    const noiseScale = 0.4;
    const maxOffset = (bladeWidth + gap) * 3;

    for (let y = 0; y < vNumbers; y++) {
      for (let x = 0; x < hNumbers; x++) {
        const tx = (p5.width / (hNumbers - 1)) * x + p5.width * 0.05;
        const ty = (p5.height / (vNumbers - 1)) * y + p5.height * 0.3;
        const nx = x * noiseScale;
        const ny = y * noiseScale;
        const offsetX = (p5.noise(nx, ny) - 0.5) * maxOffset * 2;
        const offsetY = (p5.noise(nx + 100, ny + 100) - 0.5) * maxOffset * 2;
        const grass: Grass = { x: tx + offsetX, y: ty + offsetY, ix: x, iy: y };

        grasses.push(grass);
      }
    }
  };

  p5.draw = () => {
    p5.background(0);

    const dx = p5.mouseX - prevMouseX;
    windStrength = p5.lerp(windStrength, dx * 0.03, 0.05);
    prevMouseX = p5.mouseX;

    drawGrass();
    t += 1;
  };

  const drawGrass = () => {
    for (const g of grasses) {
      drawBlade(g);
    }
  };

  const drawBlade = (grass: Grass) => {
    // cos(-3PI/4) = -0.707 (left), sin(-3PI/4) = -0.707 (up in p5.js)
    const restAngle = -(p5.HALF_PI + p5.QUARTER_PI) + 0.5;
    const segLen = bladeLength / numSegments;
    // それぞれの草が微妙にずれたタイミングで揺れるようにする
    // fieldPhaseは草ごとの位置に基づくオフセット
    const fieldPhase = grass.x * 0.005 + grass.y * 0.003;

    const hue = p5.map(p5.noise(grass.ix * 50, grass.iy * 50), 0, 1, 70, 230);
    p5.strokeWeight(bladeWidth);
    p5.noFill();

    let x = grass.x;
    let y = grass.y;

    const pts = [[x, y]];

    for (let s = 0; s < numSegments; s++) {
      const progress = (s + 1) / numSegments;
      const bend = windStrength * progress * progress;
      const sway = p5.sin(t + fieldPhase) * 0.2 * progress;
      const angle = restAngle + bend + sway;

      x += p5.cos(angle) * segLen;
      y += p5.sin(angle) * segLen;
      pts.push([x, y]);
    }

    for (let i = 0; i < pts.length - 1; i++) {
      const sb = p5.map(i, 0, pts.length, 0, 100);

      p5.stroke(hue, sb, sb, 0.1);
      p5.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]);
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchGrassland() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
