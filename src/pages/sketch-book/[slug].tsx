import type { GetStaticPaths, GetStaticProps } from 'next';
import { sketchList } from '@/constants/sketchList';
import { sketchComponentMap } from '@/constants/sketchComponentMap';
import useReload from '@/hooks/useReload';
import Blackout from '@/components/Blackout';
import MyHead from '@/components/MyHead';
import CodeAndBackBtn from '@/components/ui/button/CodeAndBackBtn';
import Menu from '@/components/ui/menu/Menu';
import styles from '@/styles/Home.module.scss';

type Props = {
  index: number;
  slug: string;
};

const SketchPage = ({ index, slug }: Props) => {
  useReload();

  const SketchComponent = sketchComponentMap[slug];
  const sketch = sketchList[index];

  return (
    <>
      <MyHead
        title={sketch.title}
        thumbnailUrl={sketch.thumbnailUrl}
        description={sketch.description.en.join('')}
      />
      <div className='flex-col justify-center items-center relative'>
        <div className={styles.curtain}>
          <SketchComponent />
        </div>
        <div
          className={`flex-col justify-center items-center absolute bottom-10 ${styles.fade_up}`}
        >
          <div className={styles.title_of_sketch}>{`${sketch.title.toUpperCase()}`}</div>
          <CodeAndBackBtn url={`${sketch.codeUrl}`} prevPage='/sketch-book' />
        </div>
        <Blackout />
        <Menu />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = sketchList.map(sketch => ({
    params: { slug: sketch.path.replace('/sketch-book/', '') },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params!.slug as string;
  const index = sketchList.findIndex(s => s.path === `/sketch-book/${slug}`);
  return { props: { index, slug } };
};

export default SketchPage;
