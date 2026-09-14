import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Montserrat, Noto_Sans_JP } from 'next/font/google';
import { createMetadata } from '#/utils/metadata';
import Providers from '#/components/Providers';
import '#/styles/globals.css';
import '#/styles/reset.min.css';

const montserrat = Montserrat({
  weight: ['200', '400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font--montserrat',
});

const notoSansJP = Noto_Sans_JP({
  weight: ['200', '400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font--notoSansJP',
});

export const metadata: Metadata = {
  ...createMetadata(),
  icons: {
    apple: {
      url: 'https://acha0203.github.io/Portfolio/apple-touch-icon.png',
      sizes: '180x180',
    },
    icon: [
      {
        url: 'https://acha0203.github.io/Portfolio/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: 'https://acha0203.github.io/Portfolio/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    other: {
      rel: 'mask-icon',
      url: 'https://acha0203.github.io/Portfolio/safari-pinned-tab.svg',
      color: '#5bbad5',
    },
  },
  manifest: 'https://acha0203.github.io/Portfolio/site.webmanifest',
  other: {
    'msapplication-TileColor': '#da532c',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang='en'>
      <body>
        <main className={`${montserrat.variable} ${notoSansJP.variable}`}>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
