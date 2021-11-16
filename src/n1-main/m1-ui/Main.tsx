import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { authMeThunk } from '../m2-bll/AppThunks';

import { Loader } from './common/Loader';
import { Header } from './header';
import { AppRoutes } from './routes';

export const Main = (): React.ReactElement => {
  // const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth);
  // const navigate = useNavigate();
  // if (!isAuth) {
  //   navigate('/login');
  // }
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
