import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';

import { PROFILE_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { initErrorStateType } from '../../../n1-main/m2-bll/ErrorReducer';

import { initRecoveryStateType, RecoveryPassThunk } from './ForgetPassReducer';
import { ForgetPassword } from './ForgetPassword';

export type SignupShemForgetPasswordType = typeof SignupSchema;
const SignupSchema = yup
  .object({
    email: yup.string().email('email is invalid').required('email is required'),
  })
  .required();
export const ForgetPasswordContainer = (): React.ReactElement => {
  const recovereState = useSelector<AppRootStateType, initRecoveryStateType>(
    state => state.forgetPassword,
  );
  const { Error, textError, Info, textInfo } = useSelector<
    AppRootStateType,
    initErrorStateType
  >(state => state.error);
  const dispatch = useDispatch();
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth);
  const callback = (email: string): void => {
    dispatch(RecoveryPassThunk(email));
  };

  return (
    <ForgetPassword
      Info={Info}
      textInfo={textInfo}
      callback={email => callback(email)}
      SignupSchema={SignupSchema}
      textError={textError}
      Error={Error}
      isAuth={isAuth}
      email={recovereState.email}
    />
  );
};
