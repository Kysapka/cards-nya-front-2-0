import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { authMeThunk } from '../m2-bll/AppThunks';

import { Header } from './header';
import { AppRoutes } from './routes';

export const Main = (): React.ReactElement => {
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
