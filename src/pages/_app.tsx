import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import '../styles/reset.min.css';

const montserrat = Montserrat({
  weight: ['200', '400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font--montserrat',
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`${montserrat.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
