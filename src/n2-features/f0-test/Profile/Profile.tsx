import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Loader } from '../../../n1-main/m1-ui/common/Loader';
import { LOGIN_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { LogOut } from '../LogOut/LogOutThunk';

export const Profile = (): React.ReactElement => {
  const dispatch = useDispatch();
  const profileState = useSelector((state: AppRootStateType) => state.profile);
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth);
  const navigate = useNavigate();
  const isAppInitializated = useSelector<AppRootStateType, boolean>(
    state => state.app.isAppInitializated,
  );
  useEffect(() => {
    if (!isAuth) {
      navigate(LOGIN_ROUTE, { replace: true });
    }
  }, [isAuth]);
  const onLogoutClick = (): void => {
    dispatch(LogOut());
  };

  if (!isAppInitializated) {
    return <Loader />;
  }

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
