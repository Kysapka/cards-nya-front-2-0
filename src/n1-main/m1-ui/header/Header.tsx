import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { AppRootStateType } from '../../m2-bll';
import { initAppStateType } from '../../m2-bll/app-reducer';
import { publicRoutes } from '../routes';
import {
  BASE_ROUTE,
  LOGIN_ROUTE,
  NEW_PASS_ROUTE,
  PROFILE_ROUTE,
  RECOVERY_PASS_ROUTE,
  RECOVERYPASSWORD_ROUTE,
  REG_ROUTE,
} from '../routes/consts';

import style from './Header.module.css';

export const Header = (): React.ReactElement => {
  const isAuth = useSelector((state: AppRootStateType) => state.app.isAuth);

  const variate = publicRoutes.map(({ path }) =>
    isAuth && path === LOGIN_ROUTE ? (
      ''
    ) : (
      <NavLink className={style.Link} key={path} to={path}>
        {' '}
        <span style={{ padding: '5px' }}>{path}</span>
      </NavLink>
    ),
  );

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      <div className={style.dropdown}>
        <div className={style.DropButton}>
          <div className={style.middleLine} />
        </div>
        <div className={style.DropdownContent}>
          <NavLink className={style.Link} to={isAuth ? LOGIN_ROUTE : PROFILE_ROUTE}>
            {isAuth ? 'Profile' : 'Login'}
          </NavLink>
          <NavLink className={style.Link} to={isAuth ? NEW_PASS_ROUTE : REG_ROUTE}>
            {isAuth ? 'Change Password' : 'Registration'}
          </NavLink>
        </div>
      </div>

      <div className={style.dropdown}>
        <div className={style.DropButton}>
          <div className={style.middleLine} />
        </div>
        <div className={style.DropdownContent}>{variate}</div>
      </div>
    </div>
  );
};
