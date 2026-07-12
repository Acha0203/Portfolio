import type { BonsaiSettings } from '#/types';
import { useEffect, useState } from 'react';
import { BONSAI_SETTINGS_LIMITS } from '#/constants/randomWalkBonsai';
import { hasSavedBonsai } from '#/utils/bonsaiStorage';

interface Props {
  isOpen: boolean;
  settings: BonsaiSettings;
  onApply: (newSettings: BonsaiSettings) => void;
  onSave: () => void;
  onLoad: () => void;
  onClose: () => void;
}

// 数値入力は入力途中の空文字などを許容するため、フォーム内では文字列で保持する
type SettingsDraft = {
  centerColor: string;
  middleColor: string;
  edgeColor: string;
  areaRadius: string;
  numOfActiveOvules: string;
  ovuleSize: string;
};

type ColorKey = 'centerColor' | 'middleColor' | 'edgeColor';
type NumberKey = 'areaRadius' | 'numOfActiveOvules' | 'ovuleSize';

const COLOR_FIELDS: { key: ColorKey; label: string }[] = [
  { key: 'centerColor', label: 'CENTER COLOR' },
  { key: 'middleColor', label: 'MIDDLE COLOR' },
  { key: 'edgeColor', label: 'EDGE COLOR' },
];

type NumberField = { key: NumberKey; label: string; min: number; max?: number };

const AREA_RADIUS_FIELD: NumberField = {
  key: 'areaRadius',
  label: 'AREA RADIUS',
  min: BONSAI_SETTINGS_LIMITS.areaRadius.min,
};

const ACTIVE_OVULES_FIELD: NumberField = {
  key: 'numOfActiveOvules',
  label: 'ACTIVE OVULES',
  min: BONSAI_SETTINGS_LIMITS.numOfActiveOvules.min,
};

const OVULE_SIZE_FIELD: NumberField = {
  key: 'ovuleSize',
  label: 'OVULE SIZE',
  min: BONSAI_SETTINGS_LIMITS.ovuleSize.min,
  max: BONSAI_SETTINGS_LIMITS.ovuleSize.max,
};

const NUMBER_FIELDS: NumberField[] = [AREA_RADIUS_FIELD, ACTIVE_OVULES_FIELD, OVULE_SIZE_FIELD];

const toDraft = (settings: BonsaiSettings): SettingsDraft => ({
  centerColor: settings.centerColor,
  middleColor: settings.middleColor,
  edgeColor: settings.edgeColor,
  areaRadius: String(settings.areaRadius),
  numOfActiveOvules: String(settings.numOfActiveOvules),
  ovuleSize: String(settings.ovuleSize),
});

const parseNumberField = (field: NumberField, value: string): number => {
  const parsed = Number(value);

  if (value.trim() === '' || !Number.isFinite(parsed)) {
    throw new Error(`${field.label} must be a number.`);
  }
  if (!Number.isInteger(parsed)) {
    throw new Error(`${field.label} must be an integer.`);
  }
  if (parsed < field.min) {
    throw new Error(`${field.label} must be ${field.min} or more.`);
  }
  if (field.max !== undefined && parsed > field.max) {
    throw new Error(`${field.label} must be ${field.max} or less.`);
  }

  return parsed;
};

const parseDraft = (draft: SettingsDraft): BonsaiSettings => ({
  centerColor: draft.centerColor,
  middleColor: draft.middleColor,
  edgeColor: draft.edgeColor,
  areaRadius: parseNumberField(AREA_RADIUS_FIELD, draft.areaRadius),
  numOfActiveOvules: parseNumberField(ACTIVE_OVULES_FIELD, draft.numOfActiveOvules),
  ovuleSize: parseNumberField(OVULE_SIZE_FIELD, draft.ovuleSize),
});

const isSameSettings = (a: BonsaiSettings, b: BonsaiSettings): boolean =>
  a.centerColor.toLowerCase() === b.centerColor.toLowerCase() &&
  a.middleColor.toLowerCase() === b.middleColor.toLowerCase() &&
  a.edgeColor.toLowerCase() === b.edgeColor.toLowerCase() &&
  a.areaRadius === b.areaRadius &&
  a.numOfActiveOvules === b.numOfActiveOvules &&
  a.ovuleSize === b.ovuleSize;

const toErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'An unexpected error occurred.';

