import type { BonsaiSaveData, BonsaiSettings } from '#/types';
import { bonsaiFileBaseName, downloadTextFile } from '#/utils/bonsaiStorage';

// 胚珠1個あたりの球メッシュの分割数（Blender 上で十分滑らかに見える最小限のポリゴン数）
const SEGMENTS = 12; // 経度方向の分割数
const RINGS = 8; // 緯度方向の分割数

type Rgb = { r: number; g: number; b: number };

type UnitSphere = {
  vertices: [number, number, number][];
  faces: [number, number, number][]; // 0始まりの頂点インデックス
};

const hexToRgb = (hex: string): Rgb => {
  const matched = /^#([0-9a-f]{6})$/i.exec(hex);

  if (matched === null) {
    throw new Error(`Invalid color code: ${hex}`);
  }

  const value = parseInt(matched[1], 16);

  return {
    r: ((value >> 16) & 0xff) / 255,
    g: ((value >> 8) & 0xff) / 255,
    b: (value & 0xff) / 255,
  };
};

const mixRgb = (start: Rgb, end: Rgb, amount: number): Rgb => {
  const t = Math.min(Math.max(amount, 0), 1);

  return {
    r: start.r + (end.r - start.r) * t,
    g: start.g + (end.g - start.g) * t,
    b: start.b + (end.b - start.b) * t,
  };
};

// スケッチの getColor と同じロジックで、中心からの距離に応じた胚珠の色を求める
const ovuleColor = (distance: number, settings: BonsaiSettings): Rgb => {
  const centerColor = hexToRgb(settings.centerColor);
  const middleColor = hexToRgb(settings.middleColor);
  const edgeColor = hexToRgb(settings.edgeColor);
  const halfRadius = settings.areaRadius / 2;

  if (distance <= halfRadius) {
    return mixRgb(centerColor, middleColor, distance / halfRadius);
  }

  return mixRgb(middleColor, edgeColor, (distance - halfRadius) / halfRadius);
};

// 単位球（半径1）の UV スフィアを一度だけ組み立て、全胚珠で使い回す
const buildUnitSphere = (): UnitSphere => {
  const vertices: [number, number, number][] = [];
  const faces: [number, number, number][] = [];

  vertices.push([0, 0, 1]); // 天頂

  for (let ring = 1; ring < RINGS; ring++) {
    const polar = (Math.PI * ring) / RINGS;
    const sinPolar = Math.sin(polar);
    const cosPolar = Math.cos(polar);

    for (let segment = 0; segment < SEGMENTS; segment++) {
      const azimuth = (2 * Math.PI * segment) / SEGMENTS;

      vertices.push([sinPolar * Math.cos(azimuth), sinPolar * Math.sin(azimuth), cosPolar]);
    }
  }

  vertices.push([0, 0, -1]); // 天底

  const bottomPole = vertices.length - 1;
  const ringStart = (ring: number) => 1 + (ring - 1) * SEGMENTS;

  for (let segment = 0; segment < SEGMENTS; segment++) {
    const next = (segment + 1) % SEGMENTS;

    // 天頂キャップ
    faces.push([0, ringStart(1) + segment, ringStart(1) + next]);
    // 天底キャップ
    faces.push([bottomPole, ringStart(RINGS - 1) + next, ringStart(RINGS - 1) + segment]);
  }

  for (let ring = 1; ring < RINGS - 1; ring++) {
    for (let segment = 0; segment < SEGMENTS; segment++) {
      const next = (segment + 1) % SEGMENTS;
      const upper = ringStart(ring);
      const lower = ringStart(ring + 1);

      faces.push([upper + segment, lower + segment, lower + next]);
      faces.push([upper + segment, lower + next, upper + next]);
    }
  }

  return { vertices, faces };
};

// 保存データから Blender にインポートできる OBJ（頂点カラー付き）を組み立てる
export const buildBonsaiObj = (data: BonsaiSaveData): string => {
  const { vertices, faces } = buildUnitSphere();
  const radius = data.settings.ovuleSize;
  const count = data.bonsai.x.length;
  const lines: string[] = [
    '# Random Walk Bonsai - exported for Blender',
    '# Vertex colors are embedded in the v lines (x y z r g b).',
    `# Ovules: ${count}, saved at: ${data.savedAt}`,
    'o random_walk_bonsai',
  ];

  for (let i = 0; i < count; i++) {
    const x = data.bonsai.x[i];
    const y = data.bonsai.y[i];
    const z = data.bonsai.z[i];
    const distance = Math.sqrt(x * x + y * y + z * z);
    const color = ovuleColor(distance, data.settings);
    const colorText = `${color.r.toFixed(4)} ${color.g.toFixed(4)} ${color.b.toFixed(4)}`;

    // p5（Y が下向き）から Blender（Z が上向き）の座標系へ変換する
    const centerX = x;
    const centerY = z;
    const centerZ = -y;

    for (const [vx, vy, vz] of vertices) {
      const px = (centerX + vx * radius).toFixed(3);
      const py = (centerY + vy * radius).toFixed(3);
      const pz = (centerZ + vz * radius).toFixed(3);

      lines.push(`v ${px} ${py} ${pz} ${colorText}`);
    }
  }

  const vertexCount = vertices.length;

  for (let i = 0; i < count; i++) {
    // OBJ の頂点インデックスは 1 始まり
    const offset = i * vertexCount + 1;

    for (const [a, b, c] of faces) {
      lines.push(`f ${offset + a} ${offset + b} ${offset + c}`);
    }
  }

  return `${lines.join('\n')}\n`;
};

// 保存データを Blender 用の OBJ ファイルとしてダウンロードさせる
export const downloadBonsaiBlenderFile = (data: BonsaiSaveData): void => {
  downloadTextFile(`${bonsaiFileBaseName(data)}.obj`, buildBonsaiObj(data), 'model/obj');
};
