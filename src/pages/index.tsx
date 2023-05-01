import Head from 'next/head';
import MenuBar from '@/components/ui/MenuBar';

const Home = () => {
  return (
    <>
      <Head>
        <title>Acha&apos;s Sketch Book</title>
        <meta
          name='description'
          content="This site shows Acha's generative arts with p5.js."
          key='desc'
        />
      </Head>
      <div className='flex justify-center items-center'>
        <MenuBar />
      </div>
    </>
  );
};

export default Home;
