import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { AppRootStateType } from '../../m2-bll';
import { publicRoutes } from '../routes';
import {
  CARD_PACKS_ROUTE,
  LOGIN_ROUTE,
  NEW_PASS_ROUTE,
  PROFILE_ROUTE,
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
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={() => setFlag(!flag)} className={style.dropdown}>
        <div className={flag ? style.DropButton : style.DropButtonOn}>
          <div className={flag ? style.middleLine : style.middleLineOn} />
        </div>
        <div className={flag ? style.DropdownContent : style.DropdownContentOn}>
          <NavLink className={style.Link} to={isAuth ? LOGIN_ROUTE : PROFILE_ROUTE}>
            {isAuth ? 'Profile' : 'Login'}
          </NavLink>
          <NavLink className={style.Link} to={isAuth ? NEW_PASS_ROUTE : REG_ROUTE}>
            {isAuth ? 'Change Password' : 'Registration'}
          </NavLink>
          <NavLink
            style={packLogic}
            className={style.Link}
            to={isAuth ? CARD_PACKS_ROUTE : ''}
          >
            Cards Pack
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
