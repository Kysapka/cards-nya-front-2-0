import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { AppRootStateType } from '../../m2-bll';
import { initAppStateType } from '../../m2-bll/app-reducer';
import { publicRoutes } from '../routes';
import {
  BASE_ROUTE,
  CARD_PACKS_ROUTE,
  LOGIN_ROUTE,
  NEW_PASS_ROUTE,
  PROFILE_ROUTE,
  RECOVERY_PASS_ROUTE,
  RECOVERYPASSWORD_ROUTE,
  REG_ROUTE,
} from '../routes/consts';

import style from './Header.module.scss';

export const Header = (): React.ReactElement => {
  const [flag, setFlag] = useState<boolean>(false);
  const isAuth = useSelector((state: AppRootStateType) => state.app.isAuth);

  const packLogic = isAuth ? {} : { display: 'none' };
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
    <div>
      <div className={style.mainNav}>
        <div className={style.DropButton}>
          <div className={style.middleLine} />
        </div>{' '}
        <NavLink className={style.mainNavLink} to={isAuth ? LOGIN_ROUTE : PROFILE_ROUTE}>
          {isAuth ? 'Profile' : 'Login'}
        </NavLink>
        <NavLink
          style={packLogic}
          className={style.mainNavLink}
          to={isAuth ? CARD_PACKS_ROUTE : ''}
        >
          Cards Pack
        </NavLink>
        <NavLink className={style.mainNavLink} to={isAuth ? NEW_PASS_ROUTE : REG_ROUTE}>
          {isAuth ? 'Change Password' : 'Registration'}
        </NavLink>
      </div>
    </div>
  );
};
