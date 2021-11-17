import React from 'react';

import {
  Demonstration,
  ForgetPassword,
  Login,
  NewPassword,
  NotFound,
  Profile,
  Registration,
} from 'n2-features';
import { Route, Routes } from 'react-router-dom';

import { RecoveryPassword } from '../../../n2-features/f0-test/RecoveryPass';

import {
  BASE_ROUTE,
  DEMONSTRATION_ROUTE,
  LOGIN_ROUTE,
  NEW_PASS_ROUTE,
  NOT_FOUND_ROUTE,
  PROFILE_ROUTE,
  RECOVERY_PASS_ROUTE,
  RECOVERYPASSWORD_ROUTE,
  REG_ROUTE,
} from './consts';

export const publicRoutes = [
  {
    path: BASE_ROUTE,
    component: <Profile />,
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
  {
    path: NOT_FOUND_ROUTE,
    component: <NotFound />,
  },
];

export const AppRoutes = (): React.ReactElement => (
  <Routes>
    {publicRoutes.map(({ path, component }) => (
      <Route key={path} path={path} element={component} />
    ))}
  </Routes>
);
