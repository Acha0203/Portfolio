'use client';

import { workList } from '#/constants/workList';
import Blackout from '#/components/Blackout';
import ShowcaseOfWork from '#/components/ShowcaseOfWork';
import SketchBackground from '#/components/sketch-components/SketchBackground';
import TitleOfWork from '#/components/TitleOfWork';
import Menu from '#/components/ui/menu/Menu';
import styles from '#/styles/Home.module.scss';

const WorkPage = () => {
  return (
    <>
      <div className={`flex-col justify-center items-center relative h-screen`}>
        <div className={styles.fade_up}>
          <SketchBackground />
          <TitleOfWork />
          <ShowcaseOfWork itemList={workList} />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default WorkPage;
