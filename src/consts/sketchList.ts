import type { WorkObj } from '@/types';

const sketch1: WorkObj = {
  id: 1,
  title: 'Rotation 2',
  thumbnailUrl: '/images/Sketch_Images/rotation-02.png',
  codeUrl: 'https://github.com/Acha0203/Creative_Coding/blob/main/scripts/sketches/rotation02-b.js',
  path: '/sketch-book/rotation-02',
  description: '',
} as const;

const sketch2: WorkObj = {
  id: 2,
  title: 'Symmetrical Ruler 1',
  thumbnailUrl: '/images/Sketch_Images/symmetrical-ruler-01.png',
  codeUrl:
    'https://github.com/Acha0203/Creative_Coding/blob/main/scripts/sketches/symmetrical-ruler02-b.js',
  path: '/sketch-book/symmetrical-ruler-01',
  description: '',
} as const;

const sketch3: WorkObj = {
  id: 3,
  title: 'Happy New Year 2023',
  thumbnailUrl: '/images/Sketch_Images/happy-new-year-2023.png',
  codeUrl:
    'https://github.com/Acha0203/Creative_Coding/blob/main/scripts/tweets/happy-new-year-2023.js',
  path: '/sketch-book/happy-new-year-2023',
  description: '',
} as const;

export const sketchList: WorkObj[] = [sketch1, sketch2, sketch3];
