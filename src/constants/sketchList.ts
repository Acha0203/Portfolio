import type { WorkObj } from '#/types';

type SketchSeed = {
  title: string;
  slug: string;
  /** GitHubのスクリプトファイル名がslugと異なる場合のみ指定する（拡張子なし） */
  script?: string;
  /** サムネイル画像のファイル名がslugと異なる場合のみ指定する（拡張子なし） */
  thumbnail?: string;
};

const sketchSeeds: SketchSeed[] = [
  { title: 'Rotation 2', slug: 'rotation-02', script: 'rotation-02-b' },
  { title: 'Blooming 2', slug: 'blooming-02' },
  { title: 'Clifford Attractor 3', slug: 'clifford-attractor-03' },
  { title: 'Circle Motion 2', slug: 'circle-motion-02' },
  { title: 'Circle Motion 1', slug: 'circle-motion-01' },
  { title: 'Rotation 6', slug: 'rotation-06' },
  { title: 'Composition 2', slug: 'composition-02', script: 'composition-02-a' },
  { title: 'Sombrero', slug: 'sombrero' },
  { title: 'Bezier 8', slug: 'bezier-08' },
  { title: 'Concentric Circle 4', slug: 'concentric-circle-04' },
  { title: 'Perlin Noise 4', slug: 'perlin-noise-04' },
  { title: 'Blooming 3', slug: 'blooming-03' },
  { title: 'Rotation 3', slug: 'rotation-03' },
  { title: 'Rainy Lake', slug: 'rainy-lake' },
  { title: 'Bezier Dance 1', slug: 'bezier-dance-01' },
  { title: 'Lazuline Fire', slug: 'lazuline-fire' },
  { title: 'Rotation 5', slug: 'rotation-05' },
  { title: 'Infinite Fans', slug: 'infinite-fans' },
  { title: 'Rain', slug: 'rain' },
  { title: 'Psychedelic Curve', slug: 'psychedelic-curve' },
  { title: 'Tentacles', slug: 'tentacles' },
  { title: 'Luminous Wave 1', slug: 'luminous-wave-01' },
  { title: 'Illusion', slug: 'illusion' },
  { title: 'Verdure', slug: 'verdure' },
  { title: 'Luminous Spiral 1', slug: 'luminous-spiral-01' },
  { title: 'Luminous Spiral 2', slug: 'luminous-spiral-02' },
  { title: 'Ainu Fantasy 1', slug: 'ainu-fantasy-01' },
  { title: 'Ainu Fantasy 2', slug: 'ainu-fantasy-02' },
  { title: 'Bezier Dance 2', slug: 'bezier-dance-02' },
  { title: 'minacoding 2023', slug: 'minacoding-2023', script: 'minacoding2023' },
  { title: 'Luminous Spiral 3', slug: 'luminous-spiral-03' },
  { title: 'Fireworks 1', slug: 'fireworks-01' },
  { title: 'Fireworks 2', slug: 'fireworks-02' },
  { title: 'Luminous Wave 2', slug: 'luminous-wave-02' },
  { title: 'Blooming 4', slug: 'blooming-04' },
  { title: 'String Sextet 1', slug: 'string-sextet-01' },
  { title: 'Snowy Quartet', slug: 'snowy-quartet' },
  { title: 'Castle with Twelve Ramparts', slug: 'castle-with-twelve-ramparts' },
  { title: 'Ocean Current', slug: 'ocean-current' },
  { title: 'Rainbow Circulation', slug: 'rainbow-circulation' },
  { title: 'Energetic Dance 2', slug: 'energetic-dance-02' },
  { title: 'Floating Triangles', slug: 'floating-triangles' },
  { title: 'Kandeon', slug: 'kandeon' },
  { title: 'Grassland', slug: 'grassland' },
  { title: 'Winding by Humidity', slug: 'winding-by-humidity' },
];

export const sketchList: WorkObj[] = sketchSeeds.map((seed, index) => ({
  id: index + 1,
  title: seed.title,
  thumbnailUrl: `/images/Sketch_Images/${seed.thumbnail ?? seed.slug}.png`,
  codeUrl: `https://github.com/Acha0203/Creative_Coding/blob/main/scripts/sketches/${
    seed.script ?? seed.slug
  }.js`,
  path: `/sketch-book/${seed.slug}`,
  siteUrl: '',
  description: {
    ja: [''],
    en: [
      'This page shows a generative art created by Acha Ikeda, a designer and developer in Japan.',
    ],
  },
  supplement: {
    ja: [''],
    en: [''],
  },
  technology: {
    ja: ['p5.js'],
    en: ['p5.js'],
  },
  thumbnailX: 0,
  thumbnailY: 0,
}));
