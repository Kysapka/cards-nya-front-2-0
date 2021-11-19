import React from 'react';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { AppRootStateType } from '../../m2-bll';
import { initAppStateType } from '../../m2-bll/app-reducer';
import { publicRoutes } from '../routes';
import { LOGIN_ROUTE, RECOVERYPASSWORD_ROUTE } from '../routes/consts';

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
    <div className={style.dropdown}>
      <div className={style.DropButton}>
        <div className={style.middleLine} />
      </div>
      <div className={style.DropdownContent}>{variate}</div>
    </div>
  );
};
