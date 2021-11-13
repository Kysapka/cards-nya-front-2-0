import React from 'react';

import { NavLink } from 'react-router-dom';

import { publicRoutes } from '../routes/AppRoutes';

export const Header = (): React.ReactElement => (
  <div style={{ marginBottom: '20px' }}>
    {publicRoutes.map(({ path }) => (
      <NavLink key={path} to={path}>
        <span style={{ padding: '5px' }}>{path}</span>
      </NavLink>
    ))}
  </div>
);
