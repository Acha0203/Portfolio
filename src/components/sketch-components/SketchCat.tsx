import type p5Types from 'p5';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useWindowSize from '@/hooks/useWindowSize';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchCat = () => {
  const windowWidth = useWindowSize()[0];
  const windowHeight = useWindowSize()[1];
  const [isMobile, setIsMobile] = useState(false);
  let layer1: p5Types.Graphics;
  let layer2: p5Types.Graphics;
  let isFirst = true;

  useEffect(() => {
    const userAgentInfo = window.navigator.userAgent.toLowerCase();

    if (
      userAgentInfo.includes('android') ||
      userAgentInfo.includes('iphone') ||
      userAgentInfo.includes('ipad')
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const drawEars = (layer: p5Types.Graphics, d: number) => {
    layer.triangle(
      windowWidth / 2 - 90 * d,
      windowHeight / 2 - 180,
      windowWidth / 2 - 120 * d,
      windowHeight / 2 - 70,
      windowWidth / 2 - 20 * d,
      windowHeight / 2 - 100,
    );
  };

  const drawWhiskers = (layer: p5Types.Graphics, x: number, y: number, d: number) => {
    layer.line(x - 100 * d, y + 30, x - 50 * d, y + 50);
    layer.line(x - 100 * d, y + 60, x - 50 * d, y + 60);
    layer.line(x - 100 * d, y + 90, x - 50 * d, y + 70);
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    if (isFirst) {
      layer1 = p5.createGraphics(p5.width, p5.height);
      layer2 = p5.createGraphics(p5.width, p5.height);

      layer1.background(255);
      layer1.fill(0);
      layer1.ellipse(p5.width / 2, p5.height / 2, 300, 250);
      drawEars(layer1, 1);
      drawEars(layer1, -1);

      isFirst = false;
    }

    let x = p5.width / 2;
    let y = p5.height / 2;

    if (isMobile) {
      const v = p5.createVector(p5.mouseX - p5.width / 2, p5.mouseY - p5.height / 2);
      v.setMag(p5.min(v.mag(), 50));
      x = p5.width / 2 + v.x;
      y = p5.height / 2 + v.y;
    } else {
      x += Math.floor(p5.movedX / 2);
      y += Math.floor(p5.movedY / 2);
    }

    layer2.clear();
    layer2.fill(50);
    layer2.circle(x - 70, y, 50);
    layer2.circle(x + 70, y, 50);
    layer2.rect(x - 2, y + 30, 4, 40);
    layer2.rect(x - 20, y + 70, 40, 4);
    layer2.ellipse(x, y + 40, 30, 20);
    layer2.fill(255);
    layer2.circle(x - 60, y - 10, 9);
    layer2.circle(x + 80, y - 10, 9);
    layer2.stroke(50);
    drawWhiskers(layer2, x, y, 1);
    drawWhiskers(layer2, x, y, -1);

    p5.image(layer1, 0, 0);
    p5.image(layer2, 0, 0);
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchCat;
