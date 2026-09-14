'use client';

import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import useSmoothScroll from '#/hooks/useSmoothScroll';
import store from '#/store';

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  useSmoothScroll();

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