const BonsaiSettingsDialog = ({ isOpen, settings, onApply, onSave, onLoad, onClose }: Props) => {
  const [draft, setDraft] = useState<SettingsDraft>(() => toDraft(settings));
  const [pendingSettings, setPendingSettings] = useState<BonsaiSettings | null>(null);
  const [confirmAction, setConfirmAction] = useState<'apply' | 'load' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // ダイアログを開くたびに、適用中の設定でフォームを初期化する
  useEffect(() => {
    if (isOpen) {
      setDraft(toDraft(settings));
      setPendingSettings(null);
      setConfirmAction(null);
      setErrorMessage(null);
      setStatusMessage(null);
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  const updateDraft = (key: keyof SettingsDraft, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setStatusMessage(null);
  };

  const handleApplyRequest = () => {
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const parsed = parseDraft(draft);

      // 変更がなければ育て直す必要はないので、そのまま閉じる
      if (isSameSettings(parsed, settings)) {
        onClose();

        return;
      }

      // 適用すると盆栽が最初からになるため、先に保存するかどうかを確認する
      setPendingSettings(parsed);
      setConfirmAction('apply');
    } catch (error) {
      setErrorMessage(toErrorMessage(error));
    }
  };

  const handleLoadRequest = () => {
    setErrorMessage(null);
    setStatusMessage(null);

    if (!hasSavedBonsai()) {
      setErrorMessage('No saved bonsai data found.');

      return;
    }

    // 読み込むと現在の盆栽が失われるため、先に保存するかどうかを確認する
    setConfirmAction('load');
  };

  const handleSave = () => {
    setErrorMessage(null);

    try {
      onSave();
      setStatusMessage('Saved the current bonsai data to this browser.');
    } catch (error) {
      setErrorMessage(toErrorMessage(error));
    }
  };

  const handleConfirm = (shouldSaveFirst: boolean) => {
    try {
      if (shouldSaveFirst) {
        onSave();
      }

      if (confirmAction === 'apply' && pendingSettings !== null) {
        onApply(pendingSettings);
      } else if (confirmAction === 'load') {
        onLoad();
      }
    } catch (error) {
      setErrorMessage(toErrorMessage(error));
      setConfirmAction(null);
    }
  };

  const confirmVerb = confirmAction === 'apply' ? 'APPLY' : 'LOAD';
  const buttonClass =
    'border border-neutral-500 px-3 py-1 tracking-widest hover:bg-neutral-700 transition-colors';

  return (
    <div
      className='fixed inset-0 z-40 flex items-center justify-center bg-black/70'
      role='dialog'
      aria-modal='true'
      aria-label='Settings'
    >
      <div className='w-[min(90vw,28rem)] max-h-[85vh] overflow-y-auto border border-neutral-600 bg-neutral-900 p-6 text-white'>
        {confirmAction === null ? (
          <>
            <h2 className='mb-5 text-center text-xl tracking-[0.5rem]'>SETTINGS</h2>
            <div className='mb-5 grid grid-cols-2 gap-3'>
              {COLOR_FIELDS.map((field) => (
                <label key={field.key} className='contents'>
                  <span className='self-center text-sm tracking-wider'>{field.label}</span>
                  <input
                    type='color'
                    value={draft[field.key]}
                    onChange={(e) => updateDraft(field.key, e.target.value)}
                    className='h-8 w-full cursor-pointer bg-transparent'
                  />
                </label>
              ))}
              {NUMBER_FIELDS.map((field) => (
                <label key={field.key} className='contents'>
                  <span className='self-center text-sm tracking-wider'>{field.label}</span>
                  <input
                    type='number'
                    value={draft[field.key]}
                    min={field.min}
                    max={field.max}
                    onChange={(e) => updateDraft(field.key, e.target.value)}
                    className='border border-neutral-500 bg-transparent px-2 py-1 text-right'
                  />
                </label>
              ))}
            </div>
            {errorMessage !== null && (
              <p className='mb-3 text-sm text-red-400' role='alert'>
                {errorMessage}
              </p>
            )}
            {statusMessage !== null && <p className='mb-3 text-sm text-green-400'>{statusMessage}</p>}
            <div className='flex flex-wrap justify-center gap-3'>
              <button type='button' className={buttonClass} onClick={handleSave}>
                SAVE
              </button>
              <button type='button' className={buttonClass} onClick={handleLoadRequest}>
                LOAD
              </button>
              <button type='button' className={buttonClass} onClick={handleApplyRequest}>
                APPLY
              </button>
              <button type='button' className={buttonClass} onClick={onClose}>
                CLOSE
              </button>
            </div>
          </>
        ) : (
          <>
            <p className='mb-5 text-center leading-relaxed'>
              {confirmAction === 'apply'
                ? 'Applying new settings will restart the bonsai from scratch.'
                : 'Loading will replace the current bonsai.'}
              <br />
              Save the current bonsai and elapsed time first?
            </p>
            {errorMessage !== null && (
              <p className='mb-3 text-sm text-red-400' role='alert'>
                {errorMessage}
              </p>
            )}
            <div className='flex flex-wrap justify-center gap-3'>
              <button type='button' className={buttonClass} onClick={() => handleConfirm(true)}>
                {`SAVE & ${confirmVerb}`}
              </button>
              <button type='button' className={buttonClass} onClick={() => handleConfirm(false)}>
                {`${confirmVerb} WITHOUT SAVING`}
              </button>
              <button type='button' className={buttonClass} onClick={() => setConfirmAction(null)}>
                CANCEL
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BonsaiSettingsDialog;
