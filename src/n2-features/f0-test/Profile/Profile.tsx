import React, { ChangeEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

import { Loader } from '../../../n1-main/m1-ui/common/Loader';
import { LOGIN_ROUTE, NEW_PASS_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import { LogOut } from '../LogOut/LogOutThunk';

import { addAvatarTC, changeUserNameAC, changeUserNameTC } from './Profile-Reducer';
import style from './profile-style.module.scss';

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
    <div className={style.profileContainer}>
      <div className={style.avatarContainer}>
        {isAuth && (
          <div className={style.boxAvatar}>
            <img
              className={style.avatar}
              src={profileState.avatar ? profileState.avatar : ''}
              alt="profileAvatar"
            />
            <div className={style.boxUploadButton}>
              <input className={style.uploadButton} type="file" onChange={fileUpload} />
            </div>
          </div>
        )}
      </div>
      <div className={style.descriptionContainer}>
        <div className={style.descriptionBox}>
          <h2 className={style.titleName}>
            {' '}
            <EditableSpan name={userName!} thunk={changeUserNameTC} />
          </h2>
          <p className={style.description}>Date of Create:{profileState.created}</p>
          <NavLink to={NEW_PASS_ROUTE}>Change Password</NavLink>
          <button
            style={{ width: 'max-content' }}
            onClick={onLogoutClick}
            type="button"
            className="btn btn-danger btn-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
