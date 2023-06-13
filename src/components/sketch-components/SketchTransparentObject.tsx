import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchTransparentObject = () => {
  let img: p5Types.Image;

  const preload = (p5: p5Types) => {
    img = p5.loadImage('https://acha0203.github.io/Portfolio/images/symmetrical-ruler-03-m.png');
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(canvasParentRef);
    p5.noStroke();
    p5.blendMode(p5.SCREEN);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);

    if (img !== undefined) {
      p5.texture(img);
    } else {
      preload(p5);
    }

    p5.rotateY(p5.frameCount * -0.01);
    p5.push();
    p5.rotateX(p5.QUARTER_PI);
    p5.box(p5.width / 2);
    p5.rotateY(p5.QUARTER_PI);
    p5.box(p5.width / 2);
    p5.push();
    p5.rotateY(p5.QUARTER_PI);
    p5.rotateX(p5.QUARTER_PI);
    p5.box(p5.width / 2);
    p5.pop();
    p5.pop();
    p5.box(p5.width / 2);
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} />;
};

export default SketchTransparentObject;
