import React, { ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';

import { LOGIN_ROUTE, PROFILE_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { initErrorStateType } from '../../../n1-main/m2-bll/ErrorReducer';

import { Login } from './Login';
import { loginInThunk } from './LoginReducer';

const SignupSchema = yup
  .object({
    email: yup.string().email('email is invalid').required('email is required'),
    password: yup
      .string()
      .min(8, 'password must be at least 8 character')
      .required('password is required'),
  })
  .required();

export type SignupSchemaLoginType = typeof SignupSchema;

export const LoginContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth);

  const callback = (values: {
    email: string;
    password: string;
    rememberMe: boolean;
  }): void => {
    dispatch(loginInThunk(values));
  };
  const { Error, textError } = useSelector<AppRootStateType, initErrorStateType>(
    state => state.error,
  );
  if (isAuth) {
    return <Navigate to={PROFILE_ROUTE} />;
  }
  return (
    <Login
      // isAuth={isAuth}
      Error={Error}
      textError={textError}
      callback={values => callback(values)}
      SignupSchema={SignupSchema}
    />
  );
};
