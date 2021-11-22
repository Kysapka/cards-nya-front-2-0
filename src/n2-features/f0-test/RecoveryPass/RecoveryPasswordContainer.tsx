import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import { AppRootStateType } from '../../../n1-main/m2-bll';
import { initErrorStateType } from '../../../n1-main/m2-bll/ErrorReducer';

import { RecoveryPassword } from './RecoveryPassword';
import { recoveryPasswordThunk, setTokenAction } from './RecoveryPasswordReducer';

const SignupSchema = yup
  .object({
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

export type SignupSchemaRecoveryPasswordType = typeof SignupSchema;

export const RecoveryPasswordContainer = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { token } = useParams();
  useEffect(() => {
    if (token) dispatch(setTokenAction(token));
  }, []);
  const callback = (password: string): void => {
    if (token) {
      dispatch(recoveryPasswordThunk(password, token));
    }
  };

  const { Info, Error, textInfo, textError } = useSelector<
    AppRootStateType,
    initErrorStateType
  >(state => state.error);
  return (
    <RecoveryPassword
      callback={callback}
      Info={Info}
      textInfo={textInfo}
      Error={Error}
      textError={textError}
      SignupSchema={SignupSchema}
    />
  );
};
