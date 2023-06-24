import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchAinuPattern06 = () => {
  let hasCreated = false;
  let img: p5Types.Image;
  let layer1: p5Types.Graphics;
  let layer2: p5Types.Graphics;

  const preload = (p5: p5Types) => {
    img = p5.loadImage('https://acha0203.github.io/Portfolio/images/ainu-pattern-03-m3.png');
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.clear();
    p5.blendMode(p5.MULTIPLY);

    if (!hasCreated) {
      layer1 = p5.createGraphics(p5.width, p5.height);
      layer2 = p5.createGraphics(p5.width, p5.height, p5.WEBGL);
      hasCreated = true;
    }

    drawBackground(p5, layer1, 50);
    drawAinuSphere(p5, layer2);

    p5.image(layer1, 0, 0);
    p5.image(layer2, 0, 0);
  };

  const drawAinuSphere = (p5: p5Types, layer: p5Types.Graphics) => {
    layer.clear();
    layer.background(0);
    layer.blendMode(p5.SCREEN);
    layer.noStroke();

    if (img !== undefined) {
      layer.texture(img);
    } else {
      preload(p5);
    }

    layer.push();
    layer.rotateY(p5.frameCount * 0.02);
    layer.sphere(p5.height / 12);
    layer.rotateY(p5.frameCount * 0.02);
    layer.sphere(p5.height / 8);
    layer.pop();
    layer.push();
    layer.rotateY(p5.frameCount * 0.02);
    layer.sphere(p5.height / 6);
    layer.pop();
    layer.push();
    layer.rotateX(p5.frameCount * 0.02);
    layer.sphere((p5.height * 5) / 24);
    layer.rotateY(p5.frameCount * -0.02);
    layer.sphere(p5.height / 4);
    layer.pop();
  };

  const drawBackground = (p5: p5Types, layer: p5Types.Graphics, n: number) => {
    layer.colorMode(p5.HSB);
    layer.noStroke();
    const step = p5.width / n;
    const m = p5.height / step;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const p = Math.sin(p5.TAU * p5.noise(i * 0.01, j * 0.01, p5.frameCount * 0.04));

        layer.fill(210 + p * 60, 100, 100);
        layer.square(step * i, (p5.height / m) * j, step + 2);
      }
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchAinuPattern06;
