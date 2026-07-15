import type { BonsaiSaveData, BonsaiSettings } from '#/types';
import { useEffect, useRef, useState } from 'react';
import { BONSAI_SETTINGS_LIMITS } from '#/constants/randomWalkBonsai';
import { UI_TEXT } from '#/constants/uiText';
import useDialogTransition from '#/hooks/useDialogTransition';
import { hasSavedBonsai, readBonsaiFile } from '#/utils/bonsaiStorage';
import CloseBtn from '#/components/ui/button/CloseBtn';
import SettingsBtnAppearance from '#/components/ui/button/SettingsBtnAppearance';
import DisplayOfMessages from '#/components/ui/DisplayOfMessages';
import styles from '#/styles/Home.module.scss';

interface Props {
  isOpen: boolean;
  settings: BonsaiSettings;
  onApply: (newSettings: BonsaiSettings) => void;
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
  onImport: (data: BonsaiSaveData) => void;
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
  { key: 'centerColor', label: UI_TEXT.settingItems.centerColor },
  { key: 'middleColor', label: UI_TEXT.settingItems.middleColor },
  { key: 'edgeColor', label: UI_TEXT.settingItems.edgeColor },
];

type NumberField = { key: NumberKey; label: string; min: number; max?: number };

const AREA_RADIUS_FIELD: NumberField = {
  key: 'areaRadius',
  label: UI_TEXT.settingItems.areaRadius,
  min: BONSAI_SETTINGS_LIMITS.areaRadius.min,
};

const ACTIVE_OVULES_FIELD: NumberField = {
  key: 'numOfActiveOvules',
  label: UI_TEXT.settingItems.activeOvules,
  min: BONSAI_SETTINGS_LIMITS.numOfActiveOvules.min,
};

