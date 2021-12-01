import React from 'react';

import {
  Demonstration,
  ForgetPasswordContainer,
  LoginContainer,
  NewPassword,
  NotFound,
  Profile,
} from 'n2-features';
import { CardsContainer } from 'n2-features/f1-table/cards/CardsContainer';
import { Route, Routes } from 'react-router-dom';

import { RegistrationContainer } from '../../../n2-features/f0-test/Registration/RegistrationContainer';
import { CardPacksContainer } from '../../../n2-features/f1-table/packs/CardPacksContainer';
import { PlayGround } from '../../../n2-features/gamePlay/PlayGround';

import {
  BASE_ROUTE,
  CARD_PACKS_ROUTE,
  CARDS_ROUTE,
  DEMONSTRATION_ROUTE,
  LOGIN_ROUTE,
  NEW_PASS_ROUTE,
  NOT_FOUND_ROUTE,
  PROFILE_ROUTE,
  RECOVERY_PASS_ROUTE,
  RECOVERYPASSWORD_ROUTE,
  REG_ROUTE,
  PLAY_CARDS_ROUTE,
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
  {
    path: CARDS_ROUTE,
    component: <CardsContainer />,
  },
  {
    path: PLAY_CARDS_ROUTE,
    component: <PlayGround />,
  },
];

export const AppRoutes = (): React.ReactElement => (
  <Routes>
    {publicRoutes.map(({ path, component }) => (
      <Route key={path} path={path} element={component} />
    ))}
  </Routes>
);
