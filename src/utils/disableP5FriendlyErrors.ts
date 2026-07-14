import type P5 from 'p5';

// Friendly Error System のコード解析による開発時の SyntaxError ノイズを抑止する。
// p5.js 2.x の FES はインスタンスではなく p5 クラスの静的フラグを参照するため、
// コンストラクタ経由でクラス側に設定する。スケッチ関数の先頭で呼ぶこと。
export const disableP5FriendlyErrors = (p5: P5): void => {
  (p5.constructor as unknown as { disableFriendlyErrors: boolean }).disableFriendlyErrors = true;
};
