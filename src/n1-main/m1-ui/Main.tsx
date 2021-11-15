import React from 'react';

import { Loader } from './common/Loader';
import { Header } from './header';
import { AppRoutes } from './routes';

export const Main = (): React.ReactElement => (
  <div>
    <Header />
    <AppRoutes />
    <Loader />
  </div>
);
