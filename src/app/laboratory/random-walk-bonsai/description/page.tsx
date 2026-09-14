import type { Metadata } from 'next';
import { laboratoryList } from '#/constants/laboratoryList';
import { createMetadata } from '#/utils/metadata';
import RandomWalkBonsaiDescription from '#/components/page-components/RandomWalkBonsaiDescription';

const laboratory = laboratoryList[0];

export const metadata: Metadata = createMetadata({
  title: laboratory.title,
  thumbnailUrl: `https://acha0203.github.io/Portfolio${laboratory.thumbnailUrl}-s.png`,
  description: laboratory.description.en.join(''),
});

const Page = () => {
  return <RandomWalkBonsaiDescription />;
};

export default Page;
