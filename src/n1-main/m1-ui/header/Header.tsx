import React from 'react';

import { NavLink } from 'react-router-dom';

import { publicRoutes } from '../routes';

import style from './Header.module.css';

export const Header = (): React.ReactElement => (
  <div className={style.dropdown}>
    <div className={style.DropButton}>Drop</div>
    <div className={style.DropdownContent}>
      {publicRoutes.map(({ path }) => (
        <NavLink className={style.Link} key={path} to={path}>
          <span style={{ padding: '5px' }}>{path}</span>
        </NavLink>
      ))}
    </div>
  </div>
);
