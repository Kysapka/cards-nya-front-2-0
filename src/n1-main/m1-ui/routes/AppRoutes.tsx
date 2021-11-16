import React from 'react';

import {
  Demonstration,
  Login,
  NewPassword,
  ForgetPassword,
  Profile,
  Registration,
  NotFound,
} from 'n2-features';
import { Route, Routes } from 'react-router-dom';

import { RecoveryPassword } from '../../../n2-features/f0-test/RecoveryPass/RecoveryPassword';

export const NOT_FOUND_ROUTE = '*';
export const LOGIN_ROUTE = 'login';
export const REG_ROUTE = 'register';
export const PROFILE_ROUTE = 'profile';
export const RECOVERY_PASS_ROUTE = 'recovery';
export const NEW_PASS_ROUTE = 'newpass';
export const DEMONSTRATION_ROUTE = 'demonstration';
export const RECOVERYPASSWORD_ROUTE = 'set-new-password/:token';

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
    component: <ForgetPassword />,
  },
  {
    path: NEW_PASS_ROUTE,
    component: <NewPassword />,
  },
  {
    path: DEMONSTRATION_ROUTE,
    component: <Demonstration />,
  },
  {
    path: RECOVERYPASSWORD_ROUTE,
    component: <RecoveryPassword />,
  },
];

export const AppRoutes = (): React.ReactElement => (
  <Routes>
    {publicRoutes.map(({ path, component }) => (
      <Route key={path} path={path} element={component} />
    ))}
  </Routes>
);
