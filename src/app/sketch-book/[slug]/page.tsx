import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sketchList } from '#/constants/sketchList';
import { createMetadata } from '#/utils/metadata';
import SketchPage from '#/components/page-components/SketchPage';

type Props = {
  params: Promise<{ slug: string }>;
};

const findSketchIndex = (slug: string): number => {
  const index = sketchList.findIndex((sketch) => sketch.path === `/sketch-book/${slug}`);

  if (index === -1) {
    notFound();
  }

  return index;
};

export const dynamicParams = false;

export const generateStaticParams = (): { slug: string }[] =>
  sketchList.map((sketch) => ({ slug: sketch.path.replace('/sketch-book/', '') }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const sketch = sketchList[findSketchIndex(slug)];

  return createMetadata({
    title: sketch.title,
    thumbnailUrl: `https://acha0203.github.io/Portfolio${sketch.thumbnailUrl}`,
    description: sketch.description.en.join(''),
  });
};

// スケッチ本体（関数コンポーネント）はサーバーから渡せないため、slug を渡してクライアント側で取得する
const Page = async ({ params }: Props) => {
  const { slug } = await params;

  return <SketchPage index={findSketchIndex(slug)} slug={slug} />;
};

export default Page;
