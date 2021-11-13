import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { Demonstration } from '../../../n2-features/f0-test/Demonstration';
import { Login } from '../../../n2-features/f0-test/Login/Login';
import { NewPassword } from '../../../n2-features/f0-test/NewPassword';
import { NotFound } from '../../../n2-features/f0-test/NotFound';
import { Profile } from '../../../n2-features/f0-test/Profile';
import { RecoveryPass } from '../../../n2-features/f0-test/RecoveryPass';
import { Registration } from '../../../n2-features/f0-test/Registration/Registration';

export const NOT_FOUND_ROUTE = '*';
export const LOGIN_ROUTE = 'login';
export const REG_ROUTE = 'register';
export const PROFILE_ROUTE = 'profile';
export const RECOVERY_PASS_ROUTE = 'recovery';
export const NEW_PASS_ROUTE = 'newpass';
export const DEMONSTRATION_ROUTE = 'demonstration';

export const publicRoutes = [
  {
    path: NOT_FOUND_ROUTE,
    component: <NotFound />,
  },
  {
    path: LOGIN_ROUTE,
    component: <Login />,
  },
  {
    path: REG_ROUTE,
    component: <Registration />,
  },
  {
    path: PROFILE_ROUTE,
    component: <Profile />,
  },
  {
    path: RECOVERY_PASS_ROUTE,
    component: <RecoveryPass />,
  },
  {
    path: NEW_PASS_ROUTE,
    component: <NewPassword />,
  },
  {
    path: DEMONSTRATION_ROUTE,
    component: <Demonstration />,
  },
];

export const AppRoutes = (): React.ReactElement => (
  <Routes>
    {publicRoutes.map(({ path, component }) => (
      <Route key={path} path={path} element={component} />
    ))}
  </Routes>
);
