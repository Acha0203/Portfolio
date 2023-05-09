import type { NextPage } from 'next';
import Head from 'next/head';

interface MyHeadProps {
  title?: string;
  thumbnailUrl?: string;
  description?: string;
  ogDescription?: string;
}

const MyHead: NextPage<MyHeadProps> = ({ title, thumbnailUrl, description, ogDescription }) => {
  title = title === undefined ? 'Acha Ikeda | Portfolio' : `Acha Ikeda | ${title}`;

  if (description === undefined) {
    description =
      'This site shows various web applications, generative arts, and others created by Acha Ikeda, a designer and developer in Japan.';
  }

  if (thumbnailUrl === undefined) {
    thumbnailUrl = 'https://acha0203.github.io/Portfolio/image-for-ogp.png';
  }

  if (ogDescription === undefined) {
    ogDescription = 'Designer & Developer';
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} key='desc' />
      <meta property='og:title' content={title} />
      <meta property='og:image' content={thumbnailUrl} />
      <meta property='og:description' content={ogDescription} />
    </Head>
  );
};

export default MyHead;
