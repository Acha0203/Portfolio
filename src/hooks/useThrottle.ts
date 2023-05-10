import { useCallback, useRef } from 'react';

// 受け取った関数をスロットリング
const useThrottle = <T>(
  fn: (args?: T) => void,
  durationMS: number, // スロットルする時間
) => {
  const scrollingTimer = useRef<undefined | NodeJS.Timeout>();

  return useCallback(
    (args?: T) => {
      if (scrollingTimer.current) return; // すでにタイマーがセットされている場合は何もしない
      scrollingTimer.current = setTimeout(() => {
        fn(args);
        scrollingTimer.current = undefined; // タイマーをリセット
      }, durationMS);
    },
    [durationMS, fn],
  );
};

export default useThrottle;
