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
