import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { Loader } from '../../../n1-main/m1-ui/common/Loader';
import { LOGIN_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { LogOut } from '../LogOut/LogOutThunk';

export const Profile = (): React.ReactElement => {
  const dispatch = useDispatch();
  const profileState = useSelector((state: AppRootStateType) => state.profile);
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth);
  const isAppInitializated = useSelector<AppRootStateType, boolean>(
    state => state.app.isAppInitializated,
  );

  if (!isAppInitializated) {
    return <Loader />;
  }

  if (!isAuth) {
    return <Navigate to={LOGIN_ROUTE} />;
  }

  const onLogoutClick = (): void => {
    dispatch(LogOut());
  };

  return (
    <div>
      <span>Profile Component render</span>
      {isAuth && (
        <div>
          <img src={profileState.avatar ? profileState.avatar : ''} alt="" />
          <h2>My name is: {profileState.name}</h2>
          <p>Date of Create:{profileState.created}</p>
          <button onClick={onLogoutClick}>Logout</button>
        </div>
      )}
    </div>
  );
};
