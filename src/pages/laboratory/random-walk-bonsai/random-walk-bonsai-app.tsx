import type { BonsaiData, BonsaiSaveData, BonsaiSettings } from '#/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { laboratoryList } from '#/constants/laboratoryList';
import { DEFAULT_BONSAI_SETTINGS } from '#/constants/randomWalkBonsai';
import useReload from '#/hooks/useReload';
import { downloadBonsaiFile, loadBonsai, saveBonsai } from '#/utils/bonsaiStorage';
import Blackout from '#/components/Blackout';
import BonsaiSettingsDialog from '#/components/laboratory-components/BonsaiSettingsDialog';
import RandomWalkBonsai from '#/components/laboratory-components/RandomWalkBonsai';
import MyHead from '#/components/MyHead';
import SettingsAndBackBtn from '#/components/ui/button/SettingsAndBackBtn';
import Menu from '#/components/ui/menu/Menu';
import styles from '#/styles/Home.module.scss';

const RandomWalkBonsaiApp = () => {
  useReload();

  const appData = laboratoryList[0];

  const [settings, setSettings] = useState<BonsaiSettings>(DEFAULT_BONSAI_SETTINGS);
  const [initialBonsai, setInitialBonsai] = useState<BonsaiData | null>(null);
  const [initialElapsedSeconds, setInitialElapsedSeconds] = useState(0);
  // 適用・読み込みのたびにインクリメントし、key でスケッチを再マウント（＝育て直し）する
  const [generation, setGeneration] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // スケッチ内で成長し続ける盆栽データへの参照（保存時に読み取る）
  const bonsaiRef = useRef<BonsaiData | null>(null);

  useEffect(() => {
    setElapsedSeconds(initialElapsedSeconds);

    const startTime = Date.now() - initialElapsedSeconds * 1000;
    const timerId = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timerId);
  }, [generation, initialElapsedSeconds]);

  const handleBonsaiGrow = useCallback((bonsai: BonsaiData) => {
    bonsaiRef.current = bonsai;
  }, []);

  // 現在の盆栽と経過時間を localStorage に保存する（保存できない状態ならエラーを投げ、ダイアログ側で表示する）
  const handleSave = () => {
    const bonsai = bonsaiRef.current;

    if (bonsai === null) {
      throw new Error('No bonsai data to save yet.');
    }

    saveBonsai({
      version: 1,
      settings,
      bonsai: { x: [...bonsai.x], y: [...bonsai.y], z: [...bonsai.z] },
      elapsedSeconds,
      savedAt: new Date().toISOString(),
    });
  };

  // 新しい設定で盆栽を最初から育て直す
  const handleApply = (newSettings: BonsaiSettings) => {
    setSettings(newSettings);
    setInitialBonsai(null);
    setInitialElapsedSeconds(0);
    setGeneration((prev) => prev + 1);
    setIsSettingsOpen(false);
  };

  // 保存データから、現在の設定のまま栽培を再開する（LOAD・IMPORT共通）
  const resumeFromSaveData = (savedData: BonsaiSaveData) => {
    setInitialBonsai(savedData.bonsai);
    setInitialElapsedSeconds(savedData.elapsedSeconds);
    setGeneration((prev) => prev + 1);
    setIsSettingsOpen(false);
  };

  const handleLoad = () => {
    const savedData = loadBonsai();

    if (savedData === null) {
      throw new Error('No saved bonsai data found.');
    }

    resumeFromSaveData(savedData);
  };

  // localStorage に保存済みのデータをファイルとしてダウンロードする
  const handleExport = () => {
    const savedData = loadBonsai();

    if (savedData === null) {
      throw new Error('No saved bonsai data found. Save the bonsai first.');
    }

    downloadBonsaiFile(savedData);
  };

  const handleImport = (data: BonsaiSaveData) => {
    resumeFromSaveData(data);
  };

  return (
    <>
      <MyHead
        title={appData.title}
        thumbnailUrl={`https://acha0203.github.io/Portfolio${appData.thumbnailUrl}-s.png`}
        description={appData.description.en.join('')}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <RandomWalkBonsai
            key={generation}
            settings={settings}
            initialBonsai={initialBonsai}
            elapsedSeconds={elapsedSeconds}
            onBonsaiGrow={handleBonsaiGrow}
          />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${appData.title.toUpperCase()}`}</div>
          <SettingsAndBackBtn
            prevPage={appData.path}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        </div>
        <BonsaiSettingsDialog
          isOpen={isSettingsOpen}
          settings={settings}
          onApply={handleApply}
          onSave={handleSave}
          onLoad={handleLoad}
          onExport={handleExport}
          onImport={handleImport}
          onClose={() => setIsSettingsOpen(false)}
        />
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default RandomWalkBonsaiApp;
