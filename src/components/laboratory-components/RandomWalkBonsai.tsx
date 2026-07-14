import type { BonsaiData, BonsaiSettings } from '#/types';
import type { Sketch } from '@p5-wrapper/react';
import type P5 from 'p5';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { useMemo } from 'react';
import { disableP5FriendlyErrors } from '#/utils/disableP5FriendlyErrors';

type SketchParams = {
  settings: BonsaiSettings;
  initialBonsai: BonsaiData | null;
  onBonsaiGrow: (bonsai: BonsaiData) => void;
};

// 設定変更やデータ読み込みのたびに再マウントして作り直すため、
// クロージャで設定を受け取るファクトリーにしている
const createSketch = ({ settings, initialBonsai, onBonsaiGrow }: SketchParams): Sketch => (p5) => {
  disableP5FriendlyErrors(p5);

  const OVULE_SIZE = settings.ovuleSize;
  const AREA_RADIUS = settings.areaRadius;
  const NUM_OF_ACTIVE_OVULES = settings.numOfActiveOvules;
  const bonsaiX: number[] = initialBonsai ? [...initialBonsai.x] : [];
  const bonsaiY: number[] = initialBonsai ? [...initialBonsai.y] : [];
  const bonsaiZ: number[] = initialBonsai ? [...initialBonsai.z] : [];
  const activeOvules: Ovule[] = [];

  let allNumberOfOvules = 0; // 現在の胚珠の総数（固着した胚珠も含む）

  // p5.color() はレンダラー生成後（createCanvas 後）でないと使えないため setup 内で初期化する
  let ovulesColor: P5.Color;
  let centerColor: P5.Color; // 盆栽の最も内側の色
  let middleColor: P5.Color; // 盆栽の中間の色
  let edgeColor: P5.Color; // 盆栽の最も外側の色

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    p5.noStroke();

    ovulesColor = p5.color(128, 128, 128);
    centerColor = p5.color(settings.centerColor);
    middleColor = p5.color(settings.middleColor);
    edgeColor = p5.color(settings.edgeColor);

    for (let i = 0; i < NUM_OF_ACTIVE_OVULES; i++) {
      activeOvules.push(new Ovule(allNumberOfOvules));
      allNumberOfOvules++;
    }

    // 新規の盆栽の場合のみ、中央に最初の胚珠を配置する
    if (bonsaiX.length === 0) {
      activeOvules[0].x = 0;
      activeOvules[0].y = 0;
      activeOvules[0].z = 0;
      activeOvules[0].addOvuleToBonsai();
      allNumberOfOvules++;
      activeOvules[0].initOvule(allNumberOfOvules);
    }

    // 盆栽の配列は以後 push で伸びるだけなので、参照を一度渡せば親は常に最新の状態を保存できる
    onBonsaiGrow({ x: bonsaiX, y: bonsaiY, z: bonsaiZ });
  };

  p5.draw = () => {
    p5.clear();
    p5.orbitControl();
    // Z成分（カメラから奥へ向かう向き）を持たせないと、カメラに向いた面に光が当たらず陰影が見えない
    p5.directionalLight(255, 255, 255, 0, 2, -1);
    p5.directionalLight(80, 30, 30, 0, -1, 0);

    // 固着した胚珠は背景クリアのたびに消えるので、毎フレーム描き直す
    for (let i = 0; i < bonsaiX.length; i++) {
      const bonsaiColor = getColor(bonsaiX[i], bonsaiY[i], bonsaiZ[i]);

      drawOvule(bonsaiX[i], bonsaiY[i], bonsaiZ[i], bonsaiColor);
    }

    for (let i = 0; i < activeOvules.length; i++) {
      if (activeOvules[i].hasAdhered()) {
        activeOvules[i].addOvuleToBonsai();
        allNumberOfOvules++;
        activeOvules[i].initOvule(allNumberOfOvules);
      }

      if (activeOvules[i].isMissing()) {
        allNumberOfOvules++;
        activeOvules[i].initOvule(allNumberOfOvules);
        activeOvules[i].randomWalk();
      }

      activeOvules[i].randomWalk();
    }
  };

  const drawOvule = (x: number, y: number, z: number, color: P5.Color) => {
    p5.push();
    p5.fill(color);
    p5.translate(x, y, z);
    p5.sphere(OVULE_SIZE);
    p5.pop();
  };

  const getColor = (x: number, y: number, z: number) => {
    // 中心からの距離を算出する
    const distance = p5.dist(x, y, z, 0, 0, 0);

    let startPosition = 0;
    let endPosition = AREA_RADIUS / 2;
    let startColor = centerColor;
    let endColor = middleColor;

    // 空間内の外側の座標の場合
    if (distance > AREA_RADIUS / 2) {
      startPosition = AREA_RADIUS / 2;
      endPosition = AREA_RADIUS;
      startColor = middleColor;
      endColor = edgeColor;
    }

    const redValue = p5.map(
      distance,
      startPosition,
      endPosition,
      p5.red(startColor),
      p5.red(endColor),
    );
    const greenValue = p5.map(
      distance,
      startPosition,
      endPosition,
      p5.green(startColor),
      p5.green(endColor),
    );
    const blueValue = p5.map(
      distance,
      startPosition,
      endPosition,
      p5.blue(startColor),
      p5.blue(endColor),
    );

    return p5.color(redValue, greenValue, blueValue);
  };

  class Ovule {
    x: number;
    y: number;
    z: number;
    number: number;

    constructor(numberOfOvules: number) {
      const startingPosition = this.getStartingPosition();

      this.x = startingPosition.x; // 現在地のX座標
      this.y = startingPosition.y; // 現在地のY座標
      this.z = startingPosition.z; // 現在地のZ座標
      this.number = numberOfOvules + 1; // 何個目の胚珠か
    }

    // 胚珠を初期化
    initOvule(numberOfOvules: number) {
      const startingPosition = this.getStartingPosition();

      this.x = startingPosition.x;
      this.y = startingPosition.y;
      this.z = startingPosition.z;
      this.number = numberOfOvules;
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

    // 胚珠が行方不明になったかどうかを判定する
    isMissing() {
      return (
        this.x < -AREA_RADIUS ||
        this.x > AREA_RADIUS ||
        this.y < -AREA_RADIUS ||
        this.y > AREA_RADIUS ||
        this.z < -AREA_RADIUS ||
        this.z > AREA_RADIUS
      );
    }

    // 胚珠が固着したかどうかを判定する
    hasAdhered() {
      for (let i = 0; i < bonsaiX.length; i++) {
        const distance = p5.dist(this.x, this.y, this.z, bonsaiX[i], bonsaiY[i], bonsaiZ[i]);

        if (distance <= OVULE_SIZE) {
          return true;
        }
      }

      return false;
    }

    // 胚珠がランダムな方向にふらふら進む
    randomWalk() {
      const randomFactor = p5.random();

      if (randomFactor < 0.33) {
        this.x += p5.random([-5, 5]);
      } else if (randomFactor < 0.66) {
        this.y += p5.random([-5, 5]);
      } else {
        this.z += p5.random([-5, 5]);
      }

      drawOvule(this.x, this.y, this.z, ovulesColor);
    }

    // 胚珠が固着した座標を記録する
    addOvuleToBonsai() {
      bonsaiX.push(this.x);
      bonsaiY.push(this.y);
      bonsaiZ.push(this.z);
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

interface Props {
  settings: BonsaiSettings;
  initialBonsai: BonsaiData | null;
  elapsedSeconds: number;
  onBonsaiGrow: (bonsai: BonsaiData) => void;
}

export default function RandomWalkBonsai({
  settings,
  initialBonsai,
  elapsedSeconds,
  onBonsaiGrow,
}: Props) {
  const sketch = useMemo(
    () => createSketch({ settings, initialBonsai, onBonsaiGrow }),
    [settings, initialBonsai, onBonsaiGrow],
  );

  return (
    <>
      <NextReactP5Wrapper sketch={sketch} />
      <div className='fixed top-24 left-5 z-10 max-sm:top-6 pointer-events-none text-white [text-shadow:#000_0_0_10px]'>
        {`Passage of Time: ${elapsedSeconds} sec.`}
      </div>
    </>
  );
}
