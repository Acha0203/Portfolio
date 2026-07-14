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
    codeUrl:
      'https://github.com/Acha0203/Portfolio/tree/main/src/components/laboratory-components/RandomWalkBonsai.tsx',
    siteUrl: `random-walk-bonsai-app`,
    description: {
      ja: [
        '三次元空間内をランダムに動き回る「胚珠」によって、次第に植物のような構造を栽培していく数学的シミュレーターです。このアプリケーションは A. K. デュードニー著『コンピューター・レクリエーション II 遊びの探索』を参考にして開発しました。',
        '1. 最初は三次元空間の中央に胚珠がひとつだけ配置されています。さらに、その周囲には複数の胚珠がランダムに動き回っています。',
        '2. 中央の静止している胚珠に接触すると、動き回る胚珠はそこで活動を停止し、空間の外から別の胚珠が投入されます。これを繰り返すうちに、固着した胚珠の固まりが植物のような姿に成長してゆきます。以下、これを「盆栽」と呼びます。',
        '3. マウス左ドラッグで視点回転、ホイールでズーム、右ドラッグ（または 2 本指）でパンができます。',
        '4. 画面下部にある「SETTINGS」をクリックすると「SETTINGS」ダイアログが開きます。',
        '5. ダイアログ下部にある「SAVE」をクリックすると、現在の盆栽データと経過時間をブラウザに保存できます。盆栽の栽培には非常に時間がかかるため、頻繁にデータを保存しておきましょう。',
        '6. ダイアログ下部にある「LOAD」をクリックすると、「SAVE」で保存した状態から盆栽の栽培を再開できます。',
        '7. ダイアログ下部にある「EXPORT」をクリックすると、ブラウザに保存したデータを JSON および OBJ 形式のファイルとしてダウンロードできます。OBJ ファイルは Blender にインポートすることができます。',
        '8. ダイアログ下部にある「IMPORT」をクリックすると、「EXPORT」でダウンロードした JSON ファイルをブラウザに読み込み、その状態から盆栽の栽培を再開できます。',
        '9. 「SETTINGS」ダイアログでは、盆栽の色、三次元空間の半径、動き回る胚珠の数、胚珠の大きさを変更することもできます。',
        '10. 「Center Color」で盆栽の中心の色、「Middle Color」で盆栽の中心と外端の中間の色、「Edge Color」で外端の色を設定します。「Area Radius」で三次元空間の半径の長さ、「Active Ovules」で動き回る胚珠の数、「Ovule Size」で胚珠の大きさを設定します。',
        '11. 各種設定を変更した後、ダイアログ下部にある「APPLY SETTINGS」をクリックすると変更が適用されます。ただし、設定を変更すると盆栽の育成がリセットされるため、変更適用後に必要に応じて「LOAD」または「IMPORT」で盆栽データを復元しましょう。',
      ],
      en: [
        'This is a mathematical simulator that gradually cultivates a plant-like structure with "ovules" moving randomly through three-dimensional space. I developed this application with reference to "Computer Recreations" by A. K. Dewdney which was a celebrated Scientific American column.',
        '1. At first, a single ovule is placed at the center of the three-dimensional space. In addition, multiple ovules are moving around it at random.',
        '2. When a moving ovule touches the stationary ovule at the center, it stops its activity there, and another ovule is introduced from outside the space. As this process repeats, the cluster of adhered ovules grows into a plant-like shape, hereinafter referred to as a "bonsai".',
        '3. You can rotate the viewpoint by dragging with the left mouse button, zoom with the mouse wheel, and pan by dragging with the right mouse button (or with two fingers).',
        '4. When you click "SETTINGS" at the bottom of the screen, the "SETTINGS" dialog opens.',
        '5. When you click "SAVE" at the bottom of the dialog, you can save the current bonsai data and the elapsed time to your browser. Since cultivating a bonsai takes a very long time, it is a good idea to save your data frequently.',
        '6. When you click "LOAD" at the bottom of the dialog, you can resume cultivating the bonsai from the state saved with "SAVE".',
        '7. When you click "EXPORT" at the bottom of the dialog, you can download the data saved in your browser as JSON and OBJ files. The OBJ file can be imported into Blender.',
        '8. When you click "IMPORT" at the bottom of the dialog, you can load the JSON file downloaded with "EXPORT" into your browser and resume cultivating the bonsai from that state.',
        '9. In the "SETTINGS" dialog, you can also change the colors of the bonsai, the radius of the three-dimensional space, the number of moving ovules, and the size of the ovules.',
        '10. "Center Color" sets the color at the center of the bonsai, "Middle Color" sets the color halfway between the center and the outer edge, and "Edge Color" sets the color at the outer edge. "Area Radius" sets the radius of the three-dimensional space, "Active Ovules" sets the number of moving ovules, and "Ovule Size" sets the size of the ovules.',
        '11. After changing the settings, click "APPLY SETTINGS" at the bottom of the dialog to apply the changes. Note that applying new settings resets the growth of the bonsai, so restore your bonsai data with "LOAD" or "IMPORT" as needed after applying them.',
      ],
    },
    technology: {
      ja: ['p5.js + Next.js + TypeScript'],
      en: ['p5.js, Next.js, TypeScript, and so on.'],
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
