export type WorkObj = {
  id: number;
  title: string;
  thumbnailUrl: string;
  codeUrl: string;
  path: string;
  siteUrl: string;
  description: { ja: string; en: string };
  supplement: { ja: string; en: string };
  technology: { ja: string; en: string };
  thumbnailX: number;
  thumbnailY: number;
};

export type MyAppState = {
  myApp: {
    isOpen: boolean;
    isHamburger: boolean;
    isEnglish: boolean;
    isInTransition: boolean;
    viewportTop: number;
  };
};
