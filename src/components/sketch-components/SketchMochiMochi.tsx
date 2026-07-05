import type { Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch: Sketch = (p5) => {
  const springing = 0.0009;
  const damping = 0.98;
  const pushSpring = 0.04;
  const pushDamping = 0.85;
  const maxRadius = 100;
  const minRadius = 30;
  const shapes: Shape[] = [];

  class Shape {
    baseCenterX: number;
    baseCenterY: number;
    currentCenterX: number;
    currentCenterY: number;
    radius: number;
    nodes: number;
    rotAngle: number;
    deltaX: number;
    deltaY: number;
    accelX: number;
    accelY: number;
    organicConstant: number;
    hue: number;
    pushOffsetX: number;
    pushOffsetY: number;
    pushVelX: number;
    pushVelY: number;
    pushTargetX: number;
    pushTargetY: number;
    nodeStartX: number[];
    nodeStartY: number[];
    nodeX: number[];
    nodeY: number[];
    angle: number[];
    frequency: number[];

    constructor() {
      this.baseCenterX = 0;
      this.baseCenterY = 0;
      this.currentCenterX = this.baseCenterX;
      this.currentCenterY = this.baseCenterY;
      this.radius = minRadius;
      this.nodes = 6;
      this.rotAngle = -90;
      this.deltaX = 0;
      this.deltaY = 0;
      this.accelX = 0;
      this.accelY = 0;
      this.organicConstant = 1;
      this.hue = p5.random(120, 280);

      this.pushOffsetX = 0;
      this.pushOffsetY = 0;
      this.pushVelX = 0;
      this.pushVelY = 0;
      this.pushTargetX = 0;
      this.pushTargetY = 0;

      this.nodeStartX = [];
      this.nodeStartY = [];
      this.nodeX = [];
      this.nodeY = [];
      this.angle = [];
      this.frequency = [];
    }

    initShapes() {
      // 各シェイプの基本座標の初期化
      let i = 0;
      let x = 0;
      let y = 0;
      let r = minRadius;

      do {
        x = p5.random(p5.width);
        y = p5.random(p5.height);

        i++;

        if (i > 1000) {
          return;
        }
      } while (!this.hasOverlap(x, y, r));

      while (r < maxRadius && this.hasOverlap(x, y, r)) {
        r++;
      }

      r--;

      this.baseCenterX = x;
      this.baseCenterY = y;
      this.radius = r;

      // 角のノードの座標を初期化
      for (let i = 0; i < this.nodes; i++) {
        this.nodeStartX[i] = 0;
        this.nodeStartY[i] = 0;
        this.nodeX[i] = 0;
        this.nodeY[i] = 0;
        this.angle[i] = 0;
      }

      // 角のノードの周波数を初期化
      for (let i = 0; i < this.nodes; i++) {
        this.frequency[i] = p5.random(5, 12);
      }
    }

    hasOverlap(x: number, y: number, radius: number) {
      let ok = true;

      shapes.forEach((s) => {
        if (p5.dist(x, y, s.baseCenterX, s.baseCenterY) < radius + s.radius) {
          ok = false;
        }
      });

      return ok;
    }

    applyPush(mx: number, my: number) {
      const dx = this.currentCenterX - mx;
      const dy = this.currentCenterY - my;
      const d = p5.sqrt(dx * dx + dy * dy);

      if (d === 0) return;

      const magnitude = this.radius / 2;
      this.pushTargetX = (dx / d) * magnitude;
      this.pushTargetY = (dy / d) * magnitude;
    }

    drawShape() {
      const cx = this.currentCenterX + this.pushOffsetX;
      const cy = this.currentCenterY + this.pushOffsetY;

      for (let i = 0; i < this.nodes; i++) {
        this.nodeStartX[i] = cx + p5.cos(this.rotAngle) * this.radius;
        this.nodeStartY[i] = cy + p5.sin(this.rotAngle) * this.radius;
        this.rotAngle += 360.0 / this.nodes;
      }

      // p5.js 2.0でcurveTightness()は廃止されたためsplineProperty()で緊張度を設定
      p5.splineProperty('tightness', this.organicConstant);

      // グローエフェクトに使用する色の設定
      const glowColor = p5.color(this.hue, 100, 100);
      // キャンバスはP2Dで生成しているためdrawingContextは2Dコンテキスト
      const context = p5.drawingContext as CanvasRenderingContext2D;

      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = this.radius / 2;
      context.shadowColor = glowColor.toString();
      p5.fill(this.hue, 20, 100, 100);

      p5.beginShape();

      for (let i = 0; i < this.nodes; i++) {
        p5.splineVertex(this.nodeX[i], this.nodeY[i]);
      }

      p5.endShape(p5.CLOSE);
    }

    moveShape() {
      // 中心点を移動
      this.deltaX = (p5.mouseX - this.currentCenterX) * 0.1;
      this.deltaY = (p5.mouseY - this.currentCenterY) * 0.1;

      // バネ効果を作成
      this.deltaX *= springing;
      this.deltaY *= springing;
      this.accelX += this.deltaX;
      this.accelY += this.deltaY;

      // 中心を移動
      this.currentCenterX = p5.constrain(
        this.currentCenterX + this.accelX,
        this.baseCenterX - 20,
        this.baseCenterX + 20,
      );
      this.currentCenterY = p5.constrain(
        this.currentCenterY + this.accelY,
        this.baseCenterY - 20,
        this.baseCenterY + 20,
      );

      // バネの動きを遅くする
      this.accelX *= damping;
      this.accelY *= damping;

      // 全体の加速度に基づいて曲線の緊張度を変更;
      // abs()を使用して加速度の方向に依存しないようにする
      const totalAccelX = this.accelX + this.pushVelX;
      const totalAccelY = this.accelY + this.pushVelY;

      this.organicConstant = 1 - (p5.abs(totalAccelX) + p5.abs(totalAccelY)) * 0.1;

      for (let i = 0; i < this.nodes; i++) {
        this.nodeX[i] = this.nodeStartX[i] + p5.sin(this.angle[i]) * (totalAccelX * 2);
        this.nodeY[i] = this.nodeStartY[i] + p5.sin(this.angle[i]) * (totalAccelY * 2);
        this.angle[i] += this.frequency[i];
      }

      this.pushVelX += (this.pushTargetX - this.pushOffsetX) * pushSpring;
      this.pushVelY += (this.pushTargetY - this.pushOffsetY) * pushSpring;
      this.pushVelX *= pushDamping;
      this.pushVelY *= pushDamping;
      this.pushOffsetX += this.pushVelX;
      this.pushOffsetY += this.pushVelY;
      this.pushTargetX *= 0.99;
      this.pushTargetY *= 0.99;
    }
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.angleMode(p5.DEGREES);
    p5.noStroke();

    const numberOfShapes = p5.floor(p5.max(p5.width, p5.height) / 20);

    for (let i = 0; i < numberOfShapes; i++) {
      shapes.push(new Shape());
    }

    for (const s of shapes) {
      s.initShapes();
    }
  };

  p5.draw = () => {
    p5.background(0, 0, 100);

    for (const s of shapes) {
      s.drawShape();
      s.moveShape();
    }
  };

  p5.mousePressed = () => {
    for (const s of shapes) {
      const cx = s.currentCenterX + s.pushOffsetX;
      const cy = s.currentCenterY + s.pushOffsetY;

      if (p5.dist(p5.mouseX, p5.mouseY, cx, cy) < s.radius) {
        s.applyPush(p5.mouseX, p5.mouseY);
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
  };
};

export default function SketchMochiMochi() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
