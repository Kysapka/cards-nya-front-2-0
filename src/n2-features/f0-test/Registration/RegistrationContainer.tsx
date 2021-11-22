import React from 'react';

import { AppRootStateType } from 'n1-main/m2-bll';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';

import { PROFILE_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { initErrorStateType } from '../../../n1-main/m2-bll/ErrorReducer';

import { Registration } from './Registration';
import { initRegistrationStateType, RegistrationThunk } from './RegistrationReducer';

const SignupSchema = yup
  .object({
    email: yup.string().email('email is invalid').required('email is required'),
    password: yup
      .string()
      .min(8, 'password must be at least 8 character')
      .required('password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'password must match')
      .required('confirm password is required'),
  })
  .required();

export type SignupSchemaRegistrationType = typeof SignupSchema;

export const RegistrationContainer = (): React.ReactElement => {
  const regState = useSelector<AppRootStateType, initRegistrationStateType>(
    state => state.registration,
  );
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth);
  const dispatch = useDispatch();
  const callback = (email: string, password: string): void => {
    dispatch(RegistrationThunk(email, password));
  };
  const { Info, Error, textInfo, textError } = useSelector<
    AppRootStateType,
    initErrorStateType
  >(state => state.error);
  if (isAuth) {
    return <Navigate to={PROFILE_ROUTE} />;
  }
  return (
    <Registration
      Info={Info}
      Error={Error}
      textError={textError}
      textInfo={textInfo}
      callback={(email, password) => callback(email, password)}
      SignupSchema={SignupSchema}
      isAuth={isAuth}
      regState={regState}
    />
  );
};
