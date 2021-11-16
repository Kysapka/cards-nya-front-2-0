import React from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { LOGIN_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { Login } from '../Login';

export const NewPassword = (): React.ReactElement => {
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth);
  const navigate = useNavigate();
  if (!isAuth) {
    navigate(LOGIN_ROUTE);
    return <Login />;
  }
  return (
    <div>
      <h1>NEW PASSWORD COMPONENT</h1>
    </div>
  );
};
