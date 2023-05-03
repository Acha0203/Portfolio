export type WorkObj = {
  id: number;
  title: string;
  thumbnailUrl: string;
  codeUrl: string;
  path: string;
  description: string;
};

export type MyAppState = {
  myApp: {
    isOpen: boolean;
    isHamburger: boolean;
  };
};
