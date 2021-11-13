import React from 'react';

import { Header } from './header/Header';
import { AppRoutes } from './routes/AppRoutes';

export const Main = (): React.ReactElement => (
  <div>
    <Header />
    <AppRoutes />
  </div>
);
