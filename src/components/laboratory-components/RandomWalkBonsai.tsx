import type { Sketch } from '@p5-wrapper/react';
import type P5 from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch: Sketch = (p5) => {
  const NUMBER_OF_OVULEs = 20000;
  const SPHERE_SIZE = 20;
  const AREA_RADIUS = 500;
  const BATCH_SIZE = 20;
  const ovules: Ovule[] = [];
  const adheredOvulesX: number[] = [];
  const adheredOvulesY: number[] = [];
  const adheredOvulesZ: number[] = [];
  const adheredOvulesColor: P5.Color[] = [];

  let nextBatchIndex = 0;
  let activeOvules: Ovule[] = [];
  let number = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    p5.colorMode(p5.HSB);
    p5.noStroke();

    for (let i = 0; i < NUMBER_OF_OVULEs; i++) {
      ovules.push(new Ovule());
    }

    // 中央に胚珠を配置する
    ovules[0].x = 0;
    ovules[0].y = 0;
    ovules[0].z = 0;
    ovules[0].collapse();

    activateNextBatch();
  };

  p5.draw = () => {
    p5.clear();
    p5.orbitControl();
    p5.directionalLight(0, 0, 100, 0, 2, 0);
    p5.directionalLight(80, 30, 30, 0, -1, 0);

    // 固着した胚珠は背景クリアのたびに消えるので、毎フレーム描き直す
    for (let i = 0; i < adheredOvulesX.length; i++) {
      drawOvule(adheredOvulesX[i], adheredOvulesY[i], adheredOvulesZ[i], adheredOvulesColor[i]);
    }

    for (let i = 0; i < activeOvules.length; i++) {
      activeOvules[i].judge();

      if (!activeOvules[i].adhered && !activeOvules[i].missing) {
        activeOvules[i].randomWalk();
      }
    }

    // 現在のバッチが全員停止したら次のバッチを起動する
    if (activeOvules.length > 0 && activeOvules.every((d) => d.adhered || d.missing)) {
      activateNextBatch();
    }
  };

  // 次のBATCH_SIZE数を新しいバッチとして起動する
  const activateNextBatch = () => {
    if (nextBatchIndex >= ovules.length) {
      activeOvules = [];

      return;
    }

    const end = Math.min(nextBatchIndex + BATCH_SIZE, ovules.length);

    activeOvules = ovules.slice(nextBatchIndex, end);
    nextBatchIndex = end;
  };

  const drawOvule = (x: number, y: number, z: number, color: P5.Color) => {
    p5.push();
    p5.fill(color);
    p5.translate(x, y, z);
    p5.sphere(SPHERE_SIZE);
    p5.pop();
  };

  class Ovule {
    x: number;
    y: number;
    z: number;
    number: number;
    adhered: boolean;
    missing: boolean;
    color: P5.Color;

    constructor() {
      const startingPosition = this.getStartingPosition();

      this.x = startingPosition.x; // 現在地のX座標
      this.y = startingPosition.y; // 現在地のY座標
      this.z = startingPosition.z; // 現在地のZ座標
      this.number = ++number; // 何個目の胚珠か
      this.adhered = false; // 固着したかどうかのフラグ
      this.missing = false; // 行方不明になったかどうかのフラグ

      const colorValue = p5.map(this.number, 0, NUMBER_OF_OVULEs, 30, 100);

      // 胚珠の色
      this.color = p5.color(90 + (this.number % 150), colorValue, colorValue);
    }

    getStartingPosition() {
      // p5.Vector はインスタンスモードでは参照できないため、
      // Vector.random3D() と同じ計算で球面上の一様なランダムな方向を求める
      const angle = p5.random(0, p5.TWO_PI);
      const directionZ = p5.random(-1, 1);
      const radiusAtZ = p5.sqrt(1 - directionZ * directionZ);

      return {
        x: radiusAtZ * p5.cos(angle) * AREA_RADIUS,
        y: radiusAtZ * p5.sin(angle) * AREA_RADIUS,
        z: directionZ * AREA_RADIUS,
      };
    }

    // 行方不明になったかどうかを判定する
    isMissing() {
      if (
        this.x < -AREA_RADIUS ||
        this.x > AREA_RADIUS ||
        this.y < -AREA_RADIUS ||
        this.y > AREA_RADIUS ||
        this.z < -AREA_RADIUS ||
        this.z > AREA_RADIUS
      ) {
        this.missing = true;
      }
    }

    // 固着したかどうかを判定する
    hasCollapsed() {
      for (let i = 0; i < adheredOvulesX.length; i++) {
        const distance = p5.dist(
          this.x,
          this.y,
          this.z,
          adheredOvulesX[i],
          adheredOvulesY[i],
          adheredOvulesZ[i],
        );

        if (distance <= SPHERE_SIZE) {
          this.collapse();

          return true;
        }
      }

      return false;
    }

    // 中心に引き寄せられつつ、ランダムな方向にふらふら進む
    randomWalk() {
      let randomFactor = p5.random();

      if (randomFactor < 0.3) {
        // 中心に引き寄せられる
        const centerX = 0;
        const centerY = 0;
        const centerZ = 0;

        const dx = centerX - this.x;
        const dy = centerY - this.y;
        const dz = centerZ - this.z;

        const distance = p5.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance > 0) {
          this.x += (dx / distance) * p5.random(0.5, 1.5);
          this.y += (dy / distance) * p5.random(0.5, 1.5);
          this.z += (dz / distance) * p5.random(0.5, 1.5);
        }
      } else {
        // ランダムな方向にふらふら進む
        randomFactor = p5.random();

        if (randomFactor < 0.33) {
          this.x += p5.random([-5, 5]);
        } else if (randomFactor < 0.66) {
          this.y += p5.random([-5, 5]);
        } else {
          this.z += p5.random([-5, 5]);
        }
      }

      drawOvule(this.x, this.y, this.z, this.color);
    }

    // 胚珠が固着した座標を記録する
    collapse() {
      adheredOvulesX.push(this.x);
      adheredOvulesY.push(this.y);
      adheredOvulesZ.push(this.z);
      adheredOvulesColor.push(this.color);

      this.adhered = true;
    }

    judge() {
      if (this.adhered) {
        return;
      }

      // 胚珠が空間外に彷徨い出たかどうかを判定する
      this.isMissing();

      // 胚珠が固着したかどうかを判定する
      this.hasCollapsed();

      if (this.number > NUMBER_OF_OVULEs) {
        console.log('Completed!');
      }
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function RandomWalkBonsai() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
