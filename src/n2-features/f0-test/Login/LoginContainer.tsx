import React, { ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { AppRootStateType } from '../../../n1-main/m2-bll';
import { initErrorStateType } from '../../../n1-main/m2-bll/ErrorReducer';

import { Login } from './Login';
import { loginInThunk } from './LoginReducer';

export const LoginContainer = (): ReactElement => {
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth);
  const dispatch = useDispatch();
  const SignupSchema = yup
    .object({
      email: yup.string().email('email is invalid').required('email is required'),
      password: yup
        .string()
        .min(8, 'password must be at least 8 character')
        .required('password is required'),
    })
    .required();
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
  return (
    <Login
      isAuth={isAuth}
      Error={Error}
      textError={textError}
      callback={values => callback(values)}
      SignupSchema={SignupSchema}
    />
  );
};
