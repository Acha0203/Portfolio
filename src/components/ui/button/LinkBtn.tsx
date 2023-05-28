import Image from 'next/image';
import styles from '../../../styles/Home.module.scss';

interface Props {
  url: string;
  iconUrl: string;
  name: string;
  width: number;
  height: number;
}

const LinkBtn: React.FC<Props> = ({ url, iconUrl, name, width, height }) => {
  return (
    <>
      <a href={url} target='_blank' rel='noreferrer'>
        <Image
          src={iconUrl}
          alt={`${name} button`}
          width={width}
          height={height}
          sizes='100vw'
          className={`${styles.link_btn} brightness-50 hover:brightness-100`}
        />
      </a>
    </>
  );
};

export default LinkBtn;
