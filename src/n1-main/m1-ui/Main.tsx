import React from 'react';

import { useSelector } from 'react-redux';

import { AppRootStateType } from '../m2-bll';

import { Loader } from './common/Loader';
import { Header } from './header';
import { AppRoutes } from './routes';

export const Main = (): React.ReactElement => {
  const isAppInitializated = useSelector<AppRootStateType, boolean>(
    state => state.app.isAppInitializated,
  );

  if (!isAppInitializated) {
    return <Loader />;
  }
  return (
    <div>
      <Header />
      <AppRoutes />
    </div>
  );
};
