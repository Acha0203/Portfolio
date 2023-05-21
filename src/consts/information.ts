import type { InfoObj } from '@/types';

const info1: InfoObj = {
  id: 1,
  description: {
    en: `
1991: Bachelor of Fine Arts, Tokyo University of the Arts, Tokyo

1993: Master of Fine Arts, Graduate School of Fine Arts, Tokyo University of the Arts, Tokyo

1992 - 2000: Designed and created various 3D computer graphics for games, publishing, and so on.

2000 - 2011: Designed and coded various websites and created raster or vector graphics for websites.

2012 - Present: Translated English texts into Japanese, including IT and computer marketing materials, computer software manuals, cyber security reports.

2021 - Present: Designed and developed various web applications and websites.
`,
    ja: `
1991 年 東京藝術大学美術学部デザイン科卒業

1993 年 東京藝術大学大学院美術研究科修士課程修了

1992 年 〜 2000 年: ゲーム、印刷物向けに 3D コンピュータグラフィックスのデザインおよび制作に従事

2000 年 〜 2011 年: さまざまな Web サイトのデザインおよびコーディング、Web サイト用のラスターまたはベクター画像の制作等に従事

2012 年 〜 現在: IT およびコンピュータ関連のドキュメント、マーケティング資料、サイバーセキュリティレポートなどの英日翻訳に従事

2021 年 〜 現在: Web アプリケーションや Web サイトのデザインおよび開発に従事
`,
  },
};

const info2: InfoObj = {
  id: 2,
  description: {
    en: `
1990: Won the second prize in the MdN CG Grand Prix.

1992: Won a special jury prize and the second prize of the students still image category in the Japan CG Grand Prix.
`,
    ja: `
1990 年 MdN CG グランプリにて優秀賞を受賞

1992 年日本 CG グランプリ学生静止画部門にて審査員特別賞、優秀賞を受賞
`,
  },
};

export const infoList: InfoObj[] = [info1, info2];
