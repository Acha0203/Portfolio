import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { workList } from '#/constants/workList';
import { createMetadata } from '#/utils/metadata';
import WorkDetailPage from '#/components/page-components/WorkDetailPage';

type Props = {
  params: Promise<{ slug: string }>;
};

const findWorkIndex = (slug: string): number => {
  const index = workList.findIndex((work) => work.path === `/work/${slug}`);

  if (index === -1) {
    notFound();
  }

  return index;
};

export const dynamicParams = false;

export const generateStaticParams = (): { slug: string }[] =>
  workList.map((work) => ({ slug: work.path.replace('/work/', '') }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const work = workList[findWorkIndex(slug)];

  return createMetadata({
    title: work.title,
    thumbnailUrl: `https://acha0203.github.io/Portfolio${work.thumbnailUrl}-s.png`,
    description: work.description.en.join(''),
  });
};

const Page = async ({ params }: Props) => {
  const { slug } = await params;

  return <WorkDetailPage index={findWorkIndex(slug)} />;
};

export default Page;
