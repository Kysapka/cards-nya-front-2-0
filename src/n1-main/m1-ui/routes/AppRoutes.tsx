import React from 'react';

import {
  Demonstration,
  ForgetPasswordContainer,
  LoginContainer,
  NewPassword,
  NotFound,
  Profile,
} from 'n2-features';
import { Route, Routes } from 'react-router-dom';

import { RegistrationContainer } from '../../../n2-features/f0-test/Registration/RegistrationContainer';
import { CardPacksContainer } from '../../../n2-features/f1-table/packs/CardPacksContainer';

import {
  BASE_ROUTE,
  CARD_PACKS_ROUTE,
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
    component: <LoginContainer />,
  },
  {
    path: REG_ROUTE,
    component: <RegistrationContainer />,
  },
  {
    path: PROFILE_ROUTE,
    component: <Profile />,
  },
  {
    path: RECOVERY_PASS_ROUTE,
    component: <ForgetPasswordContainer />,
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
    component: <NewPassword />,
  },
  {
    path: NOT_FOUND_ROUTE,
    component: <NotFound />,
  },
  {
    path: CARD_PACKS_ROUTE,
    component: <CardPacksContainer />,
  },
];

export const AppRoutes = (): React.ReactElement => (
  <Routes>
    {publicRoutes.map(({ path, component }) => (
      <Route key={path} path={path} element={component} />
    ))}
  </Routes>
);
