import type { Metadata } from 'next';

type MetadataOptions = {
  title?: string;
  thumbnailUrl?: string;
  description?: string;
};

// 旧 MyHead コンポーネントと同じ meta タグを出力するための Metadata を生成する
export const createMetadata = ({
  title,
  thumbnailUrl = 'https://acha0203.github.io/Portfolio/image-for-ogp.png',
  description = 'This site shows various web applications, generative arts, and others created by Acha Ikeda, a designer and developer in Japan.',
}: MetadataOptions = {}): Metadata => {
  const fullTitle = title === undefined ? 'Acha Ikeda | Portfolio' : `Acha Ikeda | ${title}`;

  return {
    title: fullTitle,
    description,
    twitter: {
      card: 'summary_large_image',
    },
    openGraph: {
      title: fullTitle,
      siteName: 'Acha Ikeda',
      description: 'Designer & Developer',
      url: 'https://acha0203.github.io/Portfolio/',
      images: thumbnailUrl,
      type: 'website',
    },
  };
};
