import type { BonsaiSettings } from '#/types';

export const DEFAULT_BONSAI_SETTINGS: BonsaiSettings = {
  centerColor: '#808000',
  middleColor: '#ffffff',
  edgeColor: '#008080',
  areaRadius: 500,
  numOfActiveOvules: 20,
  ovuleSize: 10,
};

export const BONSAI_SETTINGS_LIMITS = {
  areaRadius: { min: 500 },
  numOfActiveOvules: { min: 1 },
  ovuleSize: { min: 10, max: 100 },
} as const;
