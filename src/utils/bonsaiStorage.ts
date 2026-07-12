import type { BonsaiData, BonsaiSaveData, BonsaiSettings } from '#/types';

const STORAGE_KEY = 'randomWalkBonsai';

const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'number' && Number.isFinite(item));

const isBonsaiData = (value: unknown): value is BonsaiData => {
  if (typeof value !== 'object' || value === null) return false;

  const data = value as Record<string, unknown>;

  return (
    isNumberArray(data.x) &&
    isNumberArray(data.y) &&
    isNumberArray(data.z) &&
    data.x.length === data.y.length &&
    data.x.length === data.z.length
  );
};

const isBonsaiSettings = (value: unknown): value is BonsaiSettings => {
  if (typeof value !== 'object' || value === null) return false;

  const settings = value as Record<string, unknown>;

  return (
    typeof settings.centerColor === 'string' &&
    typeof settings.middleColor === 'string' &&
    typeof settings.edgeColor === 'string' &&
    typeof settings.areaRadius === 'number' &&
    typeof settings.numOfActiveOvules === 'number' &&
    typeof settings.ovuleSize === 'number'
  );
};

const isBonsaiSaveData = (value: unknown): value is BonsaiSaveData => {
  if (typeof value !== 'object' || value === null) return false;

  const data = value as Record<string, unknown>;

  return (
    data.version === 1 &&
    isBonsaiSettings(data.settings) &&
    isBonsaiData(data.bonsai) &&
    typeof data.elapsedSeconds === 'number' &&
    Number.isFinite(data.elapsedSeconds) &&
    typeof data.savedAt === 'string'
  );
};

// JSON 文字列を検証付きで BonsaiSaveData に変換する（localStorage・ファイル共通）
export const parseBonsaiSaveData = (json: string): BonsaiSaveData => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error('The bonsai data is not valid JSON.');
  }

  if (!isBonsaiSaveData(parsed)) {
    throw new Error('The bonsai data has an unexpected format.');
  }

  return parsed;
};

export const saveBonsai = (data: BonsaiSaveData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// 保存データがなければ null を返し、存在するのに壊れている場合はエラーを投げる
export const loadBonsai = (): BonsaiSaveData | null => {
  const json = localStorage.getItem(STORAGE_KEY);

  if (json === null) return null;

  return parseBonsaiSaveData(json);
};

export const hasSavedBonsai = (): boolean => localStorage.getItem(STORAGE_KEY) !== null;

// 保存データを JSON ファイルとしてダウンロードさせる
export const downloadBonsaiFile = (data: BonsaiSaveData): void => {
  // savedAt をファイル名に使えるよう「YYYY-MM-DD-HHmmss」に整形する
  const timestamp = data.savedAt.replace(/[T:]/g, '-').replace(/\..*$/, '');
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = `random-walk-bonsai-${timestamp}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
};

// ユーザーが選択したファイルを読み込んで検証する
export const readBonsaiFile = async (file: File): Promise<BonsaiSaveData> => {
  const json = await file.text();

  return parseBonsaiSaveData(json);
};
