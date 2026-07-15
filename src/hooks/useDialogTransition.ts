import { useEffect, useState } from 'react';

type DialogTransition = {
  // ダイアログをDOMにマウントしておくべきか（閉じるアニメーション中も true のまま）
  shouldRender: boolean;
  // 表示状態のスタイルを適用すべきか（CSS transition のトリガーに使う）
  isVisible: boolean;
};

const useDialogTransition = (isOpen: boolean, durationMs: number): DialogTransition => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);

      // マウント直後に表示状態へ切り替えると、非表示状態のスタイルが計算される前に
      // クラスが変わって transition が発火しないことがあるため、2フレーム待つ
      let rafId2 = 0;
      const rafId1 = requestAnimationFrame(() => {
        rafId2 = requestAnimationFrame(() => setIsVisible(true));
      });

      return () => {
        cancelAnimationFrame(rafId1);
        cancelAnimationFrame(rafId2);
      };
    }

    setIsVisible(false);

    // 閉じるアニメーションが終わるのを待ってからアンマウントする
    const timerId = setTimeout(() => setShouldRender(false), durationMs);

    return () => clearTimeout(timerId);
  }, [isOpen, durationMs]);

  return { shouldRender, isVisible };
};

export default useDialogTransition;
