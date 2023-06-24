import type p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});

const SketchAinuPattern06 = () => {
  let img: p5Types.Image;

  const preload = (p5: p5Types) => {
    img = p5.loadImage('/images/ainu-pattern-03-m3.png');
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.clear();
    p5.blendMode(p5.MULTIPLY);

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

export default SketchAinuPattern06;
