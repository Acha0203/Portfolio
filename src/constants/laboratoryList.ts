import type { WorkObj } from '#/types';

type LaboratorySeed = {
  title: string;
  slug: string;
  codeUrl: string;
  siteUrl: string;
  description: { ja: string[]; en: string[] };
  technology: { ja: string[]; en: string[] };
  thumbnailX: number;
  thumbnailY: number;
  /** サムネイル画像のファイル名がslugと異なる場合のみ指定する（拡張子なし） */
  thumbnail?: string;
};

const laboratorySeeds: LaboratorySeed[] = [
  {
    title: 'Random Walk Bonsai',
    slug: 'random-walk-bonsai',
    codeUrl: 'https://github.com/Acha0203/Portfolio',
    siteUrl: `random-walk-bonsai-app`,
    description: {
      ja: [
        '三次元空間内をランダムに動き回る「胚珠」によって、次第に植物のような構造を栽培していく数学的シミュレーターです。このアプリケーションは A. K. デュードニー著『コンピューター・レクリエーション II 遊びの探索』を参考にして開発しました。',
        '1. 最初は三次元空間の中央に胚珠がひとつだけ配置されています。「START」をクリックすると、外側から三次元空間に、ランダムに動き回る胚珠が投入されます。',
        '2. 中央の静止している胚珠に接触すると、動き回る胚珠はそこで活動を停止します。',
        '3. ある胚珠が活動を停止すると、空間の外から別の胚珠が投入されます。これを繰り返すうちに植物のような構造（以下「盆栽」）を栽培できます。',
        '4. 「EXPORT」をクリックすると、現時点での「盆栽」のデータを JSON 形式のファイルまたは Blender 用の 3D モデルデータとしてエクスポートできます。',
        '5. 「IMPORT」をクリックすると、エクスポートした JSON 形式のデータをインポートして途中から盆栽の栽培を再開できます。',
        '6. マウス左ドラッグで視点回転、ホイールでズーム、右ドラッグ（または2本指）でパンができます。',
        '7. 三次元空間の広さ、盆栽の色、胚珠の最大数は自由に変更できます。',
      ],
      en: [
        'This is a mathematical simulator that gradually cultivates a plant-like structure with "ovules" moving randomly through three-dimensional space. I developed this application with reference to "Computer Recreations" by A. K. Dewdney which was a celebrated Scientific American column.',
        '1. At first, a single ovule is placed at the center of the three-dimensional space. When you click "START", ovules that move around randomly are introduced into the three-dimensional space from the outside.',
        '2. When a moving ovule touches the stationary ovule at the center, it stops its activity there.',
        '3. When an ovule stops its activity, another ovule is introduced from outside the space. By repeating this process, you can cultivate a plant-like structure (hereinafter referred to as a "bonsai").',
        '4. When you click "EXPORT", you can export the current "bonsai" data as a JSON file or as 3D model data for Blender.',
        '5. When you click "IMPORT", you can import the exported JSON data and resume cultivating the bonsai from where you left off.',
        '6. You can rotate the viewpoint by dragging with the left mouse button, zoom with the mouse wheel, and pan by dragging with the right mouse button (or with two fingers).',
        '7. You can freely change the size of the three-dimensional space, the color of the bonsai, and the maximum number of ovules.',
      ],
    },
    technology: {
      ja: ['p5.js のコードを Next.js および TypeScript で開発した当 Web サイトに組み込みました。'],
      en: [
        'I have incorporated the p5.js code into this website developed with Next.js and TypeScript.',
      ],
    },
    thumbnailX: 844,
    thumbnailY: 869,
  },
];

export const laboratoryList: WorkObj[] = laboratorySeeds.map((seed, index) => ({
  id: index + 1,
  title: seed.title,
  thumbnailUrl: `/images/Laboratory_Images/${seed.thumbnail ?? seed.slug}`,
  codeUrl: seed.codeUrl,
  path: `/laboratory/${seed.slug}/description`,
  siteUrl: `/laboratory/${seed.slug}/${seed.siteUrl}`,
  description: seed.description,
  supplement: {
    ja: [],
    en: [],
  },
  technology: seed.technology,
  thumbnailX: seed.thumbnailX,
  thumbnailY: seed.thumbnailY,
}));
