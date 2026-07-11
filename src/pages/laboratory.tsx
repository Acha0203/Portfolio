import { laboratoryList } from '#/constants/laboratoryList';
import Blackout from '#/components/Blackout';
import MyHead from '#/components/MyHead';
import ShowcaseOfWork from '#/components/ShowcaseOfWork';
import SketchBackground from '#/components/sketch-components/SketchBackground';
import TitleOfLaboratory from '#/components/TitleOfLaboratory';
import Menu from '#/components/ui/menu/Menu';
import styles from '#/styles/Home.module.scss';

const LaboratoryPage = () => {
  return (
    <>
      <MyHead
        title='Laboratory'
        description='This page shows experimental applications or documentations developed by Acha Ikeda, a designer and developer in Japan.'
      />
      <div className={`flex-col justify-center items-center relative h-screen`}>
        <div className={styles.fade_up}>
          <SketchBackground />
          <TitleOfLaboratory />
          <ShowcaseOfWork itemList={laboratoryList} />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export default LaboratoryPage;
