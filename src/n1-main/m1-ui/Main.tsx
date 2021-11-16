import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from '../m2-bll';
import { authMeThunk } from '../m2-bll/AppThunks';

import { Header } from './header';
import { AppRoutes } from './routes';

export const Main = (): React.ReactElement => {
  const isAppInitializated = useSelector<AppRootStateType, boolean>(
    state => state.app.isAppInitializated,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authMeThunk());
  }, []);

  return (
    <div>
      <Header />
      <AppRoutes />
    </div>
  );
};
