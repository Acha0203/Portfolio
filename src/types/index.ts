export type WorkObj = {
  id: number;
  title: string;
  thumbnailUrl: string;
  codeUrl: string;
  path: string;
  siteUrl: string;
  description: BilingualTexts;
  supplement: BilingualTexts;
  technology: BilingualTexts;
  thumbnailX: number;
  thumbnailY: number;
};

export type MyAppState = {
  myApp: {
    isOpen: boolean;
    isHamburger: boolean;
    isInTransition: boolean;
    language: string;
  };
};

export type BilingualTexts = {
  ja: string[];
  en: string[];
};

export type InfoObj = {
  id: number;
  description: BilingualTexts;
};

export enum InfoType {
  description = 'description',
  technology = 'technology',
  algorithm = 'ALGORITHM FOR GAME AI',
  background = 'background',
  prizes = 'prizes',
}

// Random Walk Bonsai のユーザー設定
// 色は P5.Color ではなく '#rrggbb' 形式で持つ（localStorage 保存や <input type="color"> と互換にするため）
export type BonsaiSettings = {
  centerColor: string;
  middleColor: string;
  edgeColor: string;
  areaRadius: number;
  numOfActiveOvules: number;
  ovuleSize: number;
};

// 固着した胚珠（盆栽本体）の座標
export type BonsaiData = {
  x: number[];
  y: number[];
  z: number[];
};

// localStorage およびファイルエクスポートに使う保存データ
export type BonsaiSaveData = {
  version: 1;
  settings: BonsaiSettings;
  bonsai: BonsaiData;
  elapsedSeconds: number;
  savedAt: string;
};