const OVULE_SIZE_FIELD: NumberField = {
  key: 'ovuleSize',
  label: UI_TEXT.settingItems.ovuleSize,
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

// Tailwind の duration-300 クラスと合わせる
const TRANSITION_DURATION_MS = 300;

const BonsaiSettingsDialog = ({
  isOpen,
  settings,
  onApply,
  onSave,
  onLoad,
  onExport,
  onImport,
  onClose,
}: Props) => {
  const [draft, setDraft] = useState<SettingsDraft>(() => toDraft(settings));
  const [pendingImport, setPendingImport] = useState<BonsaiSaveData | null>(null);
  const [confirmAction, setConfirmAction] = useState<'load' | 'import' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  // 保存データの有無（EXPORT ボタンの活性状態に使う）
  const [hasSavedData, setHasSavedData] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { shouldRender, isVisible } = useDialogTransition(isOpen, TRANSITION_DURATION_MS);

  // ダイアログを開くたびに、適用中の設定でフォームを初期化する
  useEffect(() => {
    if (isOpen) {
      setDraft(toDraft(settings));
      setPendingImport(null);
      setConfirmAction(null);
      setErrorMessage(null);
      setStatusMessage(null);
      setHasSavedData(hasSavedBonsai());
    }
  }, [isOpen, settings]);

  // 閉じるアニメーションが終わるまではマウントしたままにする
  if (!shouldRender) return null;

  const updateDraft = (key: keyof SettingsDraft, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setStatusMessage(null);
  };

  const handleApplyRequest = () => {
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const parsed = parseDraft(draft);

      // 変更がなければ適用する必要はないので、そのまま閉じる
      if (isSameSettings(parsed, settings)) {
        onClose();

        return;
      }

      // 盆栽と経過時間は保持されたまま適用されるため、確認なしでそのまま適用する
      onApply(parsed);
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
      setHasSavedData(true);
    } catch (error) {
      setErrorMessage(toErrorMessage(error));
    }
  };

  const handleExport = () => {
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      onExport();
      setStatusMessage('Exported the saved bonsai data as JSON and OBJ files.');
    } catch (error) {
      setErrorMessage(toErrorMessage(error));
    }
  };

  const handleImportRequest = () => {
    setErrorMessage(null);
    setStatusMessage(null);
    fileInputRef.current?.click();
  };

  const handleImportFile = async (file: File) => {
    try {
      const data = await readBonsaiFile(file);

      // 読み込むと現在の盆栽が失われるため、先に保存するかどうかを確認する
      setPendingImport(data);
      setConfirmAction('import');
    } catch (error) {
      setErrorMessage(toErrorMessage(error));
    }
  };

  const handleConfirm = (shouldSaveFirst: boolean) => {
    try {
      if (shouldSaveFirst) {
        onSave();
      }

      if (confirmAction === 'load') {
        onLoad();
      } else if (confirmAction === 'import' && pendingImport !== null) {
        onImport(pendingImport);
      }
    } catch (error) {
      setErrorMessage(toErrorMessage(error));
      setConfirmAction(null);
    }
  };

  const confirmVerb = confirmAction === 'import' ? UI_TEXT.button.import : UI_TEXT.button.load;

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-black/70 transition-opacity duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      role='dialog'
      aria-modal='true'
      aria-label='Settings'
      onClick={(e) => {
        // ダイアログ内のクリックもここまでバブリングするため、背景自身のクリックのときだけ閉じる
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className='flex justify-end items-center z-50 absolute top-5 right-5'>
        <button type='button' onClick={onClose}>
          <CloseBtn />
        </button>
      </div>
      <div
        className={`w-1/2 max-sm:w-11/12 max-h-[85vh] overflow-y-auto border border-neutral-600 bg-neutral-900 p-2 text-white transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-4'
        }`}
      >
        {confirmAction === null ? (
          <>
            <div className='my-5 text-center text-3xl tracking-[0.5rem]'>
              {UI_TEXT.button.settings}
            </div>
            <div className='m-5 grid grid-cols-2 gap-3 px-8 max-sm:m-1'>
              {COLOR_FIELDS.map((field) => (
                <label key={field.key} className='contents'>
                  <span className='self-center text-sm tracking-wider'>{field.label}</span>
                  <input
                    type='color'
                    value={draft[field.key]}
                    onChange={(e) => updateDraft(field.key, e.target.value)}
                    className='h-7 w-full cursor-pointer bg-transparent'
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
            <div className='flex justify-center items-center mx-7 my-5'>
              {errorMessage !== null && <DisplayOfMessages message={errorMessage} isError={true} />}
              {statusMessage !== null && (
                <DisplayOfMessages message={statusMessage} isError={false} />
              )}
            </div>
            <div className='flex w-full justify-center items-center gap-2 mb-2'>
              <button type='button' className='w-2/5' onClick={handleSave}>
                <SettingsBtnAppearance buttonText={UI_TEXT.button.save} />
              </button>
              <button
                type='button'
                className='w-2/5'
                onClick={handleLoadRequest}
                disabled={!hasSavedData}
              >
                <SettingsBtnAppearance
                  buttonText={UI_TEXT.button.load}
                  isDisabled={!hasSavedData}
                />
              </button>
            </div>
            <div className='flex w-full justify-center items-center gap-2 mb-2'>
              <button
                type='button'
                className='w-2/5'
                onClick={handleExport}
                disabled={!hasSavedData}
              >
                <SettingsBtnAppearance
                  buttonText={UI_TEXT.button.export}
                  isDisabled={!hasSavedData}
                />
              </button>
              <button type='button' className='w-2/5' onClick={handleImportRequest}>
                <SettingsBtnAppearance buttonText={UI_TEXT.button.import} />
              </button>
            </div>
            <div className='flex w-full justify-center items-center mb-6'>
              <button
                type='button'
                className={styles.settings_btn_full_width}
                onClick={handleApplyRequest}
              >
                <SettingsBtnAppearance buttonText={UI_TEXT.button.applySettings} />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type='file'
              accept='.json,application/json'
              className='hidden'
              onChange={(e) => {
                const file = e.target.files?.[0];

                // 同じファイルを選び直せるように毎回リセットする
                e.target.value = '';

                if (file !== undefined) {
                  void handleImportFile(file);
                }
              }}
            />
          </>
        ) : (
          <>
            <div className='m-5 text-center leading-relaxed'>
              {confirmAction === 'import'
                ? 'Importing will replace the current bonsai.'
                : 'Loading will replace the current bonsai.'}
              <br />
              Save the current bonsai and elapsed time first?
            </div>
            <div className='flex justify-center items-center mx-7 my-5'>
              {errorMessage !== null && <DisplayOfMessages message={errorMessage} isError={true} />}
            </div>
            <div className='flex flex-col justify-center items-center gap-3 mb-6'>
              <button type='button' className='w-8/12' onClick={() => handleConfirm(true)}>
                <SettingsBtnAppearance buttonText={`${UI_TEXT.button.save} & ${confirmVerb}`} />
              </button>
              <button type='button' className='w-8/12' onClick={() => handleConfirm(false)}>
                <SettingsBtnAppearance
                  buttonText={`${confirmVerb} ${UI_TEXT.button.withoutSaving}`}
                />
              </button>
              <button type='button' className='w-8/12' onClick={() => setConfirmAction(null)}>
                <SettingsBtnAppearance buttonText={UI_TEXT.button.cancel} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BonsaiSettingsDialog;
