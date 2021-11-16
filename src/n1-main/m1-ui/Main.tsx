import React from 'react';

import { Header } from './header';
import { AppRoutes } from './routes';

export const Main = (): React.ReactElement => (
  <div>
    <Header />
    <AppRoutes />
  </div>
);
