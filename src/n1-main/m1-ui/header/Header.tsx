import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

import { publicRoutes } from '../routes';

export const Header = (): React.ReactElement => {
  const [show, setShow] = useState(true);

  return (
    <div style={{ marginBottom: '20px' }}>
      <button className="btn-primary" onClick={() => setShow(!show)}>
        Show/hide Dev-Menu
      </button>
      {publicRoutes.map(
        ({ path }) =>
          show && (
            <NavLink key={path} to={path}>
              <span style={{ padding: '5px' }}>{path}</span>
            </NavLink>
          ),
      )}
    </div>
  );
};
