import React, { ChangeEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Loader } from '../../../n1-main/m1-ui/common/Loader';
import { LOGIN_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { LogOut } from '../LogOut/LogOutThunk';

import { addAvatarTC } from './Profile-Reducer';
import style from './profile-style.module.css';

export const Profile = (): React.ReactElement => {
  const dispatch = useDispatch();
  const profileState = useSelector((state: AppRootStateType) => state.profile);
  const userName = useSelector((state: AppRootStateType) => state.profile.name);
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

  const fileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event && userName) {
      if (event.currentTarget.files) {
        const reader = new FileReader();
        reader.onload = function (e: any) {
          dispatch(addAvatarTC(userName, e.target.result));
        };
        reader.readAsDataURL(event.currentTarget.files[0]);
      }
    }
  };

  return (
    <div>
      <span>Profile Component render</span>
      {isAuth && (
        <div>
          <div className={style.containerAvatar}>
            <img
              className={style.avatar}
              src={profileState.avatar ? profileState.avatar : ''}
              alt=""
            />
          </div>
          <input type="file" onChange={fileUpload} />
          <h2>My name is: {profileState.name}</h2>
          <p>Date of Create:{profileState.created}</p>
          <button onClick={onLogoutClick}>Logout</button>
        </div>
      )}
    </div>
  );
};
