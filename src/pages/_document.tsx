import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='https://acha0203.github.io/Portfolio/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='https://acha0203.github.io/Portfolio/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='https://acha0203.github.io/Portfolio/favicon-16x16.png'
        />
        <link rel='manifest' href='https://acha0203.github.io/Portfolio/site.webmanifest' />
        <link
          rel='mask-icon'
          href='https://acha0203.github.io/Portfolio/safari-pinned-tab.svg'
          color='#5bbad5'
        />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
