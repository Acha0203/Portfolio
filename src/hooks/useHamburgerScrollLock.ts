import type { MyAppState } from '@/types';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HAMBURGER_ID from '../components/ui/HamburgerMenu';

/** スクロール可能な要素かどうかを判定する関数 */
const isScrollable = (element: Element) => element.clientHeight < element.scrollHeight;

export const useHamburgerScrollLock = () => {
  const isOpen = useSelector((state: MyAppState) => state.myApp.isOpen);

  /** 指定した要素以外のスクロールを抑止する関数（iOS Safariの場合のみの制御） */
  const scrollLock = (event: TouchEvent) => {
    const canScrollElement = (event.target as HTMLDivElement)?.closest(`#${HAMBURGER_ID}`);

    if (canScrollElement === null) {
      // MEMO : 対象の要素でなければスクロール禁止にする
      event.preventDefault();

      return;
    }

    if (canScrollElement !== null && isScrollable(canScrollElement)) {
      // MEMO : 対象の要素があり、その要素がスクロール可能であればスクロールを許可する
      event.stopPropagation();
    } else {
      // MEMO : 対象の要素はスクロール禁止にする
      event.preventDefault();
    }
  };

  const scrollLockFix = (event: Event) => {
    const element = event.target as HTMLDivElement;

    if (element === null) return;

    // 以下の手順で発生するスクロールのバグ対策。回避するため1pxだけスクロール量を減らす
    // 1. メニューを上下どちらかに最大までスクロールする
    // 2. 更にスクロールを行うとページ全体がスクロールする
    if (element.scrollTop + element.clientHeight === element.scrollHeight) {
      element.scrollTop = element.scrollTop - 1;
    }

    if (element.scrollTop === 0) {
      element.scrollTop = 1;
    }
  };

  /** スクロールのバグ対策を行うイベントを追加する関数 */
  const scrollLockFixAdd = useCallback((element: HTMLElement) => {
    const canScrollElement = element.querySelector<HTMLDivElement>(`#${HAMBURGER_ID}`);

    if (canScrollElement === null) return;

    canScrollElement.addEventListener('scroll', scrollLockFix);
  }, []);

  /** スクロールのバグ対策を行うイベントを削除する関数 */
  const scrollLockFixRemove = useCallback((element: HTMLElement) => {
    const canScrollElement = element.querySelector<HTMLDivElement>(`#${HAMBURGER_ID}`);

    if (canScrollElement === null) return;

    canScrollElement.removeEventListener('scroll', scrollLockFix);
  }, []);

  /** モーダルを開いているときに背面コンテンツのスクロールを全デバイスで抑制する関数 */
  const scrollStopBackContent = () => {
    const canScrollHamburgerElement = document.querySelector<HTMLDivElement>(`#${HAMBURGER_ID}`);

    if (canScrollHamburgerElement === null || !isOpen) return;

    // デスクトップ向けの処理
    document.body.style.overflowY = 'hidden';
    // iOS向けの処理
    scrollLockFixAdd(canScrollHamburgerElement);
    document.addEventListener('touchmove', scrollLock, { passive: false });

    return () => {
      document.body.style.overflowY = 'auto';
      scrollLockFixRemove(canScrollHamburgerElement);
      document.removeEventListener('touchmove', scrollLock);
    };
  };

  useEffect(scrollStopBackContent, [isOpen, scrollLockFixAdd, scrollLockFixRemove]);
};
