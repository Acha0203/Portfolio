import { laboratoryList } from '#/constants/laboratoryList';
import useReload from '#/hooks/useReload';
import Blackout from '#/components/Blackout';
import RandomWalkBonsai from '#/components/laboratory-components/RandomWalkBonsai';
import MyHead from '#/components/MyHead';
import CodeAndBackBtn from '#/components/ui/button/CodeAndBackBtn';
import Menu from '#/components/ui/menu/Menu';
import styles from '#/styles/Home.module.scss';

const RandomWalkBonsaiApp = () => {
  useReload();

  const appData = laboratoryList[0];

  return (
    <>
      <MyHead
        title={appData.title}
        thumbnailUrl={`https://acha0203.github.io/Portfolio${appData.thumbnailUrl}-s.png`}
        description={appData.description.en.join('')}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <RandomWalkBonsai />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${appData.title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${appData.codeUrl}`} prevPage={appData.path} />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default RandomWalkBonsaiApp;
