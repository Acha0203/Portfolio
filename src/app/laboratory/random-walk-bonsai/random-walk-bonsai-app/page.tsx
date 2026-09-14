import type { Metadata } from 'next';
import { laboratoryList } from '#/constants/laboratoryList';
import { createMetadata } from '#/utils/metadata';
import RandomWalkBonsaiApp from '#/components/page-components/RandomWalkBonsaiApp';

const appData = laboratoryList[0];

export const metadata: Metadata = createMetadata({
  title: appData.title,
  thumbnailUrl: `https://acha0203.github.io/Portfolio${appData.thumbnailUrl}-s.png`,
  description: appData.description.en.join(''),
});

const Page = () => {
  return <RandomWalkBonsaiApp />;
};

export default Page;
